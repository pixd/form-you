import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';
import { AppendCommand, DeleteCommand, ExcludeCommand,
  ExcludeRowCommand, ExtractCommand, ExtractRowCommand,
  MergeCommand, MergeAllCommand, MoveCommand, PrependCommand,
  SetCommand, SwapCommand, UnsetCommand } from './update-command';

type CanBeDeletedKeys<
  TData extends any,
> = {
  [K in keyof TData]-?: { [key in K]?: TData[K] } extends { [key in K]: TData[K] }
    ? K
    : never
}[keyof TData]

type GetCommand<
  TCommand extends any,
  TKey extends number | string | symbol,
  TAcceptableKey extends number | string | symbol,
> = TKey extends TAcceptableKey
  ? TCommand
  : never;

type Controls = {
  $$set?: never;
  $$unset?: never;
  $$delete?: never;

  $$append?: never;
  $$prepend?: never;
  $$exclude?: never;
  $$extract?: never;
  $$move?: never;
  $$swap?: never;
  $$merge?: never;
  $$mergeAll?: never;
  $$replace?: never;
  $$replaceAll?: never;

  skip?: never;
  at?: never;

  [key: number]: never;
};

type PreventControls<
  T extends Record<string, any>,
> = Omit<Controls, keyof T> & T;

type ExcludeDataKeys<
  TData extends any,
> = Exclude<TData, undefined> extends Record<string, any>
  ? { [key in keyof TData]?: never }
  : {};

type Set<
  TData extends any,
> = SetCommand<TData>
  & { $$unset?: never; $$delete?: never; [key: number]: never }
  & ExcludeDataKeys<TData>;

type Unset<
  TData extends any,
> = UnsetCommand
  & { $$set?: never; $$delete?: never; [key: number]: never }
  & ExcludeDataKeys<TData>;

type Delete<
  TData extends any,
> = DeleteCommand
  & { $$set?: never; $$unset?: never; [key: number]: never }
  & ExcludeDataKeys<TData>;

export type UpdatePayload<
  TData extends any,
> = undefined | Set<TData> | (undefined extends TData ? Unset<TData> : never) | (
  TData extends (infer I)[]
    ?
      | I[]
      | PreventControls<{
          [key in number]:
            | undefined
            | UpdatePayload<I>
            | Delete<I>
        }> & ExcludeDataKeys<I>
      | PreventControls<AppendCommand<I>>
      | PreventControls<PrependCommand<I>>
      | PreventControls<ExcludeCommand>
      | PreventControls<ExcludeRowCommand>
      | PreventControls<ExtractCommand>
      | PreventControls<ExtractRowCommand>
      | PreventControls<MoveCommand>
      | PreventControls<SwapCommand>
      | PreventControls<MergeCommand<I>>
      | PreventControls<MergeAllCommand<I>>
    : TData extends Record<string, any>
      ? {
          [TKey in keyof TData]?:
            | GetCommand<Delete<TData[TKey]>, TKey, CanBeDeletedKeys<TData>>
            | UpdatePayload<TData[TKey]>
        } & { $$set?: never; $$unset?: never; $$delete?: never }
      : (TData | { $$set?: never; $$unset?: never; $$delete?: never })
);

export type RootPathUpdateInstruction<
  TData extends Record<string, any>,
> = {
  path?: never;
  update: UpdatePayload<TData>;
};

export type CommonPathUpdateInstruction<
  TData extends Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
> = {
  path: TPath;
  update: UpdatePayload<NodeValue<TData, TPath>>;
};

export type AnyPathUpdateInstruction<
  TData extends Record<string, any>,
> = {
  path: AnyPath;
  update: UpdatePayload<PossibleValue<TData>>;
};

export type PathUpdateInstruction<
  TData extends Record<string, any>,
> =
  | RootPathUpdateInstruction<TData>
  | CommonPathUpdateInstruction<TData>
  | AnyPathUpdateInstruction<TData>
