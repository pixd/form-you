import { updateAtPath } from '../src/update';

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
  updateAtPath(user, 'id', 10);
  updateAtPath(user, 'id', { $$set: 10 });
  updateAtPath(user, 'id', undefined);
  updateAtPath(user, 'id', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'id', null);
  // @ts-expect-error
  updateAtPath(user, 'id', 'abc');
  // @ts-expect-error
  updateAtPath(user, 'id', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'id', { $$delete: true });
}

UPDATE_VALUE_OR_UNDEFINED: {
  updateAtPath(user, 'nick', 'Antonio');
  updateAtPath(user, 'nick', { $$set: 'Antonio' });
  updateAtPath(user, 'nick', undefined);
  updateAtPath(user, 'nick', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'nick', null);
  // @ts-expect-error
  updateAtPath(user, 'nick', 10);
  updateAtPath(user, 'nick', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'nick', { $$delete: true });
}

UPDATE_OPTIONAL_VALUE: {
  updateAtPath(user, 'enabled', true);
  updateAtPath(user, 'enabled', { $$set: true });
  updateAtPath(user, 'enabled', undefined);
  updateAtPath(user, 'enabled', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'enabled', null);
  // @ts-expect-error
  updateAtPath(user, 'enabled', 10);
  updateAtPath(user, 'enabled', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'enabled', { $$delete: true });
}

UPDATE_OPTIONAL_VALUE_OR_UNDEFINED: {
  updateAtPath(user, 'team', 'Ducks');
  updateAtPath(user, 'team', { $$set: 'Ducks' });
  updateAtPath(user, 'team', undefined);
  updateAtPath(user, 'team', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'team', null);
  // @ts-expect-error
  updateAtPath(user, 'team', 10);
  updateAtPath(user, 'team', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'team', { $$delete: true });
}

UPDATE_NESTED_VALUE: {
  updateAtPath(user, 'friend.id', 10);
  updateAtPath(user, 'friend.id', { $$set: 10 });
  updateAtPath(user, 'friend.id', undefined);
  updateAtPath(user, 'friend.id', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'friend.id', null);
  // @ts-expect-error
  updateAtPath(user, 'friend.id', 'abc');
  // @ts-expect-error
  updateAtPath(user, 'friend.id', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'friend.id', { $$delete: true });
}

UPDATE_NESTED_VALUE_OR_UNDEFINED: {
  updateAtPath(user, 'friend.nick', 'Antonio');
  updateAtPath(user, 'friend.nick', { $$set: 'Antonio' });
  updateAtPath(user, 'friend.nick', undefined);
  updateAtPath(user, 'friend.nick', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'friend.nick', null);
  // @ts-expect-error
  updateAtPath(user, 'friend.nick', 10);
  updateAtPath(user, 'friend.nick', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'friend.nick', { $$delete: true });
}

UPDATE_NESTED_OPTIONAL_VALUE: {
  updateAtPath(user, 'friend.enabled', true);
  updateAtPath(user, 'friend.enabled', { $$set: true });
  updateAtPath(user, 'friend.enabled', undefined);
  updateAtPath(user, 'friend.enabled', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'friend.enabled', null);
  // @ts-expect-error
  updateAtPath(user, 'friend.enabled', 10);
  updateAtPath(user, 'friend.enabled', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'friend.enabled', { $$delete: true });
}

