import { UpdatePayload } from './update.types';

export type SetInstruction<
  TData extends any = any,
> = {
  $$set: TData;
};

export function isSetInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is SetInstruction<TData> {
  return !!instruction && '$$set' in instruction;
}

export type UnsetInstruction = {
  $$unset: true;
}

export function isUnsetInstruction(
  instruction: any,
): instruction is UnsetInstruction {
  return !!instruction && instruction.$$unset;
}

export type DeleteInstruction = {
  $$delete: true;
}

export function isDeleteInstruction(
  instruction: any,
): instruction is DeleteInstruction {
  return !!instruction && instruction.$$delete;
}

export type AppendInstruction<
  TData extends any = any,
> = {
  $$append: TData[];
  skip?: undefined | null | number;
};

export function isAppendInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is AppendInstruction<TData> {
  return !!instruction && instruction.$$append !== undefined;
}

export type PrependInstruction<
  TData extends any = any,
> = {
  $$prepend: TData[];
  skip?: undefined | null | number;
};

export function isPrependInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is PrependInstruction<TData> {
  return !!instruction && instruction.$$prepend !== undefined;
}

export type ExcludeInstruction = {
  $$exclude: number[];
};

export function isExcludeInstruction(
  instruction: any,
): instruction is ExcludeInstruction {
  return !!instruction && Array.isArray(instruction.$$exclude);
}

export type ExcludeRowInstruction = {
  $$exclude: number;
  skip?: undefined | null | number;
};

export function isExcludeRowInstruction(
  instruction: any,
): instruction is ExcludeRowInstruction {
  return !!instruction && typeof instruction.$$exclude === 'number';
}

export type ExtractInstruction = {
  $$extract: number[];
};

export function isExtractInstruction(
  instruction: any,
): instruction is ExtractInstruction {
  return !!instruction && Array.isArray(instruction.$$extract);
}

export type ExtractRowInstruction = {
  $$extract: number;
  skip?: undefined | null | number;
};

export function isExtractRowInstruction(
  instruction: any,
): instruction is ExtractRowInstruction {
  return !!instruction && typeof instruction.$$extract === 'number';
}

export type MoveInstruction = {
  $$move: [number, number];
};

export function isMoveInstruction(
  instruction: any,
): instruction is MoveInstruction {
  return !!instruction && instruction.$$move !== undefined;
}

export type SwapInstruction = {
  $$swap: [number, number];
};

export function isSwapInstruction(
  instruction: any,
): instruction is SwapInstruction {
  return !!instruction && instruction.$$swap !== undefined;
}

export type MergeInstruction<
  TData extends any = any,
> = {
  $$merge: { [key: number]: UpdatePayload<TData> } & { [ket in keyof TData]?: never };
};

export function isMergeInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is MergeInstruction<TData> {
  return !!instruction && instruction.$$merge && typeof instruction.$$merge === 'object' && !Array.isArray(instruction.$$merge);
}

export type MergeRowInstruction<
  TData extends any = any,
> = {
  $$merge: UpdatePayload<TData>[];
  at?: undefined | null | number;
};

export function isMergeRowInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is MergeRowInstruction<TData> {
  return !!instruction && Array.isArray(instruction.$$merge);
}

export type MergeAllInstruction<
  TData extends any = any,
> = {
  $$mergeAll: UpdatePayload<TData>;
};

export function isMergeAllInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is MergeAllInstruction<TData> {
  return !!instruction && instruction.$$mergeAll !== undefined;
}

export type ReplaceInstruction<
  TData extends any = any,
> = {
  $$replace: { [key: number]: TData } & { [ket in keyof TData]?: never };
};

export function isReplaceInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is ReplaceInstruction<TData> {
  return !!instruction && instruction.$$replace && typeof instruction.$$replace === 'object' && !Array.isArray(instruction.$$replace);
}

export type ReplaceRowInstruction<
  TData extends any = any,
> = {
  $$replace: TData[];
  at?: undefined | null | number;
};

export function isReplaceRowInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is ReplaceRowInstruction<TData> {
  return !!instruction && Array.isArray(instruction.$$replace);
}

export type ReplaceAllInstruction<
  TData extends any = any,
> = {
  $$replaceAll: TData;
};

export function isReplaceAllInstruction<
  TData extends any = any,
>(
  instruction: any,
): instruction is ReplaceAllInstruction<TData> {
  return !!instruction && instruction.$$replaceAll !== undefined;
}
