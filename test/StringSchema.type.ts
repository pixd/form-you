import StringSchema from '../src/StringSchema';

function noop<T extends any>(_a: T): void {
  return;
}

BaseFunctionality: {
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

DataTypeRef: {
  {
    const schema = StringSchema.create();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().optional();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().optional().notOptional();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().nullable();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().nullable().notNullable();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().required();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().notOptional();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    // @ts-expect-error
    noop<DataType>(undefined);

    noop<DataType>(null);
  }

  {
    const schema = StringSchema.create().notRequired().notNullable();

    type DataType = typeof schema.Data__TypeRef;

    noop<DataType>('');

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);
  }
}

DataTypeRefOnClonedSchema: {
  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone();

    type DataType = typeof nextSchema.Data__TypeRef;

    noop<DataType>(undefined);

    noop<DataType>(null);

    noop<DataType>('');
  }

  {
    const schema = StringSchema.create().notRequired();

    const nextSchema = schema.clone({
      rejectUndefined: '',
    });

    type DataType = typeof nextSchema.Data__TypeRef;

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

    type DataType = typeof nextSchema.Data__TypeRef;

    noop<DataType>(undefined);

    // @ts-expect-error
    noop<DataType>(null);

    noop<DataType>('');
  }
}
