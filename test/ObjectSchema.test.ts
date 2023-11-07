import ObjectSchema from '../src/ObjectSchema';
import StringSchema from '../src/StringSchema';
import { isNotOptionalMessage, isNotNullableMessage, mustBeAnObjectMessage } from './tools/checkMessage';
import testSchemaValidation from './tools/testSchemaValidation';

describe('ObjectSchema', () => {
  it('should validate', () => {
    const schema = ObjectSchema.create();
    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, {});
    testSchemaValidation(schema, 0, mustBeAnObjectMessage);
    testSchemaValidation(schema, '', mustBeAnObjectMessage);
  });

  it('should validate with .optional()', () => {
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

  it('should validate with .notOptional()', () => {
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

  it('should validate with .nullable()', () => {
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

  it('should validate with .notNullable()', () => {
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

  it('should validate with .required()', () => {
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

  it('should validate with .notRequired()', () => {
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

  it('should clone', () => {
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

  it('should get default value with .getDefault()', () => {
    const schema = ObjectSchema.create();

    expect(schema.getDefault()).toStrictEqual({});
  });

  it('should set default value with .default()', () => {
    const schema = ObjectSchema.create().default({
      price: 100,
    });

    expect(schema.getDefault()).toStrictEqual({
      price: 100,
    });
  });

  it('should use shape to calculate default value', () => {
    const priceSchema = ObjectSchema.create();

    const schema = ObjectSchema.create({
      price: priceSchema,
    });

    expect(schema.getDefault()).toStrictEqual({
      price: {},
    });
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
      const schema = ObjectSchema.create({
        id: StringSchema.create(),
      });

      const nextSchema = schema.concat({
        name: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        id: '',
        name: '',
      });
    }

    {
      const schema = ObjectSchema.create({
        id: StringSchema.create(),
      }).default({ id: '10' });

      const nextSchema = schema.concat({
        name: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        id: '10',
        name: '',
      });
    }

    {
      const schema = ObjectSchema.create({
        name: StringSchema.create().optional(),
      }).default({
        name: undefined,
      });

      const nextSchema = schema.concat({
        name: StringSchema.create(),
      });

      expect(nextSchema.getDefault()).toStrictEqual({
        name: '',
      });
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
});
