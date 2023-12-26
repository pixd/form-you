import BaseSchema from '../../src/Schema/BaseSchema';
import ObjectSchema from '../../src/Schema/ObjectSchema';
import StringSchema from '../../src/Schema/StringSchema';
import { SchemaContextType, SchemaDataType, SchemaShapeType } from '../../src/types';
import { expect, PASSED } from '../tools/expect';

/**
 * Schema inheritance
 */
{
  {
    const schemaA = ObjectSchema.create();

    const schemaB = ObjectSchema.create();

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create();

    const schemaB = ObjectSchema.create({});

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({});

    const schemaB = ObjectSchema.create({});

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create();

    const schemaB = ObjectSchema.create()
      .optional();

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({});

    const schemaB = ObjectSchema.create({})
      .optional();

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create();

    const schemaB = ObjectSchema.create()
      .nullable();

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({});

    const schemaB = ObjectSchema.create({})
      .nullable();

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create();

    const schemaB = ObjectSchema.create({
      name: StringSchema.create(),
    });

    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({});

    const schemaB = ObjectSchema.create({
      name: StringSchema.create(),
    });

    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({
      user: ObjectSchema.create(),
    });

    const schemaB = ObjectSchema.create({
      user: ObjectSchema.create({
        name: StringSchema.create(),
      }),
    });

    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({
      user: ObjectSchema.create({}),
    });

    const schemaB = ObjectSchema.create({
      user: ObjectSchema.create({
        name: StringSchema.create(),
      }),
    });

    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({
      name: StringSchema.create(),
    });

    const schemaB = ObjectSchema.create({
      id: StringSchema.create(),
      name: StringSchema.create(),
    });

    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create({
      id: StringSchema.create(),
    });

    const schemaB = schemaA.concat({
      name: StringSchema.create(),
    });

    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.not.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create();

    const schemaB = ObjectSchema.create()
      .context<{ price: number }>();

    expect.safety.extends<BaseSchema, typeof schemaB>(PASSED);
    expect.safety.extends<ObjectSchema, typeof schemaB>(PASSED);
    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }

  {
    const schemaA = ObjectSchema.create()
      .context<{ price: number }>();

    const schemaB = schemaA.context<{ name: string }>();

    expect.safety.extends<typeof schemaA, typeof schemaB>(PASSED);
    expect.safety.not.extends<typeof schemaB, typeof schemaA>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaA>, SchemaDataType<typeof schemaB>>(PASSED);
    expect.safety.extends<SchemaDataType<typeof schemaB>, SchemaDataType<typeof schemaA>>(PASSED);
  }
}

/**
 * Schema shape type
 */
{
  {
    const userSchema = ObjectSchema.create();

    expect.equal<SchemaShapeType<typeof userSchema>, Record<string, any>>(PASSED);
  }

  {
    const userSchema = ObjectSchema.create().concat({});

    expect.equal<SchemaShapeType<typeof userSchema>, Record<string, any>>(PASSED);
  }

  {
    const userSchema = ObjectSchema.create({});

    expect.equal<SchemaShapeType<typeof userSchema>, Record<string, any>>(PASSED);
  }

  {
    const userSchema = ObjectSchema.create({}).concat({});

    expect.equal<SchemaShapeType<typeof userSchema>, Record<string, any>>(PASSED);
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

    // @ts-expect-error
    expect.equal<SchemaShapeType<typeof userSchema>, typeof shapeA & typeof shapeB>(PASSED);
    expect.__UNSAFE__mutuallyEqual<SchemaShapeType<typeof userSchema>, typeof shapeA & typeof shapeB>(PASSED);
  }
}

