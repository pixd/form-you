import { updateWithInstruction } from '../src/update';

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

const user = {} as User;

UPDATE_VALUE: {
  updateWithInstruction(user, { path: 'id', update: 10 });
  updateWithInstruction(user, { path: 'id', update: { $$set: 10 } });
  updateWithInstruction(user, { path: 'id', update: undefined });
  updateWithInstruction(user, { path: 'id', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'id', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'id', update: 'abc' });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'id', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'id', update: { $$delete: true } });
}

UPDATE_VALUE_OR_UNDEFINED: {
  updateWithInstruction(user, { path: 'nick', update: 'Antonio' });
  updateWithInstruction(user, { path: 'nick', update: { $$set: 'Antonio' } });
  updateWithInstruction(user, { path: 'nick', update: undefined });
  updateWithInstruction(user, { path: 'nick', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'nick', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'nick', update: 10 });
  updateWithInstruction(user, { path: 'nick', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'nick', update: { $$delete: true } });
}

UPDATE_OPTIONAL_VALUE: {
  updateWithInstruction(user, { path: 'enabled', update: true });
  updateWithInstruction(user, { path: 'enabled', update: { $$set: true } });
  updateWithInstruction(user, { path: 'enabled', update: undefined });
  updateWithInstruction(user, { path: 'enabled', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'enabled', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'enabled', update: 10 });
  updateWithInstruction(user, { path: 'enabled', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'enabled', update: { $$delete: true } });
}

UPDATE_OPTIONAL_VALUE_OR_UNDEFINED: {
  updateWithInstruction(user, { path: 'team', update: 'Ducks' });
  updateWithInstruction(user, { path: 'team', update: { $$set: 'Ducks' } });
  updateWithInstruction(user, { path: 'team', update: undefined });
  updateWithInstruction(user, { path: 'team', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'team', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'team', update: 10 });
  updateWithInstruction(user, { path: 'team', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'team', update: { $$delete: true } });
}

UPDATE_NESTED_VALUE: {
  updateWithInstruction(user, { path: 'friend.id', update: 10 });
  updateWithInstruction(user, { path: 'friend.id', update: { $$set: 10 } });
  updateWithInstruction(user, { path: 'friend.id', update: undefined });
  updateWithInstruction(user, { path: 'friend.id', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.id', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.id', update: 'abc' });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.id', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.id', update: { $$delete: true } });
}

UPDATE_NESTED_VALUE_OR_UNDEFINED: {
  updateWithInstruction(user, { path: 'friend.nick', update: 'Antonio' });
  updateWithInstruction(user, { path: 'friend.nick', update: { $$set: 'Antonio' } });
  updateWithInstruction(user, { path: 'friend.nick', update: undefined });
  updateWithInstruction(user, { path: 'friend.nick', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.nick', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.nick', update: 10 });
  updateWithInstruction(user, { path: 'friend.nick', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.nick', update: { $$delete: true } });
}

UPDATE_NESTED_OPTIONAL_VALUE: {
  updateWithInstruction(user, { path: 'friend.enabled', update: true });
  updateWithInstruction(user, { path: 'friend.enabled', update: { $$set: true } });
  updateWithInstruction(user, { path: 'friend.enabled', update: undefined });
  updateWithInstruction(user, { path: 'friend.enabled', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.enabled', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.enabled', update: 10 });
  updateWithInstruction(user, { path: 'friend.enabled', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.enabled', update: { $$delete: true } });
}

UPDATE_NESTED_OPTIONAL_VALUE_OR_UNDEFINED: {
  updateWithInstruction(user, { path: 'friend.team', update: 'Ducks' });
  updateWithInstruction(user, { path: 'friend.team', update: { $$set: 'Ducks' } });
  updateWithInstruction(user, { path: 'friend.team', update: undefined });
  updateWithInstruction(user, { path: 'friend.team', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.team', update: null });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.team', update: 10 });
  updateWithInstruction(user, { path: 'friend.team', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(user, { path: 'friend.team', update: { $$delete: true } });
}

UPDATE_NONEXISTENT_PATH: {
  updateWithInstruction(
    user,
    {
      // @ts-expect-error
      path: 'nonexistent',
      update: 10,
    },
  );

  updateWithInstruction(
    user,
    {
      // @ts-expect-error
      path: 'friend.nonexistent',
      update: 10,
    },
  );
}

ARRAY_OF_OBJECTS: {
  type User = { id: number; nick: string };

  const state = {
    users: [] as User[],
  };

  updateWithInstruction(state, { path: 'users.0', update: { id: 10 } });
  updateWithInstruction(state, { path: 'users.0', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10 } } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: undefined } });

  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10, nick: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 }, id: 10 } });
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 }, id: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': undefined, id: 10 } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined, id: undefined } });
  updateWithInstruction(state, { path: 'users', update: [{ id: 10, nick: 'Mark' }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [{ id: 10 }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [undefined] });
  updateWithInstruction(state, { path: 'users', update: undefined });

  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: undefined } } });
}

