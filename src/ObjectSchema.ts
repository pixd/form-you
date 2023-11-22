import BaseSchema, { DefaultValue, RejectType, SafetyType, SchemaCloneProps,
  SchemaData } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { _, AnySchema, SchemaDataType } from './types';
import ValidationError, { PredefinedValidationTestName } from './ValidationError';

export type Shape = {
  [key in string]: AnySchema;
};

type MergeShape<
  TShape extends Shape = Shape,
  TNextShape extends ConcatenatedShape<TShape> = ConcatenatedShape<TShape>,
> = TNextShape & SafetyType<TShape, {}>;

type ConcatenatedShape<
  TShape extends Shape = Shape,
> = SafetyType<TShape, Shape, object & Partial<TShape>>

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

type DefaultData<
  TShape extends Shape = Shape,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> = SchemaData<_<ShapeData<TShape>>, TOptional, TNullable>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface ObjectSchema<
  TShape extends Shape = never,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<_<ShapeData<TShape>>, TOptional, TNullable, TContext> {
  apply<
    TNextShape extends SafetyType<TShape, {}> = SafetyType<TShape, {}>,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: SchemaCloneProps<TNextShape, TDefaultValue, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TNextShape, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  clone<
    TNextShape extends SafetyType<TShape, {}> = SafetyType<TShape, {}>,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: SchemaCloneProps<TNextShape, TDefaultValue, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TNextShape, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  mutate<
    TReturned extends ObjectSchema<TShape> = ObjectSchema<TShape>,
  >(
    cb: {
      (schema: ObjectSchema<TShape, TOptional, TNullable, TContext>): TReturned;
    },
  ): TReturned;

  context<
    TNextContext extends SafetyType<TContext, Record<string, any>, object & Partial<TContext>> = TContext,
  >(): ObjectSchema<TShape, TOptional, TNullable, SafetyType<TContext, object> & TNextContext>;

  optional(): ObjectSchema<TShape, true, TNullable, TContext>;

  notOptional(
    message?: string,
  ): ObjectSchema<TShape, false, TNullable, TContext>;

  nullable(): ObjectSchema<TShape, TOptional, true, TContext>;

  notNullable(
    message?: string,
  ): ObjectSchema<TShape, TOptional, false, TContext>;

  required(
    message?: string,
  ): ObjectSchema<TShape, false, false, TContext>;

  notRequired(): ObjectSchema<TShape, true, true, TContext>;

  default(
    defaultData: DefaultData<TShape, TOptional, TNullable>,
  ): ObjectSchema<TShape, TOptional, TNullable, TContext>;

  resetDefault(): ObjectSchema<TShape, TOptional, TNullable, TContext>;
}

export default class ObjectSchema<
  TShape extends Shape = never,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<_<ShapeData<TShape>>, TOptional, TNullable, TContext> {
  protected override patternValue: null | Shape = null;

  protected override defaultValue: DefaultValue<_<ShapeData<TShape>>, TOptional, TNullable> = null;

  protected override selfConstructor: {
    new (): ObjectSchema;
  } = ObjectSchema;

  protected override selfRich() {
    return;
  }

  public static create<
    TShape extends Shape = never,
    TContext extends Record<string, any> = object,
  >(
    shape?: TShape,
  ): ObjectSchema<TShape, false, false, TContext> {
    const schema = new ObjectSchema<TShape, false, false, TContext>();

    schema.patternValue = shape ?? null;

    return schema;
  }

  public concat<
    TNextShape extends ConcatenatedShape<TShape> = TShape,
  >(
    shape: TNextShape,
  ): ObjectSchema<MergeShape<TShape, TNextShape>, TOptional, TNullable, TContext> {
    const patternValue = {
      ...this.patternValue,
      ...shape,
    } as MergeShape<TShape, TNextShape>;

    let defaultValue = this.defaultValue;

    if (this.defaultValue?.data != null) {
      const defaultData = Object.keys(shape).reduce((defaultData, key) => {
        delete defaultData[key];
        return defaultData;
      }, { ...this.defaultValue.data });
      defaultValue = { data: defaultData };
    }

    return this.apply({
      patternValue,
      defaultValue,
    });
  }

  public override getDefault(): DefaultData<TShape, TOptional, TNullable> {
    if (this.defaultValue?.data != null) {
      const defaultData = calculateDefaultData(this.patternValue);
      return {
        ...defaultData,
        ...this.defaultValue.data,
      };
    }
    else {
      const defaultData = super.getDefaultBase();

      if (defaultData) {
        return defaultData.data;
      }
      else {
        return calculateDefaultData(this.patternValue) as DefaultData<TShape, TOptional, TNullable>;
      }
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

function calculateDefaultData(patternValue: null | Shape) {
  return Object.entries(patternValue ?? {})
    .reduce((defaultValue, [key, schema]) => {
      defaultValue[key] = schema.getDefault();
      return defaultValue;
    }, {});
}
