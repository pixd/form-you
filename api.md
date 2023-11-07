```typescript

BooleanSchema.create();

NumberSchema.create();
NumberSchema.create([10, 20]);
NumberSchema.create().values([10, 20]);

StringSchema.create();
StringSchema.create(['abc', 'xyz']);
StringSchema.create().values(['abc', 'xyz']);

ArraySchema.create();
ArraySchema.create(StringSchema.create());
ArraySchema.create().shape(StringSchema.create());

ObjectSchema.create();
ObjectSchema.create({
  abc: StringSchema.create(),
});
ObjectSchema.create().shape({
  abc: StringSchema.create(),
});

OneOfSchema.create([NumberSchema.create(), StringSchema.create()])

```
