import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { AnyObject } from './types';
import { ValidationError, PredefinedValidationTestName } from './ValidationError';

// type Shape<
//   TType extends AnyObject = AnyObject,
// > = {
//   [TKey in string]: ObjectSchema<TType[TKey]>;
// };

type Shape = {
  [key in string]: ObjectSchema<any, any, any>;
};

type DefinedShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends TShape[TKey]['Data__TypeRef']
    ? never
    : TKey;
}[keyof TShape];

type OptionalShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends TShape[TKey]['Data__TypeRef']
    ? TKey
    : never;
}[keyof TShape];

// eslint-disable-next-line @typescript-eslint/naming-convention
type _ShapeData<
  TShape extends Shape = Shape,
> = null | keyof TShape extends null
  ? Record<string, never>
  : {
    [TKey in keyof TShape]-?: TShape[TKey]['Data__TypeRef'];
  };

type ShapeData<
  TShape extends Shape = Shape,
> =
  & _ShapeData<Pick<TShape, DefinedShapeProps<TShape>>>
  & Partial<_ShapeData<Pick<TShape, OptionalShapeProps<TShape>>>>;

// // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
// export default interface ObjectSchema<
//   TData extends AnyObject = AnyObject,
//   TOptional extends boolean = false,
//   TNullable extends boolean = false,
// > extends BaseSchema<TData, TOptional, TNullable> {}

export default class ObjectSchema<
  TData extends AnyObject = AnyObject,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> extends BaseSchema<TData, TOptional, TNullable> {

  public clone<
    TRejectUndefined extends null | string = TOptional extends true ? null : string,
    TRejectNull extends null | string = TNullable extends true ? null : string,
  >(
    props?: SchemaCloneProps<TRejectUndefined, TRejectNull>,
  ): BaseSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>> {
    const schema = new ObjectSchema(this.shape);

    return this.rich(schema, props);
  }

  static create<
    TShape extends Shape = Shape,
  >(
    shape: TShape,
  ): ObjectSchema<ShapeData<TShape>> {
    return new ObjectSchema(shape);
  }

  override validate<
    TValue extends any = any,
  >(
    value: TValue,
    path?: string,
  ): TValue {
    super.validate(value, path);

    if (value != null && typeof value !== 'object') {
      throw new ValidationError(
        prepareErrorMessage(errorMessages.MUST_BE_AN_OBJECT_MESSAGE, path),
        PredefinedValidationTestName.$OBJECT_MUST_BE_AN_OBJECT,
        value,
      );
    }

    return value;
  }
}
