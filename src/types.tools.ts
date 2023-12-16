export type Intersection<T> = (T extends any ? (x: T) => void : never) extends ((x: infer I) => void) ? I : never;
