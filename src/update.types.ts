import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';
import { SetCommand, UnsetCommand, DeleteCommand, AppendCommand, ExcludeCommand, ExcludeRowCommand,
  ExtractCommand, ExtractRowCommand, MergeAllCommand, MergeRowCommand, MergeCommand, MoveCommand,
  PrependCommand, ReplaceAllCommand, ReplaceRowCommand, ReplaceCommand,
  SwapCommand } from './update-command';

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
> = SetCommand<TData> & { $$unset?: never; $$delete?: never; id?: never; [key: number]: never } & (
  Exclude<TData, undefined> extends Record<string, any>
    ? { [TKey in keyof TData]?: never }
    : Record<string, any>
);

type Unset<
  TData extends any,
> = UnsetCommand & { $$set?: never; $$delete?: never; [key: number]: never } & (
  Exclude<TData, undefined> extends Record<string, any>
    ? { [TKey in keyof TData]?: never }
    : Record<string, any>
);

type Delete<
  TData extends any,
> = DeleteCommand & { $$set?: never; $$unset?: never; [key: number]: never } & (
  Exclude<TData, undefined> extends Record<string, any>
    ? { [TKey in keyof TData]?: never }
    : Record<string, any>
);

export type UpdatePayload<
  TData extends any,
> = Set<TData> | (
  TData extends (infer I)[]
    ?
      | I[]
      | PreventControls<{ [key in number]: I }> & { [ket in keyof I]?: never }
      | PreventControls<AppendCommand<I>>
      | PreventControls<PrependCommand<I>>
      | PreventControls<ExcludeCommand>
      | PreventControls<ExcludeRowCommand>
      | PreventControls<ExtractCommand>
      | PreventControls<ExtractRowCommand>
      | PreventControls<MoveCommand>
      | PreventControls<SwapCommand>
      | PreventControls<MergeCommand<I>>
      | PreventControls<MergeRowCommand<I>>
      | PreventControls<MergeAllCommand<I>>
      | PreventControls<ReplaceCommand<I>>
      | PreventControls<ReplaceRowCommand<I>>
      | PreventControls<ReplaceAllCommand<I>>
    : TData extends Record<string, any>
      ? { [TKey in keyof TData]?: undefined extends TData[TKey]
          ? Unset<TData[TKey]> | Delete<TData[TKey]> | UpdatePayload<TData[TKey]>
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
