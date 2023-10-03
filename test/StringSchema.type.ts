import StringSchema from '../src/StringSchema';
import { SchemaContextType, SchemaDataType } from '../src/types';
import noop from './tools/noop';

/**
 * Base functionality
 */
{
  {
    const schema = StringSchema.create();

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
 * Schema data type
 */
{
  {
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    // @ts-expect-error
    noop<DataType>({});
  }

  {
    const schema = StringSchema.create().optional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().optional().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().nullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().nullable().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().required();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }
}

/**
 * Schema data type with cloned schema
 */
{
  {
    const schema = StringSchema.create();

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

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>({});
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    noop<DataType>(undefined);

    noop<DataType>(null);

    noop<DataType>('');
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);

    noop<DataType>('');
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    noop<DataType>('');
  }
}

/**
 * Default value
 */
{
  {
    const schema = StringSchema.create();

    const defaultValue = schema.getDefault();

    // @ts-expect-error
    noop<typeof defaultValue>(undefined);

    // @ts-expect-error
    noop<typeof defaultValue>(null);

    // @ts-expect-error
    noop<typeof defaultValue>(true);

    noop<typeof defaultValue>('');
  }

  {
    const schema = StringSchema.create().default('abc');

    const defaultValue = schema.getDefault();

    // @ts-expect-error
    noop<typeof defaultValue>(undefined);

    // @ts-expect-error
    noop<typeof defaultValue>(null);

    // @ts-expect-error
    noop<typeof defaultValue>(true);

    noop<typeof defaultValue>('');
  }

  {
    const schema = StringSchema.create();

    schema.default('');
  }

  {
    const schema = StringSchema.create();

    schema.default('Snickers');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    schema.default('Snickers');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    schema.default('Mars');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    // @ts-expect-error
    schema.default('Bounty');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    // @ts-expect-error
    schema.default('abc');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    // @ts-expect-error
    schema.default('');
  }

  {
    const schema = StringSchema.create([]);

    // @ts-expect-error
    schema.default('');
  }

  {
    const schema = StringSchema.create([]);

    // @ts-expect-error
    schema.default('abc');
  }
}

/**
 * Change pattern
 */
{
  {
    const schema = StringSchema.create(['Snickers', 'Bounty']);

    const nextSchema = schema.values(['Mars', 'Twix']);

    const schemaDefaultValue = schema.getDefault();

    const nextSchemaDefaultValue = nextSchema.getDefault();

    noop<typeof schemaDefaultValue>('Snickers');

    // @ts-expect-error
    noop<typeof schemaDefaultValue>('Mars');

    schema.default('Bounty');

    // @ts-expect-error
    schema.default('Twix');

    // @ts-expect-error
    noop<typeof nextSchemaDefaultValue>('Snickers');

    noop<typeof nextSchemaDefaultValue>('Mars');

    // @ts-expect-error
    nextSchema.default('Bounty');

    nextSchema.default('Twix');
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

    const schema = StringSchema.create().context<Context>();

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

    const schema = StringSchema.create().context<Context>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    StringSchema.create()
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

    StringSchema.create()
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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    StringSchema.create()
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

    StringSchema.create()
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
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    const nextSchema = schema.withMutation(schema => schema.optional());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    noop<NextDataType>('');

    noop<NextDataType>(undefined);

    // @ts-expect-error
    noop<NextDataType>(null);
  }

  {
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    const nextSchema = schema.withMutation(schema => schema.nullable());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    noop<NextDataType>('');

    // @ts-expect-error
    noop<NextDataType>(undefined);

    noop<NextDataType>(null);
  }

  {
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    const nextSchema = schema.withMutation(schema => schema.notRequired());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    noop<NextDataType>('');

    noop<NextDataType>(undefined);

    noop<NextDataType>(null);
  }
}
