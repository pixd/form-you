import StringSchema from '../src/StringSchema';
import { SchemaDataType } from '../src/types';
import noop from './tools/noop';

/**
 * BaseFunctionality
 */
{
  {
    const schema = StringSchema.create();

    noop<Function>(schema.optional);
    // @ts-expect-error
    noop<never>(schema.optional);
    // @ts-expect-error
    noop<null>(schema.optional);

    noop<Function>(schema.notOptional);
    // @ts-expect-error
    noop<never>(schema.notOptional);
    // @ts-expect-error
    noop<null>(schema.notOptional);

    noop<Function>(schema.nullable);
    // @ts-expect-error
    noop<never>(schema.nullable());
    // @ts-expect-error
    noop<null>(schema.nullable());

    noop<Function>(schema.notNullable);
    // @ts-expect-error
    noop<never>(schema.notNullable);
    // @ts-expect-error
    noop<null>(schema.notNullable);

    noop<Function>(schema.required);
    // @ts-expect-error
    noop<never>(schema.required);
    // @ts-expect-error
    noop<null>(schema.required);

    noop<Function>(schema.notRequired);
    // @ts-expect-error
    noop<never>(schema.notRequired);
    // @ts-expect-error
    noop<null>(schema.notRequired);

    noop<Function>(schema.clone);
    // @ts-expect-error
    noop<never>(schema.clone);
    // @ts-expect-error
    noop<null>(schema.clone);

    noop<Function>(schema.validate);
    // @ts-expect-error
    noop<never>(schema.validate);
    // @ts-expect-error
    noop<null>(schema.validate);
  }
}

/**
 * SchemaDataType
 */
{
  {
    const schema = StringSchema.create();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    // @ts-expect-error
    noop<DataType>({});
  }

  {
    const schema = StringSchema.create().optional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().optional().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().nullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().nullable().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().required();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().notOptional();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().notNullable();

    type DataType = SchemaDataType<typeof schema>;

    noop<DataType>('');

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }
}

/**
 * SchemaDataType with cloned schema
 */
{
  {
    const schema = StringSchema.create();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    // @ts-expect-error
    noop<DataType>(true);

    // @ts-expect-error
    noop<DataType>(0);

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>({});
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone();

    type DataType = SchemaDataType<typeof nextSchema>;

    noop<DataType>(undefined);

    noop<DataType>(null);

    noop<DataType>('');
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);

    noop<DataType>('');
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone({
      rejectNull: '',
    });

    type DataType = SchemaDataType<typeof nextSchema>;

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    noop<DataType>('');
  }
}

/**
 * Default value
 */
{
  {
    const schema = StringSchema.create();

    const defaultValue = schema.getDefault();

    // @ts-expect-error
    noop<typeof defaultValue>(undefined);

    // @ts-expect-error
    noop<typeof defaultValue>(null);

    // @ts-expect-error
    noop<typeof defaultValue>(true);

    noop<typeof defaultValue>('');
  }

  {
    const schema = StringSchema.create().default('abc');

    const defaultValue = schema.getDefault();

    // @ts-expect-error
    noop<typeof defaultValue>(undefined);

    // @ts-expect-error
    noop<typeof defaultValue>(null);

    // @ts-expect-error
    noop<typeof defaultValue>(true);

    noop<typeof defaultValue>('');
  }

  {
    const schema = StringSchema.create();

    schema.default('');
  }

  {
    const schema = StringSchema.create();

    schema.default('Snickers');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    schema.default('Snickers');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    schema.default('Mars');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    // @ts-expect-error
    schema.default('Bounty');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    // @ts-expect-error
    schema.default('abc');
  }

  {
    const schema = StringSchema.create(['Snickers', 'Mars']);

    // @ts-expect-error
    schema.default('');
  }

  {
    const schema = StringSchema.create([]);

    // @ts-expect-error
    schema.default('');
  }

  {
    const schema = StringSchema.create([]);

    // @ts-expect-error
    schema.default('abc');
  }
}

/**
 * Change pattern
 */
{
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
