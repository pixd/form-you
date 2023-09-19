export type AnyObject = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _<T> = T extends object
  ? { [k in keyof T]: T[k] }
  : T;
