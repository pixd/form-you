export const PASSED = Symbol('PASSED');

export const expect = {
  equal: expectEqual,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __UNSAFE__mutuallyEqual: mutuallyExpectEqual,
  not: {
    equal: expectNotEqual,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __UNSAFE__mutuallyEqual: mutuallyExpectNotEqual,
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
  ..._args: Equal<TX, TY> extends true
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
  ..._args: Equal<TX, TY> extends false
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

export function mutuallyExpectEqual<TX, TY>(
  ..._args: Equal<TX, TY> extends true
    ? [typeof PASSED]
    : Equal<TX, never> extends true
      ? [[NeverType, TY]]
      : Equal<TX, unknown> extends true
        ? [[UnknownType, TY]]
        : Equal<TX, any> extends true
          ? [[AnyType, TY]]
          : TX extends TY
            ? TY extends TX
              ? [typeof PASSED]
              : [[TX, TY]]
            : [[TX, TY]]
) {
  return;
}

export function mutuallyExpectNotEqual<TX, TY>(
  ..._args: Equal<TX, TY> extends false
    ? [typeof PASSED]
    : Equal<TX, never> extends true
      ? [[NeverType, TY]]
      : Equal<TX, unknown> extends true
        ? [[UnknownType, TY]]
        : Equal<TX, any> extends true
          ? [[AnyType, TY]]
          : TX extends TY
            ? TY extends TX
              ? [[TX, TY]]
              : [typeof PASSED]
            : [typeof PASSED]
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
        : TY extends TX
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
        : TY extends TX
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
> = (<T>() => T extends (TX & T) | T ? true : false) extends (<T>() => T extends (TY & T) | T ? true : false)
  ? ([TX] extends [never] ? true : false) extends ([TY] extends [never] ? true : false)
    ? TTrue
    : TFalse
  : TFalse;

export type NotEqual<
  TX,
  TY,
  TTrue extends boolean = true,
  TFalse extends boolean = false,
> = Equal<TX, TY, TFalse, TTrue>;
