import { UpdatePayload } from './update.types';

export type SetCommand<
  TData extends any = any,
> = {
  $$set: TData;
};

export function isSetCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is SetCommand<TData> {
  return !!instruction && '$$set' in instruction;
}

export type UnsetCommand = {
  $$unset: true;
}

export function isUnsetCommand(
  instruction: any,
): instruction is UnsetCommand {
  return !!instruction && instruction.$$unset;
}

export type DeleteCommand = {
  $$delete: true;
}

export function isDeleteCommand(
  instruction: any,
): instruction is DeleteCommand {
  return !!instruction && instruction.$$delete;
}

export type AppendCommand<
  TData extends any = any,
> = {
  $$append: TData[];
  skip?: undefined | null | number;
};

export function isAppendCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is AppendCommand<TData> {
  return !!instruction && instruction.$$append !== undefined;
}

export type PrependCommand<
  TData extends any = any,
> = {
  $$prepend: TData[];
  skip?: undefined | null | number;
};

export function isPrependCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is PrependCommand<TData> {
  return !!instruction && instruction.$$prepend !== undefined;
}

export type ExcludeCommand = {
  $$exclude: number[];
};

export function isExcludeCommand(
  instruction: any,
): instruction is ExcludeCommand {
  return !!instruction && Array.isArray(instruction.$$exclude);
}

export type ExcludeRowCommand = {
  $$exclude: number;
  skip?: undefined | null | number;
};

export function isExcludeRowCommand(
  instruction: any,
): instruction is ExcludeRowCommand {
  return !!instruction && typeof instruction.$$exclude === 'number';
}

export type ExtractCommand = {
  $$extract: number[];
};

export function isExtractCommand(
  instruction: any,
): instruction is ExtractCommand {
  return !!instruction && Array.isArray(instruction.$$extract);
}

export type ExtractRowCommand = {
  $$extract: number;
  skip?: undefined | null | number;
};

export function isExtractRowCommand(
  instruction: any,
): instruction is ExtractRowCommand {
  return !!instruction && typeof instruction.$$extract === 'number';
}

export type MoveCommand = {
  $$move: [number, number];
};

export function isMoveCommand(
  instruction: any,
): instruction is MoveCommand {
  return !!instruction && instruction.$$move !== undefined;
}

export type SwapCommand = {
  $$swap: [number, number];
};

export function isSwapCommand(
  instruction: any,
): instruction is SwapCommand {
  return !!instruction && instruction.$$swap !== undefined;
}

export type MergeCommand<
  TData extends any = any,
> = {
  $$merge: { [key: number]: UpdatePayload<TData> } & { [ket in keyof TData]?: never };
};

export function isMergeCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is MergeCommand<TData> {
  return !!instruction && instruction.$$merge && typeof instruction.$$merge === 'object' && !Array.isArray(instruction.$$merge);
}

export type MergeRowCommand<
  TData extends any = any,
> = {
  $$merge: UpdatePayload<TData>[];
  at?: undefined | null | number;
};

export function isMergeRowCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is MergeRowCommand<TData> {
  return !!instruction && Array.isArray(instruction.$$merge);
}

export type MergeAllCommand<
  TData extends any = any,
> = {
  $$mergeAll: UpdatePayload<TData>;
};

export function isMergeAllCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is MergeAllCommand<TData> {
  return !!instruction && instruction.$$mergeAll !== undefined;
}

export type ReplaceCommand<
  TData extends any = any,
> = {
  $$replace: { [key: number]: TData } & { [ket in keyof TData]?: never };
};

export function isReplaceCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is ReplaceCommand<TData> {
  return !!instruction && instruction.$$replace && typeof instruction.$$replace === 'object' && !Array.isArray(instruction.$$replace);
}

export type ReplaceRowCommand<
  TData extends any = any,
> = {
  $$replace: TData[];
  at?: undefined | null | number;
};

export function isReplaceRowCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is ReplaceRowCommand<TData> {
  return !!instruction && Array.isArray(instruction.$$replace);
}

export type ReplaceAllCommand<
  TData extends any = any,
> = {
  $$replaceAll: TData;
};

export function isReplaceAllCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is ReplaceAllCommand<TData> {
  return !!instruction && instruction.$$replaceAll !== undefined;
}
