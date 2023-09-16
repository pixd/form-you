import errorMessages, { prepareErrorMessage } from './error-messages';
import { AnyObject } from './types';
import { ValidationError, PredefinedValidationTestName } from './ValidationError';

function rejectUndefinedTest(message: string, value: any) {
  if (value === undefined) {
    throw new ValidationError(
      message,
      PredefinedValidationTestName.$ANY_REJECT_UNDEFINED,
      value,
    );
  }
}

function rejectNullTest(message: string, value: any) {
  if (value === null) {
    throw new ValidationError(
      message,
      PredefinedValidationTestName.$ANY_REJECT_NULL,
      value,
    );
  }
}

function undefinedTest(message: string, value: any) {
  if (value !== undefined) {
    throw new ValidationError(
      message,
      PredefinedValidationTestName.$ANY_NOT_UNDEFINED,
      value,
    );
  }
}

// function notUndefinedTest(message: string, value: any) {
//   if (value === undefined) {
//     throw new ValidationError(
//       message,
//       PredefinedValidationTestName.$ANY_UNDEFINED,
//       value,
//     );
//   }
// }

function nullTest(message: string, value: any) {
  if (value !== null) {
    throw new ValidationError(
      message,
      PredefinedValidationTestName.$ANY_NOT_NULL,
      value,
    );
  }
}

// function notNullTest(message: string, value: any) {
//   if (value === null) {
//     throw new ValidationError(
//       message,
//       PredefinedValidationTestName.$ANY_NULL,
//       value,
//     );
//   }
// }

type TestFn = {
  (message: string, value: any): void;
};

type Test = [string, TestFn];

type SchemaCloneProps = {
  rejectUndefined: null | string
  rejectNull: null | string
};

export default class ObjectSchema<
  TType extends undefined | null | AnyObject = AnyObject,
> {
  private rejectUndefined: null | string = '';

  private rejectNull: null | string = '';

  private definitionTests = new Map<string, Test>();

  static create() {
    return new ObjectSchema();
  }

  clone(props?: Partial<SchemaCloneProps>): ObjectSchema<TType> {
    const schema = ObjectSchema.create();

    schema.rejectUndefined = this.rejectUndefined;
    schema.rejectNull = this.rejectNull;
    schema.definitionTests = new Map(this.definitionTests);

    if (props) {
      Object.assign(schema, props);
    }

    return schema;
  }

  optional(): ObjectSchema<undefined | TType> {
    return this.clone({
      rejectUndefined: null,
    });
  }

  notOptional(message?: string): ObjectSchema<Exclude<TType, undefined>> {
    return this.clone({
      rejectUndefined: message ?? '',
    });
  }

  nullable(): ObjectSchema<null | TType> {
    return this.clone({
      rejectNull: null,
    });
  }

  notNullable(message?: string): ObjectSchema<Exclude<TType, null>> {
    return this.clone({
      rejectNull: message ?? '',
    });
  }

  required(message?: string) {
    return this.clone({
      rejectUndefined: message ?? '',
      rejectNull: message ?? '',
    });
  }

  notRequired() {
    return this.clone({
      rejectUndefined: null,
      rejectNull: null,
    });
  }

  undefined(message?: string): this {
    const schema = this.clone();

    schema.definitionTests.set(
      PredefinedValidationTestName.$ANY_UNDEFINED,
      [message || errorMessages.MUST_BE_UNDEFINED_MESSAGE, undefinedTest],
    );

    return schema as this;
  }

  null(message?: string): this {
    const schema = this.clone();

    schema.definitionTests.set(
      PredefinedValidationTestName.$ANY_NULL,
      [message || errorMessages.MUST_BE_NULL_MESSAGE, nullTest],
    );

    return schema as this;
  }

  addMethod<
    TMethodName extends string,
    TFn extends (this: ObjectSchema<TType>, ...args: any[]) => any,
  >(name: TMethodName, fn: TFn): ObjectSchema<TType> & { [key in TMethodName]: TFn } {
    const extended = new ObjectSchema() as any;
    extended[name] = fn;
    return extended;
  }

  validate<
    TValue extends any,
  >(value: TValue, path?: string): TValue {
    if (this.rejectUndefined != null) {
      rejectUndefinedTest(
        prepareErrorMessage(this.rejectUndefined || errorMessages.IS_NOT_OPTIONAL_MESSAGE, path),
        value,
      );
    }

    if (this.rejectNull != null) {
      rejectNullTest(
        prepareErrorMessage(this.rejectNull || errorMessages.IS_NOT_NULLABLE_MESSAGE, path),
        value,
      );
    }

    this.definitionTests.forEach(([message, test]) => {
      test(prepareErrorMessage(message, path), value);
    });

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
