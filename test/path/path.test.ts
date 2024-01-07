import { get, quietGet } from '../../src/path/path';
import { GetUpdateError } from '../../src/error-messages';

function expectBoth(cb: (get: Function) => void) {
  cb(get);
  cb(quietGet);
}

function getError(cb: () => any): GetUpdateError {
  try {
    cb();
  }
  catch (error) {
    return error as GetUpdateError;
  }
  throw new Error('Error expected');
}

describe('get and quietGet', () => {
  it('should get the value', () => {
    {
      const antonio = {
        nick: 'Antonio',
      };

      expectBoth((get) => {
        expect(get(antonio, 'nick')).toBe('Antonio');
      });
    }
  });

  it('can throw and use default value respectively', () => {
    {
      const antonio = undefined;

      // @ts-expect-error
      const error = getError(() => get(antonio, 'friend'));
      expect(error).toBeInstanceOf(GetUpdateError);
      expect(error.message).toMatch(/undefined \(reading `friend`\)/);
      expect(error.desc).toStrictEqual({
        problemPath: 'friend',
        data: antonio,
        path: 'friend',
      });

      // @ts-expect-error
      expect(quietGet(antonio, 'friend')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'friend', null)).toBe(null);
    }

    {
      const antonio = null;

      // @ts-expect-error
      const error = getError(() => get(antonio, 'friend'));
      expect(error).toBeInstanceOf(GetUpdateError);
      expect(error.message).toMatch(/null \(reading `friend`\)/);
      expect(error.desc).toStrictEqual({
        problemPath: 'friend',
        data: antonio,
        path: 'friend',
      });

      // @ts-expect-error
      expect(quietGet(antonio, 'friend')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'friend', null)).toBe(null);
    }

    {
      const antonio = 10;

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'friend'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/10 \(reading `friend`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'friend',
          data: antonio,
          path: 'friend',
        });
      }

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'toPrecision'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/10 \(reading `toPrecision`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'toPrecision',
          data: antonio,
          path: 'toPrecision',
        });
      }

      // @ts-expect-error
      expect(quietGet(antonio, 'friend')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'friend', null)).toBe(null);
      // @ts-expect-error
      expect(quietGet(antonio, 'toPrecision')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'toPrecision', null)).toBe(null);
    }

    {
      const antonio = 'Antonio';

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'friend'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/`Antonio` \(reading `friend`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'friend',
          data: antonio,
          path: 'friend',
        });
      }

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'length'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/`Antonio` \(reading `length`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'length',
          data: antonio,
          path: 'length',
        });
      }

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'replace'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/`Antonio` \(reading `replace`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'replace',
          data: antonio,
          path: 'replace',
        });
      }

      // @ts-expect-error
      expect(quietGet(antonio, 'friend')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'friend', null)).toBe(null);
      // @ts-expect-error
      expect(quietGet(antonio, 'length')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'length', null)).toBe(null);
      // @ts-expect-error
      expect(quietGet(antonio, 'replace')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'replace', null)).toBe(null);
    }

    {
      const antonio = {
        nick: 'Antonio',
        boss: {
          nick: 'Mark',
        },
      };

      // @ts-expect-error
      expect(get(antonio, 'friend')).toBe(undefined);
      // @ts-expect-error
      expect(get(antonio, 'boss.friend')).toBe(undefined);

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'friend.id'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/undefined \(reading `id`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'friend.id',
          data: antonio,
          path: 'friend.id',
        });
      }

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'boss.friend.id'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/undefined \(reading `id`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'boss.friend.id',
          data: antonio,
          path: 'boss.friend.id',
        });
      }

      {
        // @ts-expect-error
        const error = getError(() => get(antonio, 'boss.friend.boss.id'));
        expect(error).toBeInstanceOf(GetUpdateError);
        expect(error.message).toMatch(/undefined \(reading `boss`\)/);
        expect(error.desc).toStrictEqual({
          problemPath: 'boss.friend.boss',
          data: antonio,
          path: 'boss.friend.boss.id',
        });
      }

      // @ts-expect-error
      expect(quietGet(antonio, 'friend')).toBe(undefined);
      // @ts-expect-errors
      expect(quietGet(antonio, 'friend', null)).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'friend.id')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'friend.id', null)).toBe(null);
      // @ts-expect-error
      expect(quietGet(antonio, 'boss.friend')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'boss.friend', null)).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'boss.friend.id')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet(antonio, 'boss.friend.id', null)).toBe(null);
    }

    {
      // @ts-expect-error
      expect(get([], 'length')).toBe(0);
      // @ts-expect-error
      expect(get([], 'map')).toBeInstanceOf(Function);
      expect(get([], '1')).toBe(undefined);

      // @ts-expect-error
      expect(quietGet([], 'length')).toBe(0);
      // @ts-expect-error
      expect(quietGet([], 'map')).toBeInstanceOf(Function);
      expect(quietGet([], '1')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet([], 'length', null)).toBe(0);
      // @ts-expect-error
      expect(quietGet([], 'map', null)).toBeInstanceOf(Function);
      expect(quietGet([], '1', null)).toBe(undefined);

      // @ts-expect-error
      expect(get({}, 'constructor')).toBeInstanceOf(Function);
      // @ts-expect-error
      expect(get({}, 'abc')).toBe(undefined);

      // @ts-expect-error
      expect(quietGet({}, 'constructor')).toBeInstanceOf(Function);
      // @ts-expect-error
      expect(quietGet({}, 'abc')).toBe(undefined);
      // @ts-expect-error
      expect(quietGet({}, 'constructor', null)).toBeInstanceOf(Function);
      // @ts-expect-error
      expect(quietGet({}, 'abc', null)).toBe(undefined);
    }
  });

  it('must be able to work with zero-length properties', () => {
    {
      const alex = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': 'Alex',
        bonus: 20,
      };

      const mark = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': 'Mark',
        bonus: 10,
        friend: alex,
      };

      const antonio = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': 'Antonio',
        friend: mark,
      };

      expectBoth((get) => {
        expect(get(antonio, '')).toBe('Antonio');
      });
      expectBoth((get) => {
        expect(get(antonio, 'friend.')).toBe('Mark');
      });
      expectBoth((get) => {
        expect(get(antonio, 'friend.friend.')).toBe('Alex');
      });
    }

    {
      const alex = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': 'Alex',
      };

      const mark = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': alex,
      };

      const antonio = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '': mark,
      };

      expectBoth((get) => {
        expect(get(antonio, '..')).toBe('Alex');
      });
    }
  });

  it('can accept undefined or null as path', () => {
    const user = {
      nick: 'Antonio',
    };

    expectBoth((get) => {
      expect(get(user, undefined)).toBe(user);
    });
    expectBoth((get) => {
      expect(get(user, null)).toBe(user);
    });
  });
});