ARRAY_OF_OBJECTS_AND_UNDEFINED_VALUES: {
  type User = { id: number; nick: string };

  const state = {
    users: [] as (undefined | User)[],
  };

  updateWithInstruction(state, { path: 'users.0', update: { id: 10 } });
  updateWithInstruction(state, { path: 'users.0', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10 } } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: undefined } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: true } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: undefined } });

  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10, nick: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users', update: [{ id: 10, nick: 'Mark' }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [{ id: 10 }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { id: 10, nick: 'Mark' } });
  updateWithInstruction(state, { path: 'users', update: [undefined] });
  updateWithInstruction(state, { path: 'users', update: undefined });

  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: true } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: undefined } } });
}

ARRAY_OF_SCALARS: {
  const state = {
    users: [] as string[],
  };

  updateWithInstruction(state, { path: 'users.0', update: 'Mark' });
  updateWithInstruction(state, { path: 'users.0', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': 'Mark' } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: 'Mark' } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: undefined } });

  updateWithInstruction(state, { path: 'users', update: { '0': 'Mark' } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users', update: ['Mark'] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: 'Mark' });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [undefined] });
  updateWithInstruction(state, { path: 'users', update: undefined });

  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: undefined } } });
}

ARRAY_OF_SCALARS_AND_UNDEFINED_VALUES: {
  const state = {
    users: [] as (undefined | string)[],
  };

  updateWithInstruction(state, { path: 'users.0', update: 'Mark' });
  updateWithInstruction(state, { path: 'users.0', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': 'Mark' } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: 'Mark' } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: undefined } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: true } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: undefined } });

  updateWithInstruction(state, { path: 'users', update: { '0': 'Mark' } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users', update: ['Mark'] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: 'Mark' });
  updateWithInstruction(state, { path: 'users', update: [undefined] });
  updateWithInstruction(state, { path: 'users', update: undefined });

  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: true } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: undefined } } });
}

TUPLE_OF_OBJECTS: {
  type User = { id: number; nick: string };
  type Manager = { name: string; grade: number };

  const state = {
    users:  [{}, {}] as [User, Manager],
  };

  updateWithInstruction(state, { path: 'users.0', update: { id: 10 } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users.0', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { id: 10 } });
  updateWithInstruction(state, { path: 'users.1', update: { name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users.1', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { id: 10 } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { name: 'Antonio' } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: undefined });

  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': undefined } });

  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10 } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { name: 'Antonio', grade: 10 } } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: undefined } });
  updateWithInstruction(state, { path: 'users.1', update: { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$set: { name: 'Antonio' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$set: { id: 10, nick: 'Mark' } } });
  updateWithInstruction(state, { path: 'users.1', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.1', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.1', update: { $$delete: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$unset: false } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$delete: false } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$delete: undefined } });

  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { name: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users', update: { '1': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { name: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '1': undefined } });
  updateWithInstruction(state, { path: 'users', update: { '2': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { name: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '2': undefined } });

  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 }, id: 10 } });
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 }, id: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': undefined, id: 10 } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined, id: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { name: 'Antonio' }, name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users', update: { '1': { name: 'Antonio' }, name: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': undefined, name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users', update: { '1': undefined, name: undefined } });

  updateWithInstruction(state, { path: 'users', update: [{ id: 10, nick: 'Mark' }, { name: 'Antonio', grade: 10 }] });
  updateWithInstruction(state, { path: 'users', update: [{ name: 'Antonio', grade: 10 }, { id: 10, nick: 'Mark' }] });
  updateWithInstruction(state, { path: 'users', update: [{ id: 10, nick: 'Mark' }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [{ id: 10 }] });
  updateWithInstruction(state, { path: 'users', update: [{ name: 'Antonio', grade: 10 }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [{ name: 'Antonio' }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { name: 'Antonio', grade: 10 } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [undefined] });
  updateWithInstruction(state, { path: 'users', update: undefined });

  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { id: 10, nick: 'Mark' } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { id: 10 } } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { name: 'Antonio', grade: 10 } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { name: 'Antonio' } } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { id: 10, nick: 'Mark' } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { id: 10 } } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { name: 'Antonio', grade: 10 } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { name: 'Antonio' } } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { id: 10, nick: 'Mark' } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { id: 10 } } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { name: 'Antonio', grade: 10 } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { name: 'Antonio' } } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$delete: undefined } } });
}

