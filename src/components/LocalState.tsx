import { useState } from "react";
import { StorageMode } from "../model/TextSettings";

class MemoryStorage {
  private map: { [index: string]: string } = {};

  clear(): void {
    this.map = {};
  }

  getItem(key: string): string | null {
    return this.map[key];
  }

  key(index: number): string | null {
    return Object.keys(this.map)[index];
  }

  removeItem(key: string): void {
    delete this.map[key];
  }

  setItem(key: string, value: string): void {
    this.map[key] = value;
  }
}

const memoryStorage = new MemoryStorage();

export interface IVersion {
  version: number;
}

export function useLocalState<T extends IVersion>(
  id: string,
  defaultValue: T,
  storageMode: StorageMode,
  migration: MigrationHandlerMap<T>
): [T, React.Dispatch<T>] {
  const storage = selectStorage(storageMode);

  const [state, setState] = useState<T>(() => {
    const text = storage.getItem(id);
    if (text === null) {
      storage.setItem(id, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      const json = JSON.parse(text) as T;
      if (json.version < defaultValue.version) {
        const migrated = new MigrateHelper({
          stored: json,
          defaultValue: defaultValue,
          funcs: migration,
          hint: id,
        }).migrate();
        storage.setItem(id, JSON.stringify(migrated));
        return migrated;
      }
      return json;
    } catch (e) {
      storage.setItem(id, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  return [
    state,
    (value: T) => {
      if (value === undefined) {
        setState({ ...defaultValue });
        storage.setItem(id, JSON.stringify(defaultValue));
        return;
      }
      setState({ ...value });
      storage.setItem(id, JSON.stringify(value));
    },
  ];
}
function selectStorage(storageMode: string) {
  switch (storageMode) {
    case "local":
      return localStorage;
    case "session":
      return sessionStorage;
    default:
      return memoryStorage;
  }
}

export type MigrationHandler<T extends IVersion> = (stored: T, def: T) => T;

export class MigrationHandlerMap<T extends IVersion> extends Map<
  number,
  MigrationHandler<T>
> {}

export interface MigrateHelperProps<T extends IVersion> {
  stored: T;
  defaultValue: T;
  funcs: MigrationHandlerMap<T>;
  hint: string;
}

export class MigrateHelper<T extends IVersion>
  implements MigrateHelperProps<T> {
  stored: T;
  defaultValue: T;
  funcs: MigrationHandlerMap<T>;
  hint: string;

  constructor(props: MigrateHelperProps<T>) {
    this.stored = props.stored;
    this.defaultValue = props.defaultValue;
    this.funcs = props.funcs;
    this.hint = props.hint;
  }

  migrate() {
    if (this.stored.version === undefined) {
      this.stored.version = 0;
    }

    while (this.stored.version < this.defaultValue.version) {
      const nextVersion = this.stored.version + 1;
      const func = this.funcs.get(nextVersion);
      if (func) {
        console.log("migration " + this.hint + " " + this.stored.version);
        this.stored = func(this.stored, this.defaultValue);
      }
      this.stored.version = nextVersion;
    }

    return this.stored;
  }
}
