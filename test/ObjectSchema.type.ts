import ObjectSchema from '../src/ObjectSchema';
import { SchemaContextType, SchemaDataType } from '../src/types';
import noop from './tools/noop';

/**
 * Base functionality
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
 * Schema data type
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
 * Schema data type with cloned schema
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

/**
 * Change pattern
 */
{
  const priceSchema = ObjectSchema.create({});
  const categorySchema = ObjectSchema.create({});

  {
    const schema = ObjectSchema.create({
      price: priceSchema,
    });

    const nextSchema = schema.shape({
      category: categorySchema,
    });

    const schemaDefaultValue = schema.getDefault();

    const nextSchemaDefaultValue = nextSchema.getDefault();

    noop<typeof schemaDefaultValue>({
      price: {},
    });

    noop<typeof schemaDefaultValue>({
      // @ts-expect-error
      category: {},
    });

    schema.default({
      price: {},
    });

    schema.default({
      // @ts-expect-error
      category: {},
    });

    noop<typeof nextSchemaDefaultValue>({
      // @ts-expect-error
      price: {},
    });

    noop<typeof nextSchemaDefaultValue>({
      category: {},
    });

    nextSchema.default({
      // @ts-expect-error
      price: {},
    });

    nextSchema.default({
      category: {},
    });
  }
}

/**
 * Context
 */
{
  {
    type Context = {
      price: number;
    };

    const schema = ObjectSchema.create().context<Context>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      price: 100,
    });

    noop<ContextType>({
      price: 100,
      // @ts-expect-error
      active: true,
    });

    // @ts-expect-error
    noop<ContextType>({});
  }

  {
    type Context = {
      price?: number;
    };

    const schema = ObjectSchema.create().context<Context>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      price: 100,
    });

    noop<ContextType>({
      price: 100,
      // @ts-expect-error
      active: true,
    });

    noop<ContextType>({});
  }

  {
    type Context = {
      price: number;
    };

    type NextContext = {
      name: string;
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
    });

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
      // @ts-expect-error
      active: true,
    });

    // @ts-expect-error
    noop<ContextType>({
      price: 100,
    });

    // @ts-expect-error
    noop<ContextType>({
      name: 'Snickers',
    });

    // @ts-expect-error
    noop<ContextType>({});
  }

  {
    type Context = {
      price?: number;
    };

    type NextContext = {
      name: string;
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
    });

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
      // @ts-expect-error
      active: true,
    });

    // @ts-expect-error
    noop<ContextType>({
      price: 100,
    });

    noop<ContextType>({
      name: 'Snickers',
    });

    // @ts-expect-error
    noop<ContextType>({});
  }

  {
    type Context = {
      price: number;
    };

    type NextContext = {
      name?: string;
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
    });

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
      // @ts-expect-error
      active: true,
    });

    noop<ContextType>({
      price: 100,
    });

    // @ts-expect-error
    noop<ContextType>({
      name: 'Snickers',
    });

    // @ts-expect-error
    noop<ContextType>({});
  }

  {
    type Context = {
      price: number;
      name?: string;
    };

    type NextContext = {
      name: string;
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
    });

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
      // @ts-expect-error
      active: true,
    });

    // @ts-expect-error
    noop<ContextType>({
      price: 100,
    });

    // @ts-expect-error
    noop<ContextType>({
      name: 'Snickers',
    });

    // @ts-expect-error
    noop<ContextType>({});
  }

  {
    type Context = {
      price: number;
      name: string;
    };

    type NextContext = {
      name?: string;
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
    });

    noop<ContextType>({
      price: 100,
      name: 'Snickers',
      // @ts-expect-error
      active: true,
    });

    // @ts-expect-error
    noop<ContextType>({
      price: 100,
    });

    // @ts-expect-error
    noop<ContextType>({
      name: 'Snickers',
    });

    // @ts-expect-error
    noop<ContextType>({});
  }

  {
    type Context = {
      sale: number | string;
    };

    type NextContext = {
      sale: string;
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      sale: 'new-year',
    });

    noop<ContextType>({
      // @ts-expect-error
      sale: 15,
    });
  }

  {
    type Context = {
      sale: string;
    };

    type NextContext = {
      sale: number | string;
    };

    ObjectSchema.create()
      .context<Context>()
      // @ts-expect-error
      .context<NextContext>();
  }

  {
    type Context = {
      sale: string;
    };

    type NextContext = {
      sale: number;
    };

    ObjectSchema.create()
      .context<Context>()
      // @ts-expect-error
      .context<NextContext>();
  }

  {
    type Context = {
      sale: (number | string)[];
    };

    type NextContext = {
      sale: number[];
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    noop<ContextType>({
      sale: [15],
    });

    noop<ContextType>({
      // @ts-expect-error
      sale: ['new-year'],
    });

    noop<ContextType>({
      // @ts-expect-error
      sale: [15, 'new-year'],
    });
  }

  {
    type Context = {
      sale: string[];
    };

    type NextContext = {
      sale: (number | string)[];
    };

    ObjectSchema.create()
      .context<Context>()
      // @ts-expect-error
      .context<NextContext>();
  }

  {
    type Context = {
      sale: string[];
    };

    type NextContext = {
      sale: number[];
    };

    ObjectSchema.create()
      .context<Context>()
      // @ts-expect-error
      .context<NextContext>();
  }
}
