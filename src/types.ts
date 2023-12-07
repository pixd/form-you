import BaseSchema from './Schema/BaseSchema';
import ObjectSchema from './Schema/ObjectSchema';
import StringSchema from './Schema/StringSchema';

export type AnySchema =
  | StringSchema
  | ObjectSchema;

export type Simplify<T> = T extends object
  ? { [TKey in keyof T]: T[TKey] }
  : T;

export type SimplifyDeep<T> = T extends object
  ? { [TKey in keyof T]: SimplifyDeep<T[TKey]> }
  : T;

export type SchemaDataType<
  TSchema extends BaseSchema,
> = Simplify<TSchema['Data__TypeRef']>;

export type SchemaContextType<
  TSchema extends BaseSchema,
> = Simplify<TSchema['Context__TypeRef']>;

export type SchemaShapeType<
  TSchema extends BaseSchema,
> = Simplify<TSchema['Shape__TypeRef']>;
