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
  TRejectUndefined extends null | string = never,
  TRejectNull extends null | string = never,
> = {
  defaultValue: null | TData;
  rejectUndefined: TRejectUndefined;
  rejectNull: TRejectNull;
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
  TSource extends null | string = never,
  TDefault extends boolean = boolean,
> = TSource | object extends object
  ? TDefault
  : TSource extends string
    ? false
    : TSource extends null
      ? true
      : TDefault;

export default abstract class BaseSchema<
  TData extends any = any,
  TOptional extends boolean = boolean,
  TNullable extends boolean = boolean,
  TContext extends Record<string, any> = Record<string, never>,
> {
  public Data__TypeRef = undefined as SchemaData<TData, TOptional, TNullable>;

  public Context__TypeRef = {};

  protected contentValue: any = null;

  protected abstract defaultValue: any;

  protected rejectUndefined: null | string = '';

  protected rejectNull: null | string = '';

  protected definitionTests = new Map<string, Test>();

  public content(contentValue: any) {
    this.contentValue = contentValue;
  }

  abstract clone<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: Partial<SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>>,
  ): BaseSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>

  protected rich<
    TInnerData extends TData = TData,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    schema: BaseSchema,
    props?: Partial<SchemaCloneProps<TInnerData, TRejectUndefined, TRejectNull>>,
  ): BaseSchema<TData, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext> {
    schema.contentValue = this.contentValue;
    schema.defaultValue = this.defaultValue;
    schema.rejectUndefined = this.rejectUndefined;
    schema.rejectNull = this.rejectNull;
    schema.definitionTests = new Map(this.definitionTests);

    if (props) {
      Object.assign(schema, props);
    }

    return schema as BaseSchema<TData, RejectType<TRejectUndefined>, RejectType<TRejectNull>, TContext>;
  }

  public optional(): BaseSchema<TData, true, TNullable, TContext> {
    return this.clone({
      rejectUndefined: null,
    });
  }

  public notOptional(
    message?: string,
  ): BaseSchema<TData, false, TNullable, TContext> {
    return this.clone({
      rejectUndefined: message ?? '',
    });
  }

  public nullable(): BaseSchema<TData, TOptional, true, TContext> {
    return this.clone({
      rejectNull: null,
    });
  }

  public notNullable(
    message?: string,
  ): BaseSchema<TData, TOptional, false, TContext> {
    return this.clone({
      rejectNull: message ?? '',
    });
  }

  public required(
    message?: string,
  ): BaseSchema<TData, false, false, TContext> {
    return this.clone({
      rejectUndefined: message ?? '',
      rejectNull: message ?? '',
    });
  }

  public notRequired(): BaseSchema<TData, true, true, TContext> {
    return this.clone({
      rejectUndefined: null,
      rejectNull: null,
    });
  }

  // public undefined(message?: string): this {
  //   const schema = this.clone();
  //
  //   schema.definitionTests.set(
  //     PredefinedValidationTestName.$ANY_UNDEFINED,
  //     [message || errorMessages.MUST_BE_UNDEFINED_MESSAGE, undefinedTest],
  //   );
  //
  //   return schema as this;
  // }

  // public null(message?: string): this {
  //   const schema = this.clone();
  //
  //   schema.definitionTests.set(
  //     PredefinedValidationTestName.$ANY_NULL,
  //     [message || errorMessages.MUST_BE_NULL_MESSAGE, nullTest],
  //   );
  //
  //   return schema as this;
  // }

  public default(
    defaultValue: null | TData,
  ): BaseSchema<TData, TOptional, TNullable, TContext> {
    return this.clone({
      defaultValue,
    });
  }

  public abstract getDefault(): TData

  public validate<
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
