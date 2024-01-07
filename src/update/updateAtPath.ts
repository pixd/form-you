import { AnyPath, PathValue, PossiblePath, PossibleValue } from '../path/path.types';
import { update } from './update';
import { UpdatePayload } from './types/update.types';
import { isUnsetCommand, isDeleteCommand } from './tools/update-command';

export function updateAtPath<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
>(
  data: TData,
  path: TPath,
  updatePayload: UpdatePayload<PathValue<TData, TPath>>,
): TData;

export function updateAtPath<
  TData extends Record<string, any> = Record<string, any>,
>(
  data: TData,
  path: AnyPath,
  updatePayload: UpdatePayload<PossibleValue<TData>>,
): TData;

export function updateAtPath(
  data: Record<string, any>,
  path: number | string | AnyPath,
  updatePayload: any,
) {
  const anyPath = (Array.isArray(path) ? path.map((path) => String(path)) : [path]).reduce((anyPath, path) => {
    return anyPath.concat(String(path).split('.'));
  }, [] as string[]);

  if (anyPath.length === 0) {
    return update(data, updatePayload);
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (data && typeof data === 'object') {
      const nextData = Array.isArray(data) ? [...data] : { ...data };
      const key = anyPath[0];

      if (anyPath.length === 1 && isUnsetCommand(updatePayload)) {
        nextData[key] = undefined;
      }
      else if (anyPath.length === 1 && isDeleteCommand(updatePayload)) {
        delete nextData[key];
      }
      else {
        nextData[key] = updateAtPath(data[key], anyPath.slice(1), updatePayload);
      }

      return nextData;
    }
    else {
      const path = anyPath.join('.');
      const message = `Path \`${path}\` can not be reached in ${String(data)}`;
      throw new Error(message);
    }
  }
}
