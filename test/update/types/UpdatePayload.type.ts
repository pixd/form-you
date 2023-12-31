import { UpdatePayload } from '../../../src/update/types/update.types';
import { expect, PASSED } from '../../tools/expect';

type User = {
  id: number;
  nick: undefined | string;
  enabled?: boolean;
  team?: undefined | string;
  friend?: undefined | {
    id: number;
    nick: undefined | string;
    enabled?: boolean;
    team?: undefined | string;
  };
};

undefined_update_payload: {
  expect.safety.extends<UpdatePayload<undefined>, { $$set: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$set: null }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$set: number }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined>, { $$unset: boolean }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$delete: boolean }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$append: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$prepend: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$exclude: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$extract: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$move: [number, number] }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$swap: [number, number] }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined>, { $$apply: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$apply: null }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$apply: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$apply: { value: number } }>(PASSED);
}

null_update_payload: {
  expect.safety.extends<UpdatePayload<null>, { $$set: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<null>, { $$set: null }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$set: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$unset: boolean }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$delete: boolean }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$append: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$prepend: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$exclude: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$extract: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$move: [number, number] }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$swap: [number, number] }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined>, { $$apply: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$apply: null }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$apply: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<null>, { $$apply: { value: number } }>(PASSED);
}

scalar_update_payload: {
  expect.safety.extends<UpdatePayload<number>, { $$set: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$set: null }>(PASSED);
  expect.safety.extends<UpdatePayload<number>, { $$set: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$unset: boolean }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$delete: boolean }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$append: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$prepend: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$exclude: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$extract: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$move: [number, number] }>(PASSED);
  expect.safety.not.extends<UpdatePayload<string>, { $$swap: [number, number] }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined>, { $$apply: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$apply: null }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined>, { $$apply: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<number>, { $$apply: { value: number } }>(PASSED);
}

object_update_payload: {
  expect.safety.extends<UpdatePayload<User>, User>(PASSED);
  expect.safety.extends<UpdatePayload<User>, Partial<User>>(PASSED);
  expect.safety.extends<UpdatePayload<User>, undefined>(PASSED);
  expect.safety.extends<UpdatePayload<User>, User & { nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, User & { nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, Partial<User> & { nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, Partial<User> & { nonexistent: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { nonexistent: string }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { nonexistent: undefined }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { $$set: User }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$set: Partial<User> }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$set: User; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: User; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: User; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: undefined; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: undefined; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: User; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: User; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$set: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { $$unset: boolean }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$unset: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$unset: boolean; id: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$unset: boolean; nick: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$unset: boolean; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$unset: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$unset: undefined; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$unset: undefined; enabled: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$unset: boolean; nonexistent: string }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$unset: boolean; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$unset: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { $$delete: boolean }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$delete: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$delete: boolean; id: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$delete: boolean; nick: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$delete: boolean; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$delete: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$delete: undefined; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$delete: undefined; enabled: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$delete: boolean; nonexistent: string }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { $$delete: boolean; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$delete: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { $$delete: undefined; nonexistent: undefined }>(PASSED);
}

object_or_undefined_update_payload: {
  expect.safety.extends<UpdatePayload<undefined | User>, User>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, Partial<User>>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, undefined>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, User & { nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, User & { nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, Partial<User> & { nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, Partial<User> & { nonexistent: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { nonexistent: string }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { nonexistent: undefined }>(PASSED);

  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: User }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$set: Partial<User> }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$set: User; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: User; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: User; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: undefined; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: undefined; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: User; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: User; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$set: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: boolean }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$unset: boolean; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: boolean; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: boolean; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: undefined; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: undefined; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: boolean; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: boolean; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$delete: boolean }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$delete: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$delete: boolean; id: number }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$delete: boolean; nick: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$delete: boolean; enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$delete: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$delete: undefined; nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$delete: undefined; enabled: undefined }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$delete: boolean; nonexistent: string }>(PASSED);
  expect.safety.not.extends<UpdatePayload<undefined | User>, { $$delete: boolean; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$delete: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<undefined | User>, { $$delete: undefined; nonexistent: undefined }>(PASSED);
}

nonexistent_prop_update_payload: {
  expect.safety.not.extends<UpdatePayload<User>, { nonexistent: string }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { nonexistent: undefined }>(PASSED);
}