UPDATE_NESTED_OPTIONAL_VALUE_OR_UNDEFINED: {
  updateAtPath(user, 'friend.team', 'Ducks');
  updateAtPath(user, 'friend.team', { $$set: 'Ducks' });
  updateAtPath(user, 'friend.team', undefined);
  updateAtPath(user, 'friend.team', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(user, 'friend.team', null);
  // @ts-expect-error
  updateAtPath(user, 'friend.team', 10);
  updateAtPath(user, 'friend.team', { $$unset: true });
  // @ts-expect-error
  updateAtPath(user, 'friend.team', { $$delete: true });
}

UPDATE_NONEXISTENT_PATH: {
  updateAtPath(
    user,
    // @ts-expect-error
    'nonexistent',
    10,
  );

  updateAtPath(
    user,
    // @ts-expect-error
    'friend.nonexistent',
    10,
  );
}

ARRAY_OF_OBJECTS: {
  type User = { id: number; nick: string };

  const state = {
    users: [] as User[],
  };

  updateAtPath(state, 'users.0', { id: 10 });
  updateAtPath(state, 'users.0', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': undefined });
  updateAtPath(state, 'users.0', { $$set: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$set: { id: 10 } });
  updateAtPath(state, 'users.0', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: false });
  updateAtPath(state, 'users.0', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: false });
  updateAtPath(state, 'users.0', { $$delete: undefined });

  updateAtPath(state, 'users', { '0': { id: 10, nick: 'Mark' } });
  updateAtPath(state, 'users', { '0': { id: 10 } });
  updateAtPath(state, 'users', { '0': undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { id: 10 }, id: 10 });
  updateAtPath(state, 'users', { '0': { id: 10 }, id: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': undefined, id: 10 });
  updateAtPath(state, 'users', { '0': undefined, id: undefined });
  updateAtPath(state, 'users', [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  updateAtPath(state, 'users', [{ id: 10 }]);
  // @ts-expect-error
  updateAtPath(state, 'users', { id: 10, nick: 'Mark' });
  // @ts-expect-error
  updateAtPath(state, 'users', [undefined]);
  updateAtPath(state, 'users', undefined);

  updateAtPath(state, 'users', { '0': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$unset: false } });
  updateAtPath(state, 'users', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: false } });
  updateAtPath(state, 'users', { '0': { $$delete: undefined } });
}

ARRAY_OF_OBJECTS_AND_UNDEFINED_VALUES: {
  type User = { id: number; nick: string };

  const state = {
    users: [] as (undefined | User)[],
  };

  updateAtPath(state, 'users.0', { id: 10 });
  updateAtPath(state, 'users.0', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': undefined });
  updateAtPath(state, 'users.0', { $$set: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$set: { id: 10 } });
  updateAtPath(state, 'users.0', { $$set: undefined });
  updateAtPath(state, 'users.0', { $$unset: true });
  updateAtPath(state, 'users.0', { $$unset: false });
  updateAtPath(state, 'users.0', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: false });
  updateAtPath(state, 'users.0', { $$delete: undefined });

  updateAtPath(state, 'users', { '0': { id: 10, nick: 'Mark' } });
  updateAtPath(state, 'users', { '0': { id: 10 } });
  updateAtPath(state, 'users', { '0': undefined });
  updateAtPath(state, 'users', [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  updateAtPath(state, 'users', [{ id: 10 }]);
  // @ts-expect-error
  updateAtPath(state, 'users', { id: 10, nick: 'Mark' });
  updateAtPath(state, 'users', [undefined]);
  updateAtPath(state, 'users', undefined);

  updateAtPath(state, 'users', { '0': { $$set: undefined } });
  updateAtPath(state, 'users', { '0': { $$unset: true } });
  updateAtPath(state, 'users', { '0': { $$unset: false } });
  updateAtPath(state, 'users', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: false } });
  updateAtPath(state, 'users', { '0': { $$delete: undefined } });
}

ARRAY_OF_SCALARS: {
  const state = {
    users: [] as string[],
  };

  updateAtPath(state, 'users.0', 'Mark');
  updateAtPath(state, 'users.0', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': 'Mark' });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': undefined });
  updateAtPath(state, 'users.0', { $$set: 'Mark' });
  updateAtPath(state, 'users.0', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: false });
  updateAtPath(state, 'users.0', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: false });
  updateAtPath(state, 'users.0', { $$delete: undefined });

  updateAtPath(state, 'users', { '0': 'Mark' });
  updateAtPath(state, 'users', { '0': undefined });
  updateAtPath(state, 'users', ['Mark']);
  // @ts-expect-error
  updateAtPath(state, 'users', 'Mark');
  // @ts-expect-error
  updateAtPath(state, 'users', [undefined]);
  updateAtPath(state, 'users', undefined);

  updateAtPath(state, 'users', { '0': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$unset: false } });
  updateAtPath(state, 'users', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: false } });
  updateAtPath(state, 'users', { '0': { $$delete: undefined } });
}

