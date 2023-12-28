import { getAtPath } from '../../src/path/path';
import { PathValue, PossiblePath, PossibleValue } from '../../src/path/path.types';
import { expect, PASSED } from '../tools/expect';

/**
 * getAtPath
 */
{
  {
    type Product = {
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

    const product = {} as Product;

    const nick = getAtPath(product, 'nick');
    expect.equal<typeof nick, string>(PASSED);

    const unknownNameProp = getAtPath(product, 'nick.abc');
    expect.equal<typeof unknownNameProp, never>(PASSED);

    const lengthNameProp = getAtPath(product, 'nick.length');
    expect.equal<typeof lengthNameProp, never>(PASSED);

    const friend = getAtPath(product, 'friend');
    expect.equal<typeof friend, { id: number }>(PASSED);

    const categoryId = getAtPath(product, 'friend.id');
    expect.equal<typeof categoryId, number>(PASSED);

    const group = getAtPath(product, 'group');
    expect.equal<typeof group, undefined | { id: number }>(PASSED);

    const brandId = getAtPath(product, 'group.id');
    expect.equal<typeof brandId, number>(PASSED);

    const settings = getAtPath(product, 'settings');
    expect.equal<typeof settings, ['on' | 'off', 'dark' | 'light']>(PASSED);

    const firstSetting = getAtPath(product, 'settings.0');
    expect.equal<typeof firstSetting, 'on' | 'off'>(PASSED);

    const secondSetting = getAtPath(product, 'settings.1');
    expect.equal<typeof secondSetting, 'dark' | 'light'>(PASSED);

    const thirdSetting = getAtPath(product, 'settings.2');
    expect.equal<typeof thirdSetting, undefined>(PASSED);

    const unknownSetting = getAtPath(product, 'settings.abc');
    expect.equal<typeof unknownSetting, unknown>(PASSED);

    const settingsLength = getAtPath(product, 'settings.length');
    expect.equal<typeof settingsLength, unknown>(PASSED);

    const dotSetting = getAtPath(product, 'settings.');
    expect.equal<typeof dotSetting, unknown>(PASSED);

    const tags = getAtPath(product, 'tags');
    expect.equal<typeof tags, string[]>(PASSED);

    const firstTag = getAtPath(product, 'tags.0');
    expect.equal<typeof firstTag, string>(PASSED);

    const secondTag = getAtPath(product, 'tags.1');
    expect.equal<typeof secondTag, string>(PASSED);

    const unknownTag = getAtPath(product, 'tags.abc');
    expect.equal<typeof unknownTag, unknown>(PASSED);

    const tagsLength = getAtPath(product, 'tags.length');
    expect.equal<typeof tagsLength, unknown>(PASSED);

    const dotTag = getAtPath(product, 'tags.');
    expect.equal<typeof dotTag, unknown>(PASSED);

    const nonexistent = getAtPath(product, 'nonexistent');
    expect.equal<typeof nonexistent, unknown>(PASSED);
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

    const empty = getAtPath(emptyPropNameTest, '');
    expect.equal<typeof empty, string>(PASSED);

    const innerEmpty = getAtPath(emptyPropNameTest, 'inner.');
    expect.equal<typeof innerEmpty, number>(PASSED);

    const nonexistentEmpty = getAtPath(emptyPropNameTest, 'inner..');
    expect.equal<typeof nonexistentEmpty, never>(PASSED);
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

    const innerEmpty = getAtPath(emptyPropNameTest, '.');
    expect.equal<typeof innerEmpty, number>(PASSED);

    const nonexistentEmpty = getAtPath(emptyPropNameTest, '..');
    expect.equal<typeof nonexistentEmpty, never>(PASSED);
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

    const innerEmpty = getAtPath(emptyPropNameTest, '..');
    expect.equal<typeof innerEmpty, number>(PASSED);

    const nonexistentEmpty = getAtPath(emptyPropNameTest, '...');
    expect.equal<typeof nonexistentEmpty, never>(PASSED);
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
      sort?: number;
    };

    type Path = PossiblePath<User>;

    expect.safety.not.extends<Path, string>(PASSED);
    expect.safety.extends<Path, 'nick'>(PASSED);
    expect.safety.extends<Path, 'friend'>(PASSED);
    expect.safety.extends<Path, 'friend.id'>(PASSED);
    expect.safety.extends<Path, 'settings'>(PASSED);
    expect.safety.extends<Path, 'settings.0'>(PASSED);
    expect.safety.extends<Path, 'settings.1'>(PASSED);
    expect.safety.not.extends<Path, 'settings.2'>(PASSED);
    expect.safety.not.extends<Path, 'settings.'>(PASSED);
    expect.safety.extends<Path, 'tags'>(PASSED);
    expect.safety.extends<Path, 'tags.0'>(PASSED);
    expect.safety.extends<Path, 'tags.1'>(PASSED);
    expect.safety.not.extends<Path, 'tags.'>(PASSED);
    expect.safety.extends<Path, 'sort'>(PASSED);
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

    expect.safety.not.extends<Path, 'friend.data.'>(PASSED);
    expect.safety.not.extends<Path, 'friend.data.a'>(PASSED);
    expect.safety.extends<Path, 'friend.data.friend.data.'>(PASSED);
    expect.safety.extends<Path, 'friend.data.friend.data.a'>(PASSED);
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

    expect.safety.not.extends<Path, 'friend.data.friend.data.'>(PASSED);
    expect.safety.not.extends<Path, 'friend.data.friend.data.a'>(PASSED);
    expect.safety.extends<Path, 'friend.data.friend.data.friend.data.'>(PASSED);
    expect.safety.extends<Path, 'friend.data.friend.data.friend.data.a'>(PASSED);
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

    expect.safety.not.extends<Path, 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.'>(PASSED);
    expect.safety.not.extends<Path, 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.a'>(PASSED);
    expect.safety.extends<Path, 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.'>(PASSED);
    expect.safety.extends<Path, 'friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.friend.data.a'>(PASSED);

    type Path10 = PossiblePath<User, 10>;
    type Path11 = PossiblePath<User, 11>;
    type Path30 = PossiblePath<User, 30>;

    // It's very strangely. If I define type `type Path = PossiblePath<User, 9>` and then define
    // type `type Path_10 = PossiblePath<User, 10>` (just like in this test) - typescript will
    // calculated both types. But if I define only one type `type Path = PossiblePath<User, 10>;`
    // - typescript give me error: 'type instantiation is excessively deep'. See next test block.

    // TODO It should be equal!
    expect.not.equal<Path, Path10>(PASSED);
    // TODO It should be equal!
    expect.not.equal<Path, Path11>(PASSED);
    // TODO It should be equal!
    expect.not.equal<Path, Path30>(PASSED);
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
    // Do not why, but typescript give me an error: 'type instantiation is excessively deep'.
    // type Path = PossiblePath<User, 10>;
  }

  {
    type Boss = {
      isPatron: boolean;
      data: User;
    };

    type User = {
      nick: string;
      friend: {
        id: number;
        data: Boss;
      };
    };

    type Path = PossiblePath<User>;

    type ExpectPath =
      | 'nick'
      | 'friend'
      | 'friend.id'
      | 'friend.data'
      | 'friend.data.isPatron'
      | 'friend.data.data'
      | 'friend.data.data.nick'
      | 'friend.data.data.friend'
      | 'friend.data.data.friend.id'
      | 'friend.data.data.friend.data'
      | 'friend.data.data.friend.data.isPatron'
      | 'friend.data.data.friend.data.data'
      | `friend.data.data.friend.data.data.${string}`;

    expect.equal<Path, ExpectPath>(PASSED);

    expect.safety.not.extends<Path, 'friend.data.data.'>(PASSED);
    expect.safety.not.extends<Path, 'friend.data.data.a'>(PASSED);
    expect.safety.extends<Path, 'friend.data.data.friend.data.data.'>(PASSED);
    expect.safety.extends<Path, 'friend.data.data.friend.data.data.a'>(PASSED);
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

    expect.equal<Value, string | { id: number } | number | boolean[] | boolean>(PASSED);
  }

  {
    type User = {
      nick?: string;
    };

    type Value = PossibleValue<User>;

    expect.equal<Value, undefined | string>(PASSED);
  }

  {
    type User = {
      settings: ['on' | 'off', 'dark' | 'light'];
    };

    type Value = PossibleValue<User>;

    expect.equal<Value, 'on' | 'off' | 'dark' | 'light' | ['on' | 'off', 'dark' | 'light']>(PASSED);
  }

  {
    type Settings = ['on' | 'off', 'dark' | 'light'];

    type Value = PossibleValue<Settings>;

    expect.equal<Value, 'on' | 'off' | 'dark' | 'light'>(PASSED);
  }

  {
    type Users = string[];

    type Value = PossibleValue<Users>;

    expect.equal<Value, string>(PASSED);
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
    // @ts-expect-error
    expect.equal<PathValue<User, 'settings.2'>, undefined>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<PathValue<User, 'settings.abc'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<PathValue<User, 'settings.length'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<PathValue<User, 'settings.'>, unknown>(
      PASSED,
    );
    expect.equal<PathValue<User, 'tags'>, string[]>(PASSED);
    expect.equal<PathValue<User, 'tags.0'>, string>(PASSED);
    expect.equal<PathValue<User, 'tags.1'>, string>(PASSED);
    // @ts-expect-error
    expect.equal<PathValue<User, 'tags.abc'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<PathValue<User, 'tags.length'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<PathValue<User, 'tags.'>, unknown>(
      PASSED,
    );
    expect.equal<PathValue<User, 'sort'>, undefined | number>(PASSED);
    // @ts-expect-error
    expect.equal<PathValue<User, 'nonexistent'>, unknown>(
      PASSED,
    );
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

    // @ts-expect-error
    expect.equal<PathValue<EmptyPropNameTest, 'inner..'>, never>(
      PASSED,
    );
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

    // @ts-expect-error
    expect.equal<PathValue<EmptyPropNameTest, '..'>, never>(
      PASSED,
    );
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

    // @ts-expect-error
    expect.equal<PathValue<EmptyPropNameTest, '...'>, never>(
      PASSED,
    );
  }
}
