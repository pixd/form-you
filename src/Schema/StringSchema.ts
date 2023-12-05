import BaseSchema, { DefaultValue, RejectType, SafetyType, SchemaCloneProps,
  SchemaData } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from '../error-messages';
import ValidationError, { PredefinedValidationTestName } from '../ValidationError';

export type PatternData<TPattern extends string = string> = `${TPattern}`;

type DefaultData<
  TPattern extends string = string,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> = SchemaData<PatternData<TPattern>, TOptional, TNullable>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface StringSchema<
  TPattern extends string = string,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<PatternData<TPattern>, TOptional, TNullable, TContext> {
  apply<
    TNextPattern extends TPattern = TPattern,
    TDefaultValue extends DefaultData<TPattern, TOptional, TNullable> = DefaultData<TPattern, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TNextPattern[], TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TNextPattern, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  clone<
    TNextPattern extends TPattern = TPattern,
    TDefaultValue extends DefaultData<TPattern, TOptional, TNullable> = DefaultData<TPattern, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TNextPattern[], TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TNextPattern, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  mutate<
    TReturned extends StringSchema<TPattern> = StringSchema<TPattern>,
  >(
    cb: {
      (schema: StringSchema<TPattern, TOptional, TNullable, TContext>): TReturned;
    },
  ): TReturned;

  context<
    TNextContext extends SafetyType<TContext, Record<string, any>, object & Partial<TContext>> = TContext,
  >(): StringSchema<TPattern, TOptional, TNullable, SafetyType<TContext, object> & TNextContext>;

  optional(): StringSchema<TPattern, true, TNullable, TContext>;

  notOptional(
    message?: string,
  ): StringSchema<TPattern, false, TNullable, TContext>;

  nullable(): StringSchema<TPattern, TOptional, true, TContext>;

  notNullable(
    message?: string,
  ): StringSchema<TPattern, TOptional, false, TContext>;

  required(
    message?: string,
  ): StringSchema<TPattern, false, false, TContext>;

  notRequired(): StringSchema<TPattern, true, true, TContext>;

  default(
    defaultData: DefaultData<TPattern, TOptional, TNullable>,
  ): StringSchema<TPattern, TOptional, TNullable, TContext>;

  resetDefault(): StringSchema<TPattern, TOptional, TNullable, TContext>;
}

export default class StringSchema<
  TPattern extends string = string,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<PatternData<TPattern>, TOptional, TNullable, TContext> {
  protected override patternValue: null | string[] = null;

  protected override defaultValue: DefaultValue<PatternData<TPattern>, TOptional, TNullable> = null;

  protected override selfConstructor: {
    new (): StringSchema;
  } = StringSchema;

  protected override selfRich() {
    return;
  }

  public static create<
    TContext extends Record<string, any> = object,
  >(): StringSchema<string, false, false, TContext> {
    const schema = new StringSchema<string, false, false, TContext>();

    return schema;
  }

  public override getDefault(): DefaultData<TPattern, TOptional, TNullable> {
    const defaultData = super.getDefaultBase();

    if (defaultData) {
      return defaultData.data;
    }
    else {
      if (this.defaultValue?.data != null) {
        return this.defaultValue.data;
      }
      else {
        return '' as DefaultData<TPattern, TOptional, TNullable>;
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