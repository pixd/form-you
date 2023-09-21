import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { SchemaDataType, Shape } from './types';
import { ValidationError, PredefinedValidationTestName } from './ValidationError';

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
  TData extends object = object,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends object = any,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  rich<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(
    schema: BaseSchema,
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>, TContext>;

  optional(): ObjectSchema<TData, true, TNullable, TContext>;

  notOptional(
    message?: string,
  ): ObjectSchema<TData, false, TNullable, TContext>;

  nullable(): ObjectSchema<TData, TOptional, true, TContext>;

  notNullable(
    message?: string,
  ): ObjectSchema<TData, TOptional, false, TContext>;

  required(
    message?: string,
  ): ObjectSchema<TData, false, false, TContext>;

  notRequired(): ObjectSchema<TData, true, true, TContext>;

  default(
    defaultValue: null | TData,
  ): ObjectSchema<TData, TOptional, TNullable, TContext>;
}

export default class ObjectSchema<
  TData extends object = object,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends object = any,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  protected shape: Shape = {};

  protected override defaultValue: null | TData = null;

  constructor(shape: Shape) {
    super();

    this.shape = shape;
  }

  public static create<
    TShape extends Shape = Shape,
    TContext extends object = any,
  >(
    shape: TShape,
  ): ObjectSchema<ShapeData<TShape>, false, false, TContext> {
    return new ObjectSchema<ShapeData<TShape>, false, false, TContext>(shape);
  }

  public clone<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = TOptional extends true ? null : string,
    TRejectNull extends null | string = TNullable extends true ? null : string,
  >(
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>, TContext> {
    const schema = ObjectSchema.create(this.shape);

    return this.rich(schema, props);
  }

  public override getDefault(): TData {
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

  public override validate<
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
