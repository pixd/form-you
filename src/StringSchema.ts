import BaseSchema, { RejectType, SafetyType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import ValidationError, { PredefinedValidationTestName } from './ValidationError';

type PatternData<TPattern extends string = string> = `${TPattern}`;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface StringSchema<
  TPattern extends string = string,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<PatternData<TPattern>, TOptional, TNullable, TContext> {
  apply<
    TNextPattern extends TPattern = TPattern,
    TDefaultValue extends PatternData<TPattern> = PatternData<TPattern>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TNextPattern[], TDefaultValue, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TNextPattern, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  clone<
    TNextPattern extends TPattern = TPattern,
    TDefaultValue extends PatternData<TPattern> = PatternData<TPattern>,
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
    defaultValue: null | PatternData<TPattern>,
  ): StringSchema<TPattern, TOptional, TNullable, TContext>;
}

export default class StringSchema<
  TPattern extends string = string,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<PatternData<TPattern>, TOptional, TNullable, TContext> {
  protected override patternValue: null | string[] = null;

  protected override defaultValue: null | PatternData<TPattern> = null;

  protected override selfConstructor: {
    new (): StringSchema;
  } = StringSchema;

  protected override selfRich() {
    return;
  }

  public static create<
    TPattern extends string = string,
    TContext extends Record<string, any> = object,
  >(
    pattern?: TPattern[],
  ): StringSchema<TPattern, false, false, TContext> {
    const schema = new StringSchema<TPattern, false, false, TContext>();

    schema.patternValue = pattern ?? null;

    return schema;
  }

  public refine<
    TNextPattern extends TPattern = TPattern,
  >(
    patternValue: TNextPattern[],
  ): StringSchema<TNextPattern, TOptional, TNullable, TContext> {
    const defaultValue = patternValue.includes(this.defaultValue as TNextPattern)
      ? this.defaultValue
      : null;

    return this.apply({
      defaultValue,
      patternValue,
    });
  }

  public override getDefault(): PatternData<TPattern> {
    if (this.defaultValue != null) {
      return this.defaultValue;
    }
    else if (this.patternValue) {
      return (this.patternValue[0] ?? '') as PatternData<TPattern>;
    }
    else {
      return '' as PatternData<TPattern>;
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
