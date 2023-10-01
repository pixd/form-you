import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { SchemaDataType, AnySchema } from './types';
import ValidationError, { PredefinedValidationTestName } from './ValidationError';

export type Shape = {
  [key in string]: AnySchema;
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

// eslint-disable-next-line @typescript-eslint/naming-convention
type _ShapeData<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: SchemaDataType<TShape[TKey]>;
};

export type ShapeData<
  TShape extends Shape = Shape,
> = null | TShape extends null
  ? Record<string, any>
  : null | keyof TShape extends null
    ? Record<string, never>
    : (
      & _ShapeData<Pick<TShape, DefinedShapeProps<TShape>>>
      & Partial<_ShapeData<Pick<TShape, OptionalShapeProps<TShape>>>>
    );

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface ObjectSchema<
  TData extends Record<string, any> = Record<string, any>,
  TOptional extends boolean = boolean,
  TNullable extends boolean = boolean,
  TContext extends Record<string, any> = Record<string, any>,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  rich<
    TDefaultValue extends TData = TData,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    schema: BaseSchema,
    props?: Partial<SchemaCloneProps<TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): ObjectSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  context<
    TNextContext extends null | TContext extends null ? Record<string, any> : (object & Partial<TContext>) = TContext,
  >(): ObjectSchema<TData, TOptional, TNullable, (null | TContext extends null ? object : TContext) & TNextContext>;

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
  TData extends Record<string, any> = Record<string, any>,
  TOptional extends boolean = boolean,
  TNullable extends boolean = boolean,
  TContext extends Record<string, any> = Record<string, any>,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  protected override patternValue: null | Shape = null;

  protected override defaultValue: null | TData = null;

  public static create<
    TShape extends Shape = never,
    TContext extends Record<string, any> = never,
  >(
    shape?: TShape,
  ): ObjectSchema<ShapeData<TShape>, false, false, TContext> {
    const schema = new ObjectSchema<ShapeData<TShape>, false, false, TContext>();

    schema.patternValue = shape ?? null;

    return schema;
  }

  public pattern<
    TShape extends Shape = Shape,
  >(
    shape: TShape,
  ): ObjectSchema<ShapeData<TShape>, TOptional, TNullable, TContext> {
    const schema = new ObjectSchema<ShapeData<TShape>, TOptional, TNullable, TContext>();

    this.rich(schema);

    schema.patternValue = shape;

    return schema;
  }

  public shape<
    TShape extends Shape = Shape,
  >(
    shape: TShape,
  ): ObjectSchema<ShapeData<TShape>, TOptional, TNullable, TContext> {
    return this.pattern(shape);
  }

  public clone<
    TDefaultValue extends TData = TData,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): ObjectSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext> {
    const schema = new ObjectSchema();

    return this.rich(schema, props);
  }

  public override getDefault(): TData {
    if (this.defaultValue != null) {
      return this.defaultValue;
    }
    else if (this.patternValue) {
      return Object.entries(this.patternValue)
        .reduce((defaultValue: TData, [key, schema]: [keyof TData, BaseSchema]) => {
          defaultValue[key] = schema.getDefault();
          return defaultValue;
        }, {} as TData);
    }
    else {
      return {} as TData;
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
