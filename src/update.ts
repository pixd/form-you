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
      const { $$exclude: exclude } = updatePayload;

      if (Array.isArray(data)) {
        if (Array.isArray(exclude)) {
          const excludeElement = Symbol();

          const nextArray = [...data];
          exclude.forEach((key) => {
            if (key in nextArray) {
              nextArray[key] = excludeElement;
            }
          });

          return nextArray
            .filter((element) => element !== excludeElement);
        }
        else {
          return excludeElements(data, exclude, updatePayload.skip);
        }
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$extract !== undefined) {
      const { $$extract: extract } = updatePayload;

      if (Array.isArray(data)) {
        if (Array.isArray(extract)) {
          const extractElement = Symbol();

          const nextArray = [...data];
          extract.forEach((key) => {
            if (key in nextArray) {
              nextArray[key] = { extract: extractElement, value: data[key] };
            }
          });

          return nextArray
            .filter((element) => (element && element.extract === extractElement))
            .map((element) => element.value);
        }
        else {
          return extractElements(data, extract, updatePayload.skip);
        }
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$move !== undefined) {
      if (Array.isArray(data)) {
        const { $$move: move } = updatePayload;
        return moveElement(move, data);
      }
      else {
        return data;
      }
    }
    else if (updatePayload.$$swap !== undefined) {
      if (Array.isArray(data)) {
        const { $$swap: swap } = updatePayload;
        return moveElement([swap[1], swap[0]], moveElement(swap, data), true);
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
          let replace = updatePayload.$$replace;

          const at = updatePayload.at ?? 0;
          let startIndex = at >= 0 ? at : data.length + at;
          if (startIndex < 0) {
            replace = replace.slice(-startIndex);
            startIndex = 0;
          }

          const nextData = [...data];

          replace.some((mergeItemInstruction, index) => {
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

function getPositiveIndexPair(
  pair: [number, number],
  dataLength: number,
): [number, number] {
  return [
    getPositiveIndex(pair[0], dataLength),
    getPositiveIndex(pair[1], dataLength),
  ];
}

function getPositiveIndex(
  index: number,
  dataLength: number,
): number {
  if (index < 0) {
    return Math.max(0, dataLength + index);
  }
  else {
    return Math.min(dataLength - 1, index);
  }
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

function moveElement<T>(
  move: [number, number],
  data: T[],
  swapResponseAction: boolean = false,
): T[] {
  if (shouldMove(...move, data.length)) {
    const [aIndex, bIndex] = getPositiveIndexPair([move[0], move[1]], data.length);

    const shiftValue = swapResponseAction && shouldMove(move[1], move[0], data.length)
      ? Math.sign(bIndex - aIndex)
      : 0;

    const nextArray = [...data];
    nextArray.splice(bIndex, 0, nextArray.splice(aIndex + shiftValue, 1)[0]);
    return nextArray;
  }
  else {
    return data;
  }
}

function shouldMove(
  aIndex: number,
  bIndex: number,
  dataLength: number,
): boolean {
  if (dataLength === 0) {
    return false;
  } if (aIndex > dataLength - 1 || aIndex < -dataLength) {
    return false;
  }
  else if (aIndex === bIndex) {
    return false;
  }
  else if (aIndex < 0) {
    if (bIndex === dataLength + aIndex) {
      return false;
    }
    else {
      return true;
    }
  }
  else {
    if (aIndex === dataLength + bIndex) {
      return false;
    }
    else {
      return true;
    }
  }
}

function excludeElements<T>(
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

function extractElements<T>(
  data: T[],
  length: number,
  skip: undefined | number,
): T[] {
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
): boolean {
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
