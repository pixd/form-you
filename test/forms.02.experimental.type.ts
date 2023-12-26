import ObjectSchema from '../src/Schema/ObjectSchema';
import StringSchema from '../src/Schema/StringSchema';
import { SchemaDataType, SchemaContextType } from '../src/types';
import { expect, PASSED } from './tools/expect';

type You<
  TContext extends Record<string, any> = Record<string, any>,
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
  TContext extends Record<string, any> = Record<string, any>,
  TReturnType extends ObjectSchema = ObjectSchema,
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
      TReturnType extends ObjectSchema = ObjectSchema,
    >(
      createCb: CreateCb<TContext, TReturnType>,
    ): TReturnType;
  };
}

type Form = {
  useContextSelector: {
    <
      TContext extends Record<string, any> = Record<string, any>,
    >(
      selector: {
        (): TContext;
      },
    ): FormFactory<TContext>;
  };
  create: {
    <
      TReturnType extends ObjectSchema = ObjectSchema,
    >(
      createCb: CreateCb<Record<string, any>, TReturnType>,
    ): TReturnType;
  };
};

function getYou<
  TContext extends Record<string, any> = Record<string, any>,
>() {
  return {
    string: () => StringSchema.create(),
    object: (...args: any[]) => ObjectSchema.create(...args),
  } as You<TContext>;
}

// @ts-ignore
const form: Form = {
  useContextSelector: (() => {
    return;
  }) as any,
  // withContext: (() => {
  //   return;
  // }) as any,
  create: <
    TReturnType extends ObjectSchema = ObjectSchema,
  >(
    cb: CreateCb<Record<string, never>, TReturnType>,
  ): TReturnType => {
    return cb(getYou());
  },
};

// CIRCULAR DEPENDENCY VARIANT
{
  const state = {} as { price: number; form: FormData };

  type Context = {
    price: number;
    $: FormData;
  };

  const selector = (): Context => ({ price: state.price, $: state.form });

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
  const state = {} as { price: number; form: FormData };

  const selector = () => ({ price: state.price });

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
// {
//   const myForm = form.create((you) => {
//     return you.object({
//       name: you.string().context<{ price: number }>().testContext((context) => {
//         expect.equal<typeof context, { price: number }>(PASSED);
//       }),
//     }).context<{ price: number }>().testContext((context) => {
//       expect.equal<typeof context, { price: number }>(PASSED);
//     });
//   });
//
//   type FormData = SchemaDataType<typeof myForm>;
//   type FormContext = SchemaContextType<typeof myForm>;
//
//   expect.equal<FormData, { name: string }>(PASSED);
//
//   expect.equal<FormContext, { price: number }>(PASSED);
// }
