import BaseSchema from '../../src/Schema/BaseSchema';
import ObjectSchema from '../../src/Schema/ObjectSchema';
import StringSchema from '../../src/Schema/StringSchema';
import { AnySchema, SchemaContextType, SchemaDataType, SchemaShapeType,
  Simplify } from '../../src/types';
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
 * Schema shape type
 */
{
  {
    expect.equal<Parameters<typeof ObjectSchema.create>[0], undefined | Record<string, AnySchema>>(PASSED)
  }

  {
    const userSchema = ObjectSchema.create();

    expect.equal<SchemaShapeType<typeof userSchema>, {}>(PASSED);
  }

  {
    const userSchema = ObjectSchema.create().concat({});

    expect.equal<SchemaShapeType<typeof userSchema>, {}>(PASSED);
  }

  {
    const userSchema = ObjectSchema.create({});

    expect.equal<SchemaShapeType<typeof userSchema>, {}>(PASSED);
  }

  {
    const userSchema = ObjectSchema.create({}).concat({});

    expect.equal<SchemaShapeType<typeof userSchema>, {}>(PASSED);
  }

  {
    const shape = {
      nick: StringSchema.create(),
      friend: ObjectSchema.create({
        nick: StringSchema.create(),
      }),
    };

    const userSchema = ObjectSchema.create(shape);

    expect.equal<SchemaShapeType<typeof userSchema>, typeof shape>(PASSED);
  }

  {
    const shapeA = {
      nick: StringSchema.create(),
      friend: ObjectSchema.create({
        nick: StringSchema.create(),
      }),
    };

    const shapeB = {
      bonus: StringSchema.create(),
    };

    const userSchema = ObjectSchema.create(shapeA).concat(shapeB);

    expect.equal<SchemaShapeType<typeof userSchema>, Simplify<typeof shapeA & typeof shapeB>>(PASSED);
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

    expect.equal<DataType, Record<never, any>>(PASSED);
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
      priceA: Record<never, any>;
      priceB?: undefined | Record<never, any>;
      priceC: null | Record<never, any>;
      priceD?: undefined | null | Record<never, any>;
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

    expect.equal<DataType, Record<never, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | null | Record<never, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, null | Record<never, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({}).notRequired();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | Record<never, any>>(PASSED);
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

    expect.equal<typeof defaultValue, Record<never, any>>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], Record<never, any>>(PASSED);
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
    const schema = ObjectSchema.create({});

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
        name: StringSchema.create(),
      }),
    });

    const nextSchema = schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create().optional(),
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

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({
        name: StringSchema.create().optional(),
      }),
    });
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
        id: StringSchema.create(),
      }),
    });
  }
}

/**
 * Reach
 */
{
  {
    const schema = ObjectSchema.create();

    expect.equal<Parameters<typeof schema.reach>[0], never>(PASSED);

    const reachedSomeSchema
      // @ts-expect-error
      = schema.reach('');

    expect.equal<typeof reachedSomeSchema, unknown>(PASSED);

    const reachedUndefinedSchema
      // @ts-expect-error
      = schema.reach(undefined);

    expect.equal<typeof reachedUndefinedSchema, unknown>(PASSED);

    const reachedSchema
      // @ts-expect-error
      = schema.reach();

    expect.equal<typeof reachedSchema, unknown>(PASSED);
  }

  {
    const schema = ObjectSchema.create({});

    expect.equal<Parameters<typeof schema.reach>[0], never>(PASSED);

    const reachedUndefinedSchema
      // @ts-expect-error
      = schema.reach(undefined);

    expect.equal<typeof reachedUndefinedSchema, unknown>(PASSED);

    const reachedSchema
      // @ts-expect-error
      = schema.reach();

    expect.equal<typeof reachedSchema, unknown>(PASSED);
  }

  {
    const idSchema = StringSchema.create().nullable();
    const nickSchema = StringSchema.create().optional();
    const friendSchema = ObjectSchema.create({
      id: idSchema,
      nick: nickSchema,
    });


    const schema = ObjectSchema.create({
      id: idSchema,
      nick: nickSchema,
      friend: friendSchema,
    });

    type ExpectedPath = 'id' | 'nick' | 'friend' | 'friend.id' | 'friend.nick';

    expect.equal<Parameters<typeof schema.reach>[0], ExpectedPath>(PASSED);

    const reachedSchema
      // @ts-expect-error
      = schema.reach();

    expect.equal<typeof reachedSchema, unknown>(PASSED);

    const id = schema.reach('id');
    const nick = schema.reach('nick');
    const friend = schema.reach('friend');
    const friendId = schema.reach('friend.id');
    const friendNick = schema.reach('friend.nick');

    expect.equal<typeof id, typeof idSchema>(PASSED);
    expect.equal<typeof nick, typeof nickSchema>(PASSED);
    expect.equal<typeof friend, typeof friendSchema>(PASSED);
    expect.equal<typeof friendId, typeof idSchema>(PASSED);
    expect.equal<typeof friendNick, typeof nickSchema>(PASSED);
  }
}

