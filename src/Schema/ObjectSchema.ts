import BaseSchema, { DefaultValue, RejectType, SafetyType, SchemaCloneProps,
  SchemaData } from './BaseSchema';
import StringSchema from './StringSchema';
import errorMessages, { prepareErrorMessage } from '../error-messages';
import { AnySchema, PossibleShapePath, RefinedSchema, ShapePathSchema,
  SchemaContextType, SchemaDataType, Simplify } from '../types';
import { Intersection } from '../types.tools';
import ValidationError, { PredefinedValidationTestName } from '../ValidationError';

export type Shape = {
  [key in string]: AnySchema;
};

type ShapeControl<
  TShape extends Shape = Shape,
  TNeverShape extends any = any,
  TEmptyShape extends any = TNeverShape,
> = [TShape] extends [never]
  ? TNeverShape
  : [keyof TShape] extends [never]
    ? TEmptyShape
    : TShape;

type ShapePattern<
  TShape extends Shape = Shape,
> = [TShape] extends [never]
  ? Record<string, any>
  : Record<string, any> & Partial<TShape>

type DefinedShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends SchemaDataType<TShape[TKey]>
    ? never
    : TKey;
}[keyof TShape];

type OptionalShapeProps<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]-?: undefined extends SchemaDataType<TShape[TKey]>
    ? TKey
    : never;
}[keyof TShape];

type ShapeDataType<
  TShape extends Shape = Shape,
> = {
  [TKey in keyof TShape]: SchemaDataType<Exclude<TShape[TKey], undefined>>;
};

export type ShapeData<
  TShape extends Shape = Shape,
> = Simplify<(
  & ShapeDataType<Pick<TShape, DefinedShapeProps<TShape>>>
  & Partial<ShapeDataType<Pick<TShape, OptionalShapeProps<TShape>>>>
)>;

type ShapeContext<
  TShape extends Partial<Shape> = Shape,
  TContext extends object = object,
> = Intersection<SchemaContextType<Exclude<TShape[keyof TShape], undefined>>> & TContext;

type ContextMatchedShape<
  TShape extends Partial<Shape> = Shape,
  TContext extends object = object,
> = [TShape] extends [never]
  ? Record<string, any>
  : {
      [TKey in keyof TShape]?: TShape[TKey] extends StringSchema<infer TS, infer TO, infer TN>
        ? StringSchema<TS, TO, TN, Partial<ShapeContext<TShape, TContext>>>
        : TShape[TKey] extends ObjectSchema<infer TS, infer TO, infer TN>
          ? ObjectSchema<TS, TO, TN, Partial<ShapeContext<TShape, TContext>>>
          : never;
    };

type DefaultData<
  TShape extends Shape = Shape,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> = SchemaData<ShapeData<ShapeControl<TShape, Record<string, any>>>, TOptional, TNullable>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface ObjectSchema<
  TShape extends Shape = never,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends object = object,
> extends BaseSchema<ShapeData<ShapeControl<TShape, Record<string, any>>>, TOptional, TNullable, TContext> {
  apply<
    TShapePattern extends ShapePattern<TShape> = TShape,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: SchemaCloneProps<TShapePattern & ContextMatchedShape<ShapeControl<TShapePattern, Record<string, any>>, TContext>, TDefaultValue, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<ShapeControl<ShapeControl<TShape, object> & TShapePattern, never>, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  clone<
    TShapePattern extends ShapePattern<TShape> = TShape,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: SchemaCloneProps<TShapePattern & ContextMatchedShape<ShapeControl<TShapePattern, Record<string, any>>, TContext>, TDefaultValue, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<ShapeControl<ShapeControl<TShape, object> & TShapePattern, never>, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  mutate<
    TReturned extends ObjectSchema<TShape> = ObjectSchema<TShape>,
  >(
    cb: {
      (
        schema: ObjectSchema<TShape, TOptional, TNullable, TContext>,
      ): TReturned;
    },
  ): TReturned;

  context<
    TNextContext extends SafetyType<TContext, object, object & Partial<TContext>> = TContext,
  >(): ObjectSchema<TShape, TOptional, TNullable, SafetyType<TContext, object> & TNextContext>;

  optional(): ObjectSchema<TShape, true, TNullable, TContext>;

  notOptional(
    message?: string,
  ): ObjectSchema<TShape, false, TNullable, TContext>;

  nullable(): ObjectSchema<TShape, TOptional, true, TContext>;

  notNullable(
    message?: string,
  ): ObjectSchema<TShape, TOptional, false, TContext>;

  required(
    message?: string,
  ): ObjectSchema<TShape, false, false, TContext>;

  notRequired(): ObjectSchema<TShape, true, true, TContext>;

  default(
    defaultData: DefaultData<TShape, TOptional, TNullable>,
  ): ObjectSchema<TShape, TOptional, TNullable, TContext>;

  resetDefault(): ObjectSchema<TShape, TOptional, TNullable, TContext>;
}

export default class ObjectSchema<
  TShape extends Shape = never,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends object = object,
