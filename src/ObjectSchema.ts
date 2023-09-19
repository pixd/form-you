import errorMessages, { prepareErrorMessage } from './error-messages';
import { _, AnyObject } from './types';
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

type SchemaCloneProps<
  TRejectUndefined extends null | string = null | string,
  TRejectNull extends null | string = null | string,
> = {
  rejectUndefined?: TRejectUndefined;
  rejectNull?: TRejectNull;
};

// type Shape<
//   TType extends AnyObject = AnyObject,
// > = {
//   [TKey in string]: ObjectSchema<TType[TKey]>;
// };

type Shape = {
  [key in string]: ObjectSchema<any, any, any>;
};

type DefinedShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends TShape[TKey]['Data__TypeRef']
    ? never
    : TKey;
}[keyof TShape];

type OptionalShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends TShape[TKey]['Data__TypeRef']
    ? TKey
    : never;
}[keyof TShape];

// eslint-disable-next-line @typescript-eslint/naming-convention
type _ShapeData<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: TShape[TKey]['Data__TypeRef'];
};

type ShapeData<
  TShape extends Shape = Shape,
> =
  & _ShapeData<Pick<TShape, DefinedShapeProps<TShape>>>
  & Partial<_ShapeData<Pick<TShape, OptionalShapeProps<TShape>>>>;

type SchemaData<
  TData extends AnyObject = AnyObject,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> =
  | TData
  | (TOptional extends true ? undefined : never)
  | (TNullable extends true ? null : never);

type CloneObjectSchema<
  TData extends AnyObject = AnyObject,
  TRejectUndefined extends null | string = null | string,
  TRejectNull extends null | string = null | string,
> = ObjectSchema<
  TData,
  TRejectUndefined extends string ? false : true,
  TRejectNull extends string ? false : true
>;

export default class ObjectSchema<
  TData extends AnyObject = AnyObject,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> {
  private rejectUndefined: null | string = '';

  private rejectNull: null | string = '';

  private definitionTests = new Map<string, Test>();

  private shape: Shape;

  public Data__TypeRef = undefined as _<SchemaData<TData, TOptional, TNullable>>;

  constructor(shape: Shape) {
    this.shape = shape;
  }

  static create<
    TShape extends Shape = Shape,
  >(shape: TShape): ObjectSchema<ShapeData<TShape>> {
    return new ObjectSchema(shape);
  }

  clone<
    TRejectUndefined extends null | string = null | string,
    TRejectNull extends null | string = null | string,
  >(props?: SchemaCloneProps<TRejectUndefined, TRejectNull>): CloneObjectSchema<TData, TRejectUndefined, TRejectNull> {
    const schema = ObjectSchema.create(this.shape);

    schema.rejectUndefined = this.rejectUndefined;
    schema.rejectNull = this.rejectNull;
    schema.definitionTests = new Map(this.definitionTests);

    if (props) {
      Object.assign(schema, props);
    }

    return schema as CloneObjectSchema<TData, TRejectUndefined, TRejectNull>;
  }

  optional(): ObjectSchema<TData, true, TNullable> {
    return this.clone({
      rejectUndefined: null,
    });
  }

  notOptional(message?: string): ObjectSchema<TData, false, TNullable> {
    return this.clone({
      rejectUndefined: message ?? '',
    });
  }

  nullable(): ObjectSchema<TData, TOptional, true> {
    return this.clone({
      rejectNull: null,
    });
  }

  notNullable(message?: string): ObjectSchema<TData, TOptional, false> {
    return this.clone({
      rejectNull: message ?? '',
    });
  }

  required(message?: string): ObjectSchema<TData, false, false> {
    return this.clone({
      rejectUndefined: message ?? '',
      rejectNull: message ?? '',
    });
  }

  notRequired(): ObjectSchema<TData, true, true> {
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
