import { get, quietGet } from '../../src/path/path';
import { PathValue, PossiblePath, PossibleValue } from '../../src/path/path.types';
import { expect, PASSED } from '../tools/expect';

/**
 * get
 */
{
  {
    type User = {
      nick: string;
      friend: {
        id: number;
      };
      group?: {
        id: number;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    const user = {} as User;

    const nick = get(user, 'nick');
    expect.equal<typeof nick, string>(PASSED);

    const quietNick = quietGet(user, 'nick');
    expect.equal<typeof quietNick, undefined | string>(PASSED);

    // @ts-expect-error
    get(user, 'nick.abc');

    // @ts-expect-error
    quietGet(user, 'nick.abc');

    // @ts-expect-error
    get(user, 'nick.length');

    // @ts-expect-error
    quietGet(user, 'nick.length');

    const friend = get(user, 'friend');
    expect.equal<typeof friend, { id: number }>(PASSED);

    const quietFriend = quietGet(user, 'friend');
    expect.equal<typeof quietFriend, undefined | { id: number }>(PASSED);

    const categoryId = get(user, 'friend.id');
    expect.equal<typeof categoryId, number>(PASSED);

    const quietCategoryId = quietGet(user, 'friend.id');
    expect.equal<typeof quietCategoryId, undefined | number>(PASSED);

    const group = get(user, 'group');
    expect.equal<typeof group, undefined | { id: number }>(PASSED);

    const quietGroup = quietGet(user, 'group');
    expect.equal<typeof quietGroup, undefined | { id: number }>(PASSED);

    const brandId = get(user, 'group.id');
    expect.equal<typeof brandId, number>(PASSED);

    const quietBrandId = quietGet(user, 'group.id');
    expect.equal<typeof quietBrandId, undefined | number>(PASSED);

    const settings = get(user, 'settings');
    expect.equal<typeof settings, ['on' | 'off', 'dark' | 'light']>(PASSED);

    const quietSettings = quietGet(user, 'settings');
    expect.equal<typeof quietSettings, undefined | ['on' | 'off', 'dark' | 'light']>(PASSED);

    const firstSetting = get(user, 'settings.0');
    expect.equal<typeof firstSetting, 'on' | 'off'>(PASSED);

    const quietFirstSetting = quietGet(user, 'settings.0');
    expect.equal<typeof quietFirstSetting, undefined | 'on' | 'off'>(PASSED);

    const secondSetting = get(user, 'settings.1');
    expect.equal<typeof secondSetting, 'dark' | 'light'>(PASSED);

    const quietSecondSetting = quietGet(user, 'settings.1');
    expect.equal<typeof quietSecondSetting, undefined | 'dark' | 'light'>(PASSED);

    // @ts-expect-error
    get(user, 'settings.2');

    // @ts-expect-error
    quietGet(user, 'settings.2');

    // @ts-expect-error
    get(user, 'settings.abc');

    // @ts-expect-error
    quietGet(user, 'settings.abc');

    // @ts-expect-error
    get(user, 'settings.length');

    // @ts-expect-error
    quietGet(user, 'settings.length');

    // @ts-expect-error
    get(user, 'settings.');

    // @ts-expect-error
    quietGet(user, 'settings.');

    const tags = get(user, 'tags');
    expect.equal<typeof tags, string[]>(PASSED);

    const quietTags = quietGet(user, 'tags');
    expect.equal<typeof quietTags, undefined | string[]>(PASSED);

    const firstTag = get(user, 'tags.0');
    expect.equal<typeof firstTag, string>(PASSED);

    const quietFirstTag = quietGet(user, 'tags.0');
    expect.equal<typeof quietFirstTag, undefined | string>(PASSED);

    const secondTag = get(user, 'tags.1');
    expect.equal<typeof secondTag, string>(PASSED);

    const quietSecondTag = quietGet(user, 'tags.1');
    expect.equal<typeof quietSecondTag, undefined | string>(PASSED);

    // @ts-expect-error
    get(user, 'tags.abc');

    // @ts-expect-error
    quietGet(user, 'tags.abc');

    // @ts-expect-error
    get(user, 'tags.length');

    // @ts-expect-error
    quietGet(user, 'tags.length');

    // @ts-expect-error
    get(user, 'tags.');

    // @ts-expect-error
    quietGet(user, 'tags.');

    // @ts-expect-error
    get(user, 'nonexistent');

    // @ts-expect-error
    quietGet(user, 'nonexistent');
  }

  {
    type EmptyPropNameTest = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '': string;
      inner: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': number;
      };
    };

    const emptyPropNameTest = {} as EmptyPropNameTest;

    const empty = get(emptyPropNameTest, '');
    expect.equal<typeof empty, string>(PASSED);

    const quietEmpty = quietGet(emptyPropNameTest, '');
    expect.equal<typeof quietEmpty, undefined | string>(PASSED);

    const innerEmpty = get(emptyPropNameTest, 'inner.');
    expect.equal<typeof innerEmpty, number>(PASSED);

    const quietInnerEmpty = quietGet(emptyPropNameTest, 'inner.');
    expect.equal<typeof quietInnerEmpty, undefined | number>(PASSED);

    // @ts-expect-error
    get(emptyPropNameTest, 'inner..');

    // @ts-expect-error
    quietGet(emptyPropNameTest, 'inner..');
  }

  {
    type EmptyPropNameTest = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': number;
      };
    };

    const emptyPropNameTest = {} as EmptyPropNameTest;

    const innerEmpty = get(emptyPropNameTest, '.');
    expect.equal<typeof innerEmpty, number>(PASSED);

    const quietInnerEmpty = quietGet(emptyPropNameTest, '.');
    expect.equal<typeof quietInnerEmpty, undefined | number>(PASSED);

    // @ts-expect-error
    get(emptyPropNameTest, '..');

    // @ts-expect-error
    quietGet(emptyPropNameTest, '..');
  }

  {
    type EmptyPropNameTest = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '': number;
        };
      };
    };

    const emptyPropNameTest = {} as EmptyPropNameTest;

    const innerEmpty = get(emptyPropNameTest, '..');
    expect.equal<typeof innerEmpty, number>(PASSED);

    const quietInnerEmpty = quietGet(emptyPropNameTest, '..');
    expect.equal<typeof quietInnerEmpty, undefined | number>(PASSED);

    // @ts-expect-error
    get(emptyPropNameTest, '...');

    // @ts-expect-error
    quietGet(emptyPropNameTest, '...');
  }

  {
    type User = {
      nick: string;
    };

    const user = {} as User;

    const quietNick = quietGet(user, 'nick', null);
    expect.equal<typeof quietNick, string | null>(PASSED);
  }
}

