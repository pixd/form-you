import StringSchema from '../src/StringSchema';
import { SchemaContextType, SchemaDataType } from '../src/types';
import noop, { expect, PASSED } from './tools/noop';

/**
 * Schema data type
 */
{
  {
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, string>(PASSED);
  }

  {
    const schema = StringSchema.create().optional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | string>(PASSED);
  }

  {
    const schema = StringSchema.create().optional().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, string>(PASSED);
  }

  {
    const schema = StringSchema.create().nullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | string>(PASSED);
  }

  {
    const schema = StringSchema.create().nullable().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, string>(PASSED);
  }

  {
    const schema = StringSchema.create().notRequired();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | null | string>(PASSED);
  }

  {
    const schema = StringSchema.create().notRequired().required();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, string>(PASSED);
  }

  {
    const schema = StringSchema.create().notRequired().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | string>(PASSED);
  }

  {
    const schema = StringSchema.create().notRequired().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | string>(PASSED);
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

    expect.equal<DataType, string>(PASSED);
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | null | string>(PASSED);
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, null | string>(PASSED);
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | string>(PASSED);
  }
}

/**
 * Default value
 */
{
  {
    const schema = StringSchema.create();

    expect.equal<Parameters<typeof schema.default>[0], null | string>(PASSED);
  }

  {
    const schema = StringSchema.create();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, string>(PASSED);
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    expect.equal<Parameters<typeof schema.default>[0], null | 'Snickers' | 'Mars'>(PASSED);
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, 'Snickers' | 'Mars'>(PASSED);
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']).default('Snickers');

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, 'Snickers' | 'Mars'>(PASSED);
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']).default(null);

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, 'Snickers' | 'Mars'>(PASSED);
  }
}

/**
 * Change pattern
 */
{
  // TODO This functionality should be changed

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

    expect.equal<ContextType, {
      price: number;
    }>(PASSED);
  }

  {
    type Context = {
      price?: number;
    };

    const schema = StringSchema.create().context<Context>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    const schema = StringSchema.create().context<Context>().context<NextContext>();

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

    expect.equal<DataType, string>(PASSED);

    const nextSchema = schema.mutate((schema) => schema.optional());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    expect.equal<NextDataType, undefined | string>(PASSED);
  }

  {
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, string>(PASSED);

    const nextSchema = schema.mutate((schema) => schema.nullable());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    expect.equal<NextDataType, null | string>(PASSED);
  }

  {
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, string>(PASSED);

    const nextSchema = schema.mutate((schema) => schema.notRequired());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    expect.equal<NextDataType, undefined | null | string>(PASSED);
  }
}
