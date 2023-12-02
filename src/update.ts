import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';
import { AnyPathUpdateInstruction, CommonPathUpdateInstruction,
  RootPathUpdateInstruction, UpdatePayload } from './update.types';
import { isSetCommand, isUnsetCommand, isDeleteCommand, isPrependCommand,
  isAppendCommand, isExcludeCommand, isExcludeRowCommand, isExtractCommand,
  isExtractRowCommand, isMoveCommand, isSwapCommand, isMergeCommand,
  isMergeAllCommand, COMMAND_KEYS } from './update-command';

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
  if (updatePayload === undefined) {
    return data;
  }
  else if (Array.isArray(updatePayload)) {
    return updatePayload;
  }
  else if (updatePayload && typeof updatePayload === 'object') {
    if (isSetCommand(updatePayload)) {
      return updatePayload.$$set;
    }
    else if (isUnsetCommand(updatePayload)) {
      if (updatePayload.$$unset) {
        return undefined;
      }
      else {
        return data;
      }
    }
    else if (isDeleteCommand(updatePayload)) {
      throw new Error('$$delete command can not be used in update method');
    }
    else if (isAppendCommand(updatePayload)) {
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
    else if (isPrependCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const skip = Math.max(0, updatePayload.skip ?? 0);
        const nextData = [...data];
        nextData.splice(skip, 0, ...updatePayload.$$prepend);
        return nextData;
      }
      else {
        return data;
      }
    }
    else if (isExcludeCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$exclude: exclude } = updatePayload;
        const excludeElement = Symbol('excludeElement');

        const nextArray = [...data];
        exclude.forEach((key) => {
          if (key in nextArray) {
            nextArray[key] = excludeElement;
          }
        });

        return nextArray.filter((element) => element !== excludeElement);
      }
      else {
        return data;
      }
    }
    else if (isExcludeRowCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$exclude: exclude, skip } = updatePayload;
        const nextData = [...data];

        const startEndIndex = getStartEndIndex(data.length, exclude, skip ?? 0, [], nextData);

        if (Array.isArray(startEndIndex)) {
          return startEndIndex;
        }
        else {
          nextData.splice(startEndIndex.start, startEndIndex.end - startEndIndex.start + 1);
          return nextData;
        }
      }
      else {
        return data;
      }
    }
    else if (isExtractCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$extract: extract } = updatePayload;

        return extract.reduce((nextArray, key) => {
          if (key in data) {
            nextArray.push(data[key]);
          }
          return nextArray;
        }, [] as any[]);
      }
      else {
        return data;
      }
    }
    else if (isExtractRowCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$extract: extract, skip } = updatePayload;
        const nextData = [...data];

        const startEndIndex = getStartEndIndex(data.length, extract, skip ?? 0, nextData, []);

        if (Array.isArray(startEndIndex)) {
          return startEndIndex;
        }
        else {
          return nextData.slice(startEndIndex.start, startEndIndex.end + 1);
        }
      }
      else {
        return data;
      }
    }
    else if (isMoveCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$move: move } = updatePayload;
        return moveElement(move, data);
      }
      else {
        return data;
      }
    }
    else if (isSwapCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$swap: swap } = updatePayload;
        return moveElement([swap[1], swap[0]], moveElement(swap, data), true);
      }
      else {
        return data;
      }
    }
    else if (isMergeCommand(updatePayload)) {
      if (Array.isArray(data)) {
        let { $$merge: merge, at } = updatePayload;
        at = at ?? 0;

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
        return data;
      }
    }
    else if (isMergeAllCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$mergeAll: mergeAll } = updatePayload;
        return data.map((item) => {
          return update(item, mergeAll);
        });
      }
      else {
        return data;
      }
    }
    else {
      if (Array.isArray(data)) {
        const removeElement = Symbol('removeElement');
        return Object.keys(updatePayload)
          .filter((key) => !COMMAND_KEYS.includes(key))
          .reduce((data, key) => {
            if (shouldGoFurther(updatePayload[key], data, key, { value: removeElement })) {
              data[key] = update(data[key], updatePayload[key]);
            }
            return data;
          }, [...data])
          .filter((element) => element !== removeElement);
      }
      else {
        return Object.keys(updatePayload)
          .filter((key) => !COMMAND_KEYS.includes(key))
          .reduce((data, key) => {
            if (shouldGoFurther(updatePayload[key], data, key)) {
              data[key] = update(data[key], updatePayload[key]);
            }
            return data;
          }, data && typeof data === 'object' ? { ...data } : {});
      }
    }
  }
  else {
    return updatePayload;
  }
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
      const start = Math.max(0, startIndex);
      const end = Math.min(dataLength - 1, endIndex);
      return { start, end };
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

    const shift = swapResponseAction && shouldMove(move[1], move[0], data.length)
      ? Math.sign(bIndex - aIndex)
      : 0;

    const nextArray = [...data];
    nextArray.splice(bIndex, 0, nextArray.splice(aIndex + shift, 1)[0]);
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

function shouldGoFurther(
  instruction: any,
  data: Record<string, any>,
  key: number | string,
  defaultValue?: { value: any }
): boolean {
  if (isDeleteCommand(instruction)) {
    if (instruction.$$delete) {
      if (defaultValue) {
        data[key] = defaultValue.value;
      }
      else {
        delete data[key];
      }
    }
    return false;
  }
  else {
    return true;
  }
}
