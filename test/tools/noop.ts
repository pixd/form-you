export default function noop<T extends any>(_a: T): void {
  return;
}

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

// eslint-disable-next-line @typescript-eslint/naming-convention
type __NEVER_TYPE__ = '__NEVER_TYPE__';
// eslint-disable-next-line @typescript-eslint/naming-convention
type __UNKNOWN_TYPE__ = '__UNKNOWN_TYPE__';
// eslint-disable-next-line @typescript-eslint/naming-convention
type __ANY_TYPE__ = '__ANY_TYPE__';

export function expectEqual<TX, TY>(
  ..._a: Equal<TX, TY> extends true
    ? [typeof PASSED]
    : Equal<TX, never> extends true
      ? [__NEVER_TYPE__]
      : Equal<TX, unknown> extends true
        ? [__UNKNOWN_TYPE__]
        : Equal<TX, any> extends true
          ? [__ANY_TYPE__]
          : [TX]
) {
  return;
}

export function expectNotEqual<TX, TY>(
  ..._a: Equal<TX, TY> extends false
    ? [typeof PASSED]
    : Equal<TX, never> extends true
      ? [__NEVER_TYPE__]
      : Equal<TX, unknown> extends true
        ? [__UNKNOWN_TYPE__]
        : Equal<TX, any> extends true
          ? [__ANY_TYPE__]
          : [TX]
) {
  return;
}

export function expectSafetyExtends<TX, TY>(
  ..._args: Equal<TX, never> extends true
    ? [__NEVER_TYPE__]
    : Equal<TX, unknown> extends true
      ? [__UNKNOWN_TYPE__]
      : Equal<TX, any> extends true
        ? [__ANY_TYPE__]
        : TY extends TX
          ? [typeof PASSED]
          : [TX]
) {
  return;
}

export function expectSafetyNotExtends<TX, TY>(
  ..._args: Equal<TX, never> extends true
    ? [__NEVER_TYPE__]
    : Equal<TX, unknown> extends true
      ? [__UNKNOWN_TYPE__]
      : Equal<TX, any> extends true
        ? [__ANY_TYPE__]
        : TY extends TX
          ? [TX]
          : [typeof PASSED]
) {
  return;
}

export type Equal<TX, TY> = (
  <T>() => T extends TX
    ? 1
    : 2
) extends (
  <T>() => (
    T extends TY
      ? 1
      : 2
  )
)
  ? true
  : false;

export type NotEqual<TX, TY> = (
  <T>() => T extends TX
    ? 1
    : 2
) extends (
  <T>() => (
    T extends TY
      ? 1
      : 2
    )
)
  ? false
  : true;
