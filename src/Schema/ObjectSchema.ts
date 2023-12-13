import BaseSchema, { DefaultValue, RejectType, SafetyType, SchemaCloneProps,
  SchemaData } from './BaseSchema';
import errorMessages, { prepareErrorMessage } from '../error-messages';
import { AnySchema, PossibleShapePath, RefinedSchema, ShapePathSchema,
  SchemaDataType, Simplify } from '../types';
import ValidationError, { PredefinedValidationTestName } from '../ValidationError';

export type Shape = {
  [key in string]: AnySchema;
};

type MergeShape<
  TShape extends Shape = Shape,
  TNextShape extends ConcatenatedShape<TShape> = ConcatenatedShape<TShape>,
> = SafetyType<TShape, Record<never, any>> & TNextShape;

type ConcatenatedShape<
  TShape extends Shape = Shape,
> = SafetyType<TShape, Shape, object & Partial<TShape>>

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
  [TKey in keyof TShape]-?: SchemaDataType<TShape[TKey]>;
};

export type ShapeData<
  TShape extends Shape = Shape,
> = [TShape] extends [never]
  ? Record<string, any>
  : [keyof TShape] extends [never]
    ? Record<never, any>
    : Simplify<(
        & ShapeDataType<Pick<TShape, DefinedShapeProps<TShape>>>
        & Partial<ShapeDataType<Pick<TShape, OptionalShapeProps<TShape>>>>
      )>;

type DefaultData<
  TShape extends Shape = Shape,
  TOptional extends boolean = false,
  TNullable extends boolean = false,
> = SchemaData<ShapeData<TShape>, TOptional, TNullable>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface ObjectSchema<
  TShape extends Shape = never,
  TOptional extends boolean = any,
  TNullable extends boolean = any,
  TContext extends Record<string, any> = object,
> extends BaseSchema<ShapeData<TShape>, TOptional, TNullable, TContext> {
  apply<
    TNextShape extends SafetyType<TShape, {}> = SafetyType<TShape, {}>,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: SchemaCloneProps<TNextShape, TDefaultValue, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TNextShape, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

  clone<
    TNextShape extends SafetyType<TShape, {}> = SafetyType<TShape, {}>,
    TDefaultValue extends DefaultData<TShape, TOptional, TNullable> = DefaultData<TShape, TOptional, TNullable>,
    TRejectUndefined extends null | string = never,
    TRejectNull extends null | string = never,
  >(
    props?: SchemaCloneProps<TNextShape, TDefaultValue, TRejectUndefined, TRejectNull>,
  ): ObjectSchema<TNextShape, RejectType<TRejectUndefined, TOptional>, RejectType<TRejectNull, TNullable>, TContext>;

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
    TNextContext extends SafetyType<TContext, Record<string, any>, object & Partial<TContext>> = TContext,
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
  TContext extends Record<string, any> = object,
> extends BaseSchema<ShapeData<TShape>, TOptional, TNullable, TContext> {
  public override Shape__TypeRef = {} as [TShape] extends [never] ? Record<never, any> : TShape;

  protected override shapeValue: null | Shape = null;

  protected override defaultValue: DefaultValue<ShapeData<TShape>, TOptional, TNullable> = null;

  protected override selfConstructor: {
    new (): ObjectSchema;
  } = ObjectSchema;

  protected override selfRich() {
    return;
  }

  public static create<
    TShape extends Shape = never,
    TContext extends Record<string, any> = object,
  >(
    shape?: TShape,
  ): ObjectSchema<TShape, false, false, TContext> {
    const schema = new ObjectSchema<TShape, false, false, TContext>();

    schema.shapeValue = shape ?? null;

    return schema;
  }

  public concat<
    TNextShape extends ConcatenatedShape<TShape> = TShape,
  >(
    shape: TNextShape,
  ): ObjectSchema<MergeShape<TShape, TNextShape>, TOptional, TNullable, TContext> {
    const shapeValue = {
      ...this.shapeValue,
      ...shape,
    } as MergeShape<TShape, TNextShape>;

    let defaultValue = this.defaultValue;

    if (this.defaultValue?.data != null) {
      const defaultData = Object.keys(shape).reduce((defaultData, key) => {
        delete defaultData[key];
        return defaultData;
      }, { ...this.defaultValue.data });
      defaultValue = { data: defaultData };
    }

    return this.apply({
      shapeValue,
      defaultValue,
    });
  }

  public reach<
    TPath extends PossibleShapePath<TShape> = never,
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
          // @ts-ignore
          return nextSchema;
        }
        else if ('reach' in nextSchema && typeof nextSchema.reach === 'function') {
          if (nextSchema.shapeValue) {
            // @ts-ignore
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
          // @ts-ignore
          return this.concat({ [firstPath]: cb(nextSchema) });
        }
        else if ('refine' in nextSchema && typeof nextSchema.refine === 'function') {
          if (nextSchema.shapeValue) {
            // @ts-ignore
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
        return defaultData as DefaultData<TShape, TOptional, TNullable>;
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
