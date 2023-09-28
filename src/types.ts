import BaseSchema from './BaseSchema';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _<T> = T extends object
  ? { [k in keyof T]: T[k] }
  : T;

export type SchemaDataType<
  TSchema extends BaseSchema,
> = _<TSchema['Data__TypeRef']>;

export type SchemaContextType<
  TSchema extends BaseSchema,
> = _<TSchema['Context__TypeRef']>;
