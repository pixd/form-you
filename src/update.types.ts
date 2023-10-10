import { AnyPath, NodeValue, PossiblePath, PossibleValue } from './path.types';

type Controls = {
  $$set?: never;
  $$unset?: never;
  $$append?: never;
  $$prepend?: never;
  $$exclude?: never;
  $$excludeLeft?: never;
  $$excludeRight?: never;
  $$extract?: never;
  $$extractLeft?: never;
  $$extractRight?: never;
  $$move?: never;
  $$swap?: never;
  $$merge?: never;
  $$apply?: never;
  $$reset?: never;

  skip?: never;

  [key: number]: never;
};

type PreventControls<
  T extends Record<string, any>,
> = Omit<Controls, keyof T> & T;

type Set<
  TData extends any,
> = { $$set: TData; $$unset?: never; $$delete?: never; [key: number]: never } & (
  TData extends Record<string, any>
    ? { [TKey in keyof TData]?: undefined }
    : Record<string, any>
);

type Unset<
  TData extends any,
> = { $$unset: true; $$set?: never; $$delete?: never; [key: number]: never } & (
  TData extends Record<string, any>
    ? { [TKey in keyof TData]?: undefined }
    : Record<string, any>
);

type Delete<
  TData extends any,
> = { $$delete: true; $$set?: never; $$unset?: never; [key: number]: never } & (
  TData extends Record<string, any>
    ? { [TKey in keyof TData]?: undefined }
    : Record<string, any>
);

export type UpdatePayload<
  TData extends any,
> = Set<Exclude<TData, undefined>> | (
  TData extends (infer I)[]
    ?
      | I[]
      | PreventControls<{ $$append: I[] }>
      | PreventControls<{ $$prepend: I[] }>
      | PreventControls<{ $$exclude: number | number[] }>
      | PreventControls<{ $$excludeLeft: number; skip?: number }>
      | PreventControls<{ $$excludeRight: number; skip?: number }>
      | PreventControls<{ $$extract: number | number[] }>
      | PreventControls<{ $$extractLeft: number; skip?: number }>
      | PreventControls<{ $$extractRight: number; skip?: number }>
      | PreventControls<{ $$move: [number, number] }>
      | PreventControls<{ $$swap: [number, number] }>
      | PreventControls<{ $$merge: { [key: number]: UpdatePayload<I> } }>
      | PreventControls<{ $$apply: UpdatePayload<I> }>
      | PreventControls<{ $$set: { [key: number]: I } }>
      | PreventControls<{ $$reset: I }>
    : TData extends Record<string, any>
      ? { [TKey in keyof TData]?: undefined extends TData[TKey]
          ? Unset<Exclude<TData[TKey], undefined>> | Delete<Exclude<TData[TKey], undefined>> | UpdatePayload<Exclude<TData[TKey], undefined>>
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