/**
 * Schema data type
 */
{
  {
    const schema = ObjectSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({});

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .optional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .optional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .optional()
      .notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .optional()
      .notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .nullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .nullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .nullable()
      .notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .nullable()
      .notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .notRequired();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .notRequired();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .notRequired()
      .required();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .notRequired()
      .required();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .notRequired()
      .notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .notRequired()
      .notOptional();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .notRequired()
      .notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .notRequired()
      .notNullable();

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      propA: ObjectSchema.create(),
      propB: ObjectSchema.create()
        .optional(),
      propC: ObjectSchema.create()
        .nullable(),
      propD: ObjectSchema.create()
        .notRequired(),
    });

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, {
      propA: Record<string, any>;
      propB?: undefined | Record<string, any>;
      propC: null | Record<string, any>;
      propD?: undefined | null | Record<string, any>;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      propA: ObjectSchema.create({}),
      propB: ObjectSchema.create({})
        .optional(),
      propC: ObjectSchema.create({})
        .nullable(),
      propD: ObjectSchema.create({})
        .notRequired(),
    });

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, {
      propA: Record<string, any>;
      propB?: undefined | Record<string, any>;
      propC: null | Record<string, any>;
      propD?: undefined | null | Record<string, any>;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      stringProp : StringSchema.create(),
      objectProp: ObjectSchema.create(),
    });

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, {
      stringProp: string;
      objectProp: Record<string, any>;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      stringProp : StringSchema.create(),
      objectProp: ObjectSchema.create({}),
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
    const schema = ObjectSchema.create();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({});

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .optional()
      .nullable();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .optional()
      .nullable();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .optional()
      .nullable();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .optional()
      .nullable();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, null | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create()
      .optional()
      .nullable();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
  }

  {
    const schema = ObjectSchema.create({})
      .optional()
      .nullable();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    expect.equal<DataType, undefined | Record<string, any>>(PASSED);
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
    const schema = ObjectSchema.create({});

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
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({})
      .notRequired();

    const defaultValue = schema.getDefault();

    expect.equal<typeof defaultValue, undefined | null | Record<string, any>>(PASSED);

    expect.equal<Parameters<typeof schema.default>[0], undefined | null | Record<string, any>>(PASSED);
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

    expect.equal<Parameters<typeof schema.default>[0], { name?: undefined | string }>(PASSED);
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

    expect.equal<typeof defaultValue, { name?: undefined | string }>(PASSED);
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
    })
      .concat({
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
      name: StringSchema.create()
        .optional(),
    })
      .concat({
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
      name: StringSchema.create()
        .nullable(),
    })
      .concat({
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
      name: StringSchema.create()
        .notRequired(),
    })
      .concat({
        name: StringSchema.create()
          .optional(),
      });

    expect.equal<Parameters<typeof schema.default>[0], {
      name?: undefined | string;
    }>(PASSED);

    expect.equal<ReturnType<typeof schema.getDefault>, {
      name?: undefined | string;
    }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .notRequired(),
    })
      .concat({
        name: StringSchema.create()
          .nullable(),
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

    const schema = ObjectSchema.create()
      .context<Context>();

    type ContextType = SchemaContextType<typeof schema>;

    expect.equal<ContextType, {
      price: number;
    }>(PASSED);
  }

  {
    type Context = {
      price?: number;
    };

    const schema = ObjectSchema.create()
      .context<Context>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

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

    const schema = ObjectSchema.create()
      .context<Context>()
      .context<NextContext>();

    type ContextType = SchemaContextType<typeof schema>;

    // @ts-expect-error
    expect.equal<ContextType, { sale: number[] }>(PASSED);
    expect.__UNSAFE__mutuallyEqual<ContextType, { sale: number[] }>(PASSED);
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

  {
    ObjectSchema.create({
      nick: StringSchema.create()
        .context<{ company: string; active: boolean }>(),
      friend: StringSchema.create()
        .context<{ company: string; active: boolean }>(),
    });

    ObjectSchema.create({
      // @ts-expect-error
      nick: StringSchema.create()
        .context<{ company: number; active: boolean }>(),
      // @ts-expect-error
      friend: StringSchema.create()
        .context<{ company: string; active: boolean }>(),
    });

    ObjectSchema.create({
      nick: StringSchema.create()
        .context<{ company: string; active: boolean }>(),
      friend: ObjectSchema.create()
        .context<{ company: string; active: boolean }>(),
    });

    ObjectSchema.create({
      // @ts-expect-error
      nick: StringSchema.create()
        .context<{ company: number; active: boolean }>(),
      // @ts-expect-error
      friend: ObjectSchema.create()
        .context<{ company: string; active: boolean }>(),
    });
  }

  {
    const schema = ObjectSchema.create({
      nick: StringSchema.create()
        .context<{ friend: string; active: boolean }>(),
      friend: StringSchema.create()
        .context<{ company: string; active: boolean }>(),
    });

    expect.equal<SchemaContextType<typeof schema>, { friend: string; company: string; active: boolean }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      nick: StringSchema.create()
        .context<{ friend: string; active: boolean }>(),
    })
      .concat({
        friend: StringSchema.create()
          .context<{ company: string; active: boolean }>(),
      });

    expect.equal<SchemaContextType<typeof schema>, { friend: string; company: string; active: boolean }>(PASSED);
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
    const schema = ObjectSchema.create({});

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
    const schema = ObjectSchema.create({});

    type DataType = SchemaDataType<typeof schema>;

    expect.equal<DataType, Record<string, any>>(PASSED);

    const nextSchema = schema.mutate((schema) => schema.nullable());

    type NextDataType = SchemaDataType<typeof nextSchema>;

    expect.equal<NextDataType, null | Record<string, any>>(PASSED);
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
      name: StringSchema.create()
        .optional(),
    });

    const nextSchema = schema.concat({
      name: StringSchema.create(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .nullable(),
    });

    const nextSchema = schema.concat({
      name: StringSchema.create(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { name: string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .optional().nullable(),
    });

    const nextSchema = schema.concat({
      name: StringSchema.create()
        .optional(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { name?: undefined | string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create()
        .optional().nullable(),
    });

    const nextSchema = schema.concat({
      name: StringSchema.create()
        .nullable(),
    });

    expect.equal<SchemaDataType<typeof nextSchema>, { name: null | string }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    schema.concat({
      // @ts-expect-error
      name: StringSchema.create()
        .optional(),
    });
  }

  {
    const schema = ObjectSchema.create({
      name: StringSchema.create(),
    });

    schema.concat({
      // @ts-expect-error
      name: StringSchema.create()
        .nullable(),
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
        name: StringSchema.create(),
      }),
    });

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create(),
    });
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        name: StringSchema.create(),
      }),
    });

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({}),
    });
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create(),
    });

    const nextSchema = schema.concat({
      user: ObjectSchema.create({
        name: StringSchema.create(),
      }),
    });

    // @ts-expect-error
    expect.equal<SchemaDataType<typeof nextSchema>, { user: { name: string } }>(PASSED);
    expect.__UNSAFE__mutuallyEqual<SchemaDataType<typeof nextSchema>, { user: { name: string } }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({}),
    });

    const nextSchema = schema.concat({
      user: ObjectSchema.create({
        name: StringSchema.create(),
      }),
    });

    // @ts-expect-error
    expect.equal<SchemaDataType<typeof nextSchema>, { user: { name: string } }>(PASSED);
    expect.__UNSAFE__mutuallyEqual<SchemaDataType<typeof nextSchema>, { user: { name: string } }>(PASSED);
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create()
          .optional(),
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

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create()
          .optional(),
      }),
    });
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create()
          .nullable(),
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

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create()
          .nullable(),
      }),
    });
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create(),
      }),
    });

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({
        id: StringSchema.create(),
      }),
    });
  }

  {
    const schema = ObjectSchema.create({
      user: ObjectSchema.create({
        id: StringSchema.create(),
        name: StringSchema.create()
          .optional(),
      }),
    });

    schema.concat({
      // @ts-expect-error
      user: ObjectSchema.create({
        id: StringSchema.create(),
      }),
    });
  }

  {
    ObjectSchema.create({
      nick: StringSchema.create()
        .context<{ company: number; active: boolean }>(),
    })
      .concat({
        // @ts-expect-error
        friend: StringSchema.create()
          .context<{ company: string; active: boolean }>(),
      });

    ObjectSchema.create({
      nick: StringSchema.create()
        .context<{ company: number; active: boolean }>(),
    })
      .concat({
        // @ts-expect-error
        friend: ObjectSchema.create()
          .context<{ company: string; active: boolean }>(),
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

    // @ts-expect-error
    schema.reach('');

    // @ts-expect-error
    schema.reach(undefined);

    // @ts-expect-error
    schema.reach();
  }

  {
    const schema = ObjectSchema.create({});

    expect.equal<Parameters<typeof schema.reach>[0], never>(PASSED);

    // @ts-expect-error
    schema.reach('');

    // @ts-expect-error
    schema.reach(undefined);

    // @ts-expect-error
    schema.reach();
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

    // @ts-expect-error
    schema.reach();

    type ExpectedPath = 'id' | 'nick' | 'friend' | 'friend.id' | 'friend.nick';

    expect.equal<Parameters<typeof schema.reach>[0], ExpectedPath>(PASSED);

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
 * Refine
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
    // @ts-expect-error
    expect.equal<typeof idNotNullableSchema, typeof expectedIdNotNullableSchema>(PASSED);
    expect.__UNSAFE__mutuallyEqual<typeof idNotNullableSchema, typeof expectedIdNotNullableSchema>(PASSED);
    expect.safety.extends<typeof schema, typeof nickNotOptionalSchema>(PASSED);
    // @ts-expect-error
    expect.equal<typeof nickNotOptionalSchema, typeof expectedNickNotOptionalSchema>(PASSED);
    expect.__UNSAFE__mutuallyEqual<typeof nickNotOptionalSchema, typeof expectedNickNotOptionalSchema>(PASSED);
    expect.safety.extends<typeof schema, typeof friendIdNotNullableSchema>(PASSED);
    // @ts-expect-error
    expect.equal<typeof friendIdNotNullableSchema, typeof expectedFriendIdNotNullableSchema>(PASSED);
    expect.__UNSAFE__mutuallyEqual<typeof friendIdNotNullableSchema, typeof expectedFriendIdNotNullableSchema>(PASSED);
    expect.safety.extends<typeof schema, typeof friendNickNotOptionalSchema>(PASSED);
    // @ts-expect-error
    expect.equal<typeof friendNickNotOptionalSchema, typeof expectedFriendNickNotOptionalSchema>(PASSED);
    expect.__UNSAFE__mutuallyEqual<typeof friendNickNotOptionalSchema, typeof expectedFriendNickNotOptionalSchema>(PASSED);
  }
}
