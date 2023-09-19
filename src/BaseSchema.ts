import errorMessages, { prepareErrorMessage } from './error-messages';
import { _ } from './types';
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

// function undefinedTest(message: string, value: any) {
//   if (value !== undefined) {
//     throw new ValidationError(
//       message,
//       PredefinedValidationTestName.$ANY_NOT_UNDEFINED,
//       value,
//     );
//   }
// }

// function notUndefinedTest(message: string, value: any) {
//   if (value === undefined) {
//     throw new ValidationError(
//       message,
//       PredefinedValidationTestName.$ANY_UNDEFINED,
//       value,
//     );
//   }
// }

// function nullTest(message: string, value: any) {
//   if (value !== null) {
//     throw new ValidationError(
//       message,
//       PredefinedValidationTestName.$ANY_NOT_NULL,
//       value,
//     );
//   }
// }

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

export type SchemaCloneProps<
  TRejectUndefined extends null | string = null | string,
  TRejectNull extends null | string = null | string,
> = {
  rejectUndefined?: TRejectUndefined;
  rejectNull?: TRejectNull;
};

type SchemaData<
  TData extends any = any,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> =
  | TData
  | (TOptional extends true ? undefined : never)
  | (TNullable extends true ? null : never);

export type RejectType<
  TSource extends null | string = null | string,
> = TSource extends string ? false : true;

type CloneBaseSchema<
  TData extends any = any,
  TRejectUndefined extends null | string = null | string,
  TRejectNull extends null | string = null | string,
> = BaseSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>>;

export default abstract class BaseSchema<
  TData extends any = any,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> {
  protected rejectUndefined: null | string = '';

  protected rejectNull: null | string = '';

  protected definitionTests = new Map<string, Test>();

  public Data__TypeRef = undefined as _<SchemaData<TData, TOptional, TNullable>>;

  protected shape: any;

  constructor(shape: any) {
    this.shape = shape;
  }

  abstract clone<
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(props?: SchemaCloneProps<TRejectUndefined, TRejectNull>): CloneBaseSchema<TData, TRejectUndefined, TRejectNull>

  protected rich<
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(schema: BaseSchema, props?: SchemaCloneProps<TRejectUndefined, TRejectNull>): CloneBaseSchema<TData, TRejectUndefined, TRejectNull> {
    schema.rejectUndefined = this.rejectUndefined;
    schema.rejectNull = this.rejectNull;
    schema.definitionTests = new Map(this.definitionTests);

    if (props) {
      Object.assign(schema, props);
    }

    return schema as CloneBaseSchema<TData, TRejectUndefined, TRejectNull>;
  }

  optional(): BaseSchema<TData, true, TNullable> {
    return this.clone({
      rejectUndefined: null,
    });
  }

  notOptional(message?: string): BaseSchema<TData, false, TNullable> {
    return this.clone({
      rejectUndefined: message ?? '',
    });
  }

  nullable(): BaseSchema<TData, TOptional, true> {
    return this.clone({
      rejectNull: null,
    });
  }

  notNullable(message?: string): BaseSchema<TData, TOptional, false> {
    return this.clone({
      rejectNull: message ?? '',
    });
  }

  required(message?: string): BaseSchema<TData, false, false> {
    return this.clone({
      rejectUndefined: message ?? '',
      rejectNull: message ?? '',
    });
  }

  notRequired(): BaseSchema<TData, true, true> {
    return this.clone({
      rejectUndefined: null,
      rejectNull: null,
    });
  }

  // undefined(message?: string): this {
  //   const schema = this.clone();
  //
  //   schema.definitionTests.set(
  //     PredefinedValidationTestName.$ANY_UNDEFINED,
  //     [message || errorMessages.MUST_BE_UNDEFINED_MESSAGE, undefinedTest],
  //   );
  //
  //   return schema as this;
  // }

  // null(message?: string): this {
  //   const schema = this.clone();
  //
  //   schema.definitionTests.set(
  //     PredefinedValidationTestName.$ANY_NULL,
  //     [message || errorMessages.MUST_BE_NULL_MESSAGE, nullTest],
  //   );
  //
  //   return schema as this;
  // }

  validate<
    TValue extends any = any,
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

    return value;
  }
}
