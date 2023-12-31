/* eslint no-unused-labels: "off" */


import { update } from '../../src/update/update';

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
const newUser = {} as User;

const optionalUser = {} as undefined | User;

const users = [] as User[];

update_null: {
  const user = null;

  // @ts-expect-error
  update(user, { $$append: 10 });
  // @ts-expect-error
  update(user, { $$prepend: 10 });
  // @ts-expect-error
  update(user, { $$exclude: 10 });
  // @ts-expect-error
  update(user, { $$extract: 10 });
  // @ts-expect-error
  update(user, { $$move: [0, 1] });
  // @ts-expect-error
  update(user, { $$swap: [0, 1] });
  // @ts-expect-error
  update(user, { $$apply: { value: 10 } });
}

update_object: {
  update(user, newUser);
  update(user, { id: 10 });
  update(user, {});
  update(user, undefined);
  // @ts-expect-error
  update(user, { nonexistent: '10' });
  // @ts-expect-error
  update(user, { nonexistent: undefined });
}

$$set_on_object: {
  update(user, { $$set: newUser });
  // @ts-expect-error
  update(user, { $$set: { id: 10 } });
  update(user, { $$set: undefined });
  // @ts-expect-error
  update(user, { $$set: newUser, id: 10 });
  update(user, { $$set: newUser, id: undefined });
  update(user, { $$set: newUser, nick: undefined });
  update(user, { $$set: newUser, enabled: undefined });
  // @ts-expect-error
  update(user, { $$set: newUser, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$set: newUser, nonexistent: undefined });
  update(user, { $$set: undefined, id: 10 });
  update(user, { $$set: undefined, id: undefined });
  update(user, { $$set: undefined, nick: undefined });
  update(user, { $$set: undefined, enabled: undefined });
  // @ts-expect-error
  update(user, { $$set: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$set: undefined, nonexistent: undefined });
}

$$unset_on_object: {
  // @ts-expect-error
  update(user, { $$unset: true });
  // @ts-expect-error
  update(user, { $$unset: false });
  update(user, { $$unset: undefined });
  // @ts-expect-error
  update(user, { $$unset: true, id: 10 });
  // @ts-expect-error
  update(user, { $$unset: true, id: undefined });
  // @ts-expect-error
  update(user, { $$unset: true, nick: undefined });
  // @ts-expect-error
  update(user, { $$unset: true, enabled: undefined });
  // @ts-expect-error
  update(user, { $$unset: true, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$unset: true, nonexistent: undefined });
  // @ts-expect-error
  update(user, { $$unset: false, id: 10 });
  // @ts-expect-error
  update(user, { $$unset: false, id: undefined });
  // @ts-expect-error
  update(user, { $$unset: false, nick: undefined });
  // @ts-expect-error
  update(user, { $$unset: false, enabled: undefined });
  // @ts-expect-error
  update(user, { $$unset: false, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$unset: false, nonexistent: undefined });
  update(user, { $$unset: undefined, id: 10 });
  update(user, { $$unset: undefined, id: undefined });
  update(user, { $$unset: undefined, nick: undefined });
  update(user, { $$unset: undefined, enabled: undefined });
  // @ts-expect-error
  update(user, { $$unset: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$unset: undefined, nonexistent: undefined });
}

