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
    return you.object().refine({
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
