import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';
import { SetCommand, UnsetCommand, DeleteCommand, AppendCommand,
  ExcludeCommand, ExcludeRowCommand, ExtractCommand, ExtractRowCommand,
  MergeCommand, MergeAllCommand, MoveCommand, PrependCommand, SwapCommand } from './update-command';

type CanBeDeletedKeys<
  TData extends any,
> = {
  [K in keyof TData]-?: TData extends Record<K, TData[K]>
    ? never
    : K
}[keyof TData]

type CanBeUnsettedKeys<
  TData extends any,
> = {
  [K in keyof TData]-?: undefined | TData[K] extends Required<TData>[K]
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

type Set<
  TData extends any,
> = SetCommand<undefined extends TData ? TData : TData> // I don't know why, but this fixes the test: update(product, { $$set: undefined })
  & { $$unset?: never; $$delete?: never; [key: number]: never }
  & (
    Exclude<TData, undefined> extends Record<string, any>
      ? { [TKey in keyof TData]?: never }
      : {}
  );

type Unset<
  TData extends any,
> = UnsetCommand
  & { $$set?: never; $$delete?: never; [key: number]: never }
  & (
    Exclude<TData, undefined> extends Record<string, any>
      ? { [TKey in keyof TData]?: never }
      : {}
  );

type Delete<
  TData extends any,
> = DeleteCommand
  & { $$set?: never; $$unset?: never; [key: number]: never }
  & (
    Exclude<TData, undefined> extends Record<string, any>
      ? { [TKey in keyof TData]?: never }
      : {}
  );

export type UpdatePayload<
  TData extends any,
> = Set<TData> | (
  TData extends (infer I)[]
    ?
      | I[]
      | PreventControls<{ [key in number]: UpdatePayload<I> } & { [ket in keyof I]?: never }>
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
      ? { [TKey in keyof TData]?: undefined extends TData[TKey]
          ?
            | GetCommand<Unset<TData[TKey]>, TKey, CanBeUnsettedKeys<TData>>
            | GetCommand<Delete<TData[TKey]>, TKey, CanBeDeletedKeys<TData>>
            | UpdatePayload<Required<TData>[TKey]>
          : UpdatePayload<TData[TKey]>
        } & { $$set?: never; $$unset?: never; $$delete?: never }
      :
      TData
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