/**
 * Reach
 */
{
  {
    const idSchema = StringSchema.create().nullable();
    const nickSchema = StringSchema.create().optional();
    const friendSchema = ObjectSchema.create({
      id: idSchema,
      nick: nickSchema,
    });


    const schema = ObjectSchema.create({
      id: idSchema,
      nick: nickSchema,
      friend: friendSchema,
    });

    type ExpectedPath = 'id' | 'nick' | 'friend' | 'friend.id' | 'friend.nick';

    expect.equal<Parameters<typeof schema.refine>[0], ExpectedPath>(PASSED);

    const idNotNullableSchema = schema.refine('id', (schema) => schema.notNullable());
    // @ts-expect-error
    schema.refine('id', (schema) => schema.optional());
    const nickNotOptionalSchema = schema.refine('nick', (schema) => schema.notOptional());
    // @ts-expect-error
    schema.refine('nick', (schema) => schema.nullable());
    // @ts-expect-error
    schema.refine('friend', (schema) => schema.optional());
    // @ts-expect-error
    schema.refine('friend', (schema) => schema.nullable());
    const friendIdNotNullableSchema = schema.refine('friend.id', (schema) => schema.notNullable());
    // @ts-expect-error
    schema.refine('friend.id', (schema) => schema.optional());
    const friendNickNotOptionalSchema = schema.refine('friend.nick', (schema) => schema.notOptional());
    // @ts-expect-error
    schema.refine('friend.nick', (schema) => schema.nullable());

    const expectedIdNotNullableSchema = ObjectSchema.create({
      id: idSchema.notNullable(),
      nick: nickSchema,
      friend: friendSchema,
    });

    const expectedNickNotOptionalSchema = ObjectSchema.create({
      id: idSchema,
      nick: nickSchema.notOptional(),
      friend: friendSchema,
    });

    const expectedFriendIdNotNullableSchema = ObjectSchema.create({
      id: idSchema,
      nick: nickSchema,
      friend: ObjectSchema.create({
        id: idSchema.notNullable(),
        nick: nickSchema,
      }),
    });

    const expectedFriendNickNotOptionalSchema = ObjectSchema.create({
      id: idSchema,
      nick: nickSchema,
      friend: ObjectSchema.create({
        id: idSchema,
        nick: nickSchema.notOptional(),
      }),
    });

    expect.safety.extends<typeof schema, typeof idNotNullableSchema>(PASSED);
    expect.equal<typeof idNotNullableSchema, typeof expectedIdNotNullableSchema>(PASSED);
    expect.safety.extends<typeof schema, typeof nickNotOptionalSchema>(PASSED);
    expect.equal<typeof nickNotOptionalSchema, typeof expectedNickNotOptionalSchema>(PASSED);
    expect.safety.extends<typeof schema, typeof friendIdNotNullableSchema>(PASSED);
    expect.equal<typeof friendIdNotNullableSchema, typeof expectedFriendIdNotNullableSchema>(PASSED);
    expect.safety.extends<typeof schema, typeof friendNickNotOptionalSchema>(PASSED);
    expect.equal<typeof friendNickNotOptionalSchema, typeof expectedFriendNickNotOptionalSchema>(PASSED);
  }
}
