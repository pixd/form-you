import { AnyPath, PathValue, PossiblePath, PossibleValue } from './path.types';
import { stringify, GetUpdateError } from '../error-messages';

export function get<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends AnyPath = AnyPath,
>(
  data: TData,
  path: TPath,
): PossibleValue<TData>;

export function get<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
>(
  data: TData,
  path: TPath,
): PathValue<TData, TPath>;

export function get(
  data: any,
  path: undefined | null | string | AnyPath,
): any {
  const reject = (path: string, data: any) => {
    const message = `Cannot read properties of ${stringify(data)} (reading ${stringify(path)})`;
    const desc = { problemPath: path, data, path };
    throw new GetUpdateError(message, desc);
  };
  return commonGet(reject, data, path);
}

export function quietGet<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends AnyPath = AnyPath,
  TRejectValue extends any = undefined,
>(
  data: TData,
  path: TPath,
  rejectValue?: TRejectValue,
): PossibleValue<TData> | TRejectValue;

export function quietGet<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
  TRejectValue extends any = undefined,
>(
  data: TData,
  path: TPath,
  rejectValue?: TRejectValue,
): PathValue<TData, TPath> | TRejectValue;

export function quietGet(
  data: any,
  path: undefined | null | string | AnyPath,
  rejectValue?: any
): any {
  const reject = () => {
    return rejectValue;
  };
  // @ts-expect-error
  return commonGet(reject, data, path, rejectValue);
}

function commonGet(
  reject: (path: string, data: any) => any,
  data: any,
  path: undefined | null | string | AnyPath,
): any {
  if (path == null) {
    return data;
  }
  else {
    const anyPath = (Array.isArray(path) ? path.map((path) => String(path)) : [path]).reduce((anyPath, path) => {
      return anyPath.concat(String(path).split('.'));
    }, [] as string[]);

    if (anyPath.length === 0) {
      return data;
    }
    else {
      if (data == null || typeof data !== 'object') {
        return reject(anyPath[0], data);
      }
      else {
        if (anyPath.length === 1) {
          return data[anyPath[0]];
        }
        else {
          try {
            return commonGet(reject, data[anyPath[0]], anyPath.slice(1));
          }
          catch (error) {
            if (error instanceof GetUpdateError) {
              error.desc.problemPath = anyPath[0] + '.' + error.desc.problemPath;
              error.desc.data = data;
              error.desc.path = anyPath.join('.');
            }
            throw error;
          }
        }
      }
    }
  }
}

/*
  get(data, path)
  get(data, path)

  quietGet(data, path)
  quietGet(data, path, rejectValue)

  update(data, update)
  update(data, path, update)

  quietUpdate(data, update)
  quietUpdate(data, update, rejectValue)
  quietUpdate(data, path, update)
  quietUpdate(data, path, update, rejectValue)

  updateWithInstruction(data, instruction)

  quietUpdateWithInstruction(data, instruction)
  quietUpdateWithInstruction(data, instruction, rejectValue)

  exists(data, path, v => typeof v === 'object'): boolean
 */
