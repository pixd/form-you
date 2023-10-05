import StringSchema from '../src/StringSchema';
import {
  isNotOptionalMessage,
  isNotNullableMessage,
  mustBeAnStringMessage,
} from './tools/checkMessage';
import testSchemaValidation from './tools/testSchemaValidation';

describe('StringSchema', () => {
  it('should validate', () => {
    const schema = StringSchema.create();
    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, '');
    testSchemaValidation(schema, {}, mustBeAnStringMessage);
    testSchemaValidation(schema, 0, mustBeAnStringMessage);
  });

  it('should validate with .optional()', () => {
    const schema = StringSchema.create()
      .optional();

    testSchemaValidation(schema, undefined);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, '');

    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null, isNotNullableMessage);
    testSchemaValidation(schema.notOptional(), '');
    testSchemaValidation(schema.nullable(), undefined);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), '');
    testSchemaValidation(schema.notNullable(), undefined);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), '');

    // testSchemaValidation(schema.undefined(), undefined);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), '', mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, mustBeNullMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), '', mustBeNullMessage);
  });

  it('should validate with .notOptional()', () => {
    const schema = StringSchema.create()
      .notOptional();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, '');

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional(), '');
    testSchemaValidation(schema.nullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), '');
    testSchemaValidation(schema.notNullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), '');

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), '', mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), '', mustBeNullMessage);
  });

  it('should validate with .nullable()', () => {
    const schema = StringSchema.create()
      .nullable();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null);
    testSchemaValidation(schema, '');

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null);
    testSchemaValidation(schema.optional(), '');
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null);
    testSchemaValidation(schema.notOptional(), '');
    testSchemaValidation(schema.notNullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), '');

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, mustBeUndefinedMessage);
    // testSchemaValidation(schema.undefined(), '', mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null);
    // testSchemaValidation(schema.null(), '', mustBeNullMessage);
  });

  it('should validate with .notNullable()', () => {
    const schema = StringSchema.create()
      .notNullable();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, '');

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional(), '');
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null, isNotNullableMessage);
    testSchemaValidation(schema.notOptional(), '');
    testSchemaValidation(schema.nullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), '');

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), '', mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), '', mustBeNullMessage);
  });

  it('should validate with .required()', () => {
    const schema = StringSchema.create()
      .required();

    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, '');

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional(), '');
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null, isNotNullableMessage);
    testSchemaValidation(schema.notOptional(), '');
    testSchemaValidation(schema.nullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), '');
    testSchemaValidation(schema.notNullable(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), '');

    // testSchemaValidation(schema.undefined(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.undefined(), null, isNotNullableMessage);
    // testSchemaValidation(schema.undefined(), '', mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, isNotOptionalMessage);
    // testSchemaValidation(schema.null(), null, isNotNullableMessage);
    // testSchemaValidation(schema.null(), '', mustBeNullMessage);
  });

  it('should validate with .notRequired()', () => {
    const schema = StringSchema.create()
      .notRequired();

    testSchemaValidation(schema, undefined);
    testSchemaValidation(schema, null);
    testSchemaValidation(schema, '');

    testSchemaValidation(schema.optional(), undefined);
    testSchemaValidation(schema.optional(), null);
    testSchemaValidation(schema.optional(), '');
    testSchemaValidation(schema.notOptional(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.notOptional(), null);
    testSchemaValidation(schema.notOptional(), '');
    testSchemaValidation(schema.nullable(), undefined);
    testSchemaValidation(schema.nullable(), null);
    testSchemaValidation(schema.nullable(), '');
    testSchemaValidation(schema.notNullable(), undefined);
    testSchemaValidation(schema.notNullable(), null, isNotNullableMessage);
    testSchemaValidation(schema.notNullable(), '');

    // testSchemaValidation(schema.undefined(), undefined);
    // testSchemaValidation(schema.undefined(), null, mustBeUndefinedMessage);
    // testSchemaValidation(schema.undefined(), '', mustBeUndefinedMessage);
    // testSchemaValidation(schema.null(), undefined, mustBeNullMessage);
    // testSchemaValidation(schema.null(), null);
    // testSchemaValidation(schema.null(), '', mustBeNullMessage);
  });

  it('should clone', () => {
    const schema = StringSchema.create();

    testSchemaValidation(schema.clone(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.clone(), null, isNotNullableMessage);
    testSchemaValidation(schema.clone(), '');
    testSchemaValidation(schema.optional().clone(), undefined);
    testSchemaValidation(schema.optional().clone(), null, isNotNullableMessage);
    testSchemaValidation(schema.optional().clone(), '');
    testSchemaValidation(schema.nullable().clone(), undefined, isNotOptionalMessage);
    testSchemaValidation(schema.nullable().clone(), null);
    testSchemaValidation(schema.nullable().clone(), '');
  });

  it('should use default value', () => {
    const schema = StringSchema.create();

    expect(schema.getDefault()).toBe('');
  });

  it('should set default value', () => {
    const schema = StringSchema.create().default('Snickers');

    expect(schema.getDefault()).toBe('Snickers');
  });

  it('should use values to calculate default value', () => {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    expect(schema.getDefault()).toBe('Snickers');
  });

  it('should mutate with mutate', () => {
    {
      const schema = StringSchema.create();

      testSchemaValidation(schema, undefined, isNotOptionalMessage);

      const nextSchema = schema.mutate((schema) => schema.optional());

      expect(schema).toBe(nextSchema);

      testSchemaValidation(schema, undefined);
      testSchemaValidation(nextSchema, undefined);
    }

    {
      const schema = StringSchema.create();

      testSchemaValidation(schema, null, isNotNullableMessage);

      const nextSchema = schema.mutate((schema) => schema.nullable());

      expect(schema).toBe(nextSchema);

      testSchemaValidation(schema, null);
      testSchemaValidation(nextSchema, null);
    }

    {
      const schema = StringSchema.create();

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
      const schema = StringSchema.create();

      expect(schema.getDefault()).toBe('');

      const nextSchema = schema.mutate((schema) => schema.default('abc'));

      expect(schema).toBe(nextSchema);

      expect(schema.getDefault()).toBe('abc');
      expect(nextSchema.getDefault()).toBe('abc');
    }
  });
});
