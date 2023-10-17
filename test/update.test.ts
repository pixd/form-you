import { update, updateAtPath, updateWithInstruction } from '../src/update';

type Sailor = {
  name: string;
  sex: 'm' | 'f';
  subSailors?: Sailor[];
};

type Ship = {
  name: string;
  year?: number;
  weight: undefined | number;
  company: {
    name: string;
    address: {
      city: string;
      street: undefined | string;
      house?: number;
    };
  };
  capitan: 'none' | Omit<Sailor, 'subSailors'>;
  sailors: 'none' | Sailor[];
  voyages: 'none' | string[];
};

const ship: Ship = {
  name: 'Yellow Submarine',
  year: 1969,
  weight: undefined,
  company: {
    name: 'The Beatles',
    address: { city: 'Liverpool', street: 'Newcastle Rd', house: 9 },
  },
  capitan: 'none',
  sailors: [
    {
      name: 'John',
      sex: 'm',
      subSailors: [
        { name: 'Paul', sex: 'm' },
        { name: 'Ringo', sex: 'm' },
        { name: 'George', sex: 'm' },
      ],
    },
    {
      name: 'Yoko',
      sex: 'f',
    },
  ],
  voyages: 'none',
};

describe('update method', () => {
  it('can update objects', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
    };

    const nextUser = update(user, {
      nick: 'Mark',
    });

    expect(nextUser).toStrictEqual({
      nick: 'Mark',
      bonus: 10,
    });
  });

  it('can update in nested objects', () => {
    const user = {
      nick: 'Antonio',
      friend: {
        nick: 'Mark',
        bonus: 10,
      },
    };

    const nextUser = update(user, {
      friend: {
        nick: 'Juan',
      },
    });

    expect(nextUser).toStrictEqual({
      nick: 'Antonio',
      friend: {
        nick: 'Juan',
        bonus: 10,
      },
    });
  });

  it('remains scalar or array the same', () => {
    {
      const user = undefined;

      // @ts-expect-error
      const nextUser = update(user, {
        nick: 'Mark',
      });

      expect(nextUser).toStrictEqual(undefined);
    }

    {
      const user = null;

      // @ts-expect-error
      const nextUser = update(user, {
        nick: 'Mark',
      });

      expect(nextUser).toStrictEqual(null);
    }

    {
      const user = 'Antonio';

      // @ts-expect-error
      const nextUser = update(user, {
        nick: 'Mark',
      });

      expect(nextUser).toStrictEqual('Antonio');
    }

    {
      const user = ['Antonio', 10];

      const nextUser = update(user, {
        // @ts-expect-error
        nick: 'Mark',
      });

      expect(nextUser).toStrictEqual(['Antonio', 10]);
    }
  });

  it('use $$set instruction to update values', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
    };

    const nextUser = update(user, {
      nick: { $$set: 'Mark' },
    });

    expect(nextUser).toStrictEqual({
      nick: 'Mark',
      bonus: 10,
    });
  });

  it('use $$set instruction to update undefined capable values with undefined', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
    };

    const nextUser = update(user, {
      // @ts-expect-error
      bonus: { $$set: undefined },
    });

    expect(nextUser).toStrictEqual({
      nick: 'Antonio',
      bonus: undefined,
    });
  });

  it('use $$unset instruction to update undefined capable values with undefined', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
    };

    const nextUser = update(user, {
      // @ts-expect-error
      bonus: { $$unset: true },
    });

    expect(nextUser).toStrictEqual({
      nick: 'Antonio',
      bonus: undefined,
    });
  });

  it('use $$delete instruction to remove optional values', () => {
    const user = {
      nick: 'Antonio',
      bonus: 10,
    };

    const nextUser = update(user, {
      // @ts-expect-error
      bonus: { $$delete: true },
    });

    expect(nextUser).toStrictEqual({
      nick: 'Antonio',
    });
  });

  it('use $$append instruction to add elements', () => {
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
      const checkEqual = (skip: number) => {
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

      checkEqual(-2);
      checkEqual(-9);
      checkEqual(-10);
      checkEqual(-11);
      checkEqual(-12);
      checkEqual(-13);
      checkEqual(-Infinity);
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

  it('use $$prepend instruction to add elements', () => {
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
      const checkEqual = (skip: number) => {
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

      checkEqual(-2);
      checkEqual(-9);
      checkEqual(-10);
      checkEqual(-11);
      checkEqual(-12);
      checkEqual(-13);
      checkEqual(-Infinity);
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

  it('use $$exclude instruction update arrays', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: [],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: [0, 2, 4, 100],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [1, 3, 5, 6, 7, 8, 9],
      });
    }

    {
      expect(update([] as number[], { $$exclude: [0] })).toStrictEqual([]);
    }
  });

  it('use $$exclude-row instruction to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 1,
        },
      });

      expect(nextUser).toStrictEqual({
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

  it('remains the scalars or objects the same with $$exclude instruction', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: undefined,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$exclude: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: null,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$exclude: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: null,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: 10,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$exclude: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: { value: 10 },
      };

      const nextUser = update(user, {
        bonus: {
          // @ts-expect-error
          $$exclude: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: { value: 10 },
      });
    }
  });

  it('use $$extract instruction to update arrays', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: [],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: [0, 2, 4, 100],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 2, 4],
      });
    }

    {
      expect(update([] as number[], { $$extract: [0] })).toStrictEqual([]);
    }
  });

  it('use $$extract-row instruction to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 1,
        },
      });

      expect(nextUser).toStrictEqual({
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

  it('remains the scalars or objects the same with $$extract instruction', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: undefined,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$extract: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: null,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$extract: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: null,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: 10,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$extract: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: { value: 10 },
      };

      const nextUser = update(user, {
        bonus: {
          // @ts-expect-error
          $$extract: [0],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: { value: 10 },
      });
    }
  });

  it('use $$move instruction to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const nextUser = update(user, {
        bonus: {
          $$move: [1, 3],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 2, 3, 1, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [],
      };

      const nextUser = update(user, {
        bonus: {
          $$move: [1, 3],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [],
      });
    }

    {
      expect(update([] as number[], { $$move: [2, 4] })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$move: [100, 4] })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$move: [2, -100] })).toStrictEqual([]);
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

  it('use $$swap instruction to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const nextUser = update(user, {
        bonus: {
          $$swap: [1, 3],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 3, 2, 1, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const user = {
        name: 'Antonio',
        bonus: [],
      };

      const nextUser = update(user, {
        bonus: {
          $$swap: [1, 3],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [],
      });
    }

    {
      expect(update([] as number[], { $$swap: [2, 4] })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$swap: [100, 4] })).toStrictEqual([]);
    }

    {
      expect(update([] as number[], { $$swap: [2, -100] })).toStrictEqual([]);
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

  it('use $$merge instruction to update arrays', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 15 },
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '0': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 20 },
          { num: 2, value: 15 },
        ],
      });
    }

    {
      expect(update([] as ({ num: number; value: number })[], {
        $$merge: {
          // TODO Fix eslint rules
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '4': { value: 100 },
        },
      })).toStrictEqual([]);
    }
  });

  it('use $$merge instruction to update nested arrays', () => {
    const user = {
      nick: 'Antonio',
      friends: [
        {
          nick: 'Mark',
          bonus: [
            { num: 1, value: 10 },
            { num: 2, value: 15 },
          ],
        },
        {
          nick: 'Juan',
          bonus: [
            { num: 1, value: 15 },
            { num: 2, value: 35 },
          ],
        },
      ],
    };

    const nextUser = update(user, {
      friends: {
        $$merge: {
          // TODO Fix eslint rules
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '0': {
            bonus: {
              $$merge: {
                // TODO Fix eslint rules
                // eslint-disable-next-line @typescript-eslint/naming-convention
                '0': { value: 25 },
              },
            },
          },
        },
      },
    });

    expect(nextUser).toStrictEqual({
      nick: 'Antonio',
      friends: [
        {
          nick: 'Mark',
          bonus: [
            { num: 1, value: 25 },
            { num: 2, value: 15 },
          ],
        },
        {
          nick: 'Juan',
          bonus: [
            { num: 1, value: 15 },
            { num: 2, value: 35 },
          ],
        },
      ],
    });
  });

  it('use $$merge-row instruction to update arrays', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 15 },
          { num: 2, value: 25 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const merge = [{ value: 15 }, { value: 25 }];
      expect(update([] as ({ num: number; value: number })[], { $$merge: merge, at: 4 })).toStrictEqual([]);
    }

    const testData = [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ];

    const merge = [{ value: 15 }, { value: 25 }];
    function test(at: number, expectData: ({ num: number; value: number })[]) {
      expect(update(testData, { $$merge: merge, at })).toStrictEqual(expectData);
    }

    test(0, [
      { num: 1, value: 15 },
      { num: 2, value: 25 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(1, [
      { num: 1, value: 10 },
      { num: 2, value: 15 },
      { num: 3, value: 25 },
      { num: 4, value: 40 },
    ]);
    test(2, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 15 },
      { num: 4, value: 25 },
    ]);
    test(3, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 15 },
    ]);
    test(4, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(5, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-1, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 15 },
    ]);
    test(-2, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 15 },
      { num: 4, value: 25 },
    ]);
    test(-3, [
      { num: 1, value: 10 },
      { num: 2, value: 15 },
      { num: 3, value: 25 },
      { num: 4, value: 40 },
    ]);
    test(-4, [
      { num: 1, value: 15 },
      { num: 2, value: 25 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-5, [
      { num: 1, value: 25 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-6, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-7, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
  });

  it('remains the scalars or objects the same with $$merge instruction', () => {
    function test(user: any) {
      expect(update(user, {
        bonus: {
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      })).toStrictEqual(user);
    }

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
      bonus: 10,
    });

    test({
      nick: 'Antonio',
      bonus: { value: 10 },
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
        'removed',
      ],
    });
  });

  it('use $$mergeAll instruction to update arrays', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 15 },
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 20 },
          { num: 2, value: 20 },
        ],
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [] as ({ num: number; value: number})[],
      };

      const nextUser = update(user, {
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [],
      });
    }
  });

  it('use $$mergeAll instruction to update nested arrays', () => {
    {
      const user = {
        nick: 'Antonio',
        friends: [
          {
            nick: 'Mark',
            bonus: [
              { num: 1, value: 10 },
              { num: 2, value: 15 },
            ],
          },
          {
            nick: 'Juan',
            bonus: [
              { num: 1, value: 15 },
              { num: 2, value: 35 },
            ],
          },
        ],
      };

      const nextUser = update(user, {
        friends: {
          $$mergeAll: {
            bonus: {
              $$mergeAll: { value: 25 },
            },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        friends: [
          {
            nick: 'Mark',
            bonus: [
              { num: 1, value: 25 },
              { num: 2, value: 25 },
            ],
          },
          {
            nick: 'Juan',
            bonus: [
              { num: 1, value: 25 },
              { num: 2, value: 25 },
            ],
          },
        ],
      });
    }
  });

  it('remains the scalars or objects the same with $$mergeAll instruction', () => {
    function test(user: any) {
      expect(update(user, {
        bonus: {
          $$mergeAll: { value: 20 },
        },
      })).toStrictEqual(user);
    }

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
      bonus: 10,
    });

    test({
      nick: 'Antonio',
      bonus: { value: 10 },
    });

    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          undefined,
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 20 },
          undefined,
        ],
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          null,
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 20 },
          null,
        ],
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          'removed',
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 20 },
          'removed',
        ],
      });
    }
  });

  it('use $$replace instruction to update arrays', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 15 },
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$replace: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '0': { num: 3, value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 3, value: 20 },
          { num: 2, value: 15 },
        ],
      });
    }

    {
      expect(update([] as ({ num: number; value: number })[], {
        $$replace: {
          // TODO Fix eslint rules
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '4': { num: 100, value: 100 },
        },
      })).toStrictEqual([]);
    }
  });

  it('use $$replace-row instruction to update arrays', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 15, value: 15 },
          { num: 25, value: 25 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const merge = [{ num: 15, value: 15 }, { num: 25, value: 25 }];
      expect(update([] as ({ num: number; value: number })[], { $$replace: merge, at: 4 })).toStrictEqual([]);
    }

    const testData = [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ];

    const replace = [{ num: 15, value: 15 }, { num: 25, value: 25 }];
    function test(at: number, expectData: ({ num: number; value: number })[]) {
      expect(update(testData, { $$replace: replace, at })).toStrictEqual(expectData);
    }

    test(0, [
      { num: 15, value: 15 },
      { num: 25, value: 25 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(1, [
      { num: 1, value: 10 },
      { num: 15, value: 15 },
      { num: 25, value: 25 },
      { num: 4, value: 40 },
    ]);
    test(2, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 15, value: 15 },
      { num: 25, value: 25 },
    ]);
    test(3, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 15, value: 15 },
    ]);
    test(4, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(5, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-1, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 15, value: 15 },
    ]);
    test(-2, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 15, value: 15 },
      { num: 25, value: 25 },
    ]);
    test(-3, [
      { num: 1, value: 10 },
      { num: 15, value: 15 },
      { num: 25, value: 25 },
      { num: 4, value: 40 },
    ]);
    test(-4, [
      { num: 15, value: 15 },
      { num: 25, value: 25 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-5, [
      { num: 25, value: 25 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-6, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
    test(-7, [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
      { num: 4, value: 40 },
    ]);
  });

  it('replace the scalars with new value with $$replace instruction', () => {
    function test(user: any) {
      expect(update(user, {
        bonus: {
          $$replace: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { num: 3, value: 20 },
          },
        },
      })).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 3, value: 20 },
        ],
      });
    }

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
        'removed',
      ],
    });
  });

  it('use $$replaceAll instruction to update arrays', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 15 },
        ],
      };

      const nextUser = update(user, {
        bonus: {
          $$replaceAll: { num: 0, value: 0 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 0, value: 0 },
          { num: 0, value: 0 },
        ],
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: [] as ({ num: number; value: number})[],
      };

      const nextUser = update(user, {
        bonus: {
          $$replaceAll: { num: 0, value: 0 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [],
      });
    }
  });

  it('replace the scalars with new value with $$replaceAll instruction', () => {
    function test(user: any) {
      expect(update(user, {
        bonus: {
          $$replaceAll: { num: 0, value: 0 },
        },
      })).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 0, value: 0 },
          { num: 0, value: 0 },
        ],
      });
    }

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
        'removed',
      ],
    });
  });
});

