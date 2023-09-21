import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { ValidationError, PredefinedValidationTestName } from './ValidationError';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface StringSchema<
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends object = any,
> extends BaseSchema<string, TOptional, TNullable, TContext> {
  rich<
    TInnerData extends string = string,
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(
    schema: BaseSchema,
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): StringSchema<RejectType<TRejectUndefined>, RejectType<TRejectNull>, TContext>;

  optional(): StringSchema<true, TNullable, TContext>;

  notOptional(
    message?: string,
  ): StringSchema<false, TNullable>;

  nullable(): StringSchema<TOptional, true, TContext>;

  notNullable(
    message?: string,
  ): StringSchema<TOptional, false, TContext>;

  required(
    message?: string,
  ): StringSchema<false, false, TContext>;

  notRequired(): StringSchema<true, true, TContext>;

  default(
    defaultValue: null | string,
  ): StringSchema<TOptional, TNullable, TContext>;
}

export default class StringSchema<
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends object = any,
> extends BaseSchema<string, TOptional, TNullable, TContext> {
  protected override defaultValue: null | string = null;

  public static create<
    TContext extends object = any,
  >(): StringSchema<false, false, TContext> {
    return new StringSchema<false, false, TContext>();
  }

  public clone<
    TInnerData extends string = string,
    TRejectUndefined extends null | string = TOptional extends true ? null : string,
    TRejectNull extends null | string = TNullable extends true ? null : string,
  >(
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): StringSchema<RejectType<TRejectUndefined>, RejectType<TRejectNull>, TContext> {
    const schema = StringSchema.create();

    return this.rich(schema, props);
  }

  public override getDefault(): string {
    if (this.defaultValue == null) {
      return '';
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