ARRAY_OF_SCALARS_AND_UNDEFINED_VALUES: {
  const state = {
    users: [] as (undefined | string)[],
  };

  updateAtPath(state, 'users.0', 'Mark');
  updateAtPath(state, 'users.0', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': 'Mark' });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': undefined });
  updateAtPath(state, 'users.0', { $$set: 'Mark' });
  updateAtPath(state, 'users.0', { $$set: undefined });
  updateAtPath(state, 'users.0', { $$unset: true });
  updateAtPath(state, 'users.0', { $$unset: false });
  updateAtPath(state, 'users.0', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: false });
  updateAtPath(state, 'users.0', { $$delete: undefined });

  updateAtPath(state, 'users', { '0': 'Mark' });
  updateAtPath(state, 'users', { '0': undefined });
  updateAtPath(state, 'users', ['Mark']);
  // @ts-expect-error
  updateAtPath(state, 'users', 'Mark');
  updateAtPath(state, 'users', [undefined]);
  updateAtPath(state, 'users', undefined);

  updateAtPath(state, 'users', { '0': { $$set: undefined } });
  updateAtPath(state, 'users', { '0': { $$unset: true } });
  updateAtPath(state, 'users', { '0': { $$unset: false } });
  updateAtPath(state, 'users', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: false } });
  updateAtPath(state, 'users', { '0': { $$delete: undefined } });
}

TUPLE_OF_OBJECTS: {
  type User = { id: number; nick: string };
  type Manager = { name: string; grade: number };

  const state = {
    users:  [{}, {}] as [User, Manager],
  };

  updateAtPath(state, 'users.0', { id: 10 });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { name: 'Antonio' });
  updateAtPath(state, 'users.0', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.1', { id: 10 });
  updateAtPath(state, 'users.1', { name: 'Antonio' });
  updateAtPath(state, 'users.1', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.2', { id: 10 });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { name: 'Antonio' });
  // @ts-expect-error
  updateAtPath(state, 'users.2', undefined);

  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': undefined });

  updateAtPath(state, 'users.0', { $$set: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$set: { id: 10 } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$set: { name: 'Antonio', grade: 10 } });
  updateAtPath(state, 'users.0', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: false });
  updateAtPath(state, 'users.0', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: false });
  updateAtPath(state, 'users.0', { $$delete: undefined });
  updateAtPath(state, 'users.1', { $$set: { name: 'Antonio', grade: 10 } });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$set: { name: 'Antonio' } });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$set: { id: 10, nick: 'Mark' } });
  updateAtPath(state, 'users.1', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$unset: true });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$unset: false });
  updateAtPath(state, 'users.1', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$delete: false });
  updateAtPath(state, 'users.1', { $$delete: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$set: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$set: { name: 'Antonio', grade: 10 } });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$unset: true });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$unset: false });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$delete: false });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$delete: undefined });

  updateAtPath(state, 'users', { '0': { id: 10 } });
  updateAtPath(state, 'users', { '0': { name: 'Mark' } });
  updateAtPath(state, 'users', { '0': undefined });
  updateAtPath(state, 'users', { '1': { id: 10 } });
  updateAtPath(state, 'users', { '1': { name: 'Mark' } });
  updateAtPath(state, 'users', { '1': undefined });
  updateAtPath(state, 'users', { '2': { id: 10 } });
  updateAtPath(state, 'users', { '2': { name: 'Mark' } });
  updateAtPath(state, 'users', { '2': undefined });

  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { id: 10 }, id: 10 });
  updateAtPath(state, 'users', { '0': { id: 10 }, id: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': undefined, id: 10 });
  updateAtPath(state, 'users', { '0': undefined, id: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { name: 'Antonio' }, name: 'Antonio' });
  updateAtPath(state, 'users', { '1': { name: 'Antonio' }, name: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': undefined, name: 'Antonio' });
  updateAtPath(state, 'users', { '1': undefined, name: undefined });

  updateAtPath(state, 'users', [{ id: 10, nick: 'Mark' }, { name: 'Antonio', grade: 10 }]);
  updateAtPath(state, 'users', [{ name: 'Antonio', grade: 10 }, { id: 10, nick: 'Mark' }]);
  updateAtPath(state, 'users', [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  updateAtPath(state, 'users', [{ id: 10 }]);
  updateAtPath(state, 'users', [{ name: 'Antonio', grade: 10 }]);
  // @ts-expect-error
  updateAtPath(state, 'users', [{ name: 'Antonio' }]);
  // @ts-expect-error
  updateAtPath(state, 'users', { id: 10, nick: 'Mark' });
  // @ts-expect-error
  updateAtPath(state, 'users', { name: 'Antonio', grade: 10 });
  // @ts-expect-error
  updateAtPath(state, 'users', [undefined]);
  updateAtPath(state, 'users', undefined);

  updateAtPath(state, 'users', { '0': { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$set: { id: 10 } } });
  updateAtPath(state, 'users', { '0': { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$set: { name: 'Antonio' } } });
  updateAtPath(state, 'users', { '0': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$unset: false } });
  updateAtPath(state, 'users', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: false } });
  updateAtPath(state, 'users', { '0': { $$delete: undefined } });
  updateAtPath(state, 'users', { '1': { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$set: { id: 10 } } });
  updateAtPath(state, 'users', { '1': { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$set: { name: 'Antonio' } } });
  updateAtPath(state, 'users', { '1': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$unset: false } });
  updateAtPath(state, 'users', { '1': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$delete: false } });
  updateAtPath(state, 'users', { '1': { $$delete: undefined } });
  updateAtPath(state, 'users', { '2': { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$set: { id: 10 } } });
  updateAtPath(state, 'users', { '2': { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$set: { name: 'Antonio' } } });
  updateAtPath(state, 'users', { '2': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$unset: false } });
  updateAtPath(state, 'users', { '2': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$delete: false } });
  updateAtPath(state, 'users', { '2': { $$delete: undefined } });
}

