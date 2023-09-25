import ObjectSchema from '../src/ObjectSchema';
import { SchemaDataType } from '../src/types';
import noop from './tools/noop';

/**
 * BaseFunctionality
 */
{
  {
    const schema = ObjectSchema.create({});

    noop<Function>(schema.optional);
    // @ts-expect-error
    noop<never>(schema.optional);
    // @ts-expect-error
    noop<null>(schema.optional);

    noop<Function>(schema.notOptional);
    // @ts-expect-error
    noop<never>(schema.notOptional);
    // @ts-expect-error
    noop<null>(schema.notOptional);

    noop<Function>(schema.nullable);
    // @ts-expect-error
    noop<never>(schema.nullable());
    // @ts-expect-error
    noop<null>(schema.nullable());

    noop<Function>(schema.notNullable);
    // @ts-expect-error
    noop<never>(schema.notNullable);
    // @ts-expect-error
    noop<null>(schema.notNullable);

    noop<Function>(schema.required);
    // @ts-expect-error
    noop<never>(schema.required);
    // @ts-expect-error
    noop<null>(schema.required);

    noop<Function>(schema.notRequired);
    // @ts-expect-error
    noop<never>(schema.notRequired);
    // @ts-expect-error
    noop<null>(schema.notRequired);

    noop<Function>(schema.clone);
    // @ts-expect-error
    noop<never>(schema.clone);
    // @ts-expect-error
    noop<null>(schema.clone);

    noop<Function>(schema.validate);
    // @ts-expect-error
    noop<never>(schema.validate);
    // @ts-expect-error
    noop<null>(schema.validate);
  }
}

/**
 * Shape properties
 */
{
  {
    const priceSchema = ObjectSchema.create({});

    ObjectSchema.create({
      price: priceSchema,
    });
  }

  {
    ObjectSchema.create({
      // @ts-expect-error
      price: {},
    });
  }
}

/**
 * SchemaDataType
 */
{
  const priceSchema = ObjectSchema.create({});

  {
    const schema = ObjectSchema.create({});

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).optional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).optional().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).nullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).nullable().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).notRequired().required();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).notRequired().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({}).notRequired().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({});

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = ObjectSchema.create({
      priceA: priceSchema,
      priceB: priceSchema.optional(),
      priceC: priceSchema.nullable(),
      priceD: priceSchema.notRequired(),
    });

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>({
      priceA: {},
      priceB: {},
      priceC: {},
      priceD: {},
    });

    noop<DataType>({
      // @ts-expect-error
      priceA: undefined,
      priceB: undefined,
      // @ts-expect-error
      priceC: undefined,
      priceD: undefined,
    });

    noop<DataType>({
      // @ts-expect-error
      priceA: null,
      // @ts-expect-error
      priceB: null,
      priceC: null,
      priceD: null,
    });

    // @ts-expect-error
    noop<DataType>({
      priceB: {},
      priceC: {},
      priceD: {},
    });

    noop<DataType>({
      priceA: {},
      priceC: {},
      priceD: {},
    });

    // @ts-expect-error
    noop<DataType>({
      priceA: {},
      priceB: {},
      priceD: {},
    });

    noop<DataType>({
      priceA: {},
      priceB: {},
      priceC: {},
    });
  }
}

/**
 * SchemaDataType with cloned schema
 */
{
  {
    const schema = ObjectSchema.create({});

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    // @ts-expect-error
    noop<DataType>(true);

    // @ts-expect-error
    noop<DataType>(0);

    // @ts-expect-error
    noop<DataType>('');

    noop<DataType>({});
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    noop<DataType>(undefined);

    noop<DataType>(null);

    noop<DataType>({});
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);

    noop<DataType>({});
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    noop<DataType>({});
  }
}

/**
 * Default value
 */
{
  const priceSchema = ObjectSchema.create({});

  {
    const schema = ObjectSchema.create();

    const defaultValue = schema.getDefault();

    // @ts-expect-error
    noop<typeof defaultValue>(undefined);

    // @ts-expect-error
    noop<typeof defaultValue>(null);

    // @ts-expect-error
    noop<typeof defaultValue>(true);

    noop<typeof defaultValue>({});
  }

  {
    const schema = ObjectSchema.create({});

    const defaultValue = schema.getDefault();

    // @ts-expect-error
    noop<typeof defaultValue>(undefined);

    // @ts-expect-error
    noop<typeof defaultValue>(null);

    // @ts-expect-error
    noop<typeof defaultValue>(true);

    noop<typeof defaultValue>({});
  }

  {
    const schema = ObjectSchema.create({
      price: priceSchema.default({}),
    });

    const defaultValue = schema.getDefault();

    // @ts-expect-error
    noop<typeof defaultValue>(undefined);

    // @ts-expect-error
    noop<typeof defaultValue>(null);

    // @ts-expect-error
    noop<typeof defaultValue>(true);

    noop<typeof defaultValue>({
      price: {},
    });
  }

  {
    const schema = ObjectSchema.create();

    schema.default({});
  }

  {
    const schema = ObjectSchema.create();

    schema.default({
      price: 100,
    });
  }

  {
    const schema = ObjectSchema.create({});

    schema.default({});
  }

  {
    const schema = ObjectSchema.create({});

    schema.default({
      // @ts-expect-error
      price: 100,
    });
  }

  {
    const schema = ObjectSchema.create({
      price: priceSchema,
    });

    // @ts-expect-error
    schema.default({});
  }

  {
    const schema = ObjectSchema.create({
      price: priceSchema,
    });

    schema.default({
      price: {},
    });
  }
}