$$delete_on_object: {
  // @ts-expect-error
  update(user, { $$delete: true });
  // @ts-expect-error
  update(user, { $$delete: false });
  update(user, { $$delete: undefined });
  // @ts-expect-error
  update(user, { $$delete: true, id: 10 });
  // @ts-expect-error
  update(user, { $$delete: true, id: undefined });
  // @ts-expect-error
  update(user, { $$delete: true, nick: undefined });
  // @ts-expect-error
  update(user, { $$delete: true, enabled: undefined });
  // @ts-expect-error
  update(user, { $$delete: true, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$delete: true, nonexistent: undefined });
  // @ts-expect-error
  update(user, { $$delete: false, id: 10 });
  // @ts-expect-error
  update(user, { $$delete: false, id: undefined });
  // @ts-expect-error
  update(user, { $$delete: false, nick: undefined });
  // @ts-expect-error
  update(user, { $$delete: false, enabled: undefined });
  // @ts-expect-error
  update(user, { $$delete: false, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$delete: false, nonexistent: undefined });
  update(user, { $$delete: undefined, id: 10 });
  update(user, { $$delete: undefined, id: undefined });
  update(user, { $$delete: undefined, nick: undefined });
  update(user, { $$delete: undefined, enabled: undefined });
  // @ts-expect-error
  update(user, { $$delete: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { $$delete: undefined, nonexistent: undefined });
}

$$set_on_object_or_undefined: {
  update(optionalUser, { $$set: newUser });
  // @ts-expect-error
  update(optionalUser, { $$set: { id: 10 } });
  update(optionalUser, { $$set: undefined });
  // @ts-expect-error
  update(optionalUser, { $$set: newUser, id: 10 });
  update(optionalUser, { $$set: newUser, id: undefined });
  update(optionalUser, { $$set: newUser, nick: undefined });
  update(optionalUser, { $$set: newUser, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$set: newUser, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$set: newUser, nonexistent: undefined });
  update(optionalUser, { $$set: undefined, id: 10 });
  update(optionalUser, { $$set: undefined, id: undefined });
  update(optionalUser, { $$set: undefined, nick: undefined });
  update(optionalUser, { $$set: undefined, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$set: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$set: undefined, nonexistent: undefined });
}

$$unset_on_object_or_undefined: {
  update(optionalUser, { $$unset: true });
  update(optionalUser, { $$unset: false });
  update(optionalUser, { $$unset: undefined });
  // @ts-expect-error
  update(optionalUser, { $$unset: true, id: 10 });
  update(optionalUser, { $$unset: true, id: undefined });
  update(optionalUser, { $$unset: true, nick: undefined });
  update(optionalUser, { $$unset: true, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$unset: true, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$unset: true, nonexistent: undefined });
  // @ts-expect-error
  update(optionalUser, { $$unset: false, id: 10 });
  update(optionalUser, { $$unset: false, id: undefined });
  update(optionalUser, { $$unset: false, nick: undefined });
  update(optionalUser, { $$unset: false, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$unset: false, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$unset: false, nonexistent: undefined });
  update(optionalUser, { $$unset: undefined, id: 10 });
  update(optionalUser, { $$unset: undefined, id: undefined });
  update(optionalUser, { $$unset: undefined, nick: undefined });
  update(optionalUser, { $$unset: undefined, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$unset: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$unset: undefined, nonexistent: undefined });
}

$$delete_on_object_or_undefined: {
  // @ts-expect-error
  update(optionalUser, { $$delete: true });
  // @ts-expect-error
  update(optionalUser, { $$delete: false });
  update(optionalUser, { $$delete: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: true, id: 10 });
  // @ts-expect-error
  update(optionalUser, { $$delete: true, id: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: true, nick: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: true, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: true, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$delete: true, nonexistent: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: false, id: 10 });
  // @ts-expect-error
  update(optionalUser, { $$delete: false, id: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: false, nick: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: false, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: false, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$delete: false, nonexistent: undefined });
  update(optionalUser, { $$delete: undefined, id: 10 });
  update(optionalUser, { $$delete: undefined, id: undefined });
  update(optionalUser, { $$delete: undefined, nick: undefined });
  update(optionalUser, { $$delete: undefined, enabled: undefined });
  // @ts-expect-error
  update(optionalUser, { $$delete: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(optionalUser, { $$delete: undefined, nonexistent: undefined });
}

$$set_on_nested_object: {
  update(user, { friend: { $$set: { id: 10, nick: 'Antonio' } } });
  // @ts-expect-error
  update(user, { friend: { $$set: { id: 10 } } });
  update(user, { friend: { $$set: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$set: { id: 10, nick: 'Antonio' }, id: 10 } });
  update(user, { friend: { $$set: { id: 10, nick: 'Antonio' }, id: undefined } });
  update(user, { friend: { $$set: { id: 10, nick: 'Antonio' }, nick: undefined } });
  update(user, { friend: { $$set: { id: 10, nick: 'Antonio' }, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$set: { id: 10, nick: 'Antonio' }, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$set: { id: 10, nick: 'Antonio' }, nonexistent: undefined } });
  update(user, { friend: { $$set: undefined, id: 10 } });
  update(user, { friend: { $$set: undefined, id: undefined } });
  update(user, { friend: { $$set: undefined, nick: undefined } });
  update(user, { friend: { $$set: undefined, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$set: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$set: undefined, nonexistent: undefined } });
}

$$unset_on_nested_object: {
  update(user, { friend: { $$unset: true } });
  update(user, { friend: { $$unset: false } });
  update(user, { friend: { $$unset: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$unset: true, id: 10 } });
  update(user, { friend: { $$unset: true, id: undefined } });
  update(user, { friend: { $$unset: true, nick: undefined } });
  update(user, { friend: { $$unset: true, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$unset: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$unset: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$unset: false, id: 10 } });
  update(user, { friend: { $$unset: false, id: undefined } });
  update(user, { friend: { $$unset: false, nick: undefined } });
  update(user, { friend: { $$unset: false, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$unset: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$unset: false, nonexistent: undefined } });
  update(user, { friend: { $$unset: undefined, id: 10 } });
  update(user, { friend: { $$unset: undefined, id: undefined } });
  update(user, { friend: { $$unset: undefined, nick: undefined } });
  update(user, { friend: { $$unset: undefined, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$unset: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$unset: undefined, nonexistent: undefined } });
}

$$delete_on_nested_object: {
  update(user, { friend: { $$delete: true } });
  update(user, { friend: { $$delete: false } });
  update(user, { friend: { $$delete: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$delete: true, id: 10 } });
  update(user, { friend: { $$delete: true, id: undefined } });
  update(user, { friend: { $$delete: true, nick: undefined } });
  update(user, { friend: { $$delete: true, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$delete: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$delete: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$delete: false, id: 10 } });
  update(user, { friend: { $$delete: false, id: undefined } });
  update(user, { friend: { $$delete: false, nick: undefined } });
  update(user, { friend: { $$delete: false, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$delete: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$delete: false, nonexistent: undefined } });
  update(user, { friend: { $$delete: undefined, id: 10 } });
  update(user, { friend: { $$delete: undefined, id: undefined } });
  update(user, { friend: { $$delete: undefined, nick: undefined } });
  update(user, { friend: { $$delete: undefined, enabled: undefined } });
  // @ts-expect-error
  update(user, { friend: { $$delete: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { friend: { $$delete: undefined, nonexistent: undefined } });
}

update_value: {
  update(user, { id: 10 });
  update(user, { id: undefined });
  // @ts-expect-error
  update(user, { id: 10, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { id: 10, nonexistent: undefined });
  // @ts-expect-error
  update(user, { id: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { id: undefined, nonexistent: undefined });
  // @ts-expect-error
  update(user, { id: { nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { nonexistent: undefined } });
}

$$set_on_value: {
  update(user, { id: { $$set: 10 } });
  update(user, { id: { $$set: undefined } });
  // @ts-expect-error
  update(user, { id: { $$set: 10, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$set: 10, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { id: { $$set: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$set: undefined, nonexistent: undefined } });
}

$$unset_on_value: {
  // @ts-expect-error
  update(user, { id: { $$unset: true } });
  // @ts-expect-error
  update(user, { id: { $$unset: false } });
  update(user, { id: { $$unset: undefined } });
  // @ts-expect-error
  update(user, { id: { $$unset: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$unset: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { id: { $$unset: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$unset: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { id: { $$unset: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$unset: undefined, nonexistent: undefined } });
}

$$delete_on_value: {
  // @ts-expect-error
  update(user, { id: { $$delete: true } });
  // @ts-expect-error
  update(user, { id: { $$delete: false } });
  update(user, { id: { $$delete: undefined } });
  // @ts-expect-error
  update(user, { id: { $$delete: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$delete: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { id: { $$delete: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$delete: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { id: { $$delete: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { id: { $$delete: undefined, nonexistent: undefined } });
}

update_value_or_undefined: {
  update(user, { nick: 'Antonio' });
  update(user, { nick: undefined });
  // @ts-expect-error
  update(user, { nick: 'Antonio', nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { nick: 'Antonio', nonexistent: undefined });
  // @ts-expect-error
  update(user, { nick: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { nick: undefined, nonexistent: undefined });
  // @ts-expect-error
  update(user, { nick: { nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { nonexistent: undefined } });
}

$$set_on_value_or_undefined: {
  update(user, { nick: { $$set: 'Antonio' } });
  update(user, { nick: { $$set: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$set: 'Antonio', nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$set: 'Antonio', nonexistent: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$set: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$set: undefined, nonexistent: undefined } });
}

$$unset_on_value_or_undefined: {
  update(user, { nick: { $$unset: true } });
  update(user, { nick: { $$unset: false } });
  update(user, { nick: { $$unset: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$unset: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$unset: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$unset: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$unset: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$unset: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$unset: undefined, nonexistent: undefined } });
}

$$delete_on_value_or_undefined: {
  // @ts-expect-error
  update(user, { nick: { $$delete: true } });
  // @ts-expect-error
  update(user, { nick: { $$delete: false } });
  update(user, { nick: { $$delete: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$delete: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$delete: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$delete: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$delete: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$delete: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { nick: { $$delete: undefined, nonexistent: undefined } });
}

update_optional_value: {
  update(user, { enabled: true });
  update(user, { enabled: undefined });
  // @ts-expect-error
  update(user, { enabled: true, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { enabled: true, nonexistent: undefined });
  // @ts-expect-error
  update(user, { enabled: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { enabled: undefined, nonexistent: undefined });
  // @ts-expect-error
  update(user, { enabled: { nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { nonexistent: undefined } });
}

$$set_on_optional_value: {
  update(user, { enabled: { $$set: true } });
  update(user, { enabled: { $$set: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$set: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$set: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$set: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$set: undefined, nonexistent: undefined } });
}

$$unset_on_optional_value: {
  update(user, { enabled: { $$unset: true } });
  update(user, { enabled: { $$unset: false } });
  update(user, { enabled: { $$unset: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: undefined, nonexistent: undefined } });
}

$$delete_on_optional_value: {
  update(user, { enabled: { $$delete: true } });
  update(user, { enabled: { $$delete: false } });
  update(user, { enabled: { $$delete: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$delete: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$delete: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$delete: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$delete: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$delete: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { enabled: { $$delete: undefined, nonexistent: undefined } });
}

update_optional_value_or_undefined: {
  update(user, { id: 10 });
  update(user, { team: undefined });
  // @ts-expect-error
  update(user, { id: 10, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { id: 10, nonexistent: undefined });
  // @ts-expect-error
  update(user, { team: undefined, nonexistent: 'abc' });
  // @ts-expect-error
  update(user, { team: undefined, nonexistent: undefined });
  // @ts-expect-error
  update(user, { team: { nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { nonexistent: undefined } });
}

$$set_on_optional_value_or_undefined: {
  update(user, { team: { $$set: 'ducks' } });
  update(user, { team: { $$set: undefined } });
  // @ts-expect-error
  update(user, { team: { $$set: 'ducks', nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$set: 'ducks', nonexistent: undefined } });
  // @ts-expect-error
  update(user, { team: { $$set: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$set: undefined, nonexistent: undefined } });
}

$$unset_on_optional_value_or_undefined: {
  update(user, { team: { $$unset: true } });
  update(user, { team: { $$unset: false } });
  update(user, { team: { $$unset: undefined } });
  // @ts-expect-error
  update(user, { team: { $$unset: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$unset: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { team: { $$unset: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$unset: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { team: { $$unset: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$unset: undefined, nonexistent: undefined } });
}

$$delete_on_optional_value_or_undefined: {
  update(user, { team: { $$delete: true } });
  update(user, { team: { $$delete: false } });
  update(user, { team: { $$delete: undefined } });
  // @ts-expect-error
  update(user, { team: { $$delete: true, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$delete: true, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { team: { $$delete: false, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$delete: false, nonexistent: undefined } });
  // @ts-expect-error
  update(user, { team: { $$delete: undefined, nonexistent: 'abc' } });
  // @ts-expect-error
  update(user, { team: { $$delete: undefined, nonexistent: undefined } });
}

$$set_$$unset_$$delete_on_value_or_undefined: {
  // @ts-expect-error
  update(user, { nick: { $$set: 'Antonio', $$unset: true } });
  // @ts-expect-error
  update(user, { nick: { $$set: 'Antonio', $$unset: false } });
  update(user, { nick: { $$set: 'Antonio', $$unset: undefined } });
  update(user, { nick: { $$set: undefined, $$unset: true } });
  update(user, { nick: { $$set: undefined, $$unset: false } });
  update(user, { nick: { $$set: undefined, $$unset: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$set: 'Antonio', $$delete: true } });
  // @ts-expect-error
  update(user, { nick: { $$set: 'Antonio', $$delete: false } });
  update(user, { nick: { $$set: 'Antonio', $$delete: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$set: undefined, $$delete: true } });
  // @ts-expect-error
  update(user, { nick: { $$set: undefined, $$delete: false } });
  update(user, { nick: { $$set: undefined, $$delete: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$unset: true, $$delete: true } });
  // @ts-expect-error
  update(user, { nick: { $$unset: true, $$delete: false } });
  update(user, { nick: { $$unset: true, $$delete: undefined } });
  // @ts-expect-error
  update(user, { nick: { $$unset: undefined, $$delete: true } });
  // @ts-expect-error
  update(user, { nick: { $$unset: undefined, $$delete: false } });
  update(user, { nick: { $$unset: undefined, $$delete: undefined } });
}

$$set_$$unset_$$delete_on_optional_value: {
  // @ts-expect-error
  update(user, { enabled: { $$set: true, $$unset: true } });
  // @ts-expect-error
  update(user, { enabled: { $$set: true, $$unset: false } });
  update(user, { enabled: { $$set: true, $$unset: undefined } });
  update(user, { enabled: { $$set: undefined, $$unset: true } });
  update(user, { enabled: { $$set: undefined, $$unset: false } });
  update(user, { enabled: { $$set: undefined, $$unset: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$set: true, $$delete: true } });
  // @ts-expect-error
  update(user, { enabled: { $$set: true, $$delete: false } });
  update(user, { enabled: { $$set: true, $$delete: undefined } });
  update(user, { enabled: { $$set: undefined, $$delete: true } });
  update(user, { enabled: { $$set: undefined, $$delete: false } });
  update(user, { enabled: { $$set: undefined, $$delete: undefined } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: true, $$delete: true } });
  // @ts-expect-error
  update(user, { enabled: { $$unset: true, $$delete: false } });
  update(user, { enabled: { $$unset: true, $$delete: undefined } });
  update(user, { enabled: { $$unset: undefined, $$delete: true } });
  update(user, { enabled: { $$unset: undefined, $$delete: false } });
  update(user, { enabled: { $$unset: undefined, $$delete: undefined } });
}

$$set_$$unset_$$delete_on_optional_value_or_undefined: {
  // @ts-expect-error
  update(user, { team: { $$set: 'Ducks', $$unset: true } });
  // @ts-expect-error
  update(user, { team: { $$set: 'Ducks', $$unset: false } });
  update(user, { team: { $$set: 'Ducks', $$unset: undefined } });
  update(user, { team: { $$set: undefined, $$unset: true } });
  update(user, { team: { $$set: undefined, $$unset: false } });
  update(user, { team: { $$set: undefined, $$unset: undefined } });
  // @ts-expect-error
  update(user, { team: { $$set: 'Ducks', $$delete: true } });
  // @ts-expect-error
  update(user, { team: { $$set: 'Ducks', $$delete: false } });
  update(user, { team: { $$set: 'Ducks', $$delete: undefined } });
  update(user, { team: { $$set: undefined, $$delete: true } });
  update(user, { team: { $$set: undefined, $$delete: false } });
  update(user, { team: { $$set: undefined, $$delete: undefined } });
  // @ts-expect-error
  update(user, { team: { $$unset: true, $$delete: true } });
  // @ts-expect-error
  update(user, { team: { $$unset: true, $$delete: false } });
  update(user, { team: { $$unset: true, $$delete: undefined } });
  update(user, { team: { $$unset: undefined, $$delete: true } });
  update(user, { team: { $$unset: undefined, $$delete: false } });
  update(user, { team: { $$unset: undefined, $$delete: undefined } });
}

array_of_objects: {
  type User = { id: number; nick: string };

  const users = [] as User[];

  update(users, { '0': { id: 10, nick: 'Mark' } });
  update(users, { '0': { id: 10 } });
  update(users, { '0': undefined });
  // @ts-expect-error
  update(users, { '0': { id: 10 }, id: 10 });
  update(users, { '0': { id: 10 }, id: undefined });
  // @ts-expect-error
  update(users, { '0': undefined, id: 10 });
  update(users, { '0': undefined, id: undefined });
  update(users, [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  update(users, [{ id: 10 }]);
  // @ts-expect-error
  update(users, { id: 10, nick: 'Mark' });
  // @ts-expect-error
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: undefined } });
  // @ts-expect-error
  update(users, { '0': { $$unset: true } });
  // @ts-expect-error
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

array_of_objects_and_undefined_values: {
  type User = { id: number; nick: string };

  const users = [] as (undefined | User)[];

  update(users, { '0': { id: 10, nick: 'Mark' } });
  update(users, { '0': { id: 10 } });
  update(users, { '0': undefined });
  update(users, [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  update(users, [{ id: 10 }]);
  // @ts-expect-error
  update(users, { id: 10, nick: 'Mark' });
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: undefined } });
  update(users, { '0': { $$unset: true } });
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

array_of_scalars: {
  const users = [] as string[];

  update(users, { '0': 'Mark' });
  update(users, { '0': undefined });
  update(users, ['Mark']);
  // @ts-expect-error
  update(users, 'Mark');
  // @ts-expect-error
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: undefined } });
  // @ts-expect-error
  update(users, { '0': { $$unset: true } });
  // @ts-expect-error
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

array_of_scalars_and_undefined_values: {
  const users = [] as (undefined | string)[];

  update(users, { '0': 'Mark' });
  update(users, { '0': undefined });
  update(users, ['Mark']);
  // @ts-expect-error
  update(users, 'Mark');
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: undefined } });
  update(users, { '0': { $$unset: true } });
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

tuple_of_objects: {
  type User = { id: number; nick: string };
  type Manager = { name: string; grade: number };

  const users = [{}, {}] as [User, Manager];

  update(users, { '0': { id: 10, nick: 'Mark' } });
  update(users, { '0': { id: 10 } });
  update(users, { '0': { name: 'Mark', grade: 10 } });
  update(users, { '0': { name: 'Mark' } });
  update(users, { '0': undefined });
  update(users, { '1': { id: 10, nick: 'Mark' } });
  update(users, { '1': { id: 10 } });
  update(users, { '1': { name: 'Mark', grade: 10 } });
  update(users, { '1': { name: 'Mark' } });
  update(users, { '1': undefined });
  update(users, { '2': { id: 10, nick: 'Mark' } });
  update(users, { '2': { id: 10 } });
  update(users, { '2': { name: 'Mark', grade: 10 } });
  update(users, { '2': { name: 'Mark' } });
  update(users, { '2': undefined });
  // @ts-expect-error
  update(users, { '0': { id: 10 }, id: 10 });
  update(users, { '0': { id: 10 }, id: undefined });
  // @ts-expect-error
  update(users, { '0': undefined, id: 10 });
  update(users, { '0': undefined, id: undefined });
  update(users, [{ id: 10, nick: 'Mark' }, { name: 'Antonio', grade: 10 }]);
  update(users, [{ name: 'Antonio', grade: 10 }, { id: 10, nick: 'Mark' }]);
  update(users, [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  update(users, [{ id: 10 }]);
  update(users, [{ name: 'Antonio', grade: 10 }]);
  // @ts-expect-error
  update(users, [{ name: 'Antonio' }]);
  // @ts-expect-error
  update(users, { id: 10, nick: 'Mark' });
  // @ts-expect-error
  update(users, { name: 'Antonio', grade: 10 });
  // @ts-expect-error
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: undefined } });
  // @ts-expect-error
  update(users, { '0': { $$unset: true } });
  // @ts-expect-error
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

tuple_of_objects_and_undefined_values: {
  type User = { id: number; nick: string };
  type Manager = { name: string; grade: number };

  const users = [{}, {}] as [User, undefined | Manager];

  update(users, { '0': { id: 10, nick: 'Mark' } });
  update(users, { '0': { id: 10 } });
  update(users, { '0': { name: 'Mark', grade: 10 } });
  update(users, { '0': { name: 'Mark' } });
  update(users, { '0': undefined });
  update(users, { '1': { id: 10, nick: 'Mark' } });
  update(users, { '1': { id: 10 } });
  update(users, { '1': { name: 'Mark', grade: 10 } });
  update(users, { '1': { name: 'Mark' } });
  update(users, { '1': undefined });
  update(users, [{ id: 10, nick: 'Mark' }, { name: 'Antonio', grade: 10 }]);
  update(users, [{ name: 'Antonio', grade: 10 }, { id: 10, nick: 'Mark' }]);
  update(users, [{ id: 10, nick: 'Mark' }]);
  // @ts-expect-error
  update(users, [{ id: 10 }]);
  update(users, [{ name: 'Antonio', grade: 10 }]);
  // @ts-expect-error
  update(users, [{ name: 'Antonio' }]);
  // @ts-expect-error
  update(users, { id: 10, nick: 'Mark' });
  // @ts-expect-error
  update(users, { name: 'Antonio', grade: 10 });
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: undefined } });
  update(users, { '0': { $$unset: true } });
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

tuple_of_scalars: {
  const users = [] as unknown as [string, number];

  update(users, { '0': 'Mark' });
  update(users, { '0': 10 });
  update(users, { '0': undefined });
  update(users, { '1': 'Mark' });
  update(users, { '1': 10 });
  update(users, { '1': undefined });
  update(users, { '2': 'Mark' });
  update(users, { '2': 10 });
  update(users, { '2': undefined });
  update(users, ['Mark']);
  // @ts-expect-error
  update(users, 'Mark');
  // @ts-expect-error
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: 'Mark' } });
  update(users, { '0': { $$set: 10 } });
  update(users, { '0': { $$set: undefined } });
  update(users, { '1': { $$set: 'Mark' } });
  update(users, { '1': { $$set: 10 } });
  update(users, { '1': { $$set: undefined } });
  update(users, { '2': { $$set: 'Mark' } });
  update(users, { '2': { $$set: 10 } });
  update(users, { '2': { $$set: undefined } });
  // @ts-expect-error
  update(users, { '0': { $$unset: true } });
  // @ts-expect-error
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

tuple_of_scalars_and_undefined_values: {
  const users = [] as unknown as [string, (undefined | number)];

  update(users, { '0': 'Mark' });
  update(users, { '0': 10 });
  update(users, { '0': undefined });
  update(users, { '1': 'Mark' });
  update(users, { '1': 10 });
  update(users, { '1': undefined });
  update(users, { '2': 'Mark' });
  update(users, { '2': 10 });
  update(users, { '2': undefined });
  update(users, ['Mark']);
  // @ts-expect-error
  update(users, 'Mark');
  update(users, [undefined]);
  update(users, undefined);

  update(users, { '0': { $$set: 'Mark' } });
  update(users, { '0': { $$set: 10 } });
  update(users, { '0': { $$set: undefined } });
  update(users, { '1': { $$set: 'Mark' } });
  update(users, { '1': { $$set: 10 } });
  update(users, { '1': { $$set: undefined } });
  update(users, { '2': { $$set: 'Mark' } });
  update(users, { '2': { $$set: 10 } });
  update(users, { '2': { $$set: undefined } });
  update(users, { '0': { $$unset: true } });
  update(users, { '0': { $$unset: false } });
  update(users, { '0': { $$unset: undefined } });
  update(users, { '0': { $$delete: true } });
  update(users, { '0': { $$delete: false } });
  update(users, { '0': { $$delete: undefined } });
}

$$append: {
  update(users, { $$append: [{ id: 10, nick: 'Antonio' }] });
  // @ts-expect-error
  update(users, { $$append: [{ id: 10 }] });
  // @ts-expect-error
  update(users, { $$append: { id: 10, nick: 'Antonio' } });
  // @ts-expect-error
  update(users, { $$append: [10] });
  // @ts-expect-error
  update(users, { $$append: [undefined] });
  update(users, { $$append: undefined });
  update(users, { $$append: [{ id: 10, nick: 'Antonio' }], skip: undefined });
  update(users, { $$append: [{ id: 10, nick: 'Antonio' }], skip: null });
  update(users, { $$append: [{ id: 10, nick: 'Antonio' }], skip: 10 });
}

$$prepend: {
  update(users, { $$prepend: [{ id: 10, nick: 'Antonio' }] });
  // @ts-expect-error
  update(users, { $$prepend: [{ id: 10 }] });
  // @ts-expect-error
  update(users, { $$prepend: { id: 10, nick: 'Antonio' } });
  // @ts-expect-error
  update(users, { $$prepend: [10] });
  // @ts-expect-error
  update(users, { $$prepend: [undefined] });
  update(users, { $$prepend: undefined });
  update(users, { $$prepend: [{ id: 10, nick: 'Antonio' }], skip: undefined });
  update(users, { $$prepend: [{ id: 10, nick: 'Antonio' }], skip: null });
  update(users, { $$prepend: [{ id: 10, nick: 'Antonio' }], skip: 10 });
}

$$exclude: {
  update(users, { $$exclude: [10] });
  update(users, { $$exclude: 10 });
  update(users, { $$exclude: 10, skip: undefined });
  update(users, { $$exclude: 10, skip: null });
  update(users, { $$exclude: 10, skip: 10 });

  {
    type Data = {
      skip: number;
    };

    const data = {} as Data;

    // @ts-expect-error
    update(data, { $$exclude: 10, skip: 10 });
    // @ts-expect-error
    update(data, { $$exclude: undefined, skip: 10 });
  }
}

$$extract: {
  update(users, { $$extract: [10] });
  update(users, { $$extract: 10 });
  update(users, { $$extract: 10, skip: undefined });
  update(users, { $$extract: 10, skip: null });
  update(users, { $$extract: 10, skip: 10 });

  {
    type Data = {
      skip: number;
    };

    const data = {} as Data;

    // @ts-expect-error
    update(data, { $$extract: 10, skip: 10 });
    // @ts-expect-error
    update(data, { $$extract: undefined, skip: 10 });
  }
}

$$move: {
  update(users, { $$move: [0, 1] });
  update(users, { $$move: undefined });
}

$$swap: {
  update(users, { $$swap: [0, 1] });
  update(users, { $$swap: undefined });
}

$$move_$$swap: {
  // @ts-expect-error
  update(users, { $$move: [0, 1], $$swap: [0, 1] });
  update(users, { $$move: [0, 1], $$swap: undefined });
  update(users, { $$move: undefined, $$swap: [0, 1] });
}

$$apply: {
  update(users, { $$apply: { id: 10, nick: 'Antonio' } });
  update(users, { $$apply: { id: 10, nick: 'Antonio' }, length: 1 });
  update(users, { $$apply: { id: 10, nick: 'Antonio' }, skip: 1 });
  update(users, { $$apply: { id: 10, nick: 'Antonio' }, length: 1, skip: 1 });
  update(users, { $$apply: { id: 10, nick: 'Antonio' }, length: undefined });
  update(users, { $$apply: { id: 10, nick: 'Antonio' }, skip: undefined });
  update(users, { $$apply: { id: 10 } });
  update(users, { $$apply: { id: 10 }, length: 1 });
  update(users, { $$apply: { id: 10 }, skip: 1 });
  update(users, { $$apply: { id: 10 }, length: 1, skip: 1 });
  update(users, { $$apply: { id: 10 }, length: undefined });
  update(users, { $$apply: { id: 10 }, skip: undefined });
  update(users, { $$apply: {} });
  update(users, { $$apply: {}, length: 1 });
  update(users, { $$apply: {}, skip: 1 });
  update(users, { $$apply: {}, length: 1, skip: 1 });
  update(users, { $$apply: {}, length: undefined });
  update(users, { $$apply: {}, skip: undefined });
  // @ts-expect-error
  update(users, { $$apply: { id: 10 }, length: null });
  // @ts-expect-error
  update(users, { $$apply: { id: 10 }, skip: null });
  update(users, { $$apply: undefined });

  {
    type Data = {
      skip: number;
    };

    const data = {} as Data;

    // @ts-expect-error
    update(data, { $$apply: 10, length: 10 });
    // @ts-expect-error
    update(data, { $$apply: undefined, length: 10 });

    // @ts-expect-error
    update(data, { $$apply: 10, skip: 10 });
    // @ts-expect-error
    update(data, { $$apply: undefined, skip: 10 });
  }
}
