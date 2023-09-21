import errorMessages, { prepareErrorMessage } from './error-messages';
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
  TData extends any = any,
  TRejectUndefined extends null | string = null | string,
  TRejectNull extends null | string = null | string,
> = {
  defaultValue?: TData;
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

export default abstract class BaseSchema<
  TData extends any = any,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
> {
  public Data__TypeRef = undefined as SchemaData<TData, TOptional, TNullable>;

  protected abstract defaultValue: any;

  protected rejectUndefined: null | string = '';

  protected rejectNull: null | string = '';

  protected definitionTests = new Map<string, Test>();  abstract clone<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): BaseSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>>

  protected rich<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(
    schema: BaseSchema,
    props?: SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>,
  ): BaseSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>> {
    schema.defaultValue = this.defaultValue;
    schema.rejectUndefined = this.rejectUndefined;
    schema.rejectNull = this.rejectNull;
    schema.definitionTests = new Map(this.definitionTests);

    if (props) {
      Object.assign(schema, props);
    }

    return schema as BaseSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>>;
  }

  optional(): BaseSchema<TData, true, TNullable> {
    return this.clone({
      rejectUndefined: null,
    });
  }

  notOptional(
    message?: string,
  ): BaseSchema<TData, false, TNullable> {
    return this.clone({
      rejectUndefined: message ?? '',
    });
  }

  nullable(): BaseSchema<TData, TOptional, true> {
    return this.clone({
      rejectNull: null,
    });
  }

  notNullable(
    message?: string,
  ): BaseSchema<TData, TOptional, false> {
    return this.clone({
      rejectNull: message ?? '',
    });
  }

  required(
    message?: string,
  ): BaseSchema<TData, false, false> {
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

  default(
    defaultValue: TData,
  ): BaseSchema<TData, TOptional, TNullable> {
    return this.clone({
      defaultValue,
    });
  }

  abstract getDefault(): TData

  validate<
    TValue extends any = any,
  >(
    value: TValue,
    path?: string,
  ): TValue {
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
