import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import ValidationError, { PredefinedValidationTestName } from './ValidationError';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface StringSchema<
  TData extends string = string,
  TOptional extends boolean = boolean,
  TNullable extends boolean = boolean,
  TContext extends Record<string, any> = Record<string, any>,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  pattern<
    TValue extends string = string,
  >(
    values: TValue[],
  ): StringSchema<TValue, TOptional, TNullable, TContext>;

  clone<
    TDefaultValue extends TData = TData,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  rich<
    TDefaultValue extends TData = TData,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    schema: BaseSchema,
    props?: Partial<SchemaCloneProps<TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  mutate<
    TReturned extends StringSchema<TData> = StringSchema<TData>,
  >(
    cb: {
      (schema: StringSchema<TData, TOptional, TNullable, TContext>): TReturned;
    },
  ): TReturned;

  context<
    TNextContext extends null | TContext extends null ? Record<string, any> : (object & Partial<TContext>) = TContext,
  >(): StringSchema<TData, TOptional, TNullable, (null | TContext extends null ? object : TContext) & TNextContext>;

  optional(): StringSchema<TData, true, TNullable, TContext>;

  notOptional(
    message?: string,
  ): StringSchema<TData, false, TNullable, TContext>;

  nullable(): StringSchema<TData, TOptional, true, TContext>;

  notNullable(
    message?: string,
  ): StringSchema<TData, TOptional, false, TContext>;

  required(
    message?: string,
  ): StringSchema<TData, false, false, TContext>;

  notRequired(): StringSchema<TData, true, true, TContext>;

  default(
    defaultValue: null | TData,
  ): StringSchema<TData, TOptional, TNullable, TContext>;
}

export default class StringSchema<
  TData extends string = string,
  TOptional extends boolean = boolean,
  TNullable extends boolean = boolean,
  TContext extends Record<string, any> = Record<string, any>,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  protected override patternValue: null | string[] = null;

  protected override defaultValue: null | TData = null;

  protected override selfConstructor: {
    new (): StringSchema;
  } = StringSchema;

  public static create<
    TValue extends string = string,
    TContext extends Record<string, any> = never,
  >(
    values?: TValue[],
  ): StringSchema<TValue, false, false, TContext> {
    const schema = new StringSchema<TValue, false, false, TContext>();

    schema.patternValue = values ?? null;

    return schema;
  }

  public values<
    TValue extends string = string,
  >(
    values: TValue[],
  ): StringSchema<TValue, TOptional, TNullable, TContext> {
    return this.pattern(values);
  }

  public override getDefault(): TData {
    if (this.defaultValue != null) {
      return this.defaultValue;
    }
    else if (this.patternValue) {
      return (this.patternValue[0] ?? '') as TData;
    }
    else {
      return '' as TData;
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