TUPLE_OF_OBJECTS_AND_UNDEFINED_VALUES: {
  type User = { id: number; nick: string };
  type Manager = { name: string; grade: number };

  const state = {
    users:  [{}, {}] as [User, undefined | Manager],
  };

  updateAtPath(state, 'users.0', { id: 10 });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { name: 'Antonio' });
  updateAtPath(state, 'users.0', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.1', { id: 10 });
  updateAtPath(state, 'users.1', { name: 'Antonio' });
  updateAtPath(state, 'users.1', undefined);
  // @ts-expect-error
  updateAtPath(state, 'users.2', { id: 10 });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { name: 'Antonio' });
  // @ts-expect-error
  updateAtPath(state, 'users.2', undefined);

  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { '0': undefined });

  updateAtPath(state, 'users.0', { $$set: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$set: { id: 10 } });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$set: { name: 'Antonio', grade: 10 } });
  updateAtPath(state, 'users.0', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$unset: false });
  updateAtPath(state, 'users.0', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.0', { $$delete: false });
  updateAtPath(state, 'users.0', { $$delete: undefined });
  updateAtPath(state, 'users.1', { $$set: { name: 'Antonio', grade: 10 } });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$set: { name: 'Antonio' } });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$set: { id: 10, nick: 'Mark' } });
  updateAtPath(state, 'users.1', { $$set: undefined });
  updateAtPath(state, 'users.1', { $$unset: true });
  updateAtPath(state, 'users.1', { $$unset: false });
  updateAtPath(state, 'users.1', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.1', { $$delete: false });
  updateAtPath(state, 'users.1', { $$delete: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$set: { id: 10, nick: 'Mark' } });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$set: { name: 'Antonio', grade: 10 } });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$set: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$unset: true });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$unset: false });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$unset: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$delete: true });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$delete: false });
  // @ts-expect-error
  updateAtPath(state, 'users.2', { $$delete: undefined });

  updateAtPath(state, 'users', { '0': { id: 10 } });
  updateAtPath(state, 'users', { '0': { name: 'Mark' } });
  updateAtPath(state, 'users', { '0': undefined });
  updateAtPath(state, 'users', { '1': { id: 10 } });
  updateAtPath(state, 'users', { '1': { name: 'Mark' } });
  updateAtPath(state, 'users', { '1': undefined });
  updateAtPath(state, 'users', { '2': { id: 10 } });
  updateAtPath(state, 'users', { '2': { name: 'Mark' } });
  updateAtPath(state, 'users', { '2': undefined });

  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { id: 10 }, id: 10 });
  updateAtPath(state, 'users', { '0': { id: 10 }, id: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': undefined, id: 10 });
  updateAtPath(state, 'users', { '0': undefined, id: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { name: 'Antonio' }, name: 'Antonio' });
  updateAtPath(state, 'users', { '1': { name: 'Antonio' }, name: undefined });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': undefined, name: 'Antonio' });
  updateAtPath(state, 'users', { '1': undefined, name: undefined });

  updateAtPath(state, 'users', [{ id: 10, nick: 'Mark' }, { name: 'Antonio', grade: 10 }]);
  updateAtPath(state, 'users', [{ name: 'Antonio', grade: 10 }, { id: 10, nick: 'Mark' }]);
  updateAtPath(state, 'users', [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  updateAtPath(state, 'users', [{ id: 10 }]);
  updateAtPath(state, 'users', [{ name: 'Antonio', grade: 10 }]);
  // @ts-expect-error
  updateAtPath(state, 'users', [{ name: 'Antonio' }]);
  // @ts-expect-error
  updateAtPath(state, 'users', { id: 10, nick: 'Mark' });
  // @ts-expect-error
  updateAtPath(state, 'users', { name: 'Antonio', grade: 10 });
  updateAtPath(state, 'users', [undefined]);
  updateAtPath(state, 'users', undefined);

  updateAtPath(state, 'users', { '0': { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$set: { id: 10 } } });
  updateAtPath(state, 'users', { '0': { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$set: { name: 'Antonio' } } });
  updateAtPath(state, 'users', { '0': { $$set: undefined } });
  updateAtPath(state, 'users', { '0': { $$unset: true } });
  updateAtPath(state, 'users', { '0': { $$unset: false } });
  updateAtPath(state, 'users', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '0': { $$delete: false } });
  updateAtPath(state, 'users', { '0': { $$delete: undefined } });
  updateAtPath(state, 'users', { '1': { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$set: { id: 10 } } });
  updateAtPath(state, 'users', { '1': { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$set: { name: 'Antonio' } } });
  updateAtPath(state, 'users', { '1': { $$set: undefined } });
  updateAtPath(state, 'users', { '1': { $$unset: true } });
  updateAtPath(state, 'users', { '1': { $$unset: false } });
  updateAtPath(state, 'users', { '1': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '1': { $$delete: false } });
  updateAtPath(state, 'users', { '1': { $$delete: undefined } });
  updateAtPath(state, 'users', { '2': { $$set: { id: 10, nick: 'Mark' } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$set: { id: 10 } } });
  updateAtPath(state, 'users', { '2': { $$set: { name: 'Antonio', grade: 10 } } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$set: { name: 'Antonio' } } });
  updateAtPath(state, 'users', { '2': { $$set: undefined } });
  updateAtPath(state, 'users', { '2': { $$unset: true } });
  updateAtPath(state, 'users', { '2': { $$unset: false } });
  updateAtPath(state, 'users', { '2': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'users', { '2': { $$delete: false } });
  updateAtPath(state, 'users', { '2': { $$delete: undefined } });
}

TUPLE_OF_SCALARS: {
  const state = {
    user: [] as unknown as [string, number],
  };

  updateAtPath(state, 'user', ['Mark']);
  updateAtPath(state, 'user', [10]);
  // @ts-expect-error
  updateAtPath(state, 'user', 'Mark');
  // @ts-expect-error
  updateAtPath(state, 'user', [undefined]);
  updateAtPath(state, 'user', undefined);

  updateAtPath(state, 'user', { '0': 'Mark' });
  updateAtPath(state, 'user', { '0': 10 });
  updateAtPath(state, 'user', { '0': undefined });
  updateAtPath(state, 'user', { '1': 'Mark' });
  updateAtPath(state, 'user', { '1': 10 });
  updateAtPath(state, 'user', { '1': undefined });
  updateAtPath(state, 'user', { '2': 'Mark' });
  updateAtPath(state, 'user', { '2': 10 });
  updateAtPath(state, 'user', { '2': undefined });

  updateAtPath(state, 'user', { '0': { $$set: 'Mark' } });
  updateAtPath(state, 'user', { '0': { $$set: 10 } });
  updateAtPath(state, 'user', { '0': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '0': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '0': { $$unset: false } });
  updateAtPath(state, 'user', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '0': { $$delete: false } });
  updateAtPath(state, 'user', { '0': { $$delete: undefined } });
  updateAtPath(state, 'user', { '1': { $$set: 'Mark' } });
  updateAtPath(state, 'user', { '1': { $$set: 10 } });
  updateAtPath(state, 'user', { '1': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '1': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '1': { $$unset: false } });
  updateAtPath(state, 'user', { '1': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '1': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '1': { $$delete: false } });
  updateAtPath(state, 'user', { '1': { $$delete: undefined } });
  updateAtPath(state, 'user', { '2': { $$set: 'Mark' } });
  updateAtPath(state, 'user', { '2': { $$set: 10 } });
  updateAtPath(state, 'user', { '2': { $$set: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '2': { $$unset: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '2': { $$unset: false } });
  updateAtPath(state, 'user', { '2': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '2': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '2': { $$delete: false } });
  updateAtPath(state, 'user', { '2': { $$delete: undefined } });
}

TUPLE_OF_SCALARS_AND_UNDEFINED_VALUES: {
  const state = {
    user: [] as unknown as [string, undefined | number],
  };

  updateAtPath(state, 'user', ['Mark']);
  updateAtPath(state, 'user', [10]);
  // @ts-expect-error
  updateAtPath(state, 'user', 'Mark');
  updateAtPath(state, 'user', [undefined]);
  updateAtPath(state, 'user', undefined);

  updateAtPath(state, 'user', { '0': 'Mark' });
  updateAtPath(state, 'user', { '0': 10 });
  updateAtPath(state, 'user', { '0': undefined });
  updateAtPath(state, 'user', { '1': 'Mark' });
  updateAtPath(state, 'user', { '1': 10 });
  updateAtPath(state, 'user', { '1': undefined });
  updateAtPath(state, 'user', { '2': 'Mark' });
  updateAtPath(state, 'user', { '2': 10 });
  updateAtPath(state, 'user', { '2': undefined });

  updateAtPath(state, 'user', { '0': { $$set: 'Mark' } });
  updateAtPath(state, 'user', { '0': { $$set: 10 } });
  updateAtPath(state, 'user', { '0': { $$set: undefined } });
  updateAtPath(state, 'user', { '0': { $$unset: true } });
  updateAtPath(state, 'user', { '0': { $$unset: false } });
  updateAtPath(state, 'user', { '0': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '0': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '0': { $$delete: false } });
  updateAtPath(state, 'user', { '0': { $$delete: undefined } });
  updateAtPath(state, 'user', { '1': { $$set: 'Mark' } });
  updateAtPath(state, 'user', { '1': { $$set: 10 } });
  updateAtPath(state, 'user', { '1': { $$set: undefined } });
  updateAtPath(state, 'user', { '1': { $$unset: true } });
  updateAtPath(state, 'user', { '1': { $$unset: false } });
  updateAtPath(state, 'user', { '1': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '1': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '1': { $$delete: false } });
  updateAtPath(state, 'user', { '1': { $$delete: undefined } });
  updateAtPath(state, 'user', { '2': { $$set: 'Mark' } });
  updateAtPath(state, 'user', { '2': { $$set: 10 } });
  updateAtPath(state, 'user', { '2': { $$set: undefined } });
  updateAtPath(state, 'user', { '2': { $$unset: true } });
  updateAtPath(state, 'user', { '2': { $$unset: false } });
  updateAtPath(state, 'user', { '2': { $$unset: undefined } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '2': { $$delete: true } });
  // @ts-expect-error
  updateAtPath(state, 'user', { '2': { $$delete: false } });
  updateAtPath(state, 'user', { '2': { $$delete: undefined } });
}