/**
 * PossiblePath
 */
{
  {
    type User = {
      nick: string;
      friend: {
        id: number;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      group?: number;
    };

    type Path = PossiblePath<User>;

    type ExpectPath =
      | 'nick'
      | 'friend'
      | 'friend.id'
      | 'settings'
      | 'settings.0'
      | 'settings.1'
      | 'tags'
      | `tags.${number}`
      | 'group';

    expect.equal<Path, ExpectPath>(PASSED);
  }

  {
    type User = {
      nick: string;
      friend: {
        id: number;
        data: User;
      };
    };

    type Path = PossiblePath<User>;

    type ExpectPath =
      | 'nick'
      | 'friend'
      | 'friend.id'
      | 'friend.data'
      | 'friend.data.nick'
      | 'friend.data.friend'
      | 'friend.data.friend.id'
      | 'friend.data.friend.data'
      | `friend.data.friend.data.${string}`;

    expect.equal<Path, ExpectPath>(PASSED);
  }

  {
    type User = {
      nick: string;
      friend: {
        id: number;
        data: User;
      };
    };

    type Path = PossiblePath<User, 3>;

    type ExpectPath =
      | 'nick'
      | 'friend'
      | 'friend.id'
      | 'friend.data'
      | 'friend.data.nick'
      | 'friend.data.friend'
      | 'friend.data.friend.id'
      | 'friend.data.friend.data'
      | 'friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data'
      | `friend.data.friend.data.friend.data.${string}`;

    expect.equal<Path, ExpectPath>(PASSED);
  }

  {
    type User = {
      nick: string;
      friend: {
        id: number;
        data: User;
      };
    };

    type Path = PossiblePath<User, 9>;

    type ExpectPath =
      | 'nick'
      | 'friend'
      | 'friend.id'
      | 'friend.data'
      | 'friend.data.nick'
      | 'friend.data.friend'
      | 'friend.data.friend.id'
      | 'friend.data.friend.data'
      | 'friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data'
      | 'friend.data.friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data.friend.data'
      | 'friend.data.friend.data.friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.nick'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.id'
      | 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data'
      | `friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.${string}`;

    expect.equal<Path, ExpectPath>(PASSED);

    type Path10 = PossiblePath<User, 10>;
    type Path11 = PossiblePath<User, 11>;
    type Path30 = PossiblePath<User, 30>;

    // It's very strangely. If I define type `type Path = PossiblePath<User, 9>` and then define
    // type `type Path_10 = PossiblePath<User, 10>` (just like in this test) - typescript will
    // calculate both types. But if I define only one type `type Path = PossiblePath<User, 10>;`
    // - typescript give me error: 'type instantiation is excessively deep'. See next test block.

    // TODO This should not give an error!
    // @ts-expect-error
    expect.equal<Path, Path10>(PASSED);
    // TODO This should not give an error!
    // @ts-expect-error
    expect.equal<Path, Path11>(PASSED);
    // TODO This should not give an error!
    // @ts-expect-error
    expect.equal<Path, Path30>(PASSED);
  }

  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type User = {
      nick: string;
      friend: {
        id: number;
        data: User;
      };
    };

    // TODO This should work
    // Do not why, but typescript give me an error: 'type instantiation is excessively deep'. See
    // previous test block.
    // type Path = PossiblePath<User, 10>;
  }

  {
    type User = {
      nick: string;
      boss: {
        id: number;
        data: Boss;
      };
    };

    type Boss = {
      nick: string;
      friend: {
        id: string;
        data: User;
      };
    };

    type Path = PossiblePath<User>;

    type ExpectPath =
      | 'nick'
      | 'boss'
      | 'boss.id'
      | 'boss.data'
      | 'boss.data.nick'
      | 'boss.data.friend'
      | 'boss.data.friend.id'
      | 'boss.data.friend.data'
      | 'boss.data.friend.data.nick'
      | 'boss.data.friend.data.boss'
      | 'boss.data.friend.data.boss.id'
      | 'boss.data.friend.data.boss.data'
      | 'boss.data.friend.data.boss.data.nick'
      | 'boss.data.friend.data.boss.data.friend'
      | 'boss.data.friend.data.boss.data.friend.id'
      | 'boss.data.friend.data.boss.data.friend.data'
      | `boss.data.friend.data.boss.data.friend.data.${string}`;

    expect.equal<Path, ExpectPath>(PASSED);
  }
}