describe('updateAtPath', () => {
  it('Test 1', () => {
    const nextShip = updateAtPath(ship, 'company', {
      name: 'test1',
    });

    expect(nextShip).toStrictEqual({
      name: 'Yellow Submarine',
      year: 1969,
      company: {
        name: 'test1',
        address: {
          city: 'Liverpool',
          street: 'Newcastle Rd',
          house: 9,
        },
      },
      capitan: 'none',
      sailors: [
        {
          name: 'John',
          sex: 'm',
          subSailors: [
            { name: 'Paul', sex: 'm' },
            { name: 'Ringo', sex: 'm' },
            { name: 'George', sex: 'm' },
          ],
        },
      ],
      voyages: 'none',
    });
  });

  it('Test 2', () => {
    const nextShip = updateAtPath(ship, 'sailors.0.subSailors.0', {
      name: 'test1',
    });

    expect(nextShip).toStrictEqual({
      name: 'Yellow Submarine',
      year: 1969,
      company: {
        name: 'The Beatles',
        address: {
          city: 'Liverpool',
          street: 'Newcastle Rd',
          house: 9,
        },
      },
      capitan: 'none',
      sailors: [
        {
          name: 'John',
          sex: 'm',
          subSailors: [
            { name: 'test1', sex: 'm' },
            { name: 'Ringo', sex: 'm' },
            { name: 'George', sex: 'm' },
          ],
        },
      ],
      voyages: 'none',
    });
  });

  it('Test 3', () => {
    const nextShip = updateAtPath(ship, 'sailors.0.subSailors.0.name', 'test1');

    expect(nextShip).toStrictEqual({
      name: 'Yellow Submarine',
      year: 1969,
      company: {
        name: 'The Beatles',
        address: {
          city: 'Liverpool',
          street: 'Newcastle Rd',
          house: 9,
        },
      },
      capitan: 'none',
      sailors: [
        {
          name: 'John',
          sex: 'm',
          subSailors: [
            { name: 'test1', sex: 'm' },
            { name: 'Ringo', sex: 'm' },
            { name: 'George', sex: 'm' },
          ],
        },
      ],
      voyages: 'none',
    });
  });
});

describe('updateWithInstruction', () => {
  it('Test 1', () => {
    const nextShip = updateWithInstruction(ship, {
      path: 'sailors.0',
      update: { name: 'test1' },
    });

    expect(nextShip).toStrictEqual({
      name: 'Yellow Submarine',
      year: 1969,
      company: {
        name: 'The Beatles',
        address: {
          city: 'Liverpool',
          street: 'Newcastle Rd',
          house: 9,
        },
      },
      capitan: 'none',
      sailors: [
        {
          name: 'test1',
          sex: 'm',
          subSailors: [
            { name: 'Paul', sex: 'm' },
            { name: 'Ringo', sex: 'm' },
            { name: 'George', sex: 'm' },
          ],
        },
      ],
      voyages: 'none',
    });
  });
});
