import { useState } from "react";

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

export function useLocalState<T>(
  id: string,
  defaultValue: T
): [T, React.Dispatch<T>] {
  const storage = memoryStorage;

  const [state, setState] = useState<T>(() => {
    const text = storage.getItem(id);
    if (text === null) {
      storage.setItem(id, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(text) as T;
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