TUPLE_OF_OBJECTS_AND_UNDEFINED_VALUES: {
  type User = { id: number; nick: string };
  type Manager = { name: string; grade: number };

  const state = {
    users:  [{}, {}] as [User, undefined | Manager],
  };

  updateWithInstruction(state, { path: 'users.0', update: { id: 10 } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users.0', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { id: 10 } });
  updateWithInstruction(state, { path: 'users.1', update: { name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users.1', update: undefined });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { id: 10 } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { name: 'Antonio' } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: undefined });

  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { '0': undefined } });

  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { id: 10 } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$set: { name: 'Antonio', grade: 10 } } });
  updateWithInstruction(state, { path: 'users.0', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.0', update: { $$delete: undefined } });
  updateWithInstruction(state, { path: 'users.1', update: { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$set: { name: 'Antonio' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$set: { id: 10, nick: 'Mark' } } });
  updateWithInstruction(state, { path: 'users.1', update: { $$set: undefined } });
  updateWithInstruction(state, { path: 'users.1', update: { $$unset: true } });
  updateWithInstruction(state, { path: 'users.1', update: { $$unset: false } });
  updateWithInstruction(state, { path: 'users.1', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.1', update: { $$delete: false } });
  updateWithInstruction(state, { path: 'users.1', update: { $$delete: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$set: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$unset: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$unset: false } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$unset: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$delete: true } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$delete: false } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users.2', update: { $$delete: undefined } });

  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { name: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'users', update: { '1': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { name: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '1': undefined } });
  updateWithInstruction(state, { path: 'users', update: { '2': { id: 10 } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { name: 'Mark' } } });
  updateWithInstruction(state, { path: 'users', update: { '2': undefined } });

  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 }, id: 10 } });
  updateWithInstruction(state, { path: 'users', update: { '0': { id: 10 }, id: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': undefined, id: 10 } });
  updateWithInstruction(state, { path: 'users', update: { '0': undefined, id: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { name: 'Antonio' }, name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users', update: { '1': { name: 'Antonio' }, name: undefined } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': undefined, name: 'Antonio' } });
  updateWithInstruction(state, { path: 'users', update: { '1': undefined, name: undefined } });

  updateWithInstruction(state, { path: 'users', update: [{ id: 10, nick: 'Mark' }, { name: 'Antonio', grade: 10 }] });
  updateWithInstruction(state, { path: 'users', update: [{ name: 'Antonio', grade: 10 }, { id: 10, nick: 'Mark' }] });
  updateWithInstruction(state, { path: 'users', update: [{ id: 10, nick: 'Mark' }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [{ id: 10 }] });
  updateWithInstruction(state, { path: 'users', update: [{ name: 'Antonio', grade: 10 }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: [{ name: 'Antonio' }] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { name: 'Antonio', grade: 10 } });
  updateWithInstruction(state, { path: 'users', update: [undefined] });
  updateWithInstruction(state, { path: 'users', update: undefined });

  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { id: 10, nick: 'Mark' } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { id: 10 } } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { name: 'Antonio', grade: 10 } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: { name: 'Antonio' } } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: true } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '0': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { id: 10, nick: 'Mark' } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { id: 10 } } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { name: 'Antonio', grade: 10 } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: { name: 'Antonio' } } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$unset: true } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '1': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '1': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { id: 10, nick: 'Mark' } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { id: 10 } } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { name: 'Antonio', grade: 10 } } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: { name: 'Antonio' } } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$unset: true } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$unset: false } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'users', update: { '2': { $$delete: false } } });
  updateWithInstruction(state, { path: 'users', update: { '2': { $$delete: undefined } } });
}

