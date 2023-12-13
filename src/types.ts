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

export type PossibleShapePath<
  TShape extends any,
> = [TShape] extends [never]
  ? never
  : [keyof TShape] extends [never]
    ? never
    : TShape extends Record<string, AnySchema>
      ? { [TKey in keyof TShape]: TKey extends string
        ? TKey | `${TKey}.${PossibleShapePath<TShape[TKey]['Shape__TypeRef']>}`
        : never
      }[keyof TShape]
      : never;

export type ShapePathSchema<
  TShape extends any,
  TPath extends string,
> = [TPath] extends [never]
  ? unknown
  : [TShape] extends [never]
    ? unknown
    : TPath extends `${infer TKey}.${infer TKeyRest}`
      ? ShapePathSchema<AtPath<TShape, TKey, 'Shape__TypeRef'>, TKeyRest>
      : AtPath<TShape, TPath>;

export type RefinedSchema<
  TShape extends any,
  TPath extends string,
  TReturned extends any,
> = TPath extends `${infer TKey}.${infer TKeyRest}`
  ? Simplify<Omit<TShape, TKey>
    & {
      [key in TKey]: AtPath<TShape, TKey> extends ObjectSchema<infer TS, infer TO, infer TN, infer TC>
        ? ObjectSchema<RefinedSchema<TS, TKeyRest, TReturned>, TO, TN, TC>
        : never;
    }>
  : Simplify<Omit<TShape, TPath> & { [key in TPath]: TReturned }>

// @ts-ignore
type AtPath<TData, TPath, TProp = null> = TProp extends string ? TData[TPath][TProp] : TData[TPath];
