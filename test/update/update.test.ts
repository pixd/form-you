import { update } from '../../src/update/update';

describe('update', () => {
  it('can update objects', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
    };

    {
      const newUser = update(user, {
        nick: 'Mark',
      });

      expect(newUser).toStrictEqual({
        nick: 'Mark',
        bonus: 10,
      });
    }

    {
      const newUser = update(user, {
        // @ts-expect-error
        enabled: true,
      });

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: 10,
        enabled: true,
      });
    }
  });

  it('can update nested objects', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
      friend: {
        nick: 'Mark',
        bonus: 10,
      },
    };

    {
      const newUser = update(user, {
        friend: {
          nick: 'Daniel',
        },
      });

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: 10,
        friend: {
          nick: 'Daniel',
          bonus: 10,
        },
      });
    }

    {
      const newUser = update(user, {
        friend: {
          // @ts-expect-error
          enabled: true,
        },
      });

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: 10,
        friend: {
          nick: 'Mark',
          bonus: 10,
          enabled: true,
        },
      });
    }
  });

  it('can update arrays', () => {
    const user = {
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 20 },
      ],
    };

    {
      const newUser = update(user, {
        bonus: {
          '0': { value: 15 },
        },
      });

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 15 },
          { num: 2, value: 20 },
        ],
      });
    }

    {
      const newUser = update(user, {
        bonus: {
          '2': { value: 35 },
        },
      });

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { value: 35 },
        ],
      });
    }
  });

  it('use update nested arrays', () => {
    const user = {
      nick: 'Antonio',
      friends: [
        {
          nick: 'Mark',
          bonus: [
            { num: 1, value: 10 },
            { num: 2, value: 20 },
          ],
        },
      ],
    };

    const newUser = update(user, {
      friends: {
        '0': {
          bonus: {
            '0': { value: 15 },
          },
        },
      },
    });

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      friends: [
        {
          nick: 'Mark',
          bonus: [
            { num: 1, value: 15 },
            { num: 2, value: 20 },
          ],
        },
      ],
    });
  });

  it('replace scalars with new value with object update command', () => {
    {
      const test = (user: any) => {
        expect(update(user, {
          bonus: {
            value: 10,
          },
        })).toStrictEqual({
          nick: 'Antonio',
          bonus: {
            value: 10,
          },
        });
      };

      test({
        nick: 'Antonio',
      });

      test({
        nick: 'Antonio',
        bonus: undefined,
      });

      test({
        nick: 'Antonio',
        bonus: null,
      });

      test({
        nick: 'Antonio',
        bonus: 'null',
      });
    }

    {
      const test = (user: any) => {
        expect(update(user, {
          bonus: {
            '1': { value: 20 },
          },
        })).toStrictEqual({
          nick: 'Antonio',
          bonus: [
            { num: 1, value: 10 },
            { value: 20 },
          ],
        });
      };

      test({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
        ],
      });

      test({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          undefined,
        ],
      });

      test({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          null,
        ],
      });

      test({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          'null',
        ],
      });
    }
  });

  it('use $$set command to update values', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
    };

    const newUser = update(user, {
      nick: { $$set: 'Mark' },
    });

    expect(newUser).toStrictEqual({
      nick: 'Mark',
      bonus: 10,
    });
  });

  it('ignore { $$set: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        { bonus: { $$set: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        { bonus: { $$set: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        { bonus: { $$set: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$unset command to update undefined capable values with undefined', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$unset: true } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$unset: false } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { value: 10 },
          { value: 20 },
        ],
      };

      const newUser = update(
        user,
        {
          // @ts-expect-error
          bonus: { 0: { $$unset: true } },
        },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          undefined,
          { value: 20 },
        ],
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { value: 10 },
          { value: 20 },
        ],
      };

      const newUser = update(
        user,
        {
          // @ts-expect-error
          bonus: { 0: { $$unset: false } },
        },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { value: 10 },
          { value: 20 },
        ],
      });
    }
  });

  it('ignore { $$unset: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        { bonus: { $$unset: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        { bonus: { $$unset: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        { bonus: { $$unset: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$delete command to remove optional values', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$delete: true } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$delete: false } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { value: 10 },
          { value: 20 },
        ],
      };

      const newUser = update(
        user,
        {
          bonus: { 0: { $$delete: true } },
        },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { value: 20 },
        ],
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { value: 10 },
          { value: 20 },
        ],
      };

      const newUser = update(
        user,
        {
          bonus: { 0: { $$delete: false } },
        },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { value: 10 },
          { value: 20 },
        ],
      });
    }
  });

  it('ignore { $$delete: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        { bonus: { $$delete: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        { bonus: { $$delete: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        { bonus: { $$delete: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$append command to add elements', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      expect(update(user, { bonus: { $$append: [] } })).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      });

      expect(update(user, { bonus: { $$append: [100, 101] } })).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
      });
    }

    {
      const test = (skip: number) => {
        expect(update(user, {
          bonus: {
            $$append: [100, 101],
            skip,
          },
        })).toStrictEqual(update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 0,
          },
        }));
      };

      test(-2);
      test(-9);
      test(-10);
      test(-11);
      test(-12);
      test(-13);
      test(-Infinity);
    }

    {
      expect(update([] as number[], { $$append: [100, 101] })).toStrictEqual([100, 101]);
    }

    const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function test(append: number[], skip: number, expectData: number[]) {
      expect(update(testData, { $$append: append, skip })).toStrictEqual(expectData);
    }

    test([100, 101], 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101]);
    test([100, 101], 2, [0, 1, 2, 3, 4, 5, 6, 7, 100, 101, 8, 9]);
    test([100, 101], 9, [0, 100, 101, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([100, 101], 10, [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([100, 101], 11, [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([100, 101], 12, [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([100, 101], 13, [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([100, 101], Infinity, [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('ignore { $$append: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$append: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$append: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$append: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$prepend command to add elements', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      expect(update(user, { bonus: { $$prepend: [] } })).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      });

      expect(update(user, { bonus: { $$prepend: [100, 101] } })).toStrictEqual({
        name: 'Antonio',
        bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const test = (skip: number) => {
        expect(update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip,
          },
        })).toStrictEqual(update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 0,
          },
        }));
      };

      test(-2);
      test(-9);
      test(-10);
      test(-11);
      test(-12);
      test(-13);
      test(-Infinity);
    }

    {
      expect(update([] as number[], { $$prepend: [100, 101] })).toStrictEqual([100, 101]);
    }

    const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function test(prepend: number[], skip: number, expectData: number[]) {
      expect(update(testData, { $$prepend: prepend, skip })).toStrictEqual(expectData);
    }

    test([100, 101], 0, [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([100, 101], 2, [0, 1, 100, 101, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([100, 101], 9, [0, 1, 2, 3, 4, 5, 6, 7, 8, 100, 101, 9]);
    test([100, 101], 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101]);
    test([100, 101], 11, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101]);
    test([100, 101], 12, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101]);
    test([100, 101], 13, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101]);
    test([100, 101], Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101]);
  });

  it('ignore { $$prepend: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$prepend: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$prepend: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$prepend: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$exclude command update arrays', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      const newUser = update(user, {
        bonus: {
          $$exclude: [],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const newUser = update(user, {
        bonus: {
          $$exclude: [0, 2, 4, 100],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [1, 3, 5, 6, 7, 8, 9],
      });
    }

    {
      expect(update([] as number[], { $$exclude: [0] })).toStrictEqual([]);
    }
  });

  it('use $$exclude-row command to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 1,
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      expect(update([] as number[], { $$exclude: 2 })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$exclude: 2, skip: 2 })).toStrictEqual([]);
    }

    const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function test(exclude: number, skip: number, expectData: number[]) {
      expect(update(testData, { $$exclude: exclude, skip })).toStrictEqual(expectData);
    }

    expect(update(testData, { $$exclude: 0 })).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(update(testData, { $$exclude: 2 })).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    expect(update(testData, { $$exclude: -2 })).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7]);

    test(0, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(0, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(2, 0, [2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, 1, [0, 3, 4, 5, 6, 7, 8, 9]);
    test(2, 8, [0, 1, 2, 3, 4, 5, 6, 7]);
    test(2, 9, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test(2, 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, 11, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(2, -1, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, -2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, -3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(-2, 0, [0, 1, 2, 3, 4, 5, 6, 7]);
    test(-2, 1, [0, 1, 2, 3, 4, 5, 6, 9]);
    test(-2, 8, [2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, 11, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(-2, -1, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test(-2, -2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, -3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(Infinity, 0, []);
    test(Infinity, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(Infinity, -Infinity, []);

    test(-Infinity, 0, []);
    test(-Infinity, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-Infinity, -Infinity, []);
  });

  it('remains scalars or objects the same with $$exclude command', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: undefined,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$exclude: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: null,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$exclude: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: null,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$exclude: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$exclude: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: { value: 10 },
      });
    }
  });

  it('ignore { $$exclude: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$exclude: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$exclude: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$exclude: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$extract command to update arrays', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      const newUser = update(user, {
        bonus: {
          $$extract: [],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [],
      });
    }

    {
      const newUser = update(user, {
        bonus: {
          $$extract: [0, 2, 4, 100],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 2, 4],
      });
    }

    {
      expect(update([] as number[], { $$extract: [0] })).toStrictEqual([]);
    }
  });

  it('use $$extract-row command to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 1,
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [1, 2],
      });
    }

    {
      expect(update([] as number[], { $$extract: 2 })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$extract: 2, skip: 2 })).toStrictEqual([]);
    }

    const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function test(extract: number, skip: number, expectData: number[]) {
      expect(update(testData, { $$extract: extract, skip })).toStrictEqual(expectData);
    }

    expect(update(testData, { $$extract: 0 })).toStrictEqual([]);
    expect(update(testData, { $$extract: 2 })).toStrictEqual([0, 1]);
    expect(update(testData, { $$extract: -2 })).toStrictEqual([8, 9]);

    test(0, Infinity, []);
    test(0, -Infinity, []);

    test(2, 0, [0, 1]);
    test(2, 1, [1, 2]);
    test(2, 8, [8, 9]);
    test(2, 9, [9]);
    test(2, 10, []);
    test(2, 11, []);
    test(2, Infinity, []);

    test(2, -1, [0]);
    test(2, -2, []);
    test(2, -3, []);
    test(2, -Infinity, []);

    test(-2, 0, [8, 9]);
    test(-2, 1, [7, 8]);
    test(-2, 8, [0, 1]);
    test(-2, 9, [0]);
    test(-2, 10, []);
    test(-2, 11, []);
    test(-2, Infinity, []);

    test(-2, -1, [9]);
    test(-2, -2, []);
    test(-2, -3, []);
    test(-2, -Infinity, []);

    test(Infinity, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(Infinity, Infinity, []);
    test(Infinity, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(-Infinity, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-Infinity, Infinity, []);
    test(-Infinity, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('remains scalars or objects the same with $$extract command', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: undefined,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$extract: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: null,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$extract: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: null,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$extract: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$extract: [0] } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: { value: 10 },
      });
    }
  });

  it('ignore { $$extract: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$extract: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$extract: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$extract: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$move command to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: {
          $$move: [1, 3],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 2, 3, 1, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [],
      };

      const newUser = update(user, {
        bonus: {
          $$move: [1, 3],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [],
      });
    }

    {
      expect(update([] as number[], { $$move: [2, 4] })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$move: [2, -4] })).toStrictEqual([]);
    }

    const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function test(move: [number, number], expectData: number[]) {
      expect(update(testData, { $$move: move })).toStrictEqual(expectData);
    }

    test([0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, 1], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, 8], [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]);
    test([0, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([0, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([0, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([0, Infinity], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

    test([0, -1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([0, -2], [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]);
    test([0, -9], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([4, 0], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, 1], [0, 4, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, 3], [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]);
    test([4, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([4, 5], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([4, 8], [0, 1, 2, 3, 5, 6, 7, 8, 4, 9]);
    test([4, 9], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, 10], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, 11], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, Infinity], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);

    test([4, -1], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, -2], [0, 1, 2, 3, 5, 6, 7, 8, 4, 9]);
    test([4, -5], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([4, -6], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([4, -7], [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]);
    test([4, -9], [0, 4, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -10], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -11], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -12], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -Infinity], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);

    test([9, 0], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, 1], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, 8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([9, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([9, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, -2], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([9, -9], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -10], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -11], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -12], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -Infinity], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);

    test([-1, 0], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, 1], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, 8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([-1, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-1, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, -2], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([-1, -9], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -10], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -11], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -12], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -Infinity], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);

    test([-5, 0], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, 1], [0, 5, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, 4], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([-5, 5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-5, 6], [0, 1, 2, 3, 4, 6, 5, 7, 8, 9]);
    test([-5, 8], [0, 1, 2, 3, 4, 6, 7, 8, 5, 9]);
    test([-5, 9], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, 10], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, 11], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, Infinity], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);

    test([-5, -1], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, -2], [0, 1, 2, 3, 4, 6, 7, 8, 5, 9]);
    test([-5, -4], [0, 1, 2, 3, 4, 6, 5, 7, 8, 9]);
    test([-5, -5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-5, -6], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([-5, -9], [0, 5, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -10], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -11], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -12], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -Infinity], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);

    test([-10, -1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, -2], [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]);
    test([-10, -9], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-10, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, 1], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, 8], [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]);
    test([-10, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, Infinity], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

    // All out of range

    test([10, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([10, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, -5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([Infinity, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([Infinity, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([Infinity, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([Infinity, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([Infinity, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([Infinity, -5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([Infinity, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([Infinity, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-11, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-11, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, -5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-Infinity, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-Infinity, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-Infinity, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-Infinity, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-Infinity, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-Infinity, -5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-Infinity, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-Infinity, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('ignore { $$move: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$move: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$move: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$move: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$swap command to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: {
          $$swap: [1, 3],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 3, 2, 1, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [],
      };

      const newUser = update(user, {
        bonus: {
          $$swap: [1, 3],
        },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [],
      });
    }

    {
      expect(update([] as number[], { $$swap: [2, 4] })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$swap: [2, -4] })).toStrictEqual([]);
    }

    const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function test(swap: [number, number], expectData: number[]) {
      expect(update(testData, { $$swap: swap })).toStrictEqual(expectData);
      expect(update(testData, { $$swap: [swap[1], swap[0]] })).toStrictEqual(expectData);
    }

    test([0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, 1], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, 2], [2, 1, 0, 3, 4, 5, 6, 7, 8, 9]);
    test([0, 8], [8, 1, 2, 3, 4, 5, 6, 7, 0, 9]);
    test([0, 9], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([0, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([0, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([0, Infinity], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

    test([0, -1], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([0, -2], [8, 1, 2, 3, 4, 5, 6, 7, 0, 9]);
    test([0, -9], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([4, 0], [4, 1, 2, 3, 0, 5, 6, 7, 8, 9]);
    test([4, 1], [0, 4, 2, 3, 1, 5, 6, 7, 8, 9]);
    test([4, 3], [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]);
    test([4, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([4, 5], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([4, 8], [0, 1, 2, 3, 8, 5, 6, 7, 4, 9]);
    test([4, 9], [0, 1, 2, 3, 9, 5, 6, 7, 8, 4]);
    test([4, 10], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, 11], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, Infinity], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);

    test([4, -1], [0, 1, 2, 3, 9, 5, 6, 7, 8, 4]);
    test([4, -2], [0, 1, 2, 3, 8, 5, 6, 7, 4, 9]);
    test([4, -5], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([4, -6], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([4, -7], [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]);
    test([4, -9], [0, 4, 2, 3, 1, 5, 6, 7, 8, 9]);
    test([4, -10], [4, 1, 2, 3, 0, 5, 6, 7, 8, 9]);
    test([4, -11], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -12], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -Infinity], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);

    test([9, 0], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([9, 1], [0, 9, 2, 3, 4, 5, 6, 7, 8, 1]);
    test([9, 8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([9, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([9, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, -2], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([9, -9], [0, 9, 2, 3, 4, 5, 6, 7, 8, 1]);
    test([9, -10], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([9, -11], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -12], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -Infinity], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);

    test([-1, 0], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([-1, 1], [0, 9, 2, 3, 4, 5, 6, 7, 8, 1]);
    test([-1, 8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([-1, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-1, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, -2], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([-1, -9], [0, 9, 2, 3, 4, 5, 6, 7, 8, 1]);
    test([-1, -10], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([-1, -11], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -12], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -Infinity], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);

    test([-5, 0], [5, 1, 2, 3, 4, 0, 6, 7, 8, 9]);
    test([-5, 1], [0, 5, 2, 3, 4, 1, 6, 7, 8, 9]);
    test([-5, 4], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([-5, 5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-5, 6], [0, 1, 2, 3, 4, 6, 5, 7, 8, 9]);
    test([-5, 8], [0, 1, 2, 3, 4, 8, 6, 7, 5, 9]);
    test([-5, 9], [0, 1, 2, 3, 4, 9, 6, 7, 8, 5]);
    test([-5, 10], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, 11], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, Infinity], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);

    test([-5, -1], [0, 1, 2, 3, 4, 9, 6, 7, 8, 5]);
    test([-5, -2], [0, 1, 2, 3, 4, 8, 6, 7, 5, 9]);
    test([-5, -4], [0, 1, 2, 3, 4, 6, 5, 7, 8, 9]);
    test([-5, -5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-5, -6], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([-5, -9], [0, 5, 2, 3, 4, 1, 6, 7, 8, 9]);
    test([-5, -10], [5, 1, 2, 3, 4, 0, 6, 7, 8, 9]);
    test([-5, -11], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -12], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -Infinity], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);

    test([-10, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, 1], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, 8], [8, 1, 2, 3, 4, 5, 6, 7, 0, 9]);
    test([-10, 9], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([-10, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, Infinity], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

    test([-10, -1], [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
    test([-10, -2], [8, 1, 2, 3, 4, 5, 6, 7, 0, 9]);
    test([-10, -9], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // All out of range
    test([10, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([10, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([10, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-11, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-11, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-11, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([Infinity, Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([Infinity, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-Infinity, -Infinity], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('ignore { $$swap: undefined } commands', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$swap: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: {},
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$swap: undefined } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$swap: undefined, value: 20 } },
      );

      expect(newUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 20 },
      });
    }
  });

  it('use $$apply command to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: { $$apply: 10, length: 2, skip: 1 },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 10, 10, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: { $$apply: 10 },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: { $$apply: 10, skip: 2 },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 10, 10, 10, 10, 10, 10, 10, 10],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: { $$apply: 10, skip: -2 },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [10, 10, 10, 10, 10, 10, 10, 10, 8, 9],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: { $$apply: 10, length: 2 },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [10, 10, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const newUser = update(user, {
        bonus: { $$apply: 10, length: -2 },
      });

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 10, 10],
      });
    }

    {
      expect(update([] as number[], { $$apply: 2, length: 2 })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$apply: 2, length: 2, skip: 2 })).toStrictEqual([]);
    }

    const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function test(length: number, skip: number, expectData: number[]) {
      expect(update(testData, { $$apply: 10, length: length, skip })).toStrictEqual(expectData);
    }

    expect(update(testData, { $$apply: 10, length: 0 })).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(update(testData, { $$apply: 10, length: 2 })).toStrictEqual([10, 10, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(update(testData, { $$apply: 10, length: -2 })).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 10, 10]);

    test(0, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(0, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(2, 0, [10, 10, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, 1, [0, 10, 10, 3, 4, 5, 6, 7, 8, 9]);
    test(2, 8, [0, 1, 2, 3, 4, 5, 6, 7, 10, 10]);
    test(2, 9, [0, 1, 2, 3, 4, 5, 6, 7, 8, 10]);
    test(2, 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, 11, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(2, -1, [10, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, -2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, -3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(2, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(-2, 0, [0, 1, 2, 3, 4, 5, 6, 7, 10, 10]);
    test(-2, 1, [0, 1, 2, 3, 4, 5, 6, 10, 10, 9]);
    test(-2, 8, [10, 10, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, 9, [10, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, 11, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(-2, -1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 10]);
    test(-2, -2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, -3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-2, -Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test(Infinity, 0, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    test(Infinity, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(Infinity, -Infinity, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);

    test(-Infinity, 0, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    test(-Infinity, Infinity, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test(-Infinity, -Infinity, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
  });

  it('remains scalars or objects the same with $$apply command', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: undefined,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$apply: { value: 10 }, length: 2 } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: null,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$apply: { value: 10 }, length: 2 } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: null,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: 10,
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$apply: { value: 10 }, length: 2 } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: { value: 10 },
      };

      const newUser = update(
        user,
        // @ts-expect-error
        { bonus: { $$apply: { value: 10 }, length: 2 } },
      );

      expect(newUser).toStrictEqual({
        name: 'Antonio',
        bonus: { value: 10 },
      });
    }
  });
});
