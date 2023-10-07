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
  path: number | string | (number | string)[],
): any {
  const pathParts = typeof path === 'number'
    ? [String(path)]
    : typeof path === 'string'
      ? path.split('.')
      : path;

  if (pathParts.length === 0) {
    return data;
  }
  else {
    if (data instanceof Object) {
      return getAtPath(data[pathParts[0]], pathParts.slice(1));
    }
    else {
      throw new Error('Path `' + pathParts.join('.') + '` can not be reached in `' + data + '`');
    }
  }
}
