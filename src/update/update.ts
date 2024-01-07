import { UpdatePayload } from './types/update.types';
import { COMMAND_KEYS } from './tools/update-command';
import { stringify, GetUpdateError, GetUpdateErrorDesc } from '../error-messages';

// Commands
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
  else if (updatePayload && typeof updatePayload === 'object') {
    switch (true) {
      case (Array.isArray(updatePayload)): {
        return updatePayload;
      }
      case (isSetCommand(updatePayload)): {
        return updatePayload.$$set;
      }
      case (isUnsetCommand(updatePayload)): {
        return updatePayload.$$unset ? undefined : data;
      }
      case (isDeleteCommand(updatePayload)): {
        throw new Error('$$delete can not be used as root command in update methods');
      }
      case (isAppendCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const skip = Math.max(0, updatePayload.skip ?? 0);
          const nextData = [...data];
          nextData.splice(Math.max(0, data.length - skip), 0, ...updatePayload.$$append);
          return nextData;
        }
        else {
          const desc = { problemPath: null, data, update: updatePayload };
          return notAnArray('$$append', data, desc);
        }
      }
      case (isPrependCommand(updatePayload)): {
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
      case (isExcludeCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const { $$exclude: exclude } = updatePayload;
          const excludeElement = Symbol('excludeElement');

          const nextArray = [...data];
          exclude.forEach((key) => {
            if (key < 0) {
              key = data.length + key;
            }
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
      case (isExcludeRowCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const { $$exclude: exclude, skip } = updatePayload;
          const nextData = [...data];

          const startEndIndex = getIndexes(data.length, exclude, skip, [], nextData);

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
      case (isExtractCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const { $$extract: extract } = updatePayload;

          return extract.reduce((nextArray, key) => {
            if (key < 0) {
              key = data.length + key;
            }
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
      case (isExtractRowCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const { $$extract: extract, skip } = updatePayload;
          const nextData = [...data];

          const startEndIndex = getIndexes(data.length, extract, skip, nextData, []);

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
      case (isMoveCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const { $$move: move } = updatePayload;
          return moveElement(move, data);
        }
        else {
          return data;
        }
      }
      case (isSwapCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const { $$swap: swap } = updatePayload;
          return moveElement([swap[1], swap[0]], moveElement(swap, data), true);
        }
        else {
          return data;
        }
      }
      case (isApplyCommand(updatePayload)): {
        if (Array.isArray(data)) {
          const { $$apply: apply, length, skip } = updatePayload;
          const nextData = [...data];

          const removeElement = Symbol('removeElement');

          const startEndIndex = getIndexes(data.length, length, skip, true, false);

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
      default: {
        if (Array.isArray(data)) {
          const removeElement = Symbol('removeElement');
          return Object.keys(updatePayload)
            .filter((key) => !COMMAND_KEYS.includes(key))
            .reduce((result, key) => {
              if (isDeleteCommand(updatePayload[key])) {
                updatePayload[key].$$delete && (result[key] = removeElement);
              }
              else {
                try {
                  result[key] = update(result[key], updatePayload[key]);
                }
                catch (error) {
                  if (error instanceof GetUpdateError) {
                    error.desc.problemPath = error.desc.problemPath == null
                      ? key
                      : (key + '.' + error.desc.problemPath);
                    error.desc.data = data;
                    error.desc.update = updatePayload;
                  }
                  throw error;
                }
              }
              return result;
            }, [...data])
            .filter((element) => element !== removeElement);
        }
        else {
          return Object.keys(updatePayload)
            .filter((key) => !COMMAND_KEYS.includes(key))
            .reduce((result, key) => {
              if (isDeleteCommand(updatePayload[key])) {
                updatePayload[key].$$delete && (delete result[key]);
              }
              else {
                try {
                  result[key] = update(result[key], updatePayload[key]);
                }
                catch (error) {
                  if (error instanceof GetUpdateError) {
                    error.desc.problemPath = error.desc.problemPath == null
                      ? key
                      : (key + '.' + error.desc.problemPath);
                    error.desc.data = data;
                    error.desc.update = updatePayload;
                  }
                  throw error;
                }
              }
              return result;
            }, data && typeof data === 'object' ? { ...data } : {});
        }
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

function getIndexes<T>(
  dataLength: number,
  length: undefined | null | number,
  skip: undefined | null | number,
  all: T,
  nothing: T,
): T | { start: number; end: number } {
  length = length ?? dataLength;
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

function notAnArray(command: string, data: any, desc: GetUpdateErrorDesc) {
  const message = `Can not use ${stringify(command)} with non-object value (${stringify(data)} was received)`;
  throw new GetUpdateError(message, desc);
}
