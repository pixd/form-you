import { UpdatePayload } from './types/update.types';
import { COMMAND_KEYS } from './tools/update-command';
import { isAppendCommand, isApplyCommand, isDeleteCommand, isExcludeCommand,
  isExcludeRowCommand, isExtractCommand, isExtractRowCommand, isMoveCommand,
  isPrependCommand, isSetCommand, isSwapCommand, isUnsetCommand } from './tools/update-command';


export function update<
  TData extends any,
>(
  data: TData,
  update: UpdatePayload<TData>,
): TData;

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
      return updatePayload.$$unset ? undefined : data;
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
    else if (isApplyCommand(updatePayload)) {
      if (Array.isArray(data)) {
        const { $$apply: apply, length, skip } = updatePayload;
        const nextData = [...data];

        const removeElement = Symbol('removeElement');

        const startEndIndex = getStartEndIndex(data.length, length, skip ?? 0, true, false);

        if (typeof startEndIndex === 'boolean') {
          if (startEndIndex) {
            return nextData.map((element) => (
              isDeleteCommand(apply)
                ? apply.$$delete ? removeElement : element
                : update(element, apply)
            ))
              .filter((element) => element !== removeElement);
          }
          else {
            return nextData;
          }
        }
        else {
          const sliceData = nextData.slice(startEndIndex.start, startEndIndex.end + 1)
            .map((element) => (
              isDeleteCommand(apply)
                ? apply.$$delete ? removeElement : element
                : update(element, apply)
            ))
            .filter((element) => element !== removeElement);
          nextData.splice(startEndIndex.start, startEndIndex.end - startEndIndex.start + 1, ...sliceData);
          return nextData;
        }
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
            isDeleteCommand(updatePayload[key])
              ? updatePayload[key].$$delete && (data[key] = removeElement)
              : (data[key] = update(data[key], updatePayload[key]));
            return data;
          }, [...data])
          .filter((element) => element !== removeElement);
      }
      else {
        return Object.keys(updatePayload)
          .filter((key) => !COMMAND_KEYS.includes(key))
          .reduce((data, key) => {
            isDeleteCommand(updatePayload[key])
              ? updatePayload[key].$$delete && (delete data[key])
              : (data[key] = update(data[key], updatePayload[key]));
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
  all: T,
  nothing: T,
): T | { start: number; end: number } {
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
    return bIndex !== dataLength + aIndex;
  }
  else {
    return aIndex !== dataLength + bIndex;
  }
}
