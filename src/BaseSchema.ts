import errorMessages, { prepareErrorMessage } from './error-messages';
import ValidationError, { PredefinedValidationTestName } from './ValidationError';

function rejectUndefinedTest(
  message: string,
  value: any,
): void {
  if (value === undefined) {
    throw new ValidationError(
      message,
      PredefinedValidationTestName.$ANY_REJECT_UNDEFINED,
      value,
    );
  }
}

function rejectNullTest(
  message: string,
  value: any,
): void {
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
  TPatternValue extends any = any,
  TDefaultValue extends any = any,
  TRejectUndefined extends null | string = null | string,
  TRejectNull extends null | string = null | string,
> = {
  patternValue?: TPatternValue;
  defaultValue?: null | { data: TDefaultValue };
  rejectUndefined?: TRejectUndefined;
  rejectNull?: TRejectNull;
};

export type SchemaData<
  TData extends any = any,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> =
  | TData
  | (null | TOptional extends null
    ? never
    : TOptional extends true
      ? undefined
      : never
  )
  | (null | TNullable extends null
    ? never
    : TNullable extends true
      ? null
      : never
    );

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

export type SafetyType<TCheck, TFalse, TTrue = TCheck> = null | TCheck extends null ? TFalse : TTrue;

export default abstract class BaseSchema<
  TData extends any = any,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> {
  public Data__TypeRef = undefined as SchemaData<TData, TOptional, TNullable>;

  public Context__TypeRef = {} as TContext;

  protected patternValue: any = null;

  protected abstract defaultValue: null | { data: TData };

  protected rejectUndefined: null | string = '';

  protected rejectNull: null | string = '';

  protected definitionTests = new Map<string, Test>();

  protected mutating = false;

  protected abstract selfConstructor: {
    new (): BaseSchema;
  };

  protected pattern(
    pattern: any,
  ): BaseSchema {
    return this.apply({
      patternValue: pattern,
    });
  }

  public apply(
    props?: SchemaCloneProps<any, TData>,
  ): BaseSchema {
    const schema = this.mutating ? this : new (this.selfConstructor)();

    return this.rich(schema, props);
  }

  public clone(
    props?: SchemaCloneProps<any, TData>,
  ): BaseSchema {
    const schema = new (this.selfConstructor)();

    return this.rich(schema, props);
  }

  protected rich(
    schema: BaseSchema,
    props?: SchemaCloneProps<any, TData>,
  ): BaseSchema {
    schema.patternValue = this.patternValue;
    schema.defaultValue = this.defaultValue;
    schema.rejectUndefined = this.rejectUndefined;
    schema.rejectNull = this.rejectNull;
    schema.definitionTests = new Map(this.definitionTests);

    if (props) {
      Object.assign(schema, props);
    }

    this.selfRich(schema, props ?? {});

    return schema;
  }

  protected abstract selfRich(
    schema: BaseSchema,
    props: SchemaCloneProps<any, TData>,
  ): void;

  public mutate(
    cb: {
      (schema: BaseSchema): BaseSchema;
    },
  ): BaseSchema {
    this.mutating = true;

    const schema = cb(this);

    this.mutating = false;

    return schema;
  }

  public context(): BaseSchema {
    return this as BaseSchema;
  }

  public optional(): BaseSchema {
    return this.apply({
      rejectUndefined: null,
    });
  }

  public notOptional(
    message?: string,
  ): BaseSchema {
    return this.apply({
      rejectUndefined: message ?? '',
    });
  }

  public nullable(): BaseSchema {
    return this.apply({
      rejectNull: null,
    });
  }

  public notNullable(
    message?: string,
  ): BaseSchema {
    return this.apply({
      rejectNull: message ?? '',
    });
  }

  public required(
    message?: string,
  ): BaseSchema {
    return this.apply({
      rejectUndefined: message ?? '',
      rejectNull: message ?? '',
    });
  }

  public notRequired(): BaseSchema {
    return this.apply({
      rejectUndefined: null,
      rejectNull: null,
    });
  }

  // public undefined(message?: string): BaseSchema {
  //   const schema = this.apply();
  //
  //   schema.definitionTests.set(
  //     PredefinedValidationTestName.$ANY_UNDEFINED,
  //     [message || errorMessages.MUST_BE_UNDEFINED_MESSAGE, undefinedTest],
  //   );
  //
  //   return schema as this;
  // }

  // public null(message?: string): BaseSchema {
  //   const schema = this.apply();
  //
  //   schema.definitionTests.set(
  //     PredefinedValidationTestName.$ANY_NULL,
  //     [message || errorMessages.MUST_BE_NULL_MESSAGE, nullTest],
  //   );
  //
  //   return schema as this;
  // }

  public default(
    data: TData,
  ): BaseSchema {
    return this.apply({
      defaultValue: { data },
    });
  }

  public resetDefault(): BaseSchema {
    return this.apply({
      defaultValue: null,
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

  // TODO This is tor testing purposes only and should be removed
  public testContext(_cb: (context: TContext) => void): this {
    // @ts-ignore
    return;
  }
}
