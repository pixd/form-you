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

  it('use $$set command to update values with undefined', () => {
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

  it('use $$delete command to delete optional values', () => {
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

  it('use $$apply command to update arrays', () => {
    const user = {
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 15 },
      ],
    };

    const nextUser = update(user, {
      bonus: {
        $$apply: { value: 20 },
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

  it('use $$apply command to update nested arrays', () => {
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
        $$apply: {
          bonus: {
            $$apply: { value: 25 },
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

  it('remains the scalars or objects the same with $$apply command', () => {
    {
      const user = {
        nick: 'Antonio',
        bonus: undefined,
      };

      const nextUser = update(user, {
        // @ts-expect-error
        bonus: {
          $$apply: { value: 20 },
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
          $$apply: { value: 20 },
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
          $$apply: { value: 20 },
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
          $$apply: { value: 20 },
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
          $$apply: { value: 20 },
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
          $$apply: { value: 20 },
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
          $$apply: { value: 20 },
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

  it('use $$reset command to update arrays', () => {
    const user = {
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 15 },
      ],
    };

    const nextUser = update(user, {
      bonus: {
        $$reset: { num: 0, value: 0 },
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

  it('replace the scalars with new value with $$reset command', () => {
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
          $$reset: { num: 0, value: 0 },
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
          $$reset: { num: 0, value: 0 },
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
          $$reset: { num: 0, value: 0 },
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
