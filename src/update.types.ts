import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';
import { SetInstruction, UnsetInstruction, DeleteInstruction, AppendInstruction, ExcludeInstruction, ExcludeRowInstruction,
  ExtractInstruction, ExtractRowInstruction, MergeAllInstruction, MergeRowInstruction, MergeInstruction, MoveInstruction,
  PrependInstruction, ReplaceAllInstruction, ReplaceRowInstruction, ReplaceInstruction,
  SwapInstruction } from './update-instruction';

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
> = SetInstruction<TData> & { $$unset?: never; $$delete?: never; id?: never; [key: number]: never } & (
  Exclude<TData, undefined> extends Record<string, any>
    ? { [TKey in keyof TData]?: never }
    : Record<string, any>
);

type Unset<
  TData extends any,
> = UnsetInstruction & { $$set?: never; $$delete?: never; [key: number]: never } & (
  Exclude<TData, undefined> extends Record<string, any>
    ? { [TKey in keyof TData]?: never }
    : Record<string, any>
);

type Delete<
  TData extends any,
> = DeleteInstruction & { $$set?: never; $$unset?: never; [key: number]: never } & (
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
      | PreventControls<AppendInstruction<I>>
      | PreventControls<PrependInstruction<I>>
      | PreventControls<ExcludeInstruction>
      | PreventControls<ExcludeRowInstruction>
      | PreventControls<ExtractInstruction>
      | PreventControls<ExtractRowInstruction>
      | PreventControls<MoveInstruction>
      | PreventControls<SwapInstruction>
      | PreventControls<MergeInstruction<I>>
      | PreventControls<MergeRowInstruction<I>>
      | PreventControls<MergeAllInstruction<I>>
      | PreventControls<ReplaceInstruction<I>>
      | PreventControls<ReplaceRowInstruction<I>>
      | PreventControls<ReplaceAllInstruction<I>>
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
