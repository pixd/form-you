import ObjectSchema from '../src/Schema/ObjectSchema';
import StringSchema from '../src/Schema/StringSchema';
import { SchemaDataType, SchemaContextType } from '../src/types';
import { expect, PASSED } from './tools/expect';

type You<
  TContext extends Record<string, any> = object,
> = {
  string: {
    (): StringSchema<string, false, false, TContext>;
  };
  object: {
    <
      TShape extends Record<string, any> = never,
    >(
      shape: TShape,
    ): ObjectSchema<TShape, false, false, TContext>;
  };
};

type CreateCb<
  TContext extends Record<string, any> = object,
  TReturnType extends ObjectSchema = ObjectSchema,
> = {
  (
    you: You<TContext>,
  ): TReturnType;
};

type FormFactory<
  TContext extends Record<string, any> = object,
> = {
  create: {
    <
      TReturnType extends ObjectSchema = ObjectSchema,
    >(
      createCb: CreateCb<TContext, TReturnType>,
    ): TReturnType;
  };
}

type Form = {
  useContextSelector: {
    <
      TContext extends Record<string, any> = object,
    >(
      selector: {
        (state: any): TContext;
      },
    ): FormFactory<TContext>;
  };
  withContext: <
    TContext extends Record<string, any> = Record<string, any>,
  >() => FormFactory<TContext>;
};

const form = {} as Form;

// CIRCULAR DEPENDENCY VARIANT
{
  type State = {
    price: number;
    form: FormData;
  };

  type Context = {
    price: number;
    $: FormData;
  };

  const selector = (state: State): Context => ({ price: state.price, $: state.form });

  const myForm = form.useContextSelector(selector).create((you) => {
    return you.object({
      name: you.string().testContext((context) => {
        expect.equal<typeof context, { price: number; $: { name: string } }>(PASSED);
      }),
    }).testContext((context) => {
      expect.equal<typeof context, { price: number; $: { name: string } }>(PASSED);
    });
  });

  type FormData = SchemaDataType<typeof myForm>;
  type FormContext = SchemaContextType<typeof myForm>;

  expect.equal<FormData, { name: string }>(PASSED);

  expect.equal<FormContext, { price: number; $: { name: string } }>(PASSED);
}

// BASE VARIANT
{
  type State = {
    price: number;
    form: FormData;
  };

  const selector = (state: State) => ({ price: state.price });

  const myForm = form.useContextSelector(selector).create((you) => {
    return you.object({
      name: you.string().testContext((context) => {
        expect.equal<typeof context, { price: number }>(PASSED);
      }),
    }).testContext((context) => {
      expect.equal<typeof context, { price: number }>(PASSED);
    });
  });

  type FormData = SchemaDataType<typeof myForm>;
  type FormContext = SchemaContextType<typeof myForm>;

  expect.equal<FormData, { name: string }>(PASSED);

  expect.equal<FormContext, { price: number }>(PASSED);
}

// CREATE VARIANT
{
  type Context = {
    price: number;
    $: FormData;
  };

  const myForm = form.withContext<Context>().create((you) => {
    return you.object({
      name: you.string().testContext((context) => {
        expect.equal<typeof context, { price: number; $: FormData }>(PASSED);
      }),
    }).testContext((context) => {
      expect.equal<typeof context, { price: number; $: FormData }>(PASSED);
    });
  });

  type FormData = SchemaDataType<typeof myForm>;
  type FormContext = SchemaContextType<typeof myForm>;

  expect.equal<FormData, { name: string }>(PASSED);

  expect.equal<FormContext, { price: number; $: FormData }>(PASSED);
}
