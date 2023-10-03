/**
 * jcalz [https://stackoverflow.com/users/2887218/jcalz] said it correctly when describing the
 * problems of this kind of tasks:
 * These recursive types are inherently "tricky" and tend to make the compiler unhappy if modified
 * slightly. If you're not lucky you will see errors like "type instantiation is excessively deep",
 * and if you're very unlucky you will see the compiler eat up all your CPU and never complete type
 * checking. I'm not sure what to say about this kind of problem in general... just that such things
 * are sometimes more trouble than they're worth.
 *
 * https://stackoverflow.com/a/58436959/20580746
 */

export type AnyData = {
  [TKey in string]: any;
};

export type AnyPath = (number | string)[];

export type AtKey<
  TData extends any,
  TKey extends number | string,
> = TData extends any[]
  ? Extract<keyof TData, `${number}` | number> extends number
    ? TData[number]
    : Extract<keyof TData, `${number}` | number> extends number | string
      ? TKey extends Extract<keyof TData, `${number}`>
        ? TData[TKey]
        : unknown
      : unknown
  : TData extends Record<number | string, any>
    ? TData[TKey]
    : unknown;

export type AtPath<
  TData extends any,
  TPath extends number | string,
> = NodeValue<TData, TPath>;

export type PrevIndex = [
  never, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ...0[],
];

export type ConcatPath<
  TPathLeft,
  TPathRight,
> = TPathLeft extends string | number
  ? TPathRight extends string | number
    ? `${TPathLeft}${TPathRight extends string ? '.' : ''}${TPathRight}`
    : never
  : never;

export type PossiblePath<
  TData extends any,
  TValue extends any = any,
  TCircularlyIndex extends number = 2,
  TCircularlyHack extends any = never,
> = TData extends TCircularlyHack
  ? PrevIndex[TCircularlyIndex] extends 0
    ? string
    : PossiblePath<TData, TValue, PrevIndex[TCircularlyIndex]>
  : TData extends object
    ? Extract<{ [TKey in keyof TData]-?: TKey extends number | string
      ? TValue extends TData[TKey]
        ? `${TKey}` | ConcatPath<TKey, PossiblePath<TData[TKey], TValue, TCircularlyIndex, TCircularlyHack | TData>>
        : ConcatPath<TKey, PossiblePath<TData[TKey], TValue, TCircularlyIndex, TCircularlyHack | TData>>
      : never;
    }[keyof TData], string>
    : never;

export type PossibleValue<
  TData extends any,
  TCircularlyHack extends any = never,
> = TData extends TCircularlyHack
  ? never
  : TData extends (infer I)[]
    ? I | PossibleValue<I, TCircularlyHack | TData>
    : TData extends object
      ? { [TKey in keyof TData]-?: TKey extends number | string
        ? TData[TKey] | PossibleValue<TData[TKey], TCircularlyHack | TData>
        : never;
      }[keyof TData]
      : never;

export type NodeValue<
  TData extends any,
  TPath extends number | string,
  // TODO That could be a better option, but it make my compiler unhappy ¯\_(ツ)_/¯
  // TPath extends PossiblePath<TData>,
> = TPath extends `${any}.`
    ? unknown
    : TPath extends `${infer TKey}.${infer TKeyRest}`
      ? AtPath<AtKey<TData, TKey>, TKeyRest>
      : AtKey<TData, TPath>;
