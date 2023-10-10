import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';
import { AnyPathUpdateInstruction, CommonPathUpdateInstruction, RootPathUpdateInstruction,
  UpdatePayload } from './update.types';

export function updateWithInstruction<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
>(
  data: TData,
  instruction: CommonPathUpdateInstruction<TData, TPath>,
): TData;

export function updateWithInstruction<
  TData extends Record<string, any> = Record<string, any>,
>(
  data: TData,
  instruction: AnyPathUpdateInstruction<TData> | RootPathUpdateInstruction<TData>,
): TData;

export function updateWithInstruction(
  data: Record<string, any>,
  instruction: any,
) {
  if (instruction.path) {
    return updateAtPath(data, instruction.path, instruction.update);
  }
  else {
    return update(data, instruction.update);
  }
}

export function updateAtPath<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
>(
  data: TData,
  path: TPath,
  updatePayload: UpdatePayload<NodeValue<TData, TPath>>,
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
  const anyPath = typeof path === 'number'
    ? [path]
    : typeof path === 'string'
      ? path.split('.')
      : path;

  if (anyPath.length === 0) {
    return update(data, updatePayload);
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (data && typeof data === 'object') {
      const nextData = Array.isArray(data) ? [...data] : { ...data };
      const key = anyPath[0];

      if (anyPath.length === 1 && checkUnsetInstruction(updatePayload)) {
        nextData[key] = undefined;
      }
      else if (anyPath.length === 1 && checkDeleteInstruction(updatePayload)) {
        delete nextData[key];
      }
      else {
        nextData[key] = updateAtPath(data[key], anyPath.slice(1), updatePayload);
      }

      return nextData;
    }
    else {
      throw new Error('Path `' + anyPath.join('.') + '` can not be reached in `' + String(data) + '`');
    }
  }
}

export function update<
  TData extends any,
>(
  data: TData,
  update: UpdatePayload<TData>,
): TData