> extends BaseSchema<ShapeData<ShapeControl<TShape, Record<string, any>>>, TOptional, TNullable, TContext> {
  public override Shape__TypeRef = {} as ShapeControl<TShape, Record<string, any>>;

  protected override shapeValue: null | Shape = null;

  protected override defaultValue: DefaultValue<ShapeData<ShapeControl<TShape, Record<string, any>>>, TOptional, TNullable> = null;

  protected override selfConstructor: {
    new (): ObjectSchema;
  } = ObjectSchema;

  protected override selfRich() {
    return;
  }

  public static create<
    TShape extends Shape = never,
  >(
    shape?: TShape & ContextMatchedShape<ShapeControl<TShape, Record<string, any>>>,
  ): ObjectSchema<ShapeControl<TShape, never>, false, false, ShapeContext<TShape>> {
    const schema = new ObjectSchema();

    schema.shapeValue = shape ?? null;

    // @ts-expect-error
    return schema;
  }

  public concat<
    TShapePattern extends ShapePattern<TShape> = TShape,
  >(
    shape: TShapePattern & ContextMatchedShape<ShapeControl<TShapePattern, Record<string, any>>, TContext>,
  ): ObjectSchema<ShapeControl<ShapeControl<TShape, object> & TShapePattern, never>, TOptional, TNullable, ShapeContext<TShapePattern, TContext>> {
    const shapeValue = {
      ...this.shapeValue,
      ...shape,
    };

    let defaultValue = this.defaultValue;

    if (this.defaultValue?.data != null) {
      const defaultData = Object.keys(shape).reduce((defaultData, key) => {
        delete defaultData[key];
        return defaultData;
      }, { ...this.defaultValue.data });
      defaultValue = { data: defaultData };
    }

    const apply = {
      shapeValue,
      defaultValue,
    };

    // @ts-expect-error
    return this.apply(apply);
  }

  public reach<
    TPath extends PossibleShapePath<TShape> = PossibleShapePath<TShape>,
  >(
    path: TPath,
  ): ShapePathSchema<TShape, TPath> {
    if (this.shapeValue == null) {
      throw new Error('ObjectSchema have no shape');
    }
    else {
      const [firstPath, ...paths] = path.split('.');

      if (!(this.shapeValue[firstPath] instanceof BaseSchema)) {
        throw new Error('The value found at `' + firstPath + '` property is not a Schema');
      }
      else {
        const nextSchema = this.shapeValue[firstPath];
        if (paths.length === 0) {
          // @ts-expect-error
          return nextSchema;
        }
        else if ('reach' in nextSchema && typeof nextSchema.reach === 'function') {
          if (nextSchema.shapeValue) {
            // @ts-expect-error
            return nextSchema.reach(paths.join('.'));
          }
          else {
            throw new Error('The Schema found at `' + firstPath + '` property have no shape');
          }
        }
        else {
          throw new Error('The Schema found at `' + firstPath + '` property have no `reach` method');
        }
      }
    }
  }

  public refine<
    TPath extends PossibleShapePath<TShape> = never,
    TReturned extends ShapePathSchema<TShape, TPath> = never,
  >(
    path: TPath,
    cb: {
      (
        schema: ShapePathSchema<TShape, TPath>,
      ): TReturned;
    }
  ): ObjectSchema<RefinedSchema<TShape, TPath, TReturned>, TOptional, TNullable, TContext> {
    if (this.shapeValue == null) {
      throw new Error('ObjectSchema have no shape');
    }
    else {
      const [firstPath, ...paths] = path.split('.');

      if (!(this.shapeValue[firstPath] instanceof BaseSchema)) {
        throw new Error('The value found at `' + firstPath + '` property is not a Schema');
      }
      else {
        const nextSchema = this.shapeValue[firstPath];
        if (paths.length === 0) {
          // @ts-expect-error
          return this.concat({ [firstPath]: cb(nextSchema) });
        }
        else if ('refine' in nextSchema && typeof nextSchema.refine === 'function') {
          if (nextSchema.shapeValue) {
            // @ts-expect-error
            return this.concat({ [firstPath]: nextSchema.refine(paths.join('.'), cb) });
          }
          else {
            throw new Error('The Schema found at `' + firstPath + '` property have no shape');
          }
        }
        else {
          throw new Error('The Schema found at `' + firstPath + '` property have no `refine` method');
        }
      }
    }
  }

  public override getDefault(): DefaultData<TShape, TOptional, TNullable> {
    const defaultValue = super.getDefaultValueBase();

    if (defaultValue) {
      return defaultValue.data;
    }
    else {
      const defaultData = getDefaultData(this.shapeValue);
      if (this.defaultValue?.data != null) {
        return {
          ...defaultData,
          ...this.defaultValue.data,
        };
      }
      else {
        // @ts-expect-error
        return defaultData;
      }
    }
  }

  public override validate<
    TValue extends any = any,
  >(
    value: TValue,
    path?: string,
  ): TValue {
    super.validate(value, path);

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

function getDefaultData(
  shapeValue: null | Shape,
) {
  return Object.entries(shapeValue ?? {})
    .reduce((defaultValue, [key, schema]) => {
      defaultValue[key] = schema.getDefault();
      return defaultValue;
    }, {});
}
