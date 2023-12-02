import ObjectSchema from '../src/ObjectSchema';
import StringSchema from '../src/StringSchema';
import { SchemaDataType, SchemaContextType } from '../src/types';
import { expect, PASSED } from './tools/expect';

{
  type You<
    TContext extends Record<string, any> = never,
  > = {
    object: {
      <
        TData extends Record<string, any> = never,
      >(): ObjectSchema<TData, false, false, TContext>;
    };
    string: {
      <
        TData extends string = string,
      >(): StringSchema<TData, false, false, TContext>;
    };
  };

  type CreateCb<
    TContext extends Record<string, any> = Record<string, any>,
    TReturnType extends any = any,
  > = {
    (
      you: You<TContext>,
    ): TReturnType;
  };

  type FormFactory<
    TContext extends Record<string, any> = Record<string, any>,
  > = {
    create: {
      <
        TReturnType extends any = any,
      >(
        createCb: CreateCb<TContext, TReturnType>,
      ): TReturnType;
    };
  }

  type Form = {
    withContext: <
      TContext extends Record<string, any> = Record<string, any>,
    >() => FormFactory<TContext>;
  };

  // @ts-ignore
  const form: Form = undefined as Form;

  type Context = {
    price: number;
    $: FormData;
  };

  const myForm = form.withContext<Context>().create((you) => {
    return you.object().concat({
      name: you.string(),
    }).testContext((context) => {
      expect.equal<typeof context, Context>(PASSED);
    });
  });

  type FormData = SchemaDataType<typeof myForm>;
  type FormContext = SchemaContextType<typeof myForm>;

  expect.equal<FormData, { name: string }>(PASSED);

  expect.equal<FormContext, Context>(PASSED);
}

/*
  Состояние элемента формы:
  {
    value: any;
    prevValue: any;
    initialValue: any;
    modified: boolean;
    modifiedAt: number;
  }

  <Input {...userForm.name.control} />
  <Input {...userForm.company.address.city.field.props} />
  -- <Input {...userForm.friends[0].address.city.field.props} />
  <Input {...userForm.friends(0).address.city.field.props} />
  <Input {...userForm.friends.at(0).address.city.field.props} />
  <Input {...userForm.friends.state.at(0).address.city.field.props} />
  <Input {...userForm.friends.asArray().at(0).address.city.field.props} />
  <Input {...userForm.friends(0).as<Friend>().address.city.field.props} />
  <Input {...userForm.friend.as<Boss>().address.city.field.props} />

  <Input {...userForm.control('friend.address.city').field.props} />

  {isBoss(userForm.friend)
    ? <Boss {...userForm.friend.as<Boss>()} />
    : <User {...userForm.friend.as<User>()} />}

  updateAtPath('friends.0.address.city', 'Moscow');

  tariffForm.rates.update({ $$append: [{ name: 'abc' }] })
  tariffForm.rates.elements.map()

  StringSchema.create().refine();

  ObjectSchema.create().refine();
  ObjectSchema.create().concat({});

  OneOfSchema.create({
    product: ObjectSchema.create(),
    productId: StringSchema.create(),
  }).refine();

  refine(schema)
  refine(fn)

  refine('path', schema)
  refine('path', fn)

  update({
    [prop]: update
  })
  update({
    [prop]: fn
  })

  BooleanSchema NumberSchema  StringSchema  ArraySchema   ObjectSchema  OneOfSchema
 */
