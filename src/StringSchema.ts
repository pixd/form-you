import BaseSchema, { RejectType, SchemaCloneProps } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from './error-messages';
import { ValidationError, PredefinedValidationTestName } from './ValidationError';

type CloneStringSchema<
  TRejectUndefined extends null | string = null | string,
  TRejectNull extends null | string = null | string,
> = BaseSchema<string, RejectType<TRejectUndefined>, RejectType<TRejectNull>>;

// // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
// export default interface StringSchema<
//   TOptional extends boolean = false,
//   TNullable extends boolean = false,
// > extends StringSchema<string, TOptional, TNullable> {}

export default class StringSchema<
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> extends BaseSchema<string, TOptional, TNullable> {

  public clone<
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(props?: SchemaCloneProps<TRejectUndefined, TRejectNull>): CloneStringSchema<TRejectUndefined, TRejectNull> {
    const schema = new StringSchema(this.shape);

    return this.rich(schema, props);
  }

  static create(): StringSchema {
    return new StringSchema(null);
  }

  override validate<
    TValue extends any = any,
  >(value: TValue, path?: string): TValue {
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
