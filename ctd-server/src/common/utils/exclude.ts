export function exclude<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
}
