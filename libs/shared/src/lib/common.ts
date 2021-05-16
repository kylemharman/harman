export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export function isObject(item: unknown): item is Record<string, unknown> {
  return item && typeof item === 'object' ? true : false;
}