value_update_payload: {
  expect.safety.extends<UpdatePayload<User>, { id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: undefined; nick: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: number; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: number; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { id: { nonexistent: string } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { id: { nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { id: { $$set: number } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$set: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$set: number; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$set: number; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$set: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$set: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { id: { $$unset: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$unset: undefined } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { id: { $$unset: boolean; nonexistent: string } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { id: { $$unset: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$unset: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { id: { $$delete: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$delete: undefined } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { id: { $$delete: boolean; nonexistent: string } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { id: { $$delete: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$delete: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { id: { $$delete: undefined; nonexistent: undefined } }>(PASSED);
}

value_or_undefined_update_payload: {
  expect.safety.extends<UpdatePayload<User>, { nick: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: string; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: string; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { nick: { nonexistent: string } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { nick: { nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { nick: { $$set: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$set: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$set: string; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$set: string; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$set: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$set: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { nick: { $$unset: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$unset: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$unset: boolean; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$unset: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$unset: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { nick: { $$delete: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$delete: undefined } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { nick: { $$delete: boolean; nonexistent: string } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { nick: { $$delete: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$delete: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { nick: { $$delete: undefined; nonexistent: undefined } }>(PASSED);
}

optional_value_update_payload: {
  expect.safety.extends<UpdatePayload<User>, { enabled: boolean }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: undefined; nick: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: boolean; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: boolean; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { enabled: { nonexistent: string } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { enabled: { nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { enabled: { $$set: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$set: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$set: boolean; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$set: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$set: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$set: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { enabled: { $$unset: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$unset: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$unset: boolean; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$unset: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$unset: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { enabled: { $$delete: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$delete: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$delete: boolean; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$delete: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$delete: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { enabled: { $$delete: undefined; nonexistent: undefined } }>(PASSED);
}

optional_value_or_undefined_update_payload: {
  expect.safety.extends<UpdatePayload<User>, { team: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: undefined; id: number }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: string; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: string; nonexistent: undefined }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: undefined; nonexistent: string }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: undefined; nonexistent: undefined }>(PASSED);

  expect.safety.not.extends<UpdatePayload<User>, { team: { nonexistent: string } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<User>, { team: { nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { team: { $$set: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$set: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$set: string; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$set: string; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$set: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$set: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { team: { $$unset: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$unset: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$unset: boolean; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$unset: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$unset: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

  expect.safety.extends<UpdatePayload<User>, { team: { $$delete: boolean } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$delete: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$delete: boolean; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$delete: boolean; nonexistent: undefined } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$delete: undefined; nonexistent: string } }>(PASSED);
  expect.safety.extends<UpdatePayload<User>, { team: { $$delete: undefined; nonexistent: undefined } }>(PASSED);
}

array_update_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { [key: number]: User } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { [key: number]: Partial<User> } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: User }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: Partial<User> }>(PASSED);

  expect.safety.extends<UpdatePayload<State>, { users: User[] }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: Partial<User>[] }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: number[] }>(PASSED);
}

$$append_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { $$append: User[] } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$append: Partial<User>[] } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$append: User } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$append: number[] } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$append: User[]; skip: undefined | null | number } }>(PASSED);
}

$$prepend_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { $$prepend: User[] } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$prepend: Partial<State>[] } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$prepend: User } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$prepend: number[] } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$prepend: User[]; skip: undefined | null | number } }>(PASSED);
}

$$exclude_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { $$exclude: number[] } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$exclude: number } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$exclude: number; skip: undefined | null | number } }>(PASSED);
}

$$extract_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { $$extract: number[] } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$extract: number } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$extract: number; skip: undefined | null | number } }>(PASSED);
}

$$move_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { $$move: [number, number] } }>(PASSED);
}

$$swap_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { $$swap: [number, number] } }>(PASSED);
}

$$apply_payload: {
  type User = { id: number; nick: string };
  type State = { users: User[] };

  expect.safety.extends<UpdatePayload<State>, { users: { $$apply: User } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$apply: Partial<User> } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$apply: Partial<User>; length: number } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$apply: Partial<User>; skip: number } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$apply: Partial<User>; length: number ; skip: number } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$apply: User[] } }>(PASSED);
  expect.safety.not.extends<UpdatePayload<State>, { users: { $$apply: Partial<User>[] } }>(PASSED);
  expect.safety.extends<UpdatePayload<State>, { users: { $$apply: undefined } }>(PASSED);
}
