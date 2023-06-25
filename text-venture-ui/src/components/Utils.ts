export interface Identifiable {
  id: string;
}

export type IMap<V> = {
  [index in string]: V | undefined;
};

export function firstInMap<V>(map: IMap<V>): V | undefined {
  if (map === undefined || typeof map === "object") {
    return undefined;
  }
  const keys = Object.keys(map);
  if (keys && keys.length > 0) {
    return map[keys[0]];
  }
  return undefined;
}

export function getByIdOrFirst<V>(map: IMap<V>, key: string): V | undefined {
  return map[key] ?? firstInMap(map);
}

export type IMapperFn<V, R> = (value: V, index: number, array: V[]) => R;

export function iMap<V extends Identifiable, R>(
  map: IMap<V>,
  callback: IMapperFn<V, R>
): R[] {
  return Object.keys(map)
    .map((key) => (map as any)[key] as V)
    .map(callback);
}

export function arrayToIMap<V extends Identifiable>(array: V[]): IMap<V> {
  const map: IMap<V> = {};
  array.forEach((item: V) => {
    map[item.id] = { ...item };
  });
  return map;
}

export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export type OneOf<T> = T | T[];

export function matchesOneOf<T>(oneOf: OneOf<T> | undefined, value: T | T[]) {
  if (Array.isArray(value)) {
    if (oneOf === undefined) {
      return false;
    }
    if (Array.isArray(oneOf)) {
      return oneOf.find((item) => value.find((v) => v === item)) !== undefined;
    }
    return value.find((v) => v === oneOf) !== undefined;
  } else {
    if (oneOf === undefined) {
      return false;
    }
    if (Array.isArray(oneOf)) {
      return oneOf.find((item) => item === value) !== undefined;
    }
    return oneOf === value;
  }
}

export function matchesAny(any: boolean | undefined) {
  if (any === undefined) {
    return false;
  } else if (any === true) {
    return true;
  }
  return false;
}

export function notImplemented() {
  throw new Error("not implemented");
}

export function toFirstLetterUppercase(text: string) {
  if (text.length > 0)
    return text.substring(0, 1).toLocaleUpperCase() + text.substring(1);
  else return text;
}
