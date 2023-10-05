import ObjectSchema from '../src/ObjectSchema';
import StringSchema from '../src/StringSchema';
import { SchemaDataType, SchemaContextType } from '../src/types';
import { expect, PASSED } from './tools/noop';

{
  type You<
    TContext extends object = any,
  > = {
    object: {
      <
        TData extends Record<string, any> = Record<string, never>,
        TOptional extends boolean = never,
        TNullable extends boolean = never,
      >(): ObjectSchema<TData, TOptional, TNullable, TContext>;
    };
    string: {
      <
        TData extends string = string,
        TOptional extends boolean = never,
        TNullable extends boolean = never,
      >(): StringSchema<TData, TOptional, TNullable, TContext>;
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
    return you.object().shape({
      name: you.string(),
    }).testContext((context) => {
      expect.equal<typeof context, Context>(PASSED);
    });
  });

  type FormData = SchemaDataType<typeof myForm>;
  type FormContext = SchemaContextType<typeof myForm>;

  expect.equal<FormData, {
    name: string;
  }>(PASSED);

  expect.equal<FormContext, Context>(PASSED);
}
