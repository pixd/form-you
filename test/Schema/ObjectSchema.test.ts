import ObjectSchema from '../../src/Schema/ObjectSchema';
import StringSchema from '../../src/Schema/StringSchema';
import { isNotOptionalMessage, isNotNullableMessage, mustBeAnObjectMessage } from '../tools/checkMessage';
import testSchemaValidation from '../tools/testSchemaValidation';

describe('ObjectSchema', () => {
  it('should validate', () => {
    const schema = ObjectSchema.create();
    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, {});
    testSchemaValidation(schema, 0, mustBeAnObjectMessage);
    testSchemaValidation(schema, '', mustBeAnObjectMessage);
  });

  it('should validate optional data', () => {
    const schema = ObjectSchema.create()
      .optional();

    testSchemaValidation(schema, undefined);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, {});

    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null, isNotNullableMessage);
    testSchemaValidation(schema.notOptional(), {});
    testSchemaValidation(schema.nullable(), undefined);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), {});
    testSchemaValidation(schema.notNullable(), undefined);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), {});

    // testSchemaValidation(schema.undefined(), undefined);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), {}, mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, mustBeNullMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), {}, mustBeNullMessage);
  });

  it('should validate not-optional data', () => {
    const schema = ObjectSchema.create()
      .notOptional();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, {});

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional(), {});
    testSchemaValidation(schema.nullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), {});
    testSchemaValidation(schema.notNullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), {});

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), {}, mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), {}, mustBeNullMessage);
  });

  it('should validate nullable data', () => {
    const schema = ObjectSchema.create()
      .nullable();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null);
    testSchemaValidation(schema, {});

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null);
    testSchemaValidation(schema.optional(), {});
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null);
    testSchemaValidation(schema.notOptional(), {});
    testSchemaValidation(schema.notNullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), {});

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, mustBeUndefinedMessage);
    // testSchemaValidation(schema.undefined(), {}, mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null);
    // testSchemaValidation(schema.null(), {}, mustBeNullMessage);
  });

  it('should validate not-nullable data', () => {
    const schema = ObjectSchema.create()
      .notNullable();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, {});

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional(), {});
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null, isNotNullableMessage);
    testSchemaValidation(schema.notOptional(), {});
    testSchemaValidation(schema.nullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), {});

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), {}, mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), {}, mustBeNullMessage);
  });

  it('should validate required data', () => {
    const schema = ObjectSchema.create()
      .required();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, {});

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional(), {});
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null, isNotNullableMessage);
    testSchemaValidation(schema.notOptional(), {});
    testSchemaValidation(schema.nullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), {});
    testSchemaValidation(schema.notNullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), {});

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), {}, mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), {}, mustBeNullMessage);
  });

  it('should validate not-required data', () => {
    const schema = ObjectSchema.create()
      .notRequired();

    testSchemaValidation(schema, undefined);
    testSchemaValidation(schema, null);
    testSchemaValidation(schema, {});

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null);
    testSchemaValidation(schema.optional(), {});
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null);
    testSchemaValidation(schema.notOptional(), {});
    testSchemaValidation(schema.nullable(), undefined);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), {});
    testSchemaValidation(schema.notNullable(), undefined);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), {});

    // testSchemaValidation(schema.undefined(), undefined);
    // testSchemaValidation(schema.undefined(), null, mustBeUndefinedMessage);
    // testSchemaValidation(schema.undefined(), {}, mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, mustBeNullMessage);
    // testSchemaValidation(schema.null(), null);
    // testSchemaValidation(schema.null(), {}, mustBeNullMessage);
  });

  it('should clone with .clone()', () => {
    const schema = ObjectSchema.create();

    testSchemaValidation(schema.clone(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.clone(), null, isNotNullableMessage);
    testSchemaValidation(schema.clone(), {});
    testSchemaValidation(schema.optional().clone(), undefined);
    testSchemaValidation(schema.optional().clone(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional().clone(), {});
    testSchemaValidation(schema.nullable().clone(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable().clone(), null);
    testSchemaValidation(schema.nullable().clone(), {});
  });

  it('should return default value on .getDefault()', () => {
    {
      const schema = ObjectSchema.create();

      expect(schema.getDefault()).toStrictEqual({});
    }

    {
      const schema = ObjectSchema.create({});

      expect(schema.getDefault()).toStrictEqual({});
    }

    {
      const schema = ObjectSchema.create().optional();

      expect(schema.getDefault()).toBe(undefined);
    }

    {
      const schema = ObjectSchema.create().nullable();

      expect(schema.getDefault()).toBe(null);
    }

    {
      const schema = ObjectSchema.create().notRequired();

      expect(schema.getDefault()).toBe(undefined);
    }
  });

  it('should set default value with .default()', () => {
    {
      const schema = ObjectSchema.create()
        .default({ price: 100 });

      expect(schema.getDefault()).toStrictEqual({
        price: 100,
      });
    }

    {
      const schema = ObjectSchema.create()
        .optional()
        .default({ price: 100 })
        .default(undefined);

      expect(schema.getDefault()).toBe(undefined);
    }

    {
      const schema = ObjectSchema.create()
        .nullable()
        .default({ price: 100 })
        .default(null);

      expect(schema.getDefault()).toBe(null);
    }

    {
      const schema = ObjectSchema.create()
        .notRequired()
        .default({ price: 100 })
        .default(null);

      expect(schema.getDefault()).toBe(null);
    }
  });

  it('should use shape to calculate default value', () => {
    {
      const schema = ObjectSchema.create();

      expect(schema.getDefault()).toStrictEqual({});
    }

    {
      const schema = ObjectSchema.create({});

      expect(schema.getDefault()).toStrictEqual({});
    }

    {
      const priceSchema = ObjectSchema.create();

      const schema = ObjectSchema.create({
        price: priceSchema,
      });

      expect(schema.getDefault()).toStrictEqual({
        price: {},
      });
    }
  });

  it('should change default value after .concat()', () => {
    {
      const schema = ObjectSchema.create();

      const nextSchema = schema.concat({
        name: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        name: '',
      });
    }

    {
      const schema = ObjectSchema.create({});

      const nextSchema = schema.concat({
        name: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        name: '',
      });
    }

    {
      const schema = ObjectSchema.create({
        name: StringSchema.create(),
      });

      const nextSchema = schema.concat({
        id: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        id: '',
        name: '',
      });
    }

    {
      const schema = ObjectSchema.create({
        name: StringSchema.create(),
      })
        .default({
          name: 'Antonio',
        });

      const nextSchema = schema.concat({
        name: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        name: '',
      });
    }

    {
      const schema = ObjectSchema.create({
        name: StringSchema.create(),
      })
        .default({
          name: 'Antonio',
        });

      const nextSchema = schema.concat({
        id: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        id: '',
        name: 'Antonio',
      });
    }
  });

  it('should reset default with .resetDefault()', () => {
    {
      const schema = ObjectSchema.create()
        .default({ name: 'Antonio' })
        .resetDefault();

      expect(schema.getDefault()).toStrictEqual({});
    }

    {
      const schema = ObjectSchema.create()
        .optional()
        .default({ name: 'Antonio' })
        .resetDefault();

      expect(schema.getDefault()).toBe(undefined);
    }

    {
      const schema = ObjectSchema.create()
        .nullable()
        .default({ name: 'Antonio' })
        .resetDefault();

      expect(schema.getDefault()).toBe(null);
    }

    {
      const schema = ObjectSchema.create()
        .notRequired()
        .default({ name: 'Antonio' })
        .resetDefault();

      expect(schema.getDefault()).toBe(undefined);
    }
  });

  it('should mutate with .mutate()', () => {
    {
      const schema = ObjectSchema.create();

      testSchemaValidation(schema, undefined, isNotOptionalMessage);

      const nextSchema = schema.mutate((schema) => schema.optional());

      expect(schema).toBe(nextSchema);

      testSchemaValidation(schema, undefined);
      testSchemaValidation(nextSchema, undefined);
    }

    {
      const schema = ObjectSchema.create();

      testSchemaValidation(schema, null, isNotNullableMessage);

      const nextSchema = schema.mutate((schema) => schema.nullable());

      expect(schema).toBe(nextSchema);

      testSchemaValidation(schema, null);
      testSchemaValidation(nextSchema, null);
    }

    {
      const schema = ObjectSchema.create();

      testSchemaValidation(schema, undefined, isNotOptionalMessage);
      testSchemaValidation(schema, null, isNotNullableMessage);

      const nextSchema = schema.mutate((schema) => schema.notRequired());

      expect(schema).toBe(nextSchema);

      testSchemaValidation(schema, undefined);
      testSchemaValidation(schema, null);
      testSchemaValidation(nextSchema, undefined);
      testSchemaValidation(nextSchema, null);
    }

    {
      const schema = ObjectSchema.create();

      expect(schema.getDefault()).toStrictEqual({});

      const nextSchema = schema.mutate((schema) => schema.default({ id: 0 }));

      expect(schema).toBe(nextSchema);

      expect(schema.getDefault()).toStrictEqual({ id: 0 });
      expect(nextSchema.getDefault()).toStrictEqual({ id: 0 });
    }
  });

  it('should reach nested schema with .reach', () => {
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
      expect(() => schema.reach()).toThrow();
      // @ts-expect-error
      expect(() => schema.reach('abc')).toThrow();
      expect(schema.reach('id')).toBe(idSchema);
      // @ts-expect-error
      expect(() => schema.reach('id.abc')).toThrow();
      expect(schema.reach('nick')).toBe(nickSchema);
      // @ts-expect-error
      expect(() => schema.reach('nick.abc')).toThrow();
      expect(schema.reach('friend')).toBe(friendSchema);
      // @ts-expect-error
      expect(() => schema.reach('friend.abc')).toThrow();
      expect(schema.reach('friend.id')).toBe(idSchema);
      expect(schema.reach('friend.nick')).toBe(nickSchema);
    }
  });

  it('should change nested schema with .refine', () => {
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
      expect(() => schema.refine()).toThrow();
      // @ts-expect-error
      expect(() => schema.refine('id')).toThrow();
      // @ts-expect-error
      expect(() => schema.refine((schema) => schema)).toThrow();
      // @ts-expect-error
      expect(() => schema.refine('abc', (schema) => schema)).toThrow();

      expect(schema.refine('id', (schema) => schema.notNullable()).getDefault()).toEqual({
        id: '',
        nick: undefined,
        friend: {
          id: null,
          nick: undefined,
        },
      });

      expect(schema.refine('nick', (schema) => schema.notOptional()).getDefault()).toEqual({
        id: null,
        nick: '',
        friend: {
          id: null,
          nick: undefined,
        },
      });

      expect(schema.refine('friend.id', (schema) => schema.notNullable()).getDefault()).toEqual({
        id: null,
        nick: undefined,
        friend: {
          id: '',
          nick: undefined,
        },
      });

      expect(schema.refine('friend.nick', (schema) => schema.notOptional()).getDefault()).toEqual({
        id: null,
        nick: undefined,
        friend: {
          id: null,
          nick: '',
        },
      });
    }
  });
});
