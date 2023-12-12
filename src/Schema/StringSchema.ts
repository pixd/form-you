import BaseSchema, { DefaultValue, RejectType, SafetyType, SchemaCloneProps,
  SchemaData } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from '../error-messages';
import ValidationError, { PredefinedValidationTestName } from '../ValidationError';

export type ShapeData<TShape extends string = string> = `${TShape}`;

type DefaultData<
  TShape extends string = string,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> = SchemaData<ShapeData<TShape>, TOptional, TNullable>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface StringSchema<
  TShape extends string = string,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<ShapeData<TShape>, TOptional, TNullable, TContext> {
  apply<
    TNextShape extends TShape = TShape,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TNextShape[], TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TNextShape, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  clone<
    TNextShape extends TShape = TShape,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TNextShape[], TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TNextShape, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  mutate<
    TReturned extends StringSchema<TShape> = StringSchema<TShape>,
  >(
    cb: {
      (schema: StringSchema<TShape, TOptional, TNullable, TContext>): TReturned;
    },
  ): TReturned;

  context<
    TNextContext extends SafetyType<TContext, Record<string, any>, object & Partial<TContext>> = TContext,
  >(): StringSchema<TShape, TOptional, TNullable, SafetyType<TContext, object> & TNextContext>;

  optional(): StringSchema<TShape, true, TNullable, TContext>;

  notOptional(
    message?: string,
  ): StringSchema<TShape, false, TNullable, TContext>;

  nullable(): StringSchema<TShape, TOptional, true, TContext>;

  notNullable(
    message?: string,
  ): StringSchema<TShape, TOptional, false, TContext>;

  required(
    message?: string,
  ): StringSchema<TShape, false, false, TContext>;

  notRequired(): StringSchema<TShape, true, true, TContext>;

  default(
    defaultData: DefaultData<TShape, TOptional, TNullable>,
  ): StringSchema<TShape, TOptional, TNullable, TContext>;

  resetDefault(): StringSchema<TShape, TOptional, TNullable, TContext>;
}

export default class StringSchema<
  TShape extends string = string,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<ShapeData<TShape>, TOptional, TNullable, TContext> {
  public override Shape__TypeRef = '' as TShape;

  protected override shapeValue: null = null;

  protected override defaultValue: DefaultValue<ShapeData<TShape>, TOptional, TNullable> = null;

  protected override selfConstructor: {
    new (): StringSchema;
  } = StringSchema;

  protected override selfRich() {
    return;
  }

  public static create<
    TShape extends string = string,
    TContext extends Record<string, any> = object,
  >(): StringSchema<TShape, false, false, TContext> {
    const schema = new StringSchema<TShape, false, false, TContext>();

    return schema;
  }

  public reach(): this {
    // eslint-disable-next-line prefer-rest-params
    const path = arguments[0];
    if (path != null) {
      throw new Error('StringSchema can not have shape, you trying to access `' + path + '` property');
    }
    return this;
  }

  public override getDefault(): DefaultData<TShape, TOptional, TNullable> {
    const defaultData = super.getDefaultBase();

    if (defaultData) {
      return defaultData.data;
    }
    else {
      if (this.defaultValue?.data != null) {
        return this.defaultValue.data;
      }
      else {
        return '' as DefaultData<TShape, TOptional, TNullable>;
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

    if (value != null && typeof value !== 'string') {
      throw new ValidationError(
        prepareErrorMessage(errorMessages.MUST_BE_A_STRING_MESSAGE, path),
        PredefinedValidationTestName.$STRING_MUST_BE_A_STRING,
        value,
      );
    }

    return value;
  }
}
