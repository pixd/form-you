import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';

export function getAtPath<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends AnyPath = AnyPath,
>(
  data: TData,
  path: TPath,
): PossibleValue<TData>;

export function getAtPath<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
>(
  data: TData,
  path: TPath,
): NodeValue<TData, TPath>;

export function getAtPath<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends number | string = number | string,
>(
  data: TData,
  path: TPath,
):
  // @ts-ignore
  NodeValue<TData, TPath>;

export function getAtPath(
  data: Record<string, any>,
  path: number | string | AnyPath,
): any {
  const anyPath = typeof path === 'number'
    ? [path]
    : typeof path === 'string'
      ? path.split('.')
      : path;

  if (anyPath.length === 0) {
    return data;
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (data && typeof data === 'object') {
      return getAtPath(data[anyPath[0]], anyPath.slice(1));
    }
    else {
      throw new Error('Path `' + anyPath.join('.') + '` can not be reached in `' + String(data) + '`');
    }
  }
}
