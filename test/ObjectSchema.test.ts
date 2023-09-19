import ObjectSchema from '../src/ObjectSchema';
import errorMessages, { prepareErrorMessage } from '../src/error-messages';

function testSchemaValidation(schema: ObjectSchema<any, any, any>, value: any, error?: string) {
  if (error) {
    expect(() => {
      schema.validate(value);
    }).toThrow(error);
  }
  else {
    const result = schema.validate(value);
    expect(result).toBe(value);
  }
}

const isNotOptionalMessage = prepareErrorMessage(errorMessages.IS_NOT_OPTIONAL_MESSAGE);
const isNotNullableMessage = prepareErrorMessage(errorMessages.IS_NOT_NULLABLE_MESSAGE);
// const mustBeUndefinedMessage = prepareErrorMessage(errorMessages.MUST_BE_UNDEFINED_MESSAGE);
// const mustBeNullMessage = prepareErrorMessage(errorMessages.MUST_BE_NULL_MESSAGE);
const mustBeAnObjectMessage = prepareErrorMessage(errorMessages.MUST_BE_AN_OBJECT_MESSAGE);

describe('ObjectSchema', () => {
  it('should validate', () => {
    const schema = ObjectSchema.create({});
    testSchemaValidation(schema, undefined, isNotOptionalMessage);
    testSchemaValidation(schema, null, isNotNullableMessage);
    testSchemaValidation(schema, {});
    testSchemaValidation(schema, 0, mustBeAnObjectMessage);
    testSchemaValidation(schema, '', mustBeAnObjectMessage);
  });

  it('should validate with .optional()', () => {
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({})
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
    const schema = ObjectSchema.create({});

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
});