/**
 * PossibleValue
 */
{
  {
    type User = {
      nick: string;
      friend: {
        id: number;
      };
      settings: boolean[];
    };

    type Value = PossibleValue<User>;

    type ExpectedValue = string | { id: number } | number | boolean[] | boolean;

    expect.equal<Value, ExpectedValue>(PASSED);
  }

  {
    type User = {
      settings: ['on' | 'off', 'dark' | 'light'];
      sort?: number;
    };

    type Value = PossibleValue<User>;

    type ExpectedValue = | undefined | number | 'on' | 'off' | 'dark' | 'light' | ['on' | 'off', 'dark' | 'light'];

    expect.equal<Value, ExpectedValue>(PASSED);
  }

  {
    type Data = undefined | null | boolean | number;

    type Value = PossibleValue<Data>;

    expect.equal<Value, undefined | null | boolean | number>(PASSED);
  }
}

/**
 * PathValue
 */
{
  {
    type User = {
      nick: string;
      friend: {
        id: number;
      };
      group?: {
        id: number;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    expect.equal<PathValue<User, 'nick'>, string>(PASSED);
    expect.equal<PathValue<User, 'nick'>, string>(PASSED);
    expect.equal<PathValue<User, 'friend'>, { id: number }>(PASSED);
    expect.equal<PathValue<User, 'friend.id'>, number>(PASSED);
    expect.equal<PathValue<User, 'group'>, undefined | { id: number }>(PASSED);
    expect.equal<PathValue<User, 'group.id'>, number>(PASSED);
    expect.equal<PathValue<User, 'settings'>, ['on' | 'off', 'dark' | 'light']>(PASSED);
    expect.equal<PathValue<User, 'settings.0'>, 'on' | 'off'>(PASSED);
    expect.equal<PathValue<User, 'settings.1'>, 'dark' | 'light'>(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'settings.2'>,
      undefined
    >(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'settings.abc'>,
      unknown
    >(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'settings.length'>,
      unknown
    >(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'settings.'>,
      unknown
    >(PASSED);
    expect.equal<PathValue<User, 'tags'>, string[]>(PASSED);
    expect.equal<PathValue<User, 'tags.0'>, string>(PASSED);
    expect.equal<PathValue<User, 'tags.1'>, string>(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'tags.abc'>,
      unknown
    >(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'tags.length'>,
      unknown
    >(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'tags.'>,
      unknown
    >(PASSED);
    expect.equal<PathValue<User, 'sort'>, undefined | number>(PASSED);
    expect.equal<
      // @ts-expect-error
      PathValue<User, 'nonexistent'>,
      unknown
    >(PASSED);
  }

  {
    type EmptyPropNameTest = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '': string;
      inner: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': number;
      };
    };

    expect.equal<PathValue<EmptyPropNameTest, ''>, string>(PASSED);

    expect.equal<PathValue<EmptyPropNameTest, 'inner.'>, number>(PASSED);

    expect.equal<PathValue<
      // @ts-expect-error
      EmptyPropNameTest, 'inner..'>,
      never
    >(PASSED);
  }

  {
    type EmptyPropNameTest = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': number;
      };
    };

    expect.equal<PathValue<EmptyPropNameTest, '.'>, number>(PASSED);

    expect.equal<PathValue<
      // @ts-expect-error
      EmptyPropNameTest, '..'>,
      never
    >(PASSED);
  }

  {
    type EmptyPropNameTest = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '': number;
        };
      };
    };

    expect.equal<PathValue<EmptyPropNameTest, '..'>, number>(PASSED);

    expect.equal<
      // @ts-expect-error
      PathValue<EmptyPropNameTest, '...'>,
      never
    >(PASSED);
  }
}
