import { PathValue, PossiblePath, PossibleValue } from '../../path/path.types';
import { Controls } from '../tools/update-command';

// Commands
import { AppendCommand, ApplyCommand, DeleteCommand, ExcludeCommand,
  ExcludeRowCommand, ExtractCommand, ExtractRowCommand, MoveCommand,
  PrependCommand, SetCommand, SwapCommand, UnsetCommand } from '../tools/update-command';

type CanBeDeletedKeys<
  TData extends any,
> = {
  [K in keyof TData]-?: { [key in K]?: TData[K] } extends { [key in K]: TData[K] }
    ? K
    : never
}[keyof TData];

type GetCommand<
  TCommand extends any,
  TKey extends number | string | symbol,
  TAcceptableKey extends number | string | symbol,
> = TKey extends TAcceptableKey
  ? TCommand
  : never;

type PreventDuality<
  T extends Record<string, any>,
> = Omit<Controls, keyof T> & T;

type PreventBaseCommand = { $$set?: undefined; $$unset?: undefined; $$delete?: undefined };

type ExcludeDataKeys<
  TData extends any,
> = Exclude<TData, undefined> extends Record<string, any>
  ? { [key in keyof TData]?: undefined }
  : object;

type Set<
  TData extends any,
> = SetCommand<TData>
  & { $$unset?: undefined; $$delete?: undefined; [key: number]: never }
  & ExcludeDataKeys<TData>;

type Unset<
  TData extends any,
> = UnsetCommand
  & { $$set?: undefined; $$delete?: undefined; [key: number]: never }
  & ExcludeDataKeys<TData>;

type Delete<
  TData extends any,
> = DeleteCommand
  & { $$set?: undefined; $$unset?: undefined; [key: number]: never }
  & ExcludeDataKeys<TData>;

export type UpdatePayload<
  TData extends any,
> = undefined | Set<TData> | (undefined extends TData ? Unset<TData> : never) | (
  TData extends (infer I)[]
    ?
      | I[]
      | PreventDuality<{
          [key in number]:
            | undefined
            | UpdatePayload<I>
            | Delete<I>
        }> & ExcludeDataKeys<I>
      | PreventDuality<AppendCommand<I>>
      | PreventDuality<PrependCommand<I>>
      | PreventDuality<ExcludeCommand>
      | PreventDuality<ExcludeRowCommand>
      | PreventDuality<ExtractCommand>
      | PreventDuality<ExtractRowCommand>
      | PreventDuality<MoveCommand>
      | PreventDuality<SwapCommand>
      | PreventDuality<ApplyCommand<I>>
    : TData extends Record<string, any>
      ? {
          [TKey in keyof TData]?:
            | UpdatePayload<TData[TKey]>
            | GetCommand<Delete<TData[TKey]>, TKey, CanBeDeletedKeys<TData>>
        } & PreventBaseCommand
      : (TData | PreventBaseCommand)
);

export type AnyPath = (number | string)[];

export type RootUpdateInstruction<
  TData extends Record<string, any>,
> = {
  path?: undefined | null;
  update: UpdatePayload<TData>;
};

export type PathUpdateInstruction<
  TData extends Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
> = {
  path: TPath;
  update: UpdatePayload<PathValue<TData, TPath>>;
};

export type AnyPathUpdateInstruction<
  TData extends Record<string, any>,
> = {
  path: AnyPath;
  update: UpdatePayload<PossibleValue<TData>>;
};

export type UpdateInstruction<
  TData extends Record<string, any>,
> =
  | RootUpdateInstruction<TData>
  | PathUpdateInstruction<TData>
  | AnyPathUpdateInstruction<TData>;