TUPLE_OF_SCALARS: {
  const state = {
    user: [] as unknown as [string, number],
  };

  updateWithInstruction(state, { path: 'user', update: ['Mark'] });
  updateWithInstruction(state, { path: 'user', update: [10] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: 'Mark' });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: [undefined] });
  updateWithInstruction(state, { path: 'user', update: undefined });

  updateWithInstruction(state, { path: 'user', update: { '0': 'Mark' } });
  updateWithInstruction(state, { path: 'user', update: { '0': 10 } });
  updateWithInstruction(state, { path: 'user', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'user', update: { '1': 'Mark' } });
  updateWithInstruction(state, { path: 'user', update: { '1': 10 } });
  updateWithInstruction(state, { path: 'user', update: { '1': undefined } });
  updateWithInstruction(state, { path: 'user', update: { '2': 'Mark' } });
  updateWithInstruction(state, { path: 'user', update: { '2': 10 } });
  updateWithInstruction(state, { path: 'user', update: { '2': undefined } });

  updateWithInstruction(state, { path: 'user', update: { '0': { $$set: 'Mark' } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$set: 10 } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '0': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$set: 'Mark' } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$set: 10 } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '1': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '1': { $$unset: false } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '1': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '1': { $$delete: false } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$set: 'Mark' } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$set: 10 } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$set: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '2': { $$unset: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '2': { $$unset: false } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '2': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '2': { $$delete: false } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$delete: undefined } } });
}

TUPLE_OF_SCALARS_AND_UNDEFINED_VALUES: {
  const state = {
    user: [] as unknown as [string, undefined | number],
  };

  updateWithInstruction(state, { path: 'user', update: ['Mark'] });
  updateWithInstruction(state, { path: 'user', update: [10] });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: 'Mark' });
  updateWithInstruction(state, { path: 'user', update: [undefined] });
  updateWithInstruction(state, { path: 'user', update: undefined });

  updateWithInstruction(state, { path: 'user', update: { '0': 'Mark' } });
  updateWithInstruction(state, { path: 'user', update: { '0': 10 } });
  updateWithInstruction(state, { path: 'user', update: { '0': undefined } });
  updateWithInstruction(state, { path: 'user', update: { '1': 'Mark' } });
  updateWithInstruction(state, { path: 'user', update: { '1': 10 } });
  updateWithInstruction(state, { path: 'user', update: { '1': undefined } });
  updateWithInstruction(state, { path: 'user', update: { '2': 'Mark' } });
  updateWithInstruction(state, { path: 'user', update: { '2': 10 } });
  updateWithInstruction(state, { path: 'user', update: { '2': undefined } });

  updateWithInstruction(state, { path: 'user', update: { '0': { $$set: 'Mark' } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$set: 10 } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$unset: true } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$unset: false } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '0': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '0': { $$delete: false } } });
  updateWithInstruction(state, { path: 'user', update: { '0': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$set: 'Mark' } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$set: 10 } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$unset: true } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$unset: false } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '1': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '1': { $$delete: false } } });
  updateWithInstruction(state, { path: 'user', update: { '1': { $$delete: undefined } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$set: 'Mark' } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$set: 10 } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$set: undefined } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$unset: true } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$unset: false } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$unset: undefined } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '2': { $$delete: true } } });
  // @ts-expect-error
  updateWithInstruction(state, { path: 'user', update: { '2': { $$delete: false } } });
  updateWithInstruction(state, { path: 'user', update: { '2': { $$delete: undefined } } });
}
