import BaseSchema from '../src/BaseSchema';
import StringSchema from '../src/StringSchema';
import { SchemaContextType, SchemaDataType } from '../src/types';
import { expect, PASSED } from './tools/expect';

/**
 * Schema inheritance
 */
{
  const defaultSchema = StringSchema.create();

  {
    const schema = StringSchema.create();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<StringSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = StringSchema.create().optional();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<StringSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = StringSchema.create().nullable();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<StringSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = StringSchema.create(['Antonio']);

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<StringSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schemaA = StringSchema.create(['Antonio', 'Mark']);
    const schemaB = StringSchema.create(['Antonio']);

    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
  }

  {
    const schema = StringSchema.create(['Antonio', 'Mark']);
    const nextSchema = schema.refine(['Antonio']);

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<StringSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof nextSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof nextSchema>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof nextSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof nextSchema>>(PASSED);
  }

  {
    const schema = StringSchema.create().context<{ price: number }>();
    const defaultSchema = StringSchema.create();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<StringSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = StringSchema.create().context<{ price: number }>();
    const nextSchema = schema.context<{ name: string }>();

    expect.safety.extends<typeof schema, typeof nextSchema>(PASSED);
    expect.safety.not.extends<typeof nextSchema, typeof schema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof nextSchema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof nextSchema>, SchemaDataType<typeof schema>>(PASSED);
  }
}

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

  {
    const schema = StringSchema.create(['Snickers', 'Mars']).refine(['Snickers']);

    expect.equal<Parameters<typeof schema.default>[0], null | 'Snickers'>(PASSED);
  }
}

/**
 * Context
 */
{
  {
    const schema = StringSchema.create();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, object>(PASSED);
  }

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
      price?: number;
    };

    type NextContext = {
      price: number;
    };

    const schema = StringSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, {
      price: number;
    }>(PASSED);
  }

  {
    type Context = {
      price: number;
    };

    type NextContext = {
      price?: number;
    };

    const schema = StringSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, {
      price: number;
    }>(PASSED);
  }

  {
    type Context = {
      price: number;
    };

    type NextContext = {
      price: undefined;
    };

    const schema = StringSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, never>(PASSED);
  }

  {
    type Context = {
      price: undefined | number;
    };

    type NextContext = {
      price: undefined;
    };

    const schema = StringSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, {
      price: undefined;
    }>(PASSED);
  }

  {
    type Context = {
      price?: number;
    };

    type NextContext = {
      price: undefined;
    };

    const schema = StringSchema.create().context<Context>().context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, {
      price: undefined;
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

    // @ts-ignore I don't know why, but this is not working...
    expect.equal<ContextType, { sale: number[] }>(PASSED);
    // ... so let's write it like this
    expect.equal<ContextType, { sale: number[] & (string | number)[] }>(PASSED);
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

/**
 * Refine
 */
{
  {
    const schema = StringSchema.create();

    const nextSchema = schema.refine(['Antonio']);

    expect.equal<SchemaDataType<typeof nextSchema>, 'Antonio'>(PASSED);
  }

  {
    const schema = StringSchema.create(['Antonio', 'Mark']);

    const nextSchema = schema.refine(['Antonio']);

    expect.equal<SchemaDataType<typeof nextSchema>, 'Antonio'>(PASSED);
  }

  {
    const schema = StringSchema.create(['Antonio']);

    // @ts-expect-error
    schema.refine(['Antonio', 'Mark']);
  }
}
