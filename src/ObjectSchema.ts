import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { AnyObject, SchemaDataType } from './types';
import { ValidationError, PredefinedValidationTestName } from './ValidationError';

// type Shape<
//   TType extends AnyObject = AnyObject,
// > = {
//   [TKey in string]: ObjectSchema<TType[TKey]>;
// };

type Shape = {
  [key in string]: BaseSchema<any, any, any>;
};

type DefinedShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends SchemaDataType<TShape[TKey]>
    ? never
    : TKey;
}[keyof TShape];

type OptionalShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends SchemaDataType<TShape[TKey]>
    ? TKey
    : never;
}[keyof TShape];

// // eslint-disable-next-line @typescript-eslint/naming-convention
// type _ShapeData<
//   TShape extends Shape = Shape,
// > = null | keyof TShape extends null
//   ? Record<string, never>
//   : {
//     [TKey in keyof TShape]-?: TShape[TKey]['Data__TypeRef'];
//   };

// // eslint-disable-next-line @typescript-eslint/naming-convention
// type _ShapeData<
//   TShape extends Shape = Shape,
// > = object & {
//   [TKey in keyof TShape]-?: SchemaDataType<TShape[TKey]>;
// };

// eslint-disable-next-line @typescript-eslint/naming-convention
type _ShapeData<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: SchemaDataType<TShape[TKey]>;
};

type ShapeData<
  TShape extends Shape = Shape,
> = null | keyof TShape extends null
  ? Record<string, never>
  : (
    & _ShapeData<Pick<TShape, DefinedShapeProps<TShape>>>
    & Partial<_ShapeData<Pick<TShape, OptionalShapeProps<TShape>>>>
  );

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface ObjectSchema<
  TData extends AnyObject = AnyObject,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
> extends BaseSchema<TData, TOptional, TNullable> {
  rich<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(
    schema: BaseSchema,
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>>;

  optional(): ObjectSchema<TData, true, TNullable>;

  notOptional(
    message?: string,
  ): ObjectSchema<TData, false, TNullable>;

  nullable(): ObjectSchema<TData, TOptional, true>;

  notNullable(
    message?: string,
  ): ObjectSchema<TData, TOptional, false>;

  required(
    message?: string,
  ): ObjectSchema<TData, false, false>;

  notRequired(): ObjectSchema<TData, true, true>;

  default(
    defaultValue: TData,
  ): ObjectSchema<TData, TOptional, TNullable>;
}

export default class ObjectSchema<
  TData extends AnyObject = AnyObject,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
> extends BaseSchema<TData, TOptional, TNullable> {
  protected shape: Shape = {};

  protected override defaultValue: undefined | TData = undefined;

  constructor(shape: Shape) {
    super();

    this.shape = shape;
  }

  static create<
    TShape extends Shape = Shape,
  >(
    shape: TShape,
  ): ObjectSchema<ShapeData<TShape>, false, false> {
    return new ObjectSchema<ShapeData<TShape>, false, false>(shape);
  }

  public clone<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = TOptional extends true ? null : string,
    TRejectNull extends null | string = TNullable extends true ? null : string,
  >(
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>> {
    const schema = ObjectSchema.create(this.shape);

    return this.rich(schema, props);
  }

  override getDefault(): TData {
    if (this.defaultValue == null) {
      return Object.entries(this.shape).reduce((defaultValue, [key, shape]) => {
        defaultValue[key as keyof TData] = shape.getDefault();
        return defaultValue;
      }, {} as TData);
    }
    else {
      return this.defaultValue;
    }
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
