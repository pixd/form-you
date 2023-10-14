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
    else if (updatePayload.$$prepend !== undefined) {
      if (Array.isArray(data)) {
        const skip = Math.max(0, updatePayload.skip ?? 0);
        const nextData = [...data];
        nextData.splice(
          // Yes, we know about this corner case, these two values give the same:
          // `skip` and `Math.max(0, skip)`
          Math.max(0, skip),
          0,
          ...updatePayload.$$prepend,
        );
        return nextData;
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$append !== undefined) {
      if (Array.isArray(data)) {
        const skip = Math.max(0, updatePayload.skip ?? 0);
        const nextData = [...data];
        nextData.splice(Math.max(0, data.length - skip), 0, ...updatePayload.$$append);
        return nextData;
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$exclude !== undefined) {
      if (Array.isArray(data)) {
        if (Array.isArray(updatePayload.$$exclude)) {
          const exclude = Symbol();
          const nextArray = [...data];
          updatePayload.$$exclude.forEach((key) => {
            const index = Number(key);
            nextArray[index] = exclude;
          });
          return nextArray.filter((element) => element !== exclude);
        }
        else {
          return exclude(data, updatePayload.$$exclude, updatePayload.skip);
        }
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$extract !== undefined) {
      if (Array.isArray(data)) {
        if (Array.isArray(updatePayload.$$extract)) {
          const extract = Symbol();
          const nextArray = [...data];
          updatePayload.$$extract.forEach((key) => {
            const index = Number(key);
            nextArray[index] = { extract: extract, value: data[index] };
          });
          return nextArray
            .filter((element) => (element && element.extract === extract))
            .map((element) => element.value);
        }
        else {
          return extract(data, updatePayload.$$extract, updatePayload.skip);
        }
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$move !== undefined) {
      if (Array.isArray(data)) {
        let aIndex = updatePayload.$$move[0];
        let bIndex = updatePayload.$$move[1];

        if (aIndex < 0) {
          aIndex = Math.max(0, data.length + aIndex);
        }
        else {
          aIndex = Math.min(data.length - 1, aIndex);
        }

        if (bIndex < 0) {
          bIndex = Math.max(0, data.length + bIndex);
        }
        else {
          bIndex = Math.min(data.length - 1, bIndex);
        }

        const nextArray = [...data];
        nextArray.splice(bIndex, 0, nextArray.splice(aIndex, 1)[0]);
        return nextArray;
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$swap !== undefined) {
      if (Array.isArray(data)) {
        const nextArray = [...data];
        const aIndex = updatePayload.$$swap[0];
        const bIndex = updatePayload.$$swap[1];
        nextArray[aIndex] = data[bIndex];
        nextArray[bIndex] = data[aIndex];
        return nextArray;
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$merge !== undefined) {
      if (Array.isArray(data)) {
        if (Array.isArray(updatePayload.$$merge)) {
          let merge = updatePayload.$$merge;

          const at = updatePayload.at ?? 0;
          let startIndex = at >= 0 ? at : data.length + at;
          if (startIndex < 0) {
            merge = merge.slice(-startIndex);
            startIndex = 0;
          }

          const nextData = [...data];

          merge.some((mergeItemInstruction, index) => {
            const dataIndex = startIndex + index;
            if (dataIndex > nextData.length - 1) {
              return true;
            }
            else {
              if (shouldGoFurther(mergeItemInstruction, nextData, dataIndex)) {
                nextData[dataIndex] = update(nextData[dataIndex], mergeItemInstruction);
              }
              return false;
            }
          });

          return nextData;
        }
        else {
          return Object.keys(updatePayload.$$merge)
            .filter((index) => (String(Number(index)) === index && Number(index) >= 0))
            .map((index) => Number(index))
            .reduce((data, index) => {
              if (data.length - 1 < index) {
                return data;
              }
              else {
                if (shouldGoFurther(updatePayload.$$merge[index], data, index)) {
                  data[index] = update(data[index], updatePayload.$$merge[index]);
                }
                return data;
              }
            }, [...data]);
        }
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$mergeAll !== undefined) {
      if (Array.isArray(data)) {
        return data.map((item) => {
          return update(item, updatePayload.$$mergeAll);
        });
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$replace !== undefined) {
      if (Array.isArray(data)) {
        if (Array.isArray(updatePayload.$$replace)) {
          let merge = updatePayload.$$replace;

          const at = updatePayload.at ?? 0;
          let startIndex = at >= 0 ? at : data.length + at;
          if (startIndex < 0) {
            merge = merge.slice(-startIndex);
            startIndex = 0;
          }

          const nextData = [...data];

          merge.some((mergeItemInstruction, index) => {
            const dataIndex = startIndex + index;
            if (dataIndex > nextData.length - 1) {
              return true;
            }
            else {
              nextData[dataIndex] = mergeItemInstruction;
              return false;
            }
          });

          return nextData;
        }
        else {
          return Object.keys(updatePayload.$$replace)
            .filter((index) => (String(Number(index)) === index && Number(index) >= 0))
            .map((index) => Number(index))
            .reduce((data, index) => {
              if (data.length - 1 < index) {
                return data;
              }
              else {
                data[index] = updatePayload.$$replace[index];
                return data;
              }
            }, [...data]);
        }
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$replaceAll !== undefined) {
      if (Array.isArray(data)) {
        return data.map((_) => updatePayload.$$replaceAll);
      }
      else {
        return data;
      }
    }
    else {
      if (Array.isArray(data)) {
        return data;
      }
      else if (data && typeof data === 'object') {
        return Object.keys(updatePayload)
          .reduce((data, key) => {
            if (shouldGoFurther(updatePayload[key], data, key)) {
              if (updatePayload[key] && typeof updatePayload[key] === 'object') {
                if (key in data) {
                  data[key] = update(data[key], updatePayload[key]);
                }
              }
              else {
                data[key] = update(data[key], updatePayload[key]);
              }
            }
            return data;
          }, { ...data });
      }
      else {
        return data;
      }
    }
  }
  else {
    return updatePayload;
  }
}

function checkUnsetInstruction(
  instruction: any,
): boolean {
  return instruction && typeof instruction === 'object' && instruction.$$unset;
}

function checkDeleteInstruction(
  instruction: any,
): boolean {
  return instruction && typeof instruction === 'object' && instruction.$$delete;
}

function getStartEndIndex<T>(
  dataLength: number,
  length: number,
  skip: undefined | number,
  all: T[],
  nothing: T[],
): T[] | { start: number; end: number } {
  skip = skip ?? 0;

  if (length === 0) {
    return nothing;
  }
  else {
    let startIndex: number;
    let endIndex: number;

    if (length < 0) {
      startIndex = dataLength + length - skip;
      endIndex = dataLength - skip - 1;
    }
    else {
      startIndex = skip;
      endIndex = skip + length - 1;
    }

    if (Number.isNaN(startIndex) || Number.isNaN(endIndex)) {
      return all;
    }
    else if (startIndex > dataLength - 1 || endIndex < 0) {
      return nothing;
    }
    else {
      startIndex = Math.max(0, startIndex);
      endIndex = Math.min(dataLength - 1, endIndex);

      return { start: startIndex, end: endIndex };
    }
  }
}

function exclude<T>(
  data: T[],
  length: number,
  skip: undefined | number,
): T[] {
  skip = skip ?? 0;

  const nextData = [...data];

  const startEndIndex = getStartEndIndex(data.length, length, skip, [], nextData);

  if (Array.isArray(startEndIndex)) {
    return startEndIndex;
  }
  else {
    nextData.splice(startEndIndex.start, startEndIndex.end - startEndIndex.start + 1);
    return nextData;
  }
}

function extract<T>(
  data: T[],
  length: number,
  skip: undefined | number,
): any[] {
  skip = skip ?? 0;

  const nextData = [...data];

  const startEndIndex = getStartEndIndex(data.length, length, skip, nextData, []);

  if (Array.isArray(startEndIndex)) {
    return startEndIndex;
  }
  else {
    return nextData.slice(startEndIndex.start, startEndIndex.end + 1);
  }
}

function shouldGoFurther(
  instruction: any,
  data: Record<string, any>,
  key: number | string,
  defaultValue?: { default?: any },
) {
  if (checkUnsetInstruction(instruction)) {
    data[key] = undefined;
    return false;
  }
  else if (checkDeleteInstruction(instruction)) {
    if (defaultValue && 'default' in defaultValue) {
      data[key] = defaultValue.default;
    }
    else {
      delete data[key];
    }
    return false;
  }
  else {
    return true;
  }
}