export function update(
  data: any,
  updatePayload: any,
) {
  if (Array.isArray(updatePayload)) {
    return updatePayload;
  }
  else if (updatePayload && typeof updatePayload === 'object') {
    if ('$$set' in updatePayload) {
      return updatePayload.$$set;
    }
    else if (updatePayload.$$unset) {
      throw new Error('$$unset instruction can not be used in update method');
    }
    else if (updatePayload.$$delete) {
      throw new Error('$$delete instruction can not be used in update method');
    }
    else if (updatePayload.$$prepend) {
      if (Array.isArray(data)) {
        return [].concat(updatePayload.$$prepend).concat(data as any);
      }
      else {
        return [...updatePayload.$$prepend];
      }
    }
    else if (updatePayload.$$append !== undefined) {
      if (Array.isArray(data)) {
        return [].concat(data as any).concat(updatePayload.$$append);
      }
      else {
        return [...updatePayload.$$append];
      }
    }
    else if (updatePayload.$$exclude !== undefined) {
      if (Array.isArray(data)) {
        const keys = [].concat(updatePayload.$$exclude);
        const exclude = Symbol();
        const nextArray = [...data];
        keys.forEach((key) => {
          const index = Number(key);
          nextArray[index] = exclude;
        });
        return nextArray.filter((element) => element !== exclude);
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$excludeLeft !== undefined) {
      if (Array.isArray(data)) {
        return length(data, updatePayload.$$excludeLeft, updatePayload.skip);
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$excludeRight !== undefined) {
      if (Array.isArray(data)) {
        return length(data, -updatePayload.$$excludeRight, updatePayload.skip);
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$extract !== undefined) {
      if (Array.isArray(data)) {
        const keys = [].concat(updatePayload.$$extract);
        const extract = Symbol();
        const nextArray = [...data];
        keys.forEach((key) => {
          const index = Number(key);
          nextArray[index] = { extract: extract, value: data[index] };
        });
        return nextArray
          .filter((element) => (element && element.extract === extract))
          .map((element) => element.value);
      }
      else {
        return [];
      }
    }
    else if (updatePayload.$$extractLeft !== undefined) {
      if (Array.isArray(data)) {
        return extract(data, updatePayload.$$extractLeft, updatePayload.skip);
      }
      else {
        return [];
      }
    }
    else if (updatePayload.$$extractRight !== undefined) {
      if (Array.isArray(data)) {
        return extract(data, -updatePayload.$$extractRight, updatePayload.skip);
      }
      else {
        return [];
      }
    }
    else if (updatePayload.$$move !== undefined) {
      if (Array.isArray(data)) {
        const nextArray = [...data];
        const aIndex = Number(updatePayload.$$move[0]);
        const bIndex = Number(updatePayload.$$move[1]);
        const moved = nextArray.splice(aIndex, 1)[0];
        nextArray.splice(bIndex, 0, moved);
        return nextArray;
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$swap !== undefined) {
      if (Array.isArray(data)) {
        const nextArray = [...data];
        const aIndex = Number(updatePayload.$$swap[0]);
        const bIndex = Number(updatePayload.$$swap[1]);
        nextArray[aIndex] = data[bIndex];
        nextArray[bIndex] = data[aIndex];
        return nextArray;
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$merge !== undefined) {
      return Object.keys(updatePayload)
        .filter((key) => (String(Number(key)) === key && Number(key) >= 0))
        .reduce((data, key) => {
          if (checkUnsetInstruction(updatePayload[key])) {
            data[key] = undefined;
          }
          else if (checkDeleteInstruction(updatePayload[key])) {
            delete data[key];
          }
          else {
            data[key] = update(data[key], updatePayload[key]);
          }
          return data;
        }, Array.isArray(data) ? [...data] : []);
    }
    else if (updatePayload.$$apply !== undefined) {
      if (Array.isArray(data)) {
        return data.map((item) => {
          return update(item, updatePayload.$$apply);
        });
      }
      else {
        return [];
      }
    }
    else if (updatePayload.$$reset !== undefined) {
      if (Array.isArray(data)) {
        return data.map((_) => updatePayload.$$reset);
      }
      else {
        return [];
      }
    }
    else {
      return Object.keys(updatePayload)
        .reduce((data, key) => {
          if (checkUnsetInstruction(updatePayload[key])) {
            data[key] = undefined;
          }
          else if (checkDeleteInstruction(updatePayload[key])) {
            delete data[key];
          }
          else {
            data[key] = update(data[key], updatePayload[key]);
          }
          return data;
        }, data instanceof Object ? { ...data } : {});
    }
  }
  else {
    return updatePayload;
  }
}

function checkUnsetInstruction(instruction: any): boolean {
  return instruction && typeof instruction === 'object' && instruction.$$unset;
}

function checkDeleteInstruction(instruction: any): boolean {
  return instruction && typeof instruction === 'object' && instruction.$$delete;
}

function length<T>(
  data: T[],
  length: number,
  skip: number,
): T[] {
  length = length || 0;
  skip = skip || 0;

  if (length === 0) {
    return data;
  }
  else if (length < 0) {
    if (length === -Infinity) {
      if (skip === 0) {
        return [];
      }
      else {
        return data.slice(-skip);
      }
    }
    else {
      if (skip === 0) {
        return data.slice(length);
      }
      else {
        return data.slice(-skip + length, -skip);
      }
    }
  }
  else {
    if (length === Infinity) {
      if (skip === 0) {
        return [];
      }
      else {
        return data.slice(0, skip);
      }
    }
    else {
      if (skip === 0) {
        return data.slice(length);
      }
      else {
        return data.slice(skip, skip + length);
      }
    }
  }
}

function extract<T>(
  data: T[],
  length: number,
  skip: number,
): any[] {
  length = length || 0;
  skip = skip || 0;

  if (length === 0) {
    return [];
  }
  else if (length < 0) {
    if (length === -Infinity) {
      if (skip === 0) {
        return [...data];
      }
      else {
        return data.slice(0, -skip);
      }
    }
    else {
      if (skip === 0) {
        return data.slice(length);
      }
      else {
        return data.slice(-skip + length, -skip);
      }
    }
  }
  else {
    if (length === Infinity) {
      if (skip === 0) {
        return [...data];
      }
      else {
        return data.slice(skip);
      }
    }
    else {
      if (skip === 0) {
        return data.slice(0, length);
      }
      else {
        return data.slice(skip, skip + length);
      }
    }
  }
}

export type FormUpdateInstruction<
  TFormState extends Record<string, any> = Record<string, any>,
> = (
  | RootPathUpdateInstruction<TFormState>
  | CommonPathUpdateInstruction<TFormState>
  | AnyPathUpdateInstruction<TFormState>
) & {
  meta?: Record<string, any>;
};

export type UpdateForm<
  TFormState extends Record<string, any> = Record<string, any>,
> = {
  (state: TFormState, update: FormUpdateInstruction<TFormState>): TFormState;
};
