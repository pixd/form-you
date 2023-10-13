import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';

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
> = { $$set: TData; $$unset?: never; $$delete?: never; id?: never; [key: number]: never } & (
  Exclude<TData, undefined> extends Record<string, any>
    ? { [TKey in keyof TData]?: never }
    : Record<string, any>
);

type Unset<
  TData extends any,
> = { $$unset: true; $$set?: never; $$delete?: never; [key: number]: never } & (
  Exclude<TData, undefined> extends Record<string, any>
    ? { [TKey in keyof TData]?: never }
    : Record<string, any>
);

type Delete<
  TData extends any,
> = { $$delete: true; $$set?: never; $$unset?: never; [key: number]: never } & (
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
      | PreventControls<{ $$append: I[]; skip?: undefined | null | number }>
      | PreventControls<{ $$prepend: I[]; skip?: undefined | null | number }>
      | PreventControls<{ $$exclude: number[] }>
      | PreventControls<{ $$exclude: number; skip?: undefined | null | number }>
      | PreventControls<{ $$extract: number[] }>
      | PreventControls<{ $$extract: number; skip?: undefined | null | number }>
      | PreventControls<{ $$move: [number, number] }>
      | PreventControls<{ $$swap: [number, number] }>
      | PreventControls<{ $$merge: { [key: number]: UpdatePayload<I> } & { [ket in keyof I]?: never } }>
      | PreventControls<{ $$merge: UpdatePayload<I>[]; at?: undefined | null | number }>
      | PreventControls<{ $$mergeAll: UpdatePayload<I> }>
      | PreventControls<{ $$replace: { [key: number]: I } & { [ket in keyof I]?: never } }>
      | PreventControls<{ $$replace: I[]; at?: undefined | null | number }>
      | PreventControls<{ $$replaceAll: I }>
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
