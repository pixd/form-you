export const PASSED = Symbol('PASSED');

export const expect = {
  equal: expectEqual,
  not: {
    equal: expectNotEqual,
  },
  safety: {
    extends: expectSafetyExtends,
    not: {
      extends: expectSafetyNotExtends,
    },
  },
  PASSED,
};

type NeverType = 'NEVER_TYPE';
type UnknownType = 'UNKNOWN_TYPE';
type AnyType = 'ANY_TYPE';

export function expectEqual<TX, TY>(
  ..._a: Equal<TX, TY> extends true
    ? [typeof PASSED]
    : Equal<TX, never> extends true
      ? [[NeverType, TY]]
      : Equal<TX, unknown> extends true
        ? [[UnknownType, TY]]
        : Equal<TX, any> extends true
          ? [[AnyType, TY]]
          : [[TX, TY]]
) {
  return;
}

export function expectNotEqual<TX, TY>(
  ..._a: Equal<TX, TY> extends false
    ? [typeof PASSED]
    : Equal<TX, never> extends true
      ? [[NeverType, TY]]
      : Equal<TX, unknown> extends true
        ? [[UnknownType, TY]]
        : Equal<TX, any> extends true
          ? [[AnyType, TY]]
          : [[TX, TY]]
) {
  return;
}

export function expectSafetyExtends<TX, TY>(
  ..._args: Equal<TX, never> extends true
    ? [[NeverType, TY]]
    : Equal<TX, unknown> extends true
      ? [[UnknownType, TY]]
      : Equal<TX, any> extends true
        ? [[AnyType, TY]]
        : TY[] extends TX[]
          ? [typeof PASSED]
          : [[TX, TY]]
) {
  return;
}

export function expectSafetyNotExtends<TX, TY>(
  ..._args: Equal<TX, never> extends true
    ? [[NeverType, TY]]
    : Equal<TX, unknown> extends true
      ? [[UnknownType, TY]]
      : Equal<TX, any> extends true
        ? [[AnyType, TY]]
        : TY[] extends TX[]
          ? [[TX, TY]]
          : [typeof PASSED]
) {
  return;
}

export type Equal<
  TX,
  TY,
  TTrue extends boolean = true,
  TFalse extends boolean = false,
> = (<T>() => T extends TX ? 1 : 2) extends (<T>() => T extends TY ? 1 : 2) ? TTrue : TFalse;

export type NotEqual<
  TX,
  TY,
  TTrue extends boolean = true,
  TFalse extends boolean = false,
> = Equal<TX, TY, TFalse, TTrue>;
