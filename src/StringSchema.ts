import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { ValidationError, PredefinedValidationTestName } from './ValidationError';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface StringSchema<
  TData extends string = string,
  TOptional extends boolean = boolean,
  TNullable extends boolean = boolean,
  TContext extends Record<string, any> = Record<string, never>,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  rich<
    TInnerData extends string = string,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    schema: BaseSchema,
    props?: Partial<SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

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
  TContext extends Record<string, any> = Record<string, never>,
> extends BaseSchema<TData, TOptional, TNullable, TContext> {
  protected override contentValue: null | string[] = null;

  protected override defaultValue: null | TData = null;

  public static create<
    TValue extends string = string,
    TContext extends Record<string, any> = Record<string, never>,
  >(values?: TValue[]): StringSchema<TValue, false, false, TContext> {
    const schema = new StringSchema<TValue, false, false, TContext>();

    schema.contentValue = values ?? null;

    return schema;
  }

  public clone<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>>,
  ): StringSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext> {
    const schema = StringSchema.create();

    return this.rich(schema, props);
  }

  public override getDefault(): TData {
    if (this.defaultValue != null) {
      return this.defaultValue;
    }
    else if (this.contentValue) {
      return (this.contentValue[0] ?? '') as TData;
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
