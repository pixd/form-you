import ObjectSchema from '../src/ObjectSchema';
import StringSchema from '../src/StringSchema';
import { AnySchema, SchemaContextType, SchemaDataType } from '../src/types';
import noop, { expect, PASSED } from './tools/noop';

/**
 * Shape properties
 */
{
  {
    expect.equal<Parameters<typeof ObjectSchema.create>[0], undefined | Record<string, AnySchema>>(PASSED)
  }
}

/**
 * Schema data type
 */
{
  const priceSchema = ObjectSchema.create({});

  {
    const schema = ObjectSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({});

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).optional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).optional().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).nullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).nullable().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | null | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired().required();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      priceA: priceSchema,
      priceB: priceSchema.optional(),
      priceC: priceSchema.nullable(),
      priceD: priceSchema.notRequired(),
    });

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, {
      priceA: Record<string, never>;
      priceB?: undefined | Record<string, never>;
      priceC: null | Record<string, never>;
      priceD?: undefined | null | Record<string, never>;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      stringProp: StringSchema.create(),
      objectProp: ObjectSchema.create(),
    });

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, {
      stringProp: string;
      objectProp: Record<string, any>;
    }>(PASSED);
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

    expect.equal<DataType, Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | null | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, null | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | Record<string, never>>(PASSED);
  }
}

/**
 * Default value
 */
{
  const priceSchema = ObjectSchema.create({});

  {
    const schema = ObjectSchema.create();

    expect.equal<Parameters<typeof schema.default>[0], null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({});

    expect.equal<Parameters<typeof schema.default>[0], null | Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({});

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      price: priceSchema,
    });

    expect.equal<Parameters<typeof schema.default>[0], null | {
      price: Record<string, never>;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      price: priceSchema,
    });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, {
      price: Record<string, never>;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema
      .create({
        price: priceSchema,
      })
      .default({
        price: {},
      });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, {
      price: Record<string, never>;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema
      .create({
        price: priceSchema,
      })
      .default(null);

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, {
      price: Record<string, never>;
    }>(PASSED);
  }
}

/**
 * Change pattern
 */
{
  // TODO This functionality should be changed

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

    expect.equal<ContextType, {
      price: number;
    }>(PASSED);
  }

  {
    type Context = {
      price?: number;
    };

    const schema = ObjectSchema.create().context<Context>();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, {
      price?: number;
    }>(PASSED);
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

    expect.equal<ContextType, {
      price: number;
      name: string;
    }>(PASSED);
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

    expect.equal<ContextType, {
      price?: number;
      name: string;
    }>(PASSED);
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

    expect.equal<ContextType, {
      price: number;
      name?: string;
    }>(PASSED);
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

    expect.equal<ContextType, {
      price: number;
      name: string;
    }>(PASSED);
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

    expect.equal<ContextType, {
      price: number;
      name: string;
    }>(PASSED);
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

    expect.equal<ContextType, {
      sale: string;
    }>(PASSED);
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

    // TODO This should work

    // @ts-ignore It would be better if it worked
    expect.equal<ContextType, { sale: number[] }>(PASSED);

    expect.equal<ContextType, { sale: number[] & (string | number)[] }>(PASSED);

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

/**
 * Mutation
 */
{
  {
    const schema = ObjectSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);

    const nextSchema = schema.mutate((schema) => schema.optional());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    expect.equal<NextDataType, undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);

    const nextSchema = schema.mutate((schema) => schema.nullable());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    expect.equal<NextDataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);

    const nextSchema = schema.mutate((schema) => schema.notRequired());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    expect.equal<NextDataType, undefined | null | Record<string, any>>(PASSED);
  }
}
