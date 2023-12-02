import { PossiblePath } from '../path/path.types';
import { update } from './update';
import { updateAtPath } from './updateAtPath';
import { AnyPathUpdateInstruction, CommonPathUpdateInstruction,
  RootPathUpdateInstruction } from './types/update.types';

export function updateWithInstruction<
  TData extends Record<string, any> = Record<string, any>,
  TPath extends PossiblePath<TData> = PossiblePath<TData>,
>(
  data: TData,
  instruction: CommonPathUpdateInstruction<TData, TPath>,
): TData;

export function updateWithInstruction<
  TData extends Record<string, any> = Record<string, any>,
>(
  data: TData,
  instruction: AnyPathUpdateInstruction<TData> | RootPathUpdateInstruction<TData>,
): TData;

export function updateWithInstruction(
  data: Record<string, any>,
  instruction: any,
) {
  if (instruction.path) {
    return updateAtPath(data, instruction.path, instruction.update);
  }
  else {
    return update(data, instruction.update);
  }
}
