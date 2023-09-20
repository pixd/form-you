import BaseSchema from '../../src/BaseSchema';

export default function testSchemaValidation(schema: BaseSchema, value: any, error?: string) {
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
