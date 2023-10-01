import ObjectSchema from '../src/ObjectSchema';
import StringSchema from '../src/StringSchema';
import { SchemaDataType, SchemaContextType } from '../src/types';
import noop from './tools/noop';

{
  type You<
    TContext extends object = any,
  > = {
    object: {
      <
        TData extends Record<string, any> = Record<string, never>,
        TOptional extends boolean = boolean,
        TNullable extends boolean = boolean,
      >(): ObjectSchema<TData, TOptional, TNullable, TContext>;
    };
    string: {
      <
        TData extends string = string,
        TOptional extends boolean = boolean,
        TNullable extends boolean = boolean,
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
      name: StringSchema.create(),
    }).testContext((context) => {
      type FormContext = typeof context;

      noop<FormContext>({
        price: 1,
        $: {
          name: '',
        },
      });

      noop<FormContext>({
        // @ts-expect-error
        price: '',
        $: {
          name: '',
        },
      });

      // @ts-expect-error
      noop<FormContext>({
        price: 1,
      });

      noop<FormContext>({
        price: 1,
        // @ts-expect-error
        $: {},
      });

      noop<FormContext>({
        price: 1,
        $: {
          // @ts-expect-error
          name: 1,
        },
      });
    });
  });

  type FormData = SchemaDataType<typeof myForm>;
  type FormContext = SchemaContextType<typeof myForm>;

  noop<FormData>({
    name: '',
  });

  noop<FormData>({
    // @ts-expect-error
    name: 1,
  });

  // @ts-expect-error
  noop<FormData>({});

  noop<FormContext>({
    price: 1,
    $: {
      name: '',
    },
  });

  noop<FormContext>({
    // @ts-expect-error
    price: '',
    $: {
      name: '',
    },
  });

  // @ts-expect-error
  noop<FormContext>({
    price: 1,
  });

  noop<FormContext>({
    price: 1,
    // @ts-expect-error
    $: {},
  });

  noop<FormContext>({
    price: 1,
    $: {
      // @ts-expect-error
      name: 1,
    },
  });
}
