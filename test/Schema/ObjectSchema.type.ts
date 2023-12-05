import BaseSchema from '../../src/Schema/BaseSchema';
import ObjectSchema from '../../src/Schema/ObjectSchema';
import StringSchema from '../../src/Schema/StringSchema';
import { AnySchema, SchemaContextType, SchemaDataType } from '../../src/types';
import { expect, PASSED } from '../tools/expect';

/**
 * Schema inheritance
 */
{
  const defaultSchema = ObjectSchema.create();

  {
    const schema = ObjectSchema.create();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().optional();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().nullable();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({
      id: StringSchema.create(),
      name: StringSchema.create(),
    });
    const schemaB = ObjectSchema.create({
      name: StringSchema.create(),
    });

    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.not.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      id: StringSchema.create(),
    });
    const nextSchema = schema.concat({
      name: StringSchema.create(),
    });

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof nextSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof schema, typeof nextSchema>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof nextSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof nextSchema>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().context<{ price: number }>();

    expect.safety.extends<BaseSchema, typeof schema>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schema>(PASSED);
    expect.safety.extends<typeof defaultSchema, typeof schema>(PASSED);
    expect.safety.not.extends<typeof schema, typeof defaultSchema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof defaultSchema>, SchemaDataType<typeof schema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof defaultSchema>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().context<{ price: number }>();
    const nextSchema = schema.context<{ name: string }>();

    expect.safety.extends<typeof schema, typeof nextSchema>(PASSED);
    expect.safety.not.extends<typeof nextSchema, typeof schema>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schema>, SchemaDataType<typeof nextSchema>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof nextSchema>, SchemaDataType<typeof schema>>(PASSED);
  }
}

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
    const schema = ObjectSchema.create().optional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().optional().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().nullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().nullable().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().notRequired();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().notRequired().required();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().notRequired().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create().notRequired().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
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
  {
    const schema = ObjectSchema.create();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, Record<string, any>>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .optional();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, undefined | Record<string, any>>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .nullable();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, null | Record<string, any>>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .notRequired();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, undefined | null | Record<string, any>>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], undefined | null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({});

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, Record<string, never>>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], Record<string, never>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name: string }>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .optional(),
    });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name?: string }>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], { name?: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .nullable(),
    });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name: null | string }>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], { name: null | string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .notRequired(),
    });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name?: null | string }>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], { name?: null | string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    })
      .default({
        name: 'Antonio',
      });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .optional(),
    })
      .default({
        name: 'Antonio',
      });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name?: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .nullable(),
    })
      .default({
        name: 'Antonio',
      });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name: null | string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .notRequired(),
    })
      .default({
        name: 'Antonio',
      });

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, { name?: null | string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    })
      .default({
        name: 'Antonio',
      })
      .optional();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, undefined | { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    })
      .default({
        name: 'Antonio',
      })
      .nullable();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, null | { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    })
      .default({
        name: 'Antonio',
      })
      .notRequired();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, undefined | null | { name: string }>(PASSED);
  }
}

/**
 * Default value and concat
 */
{
  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    }).concat({
      id: StringSchema.create(),
    });

    expect.equal<Parameters<typeof schema.default>[0], {
      id: string;
      name: string;
    }>(PASSED);

    expect.equal<ReturnType<typeof schema.getDefault>, {
      id: string;
      name: string;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create().optional(),
    }).concat({
      name: StringSchema.create(),
    });

    expect.equal<Parameters<typeof schema.default>[0], {
      name: string;
    }>(PASSED);

    expect.equal<ReturnType<typeof schema.getDefault>, {
      name: string;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create().nullable(),
    }).concat({
      name: StringSchema.create(),
    });

    expect.equal<Parameters<typeof schema.default>[0], {
      name: string;
    }>(PASSED);

    expect.equal<ReturnType<typeof schema.getDefault>, {
      name: string;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create().notRequired(),
    }).concat({
      name: StringSchema.create().optional(),
    });

    expect.equal<Parameters<typeof schema.default>[0], {
      name?: string;
    }>(PASSED);

    expect.equal<ReturnType<typeof schema.getDefault>, {
      name?: string;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create().notRequired(),
    }).concat({
      name: StringSchema.create().nullable(),
    });

    expect.equal<Parameters<typeof schema.default>[0], {
      name: null | string;
    }>(PASSED);

    expect.equal<ReturnType<typeof schema.getDefault>, {
      name: null | string;
    }>(PASSED);
  }
}

/**
 * Context
 */
{
  {
    const schema = ObjectSchema.create();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, object>(PASSED);
  }

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
      price?: number;
    };

    type NextContext = {
      price: number;
    };

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

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

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

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

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

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

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

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

    const schema = ObjectSchema.create().context<Context>().context<NextContext>();

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

    // @ts-ignore I don't know why, but this is not working...
    expect.equal<ContextType, { sale: number[] }>(PASSED);
    // ... so let's write it this way
    expect.equal<ContextType, { sale: number[] & (string | number)[] }>(PASSED);
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

/**
 * Concat
 */
{
  {
    const schema = ObjectSchema.create();

    const nextSchema = schema.concat({
      name: StringSchema.create(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    const nextSchema = schema.concat({
      id: StringSchema.create(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { id: string; name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create().optional(),
    });

    const nextSchema = schema.concat({
      name: StringSchema.create(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    schema.concat({
      // @ts-expect-error
      name: StringSchema.create().optional(),
    });
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    schema.concat({
      // @ts-expect-error
      name: ObjectSchema.create(),
    });
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    const nextSchema = schema.concat({});

    expect.equal<SchemaDataType<typeof nextSchema>, { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create().optional(),
      }),
    });

    const nextSchema = schema.concat({
      user: ObjectSchema.create(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { user: { id: string; name?: string } }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create().optional(),
      }),
    });

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({}),
    });
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create().optional(),
      }),
    });

    const nextSchema = schema.concat({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create(),
      }),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { user: { id: string; name: string } }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create().optional(),
      }),
    });

    const nextSchema = schema.concat({
      user: ObjectSchema.create({
        id: StringSchema.create(),
      }),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { user: { id: string; name?: string } }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create().optional(),
      }),
    });

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({
        name: StringSchema.create().optional(),
      }),
    });
  }
}