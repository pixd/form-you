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

  it('use $$set command to update values', () => {
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

  it('use $$set command to update undefined capable values with undefined', () => {
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

  it('use $$unset command to update undefined capable values with undefined', () => {
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

  it('use $$delete command to remove optional values', () => {
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

  it('use $$append command to add elements', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [],
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 0,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 2,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 100, 101, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 9,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 100, 101, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 10,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 11,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 12,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: 13,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$append: [100, 101],
            skip: Infinity,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
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
  });

  it('use $$prepend command to add elements', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [],
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 0,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [100, 101, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 2,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 100, 101, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 9,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 100, 101, 9],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 10,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 11,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 12,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: 13,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
        });
      }
    }

    {
      {
        const nextUser = update(user, {
          bonus: {
            $$prepend: [100, 101],
            skip: Infinity,
          },
        });

        expect(nextUser).toStrictEqual({
          name: 'Antonio',
          bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101],
        });
      }
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
  });

  it('use $$exclude command to remove array elements', () => {
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
          $$exclude: [0, 2, 4],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [1, 3, 5, 6, 7, 8, 9],
      });
    }
  });

  it('use $$exclude-skip command to remove array elements', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 0,
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
          $$exclude: 0,
          skip: -Infinity,
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
          $$exclude: 0,
          skip: Infinity,
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
          $$exclude: 2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: -Infinity,
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
          $$exclude: 2,
          skip: -3,
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
          $$exclude: 2,
          skip: -2,
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
          $$exclude: 2,
          skip: -1,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 0,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 7,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 8,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 9,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: 2,
          skip: 10,
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
          $$exclude: 2,
          skip: 11,
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
          $$exclude: 2,
          skip: Infinity,
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
          $$exclude: Infinity,
          skip: -Infinity,
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
          $$exclude: Infinity,
          skip: 0,
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
          $$exclude: Infinity,
          skip: Infinity,
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
          $$exclude: -2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: -2,
          skip: -Infinity,
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
          $$exclude: -2,
          skip: -3,
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
          $$exclude: -2,
          skip: -2,
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
          $$exclude: -2,
          skip: -1,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: -2,
          skip: 0,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: -2,
          skip: 2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: -2,
          skip: 7,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: -2,
          skip: 8,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: -2,
          skip: 9,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$exclude: -2,
          skip: 10,
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
          $$exclude: -2,
          skip: 11,
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
          $$exclude: -2,
          skip: Infinity,
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
          $$exclude: -Infinity,
          skip: -Infinity,
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
          $$exclude: -Infinity,
          skip: 0,
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
          $$exclude: -Infinity,
          skip: Infinity,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }
  });

  it('remains the scalars or objects the same with $$exclude command', () => {
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

  it('use $$extract command to remove array elements', () => {
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
          $$extract: [0, 2, 4],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 2, 4],
      });
    }
  });

  it('use $$extract-skip command to remove array elements', () => {
    const user = {
      name: 'Antonio',
      bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 0,
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
          $$extract: 0,
          skip: -Infinity,
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
          $$extract: 0,
          skip: Infinity,
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
          $$extract: 2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: -Infinity,
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
          $$extract: 2,
          skip: -3,
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
          $$extract: 2,
          skip: -2,
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
          $$extract: 2,
          skip: -1,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 0,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [2, 3],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 7,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [7, 8],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 8,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 9,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: 2,
          skip: 10,
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
          $$extract: 2,
          skip: 11,
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
          $$extract: 2,
          skip: Infinity,
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
          $$extract: Infinity,
          skip: -Infinity,
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
          $$extract: Infinity,
          skip: 0,
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
          $$extract: Infinity,
          skip: Infinity,
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
          $$extract: -2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: -2,
          skip: -Infinity,
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
          $$extract: -2,
          skip: -3,
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
          $$extract: -2,
          skip: -2,
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
          $$extract: -2,
          skip: -1,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: -2,
          skip: 0,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [8, 9],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: -2,
          skip: 2,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [6, 7],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: -2,
          skip: 7,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [1, 2],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: -2,
          skip: 8,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 1],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: -2,
          skip: 9,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$extract: -2,
          skip: 10,
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
          $$extract: -2,
          skip: 11,
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
          $$extract: -2,
          skip: Infinity,
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
          $$extract: -Infinity,
          skip: -Infinity,
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
          $$extract: -Infinity,
          skip: 0,
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
          $$extract: -Infinity,
          skip: Infinity,
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [],
      });
    }
  });

  it('remains the scalars or objects the same with $$extract command', () => {
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

  it('use $$move command to update arrays', () => {
    {
      const user = {
        name: 'Antonio',
        bonus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };

      const nextUser = update(user, {
        bonus: {
          $$move: [1, 2],
        },
      });

      expect(nextUser).toStrictEqual({
        name: 'Antonio',
        bonus: [0, 2, 1, 3, 4, 5, 6, 7, 8, 9],
      });
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

    test([0, -1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([0, -2], [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]);
    test([0, -9], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([0, -12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([4, 0], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, 1], [0, 4, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, 3], [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]);
    test([4, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([4, 5], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([4, 8], [0, 1, 2, 3, 5, 6, 7, 8, 4, 9]);
    test([4, 9], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, 10], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, 11], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);

    test([4, -1], [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
    test([4, -2], [0, 1, 2, 3, 5, 6, 7, 8, 4, 9]);
    test([4, -5], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([4, -6], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([4, -7], [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]);
    test([4, -9], [0, 4, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -10], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -11], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
    test([4, -12], [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]);

    test([9, 0], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, 1], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, 8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([9, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([9, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([9, -2], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([9, -9], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -10], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -11], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([9, -12], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);

    test([-1, 0], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, 1], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, 8], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([-1, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-1, -1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-1, -2], [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
    test([-1, -9], [0, 9, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -10], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -11], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    test([-1, -12], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]);

    test([-5, 0], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, 1], [0, 5, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, 4], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([-5, 5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-5, 6], [0, 1, 2, 3, 4, 6, 5, 7, 8, 9]);
    test([-5, 8], [0, 1, 2, 3, 4, 6, 7, 8, 5, 9]);
    test([-5, 9], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, 10], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, 11], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);

    test([-5, -1], [0, 1, 2, 3, 4, 6, 7, 8, 9, 5]);
    test([-5, -2], [0, 1, 2, 3, 4, 6, 7, 8, 5, 9]);
    test([-5, -4], [0, 1, 2, 3, 4, 6, 5, 7, 8, 9]);
    test([-5, -5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-5, -6], [0, 1, 2, 3, 5, 4, 6, 7, 8, 9]);
    test([-5, -9], [0, 5, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -10], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -11], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);
    test([-5, -12], [5, 0, 1, 2, 3, 4, 6, 7, 8, 9]);

    test([-10, -1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, -2], [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]);
    test([-10, -9], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, -12], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    test([-10, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, 1], [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
    test([-10, 8], [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]);
    test([-10, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    test([-10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

    // {
    //   const nextUser = update(user, {
    //     bonus: {
    //       $$move: [-2, 0],
    //     },
    //   });
    //
    //   expect(nextUser).toStrictEqual({
    //     name: 'Antonio',
    //     bonus: [8, 0, 1, 2, 3, 4, 5, 6, 7, 9],
    //   });
    // }
  });

  it('use $$merge command to update arrays', () => {
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
  });

  it('use $$merge command to update nested arrays', () => {
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

  it('use $$merge-at command to update arrays', () => {
    const user = {
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 20 },
        { num: 3, value: 30 },
        { num: 4, value: 40 },
      ],
    };

    {
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
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: 0,
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
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: 1,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 15 },
          { num: 3, value: 25 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: 3,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 15 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: 4,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: -1,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 15 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: -2,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 15 },
          { num: 4, value: 25 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: -3,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 15 },
          { num: 3, value: 25 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: -5,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 25 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$merge: [
            { value: 15 },
            { value: 25 },
          ],
          at: -6,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }
  });

  it('remains the scalars or objects the same with $$merge command', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: undefined,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: null,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: null,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const nextUser = update(user, {
        bonus: {
          // @ts-expect-error
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

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
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
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
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
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
          $$merge: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          'removed',
        ],
      });
    }
  });

  it('use $$mergeAll command to update arrays', () => {
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
  });

  it('use $$mergeAll command to update nested arrays', () => {
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
  });

  it('remains the scalars or objects the same with $$mergeAll command', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: undefined,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: undefined,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: null,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: null,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: 10,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: 10,
      });
    }

    {
      const user = {
        nick: 'Antonio',
        bonus: { value: 10 },
      };

      const nextUser = update(user, {
        bonus: {
          // @ts-expect-error
          $$mergeAll: { value: 20 },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: { value: 10 },
      });
    }

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

  it('use $$replace command to update arrays', () => {
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
  });

  it('use $$replace-at command to update arrays', () => {
    const user = {
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 20 },
        { num: 3, value: 30 },
        { num: 4, value: 40 },
      ],
    };

    {
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
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: 0,
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
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: 1,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 15, value: 15 },
          { num: 25, value: 25 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: 3,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 15, value: 15 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: 4,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: -1,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 15, value: 15 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: -2,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 15, value: 15 },
          { num: 25, value: 25 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: -3,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 15, value: 15 },
          { num: 25, value: 25 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: -5,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 25, value: 25 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }

    {
      const nextUser = update(user, {
        bonus: {
          $$replace: [
            { num: 15, value: 15 },
            { num: 25, value: 25 },
          ],
          at: -6,
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 2, value: 20 },
          { num: 3, value: 30 },
          { num: 4, value: 40 },
        ],
      });
    }
  });

  it('replace the scalars with new value with $$replace command', () => {
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
          $$replace: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { num: 3, value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 3, value: 20 },
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
          $$replace: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { num: 3, value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 3, value: 20 },
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
          $$replace: {
            // TODO Fix eslint rules
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '1': { num: 3, value: 20 },
          },
        },
      });

      expect(nextUser).toStrictEqual({
        nick: 'Antonio',
        bonus: [
          { num: 1, value: 10 },
          { num: 3, value: 20 },
        ],
      });
    }
  });

  it('use $$replaceAll command to update arrays', () => {
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
  });

  it('replace the scalars with new value with $$replaceAll command', () => {
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
        bonus: [
          { num: 1, value: 10 },
          null,
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
        bonus: [
          { num: 1, value: 10 },
          'removed',
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
