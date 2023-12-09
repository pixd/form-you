import BaseSchema from './Schema/BaseSchema';
import ObjectSchema from './Schema/ObjectSchema';
import StringSchema from './Schema/StringSchema';
import { PossiblePath, PathValue } from './path/path.types';

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

export type PossibleShapePath<
  TShape extends any,
> = [TShape] extends [never]
  ? never
  : TShape extends Record<string, AnySchema>
    ? { [TKey in keyof TShape]: TKey extends string
      ? TKey | `${TKey}.${PossibleShapePath<TShape[TKey]['Shape__TypeRef']>}`
      : never
    }[keyof TShape]
    : never;

export type ShapePathSchema<
  TShape extends any,
  TShapePath extends undefined | string,
> = [TShape] extends [never]
  ? any
  : TShapePath extends `${infer TKey}.${infer TKeyRest}`
    ? ShapePathSchema<AtPath<TShape, TKey, 'Shape__TypeRef'>, TKeyRest>
    : AtPath<TShape, TShapePath>;

// @ts-ignore
type AtPath<TData, TPath, TProp = null> = TProp extends string ? TData[TPath][TProp] : TData[TPath];
