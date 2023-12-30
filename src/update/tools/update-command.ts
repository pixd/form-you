import { UpdatePayload } from '../types/update.types';

export const COMMAND_KEYS = [
  '$$set',
  '$$unset',
  '$$delete',

  '$$append',
  '$$prepend',
  '$$exclude',
  '$$extract',
  '$$move',
  '$$swap',
  '$$apply',
];

export type Controls = {
  $$set?: undefined;
  $$unset?: undefined;
  $$delete?: undefined;

  $$append?: undefined;
  $$prepend?: undefined;
  $$exclude?: undefined;
  $$extract?: undefined;
  $$move?: undefined;
  $$swap?: undefined;
  $$apply?: undefined;

  length?: undefined;
  skip?: undefined;
  at?: undefined;

  [key: number]: never;
};

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
  return !!instruction && instruction.$$set !== undefined;
}

export type UnsetCommand = {
  $$unset: boolean;
};

export function isUnsetCommand(
  instruction: any,
): instruction is UnsetCommand {
  return !!instruction && typeof instruction.$$unset === 'boolean';
}

export type DeleteCommand = {
  $$delete: boolean;
};

export function isDeleteCommand(
  instruction: any,
): instruction is DeleteCommand {
  return !!instruction && typeof instruction.$$delete === 'boolean';
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

export type ApplyCommand<
  TData extends any = any,
> = {
  $$apply: UpdatePayload<TData>;
  length?: undefined | number;
  skip?: undefined | number;
};

export function isApplyCommand<
  TData extends any = any,
>(
  instruction: any,
): instruction is ApplyCommand<TData> {
  return !!instruction && instruction.$$apply !== undefined;
}

/**
 * $$append: Member[], skip?: ±number = 0
 * $$prepend: Member[], skip?: ±number = 0
 * $$exclude: number[]
 * $$exclude: ±number, skip?: ±number = 0
 * $$extract: number[]
 * $$extract: ±number, skip?: ±number = 0
 * $$move: [number, number]
 * $$swap: [number, number]
 * $$apply: UpdatePayload<Member> | Delete<Member>, length?: ±number, skip?: ±number = 0
 */
