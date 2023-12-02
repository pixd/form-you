import { updateAtPath } from '../../src/update/updateAtPath';

describe('updateAtPath', () => {
  const user = {
    nick: 'Antonio',
    bonus: [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
    ],
  };

  it('can update data', () => {
    const newUser = updateAtPath(
      user,
      'bonus.1',
      { value: 25 },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 25 },
        { num: 3, value: 30 },
      ],
    });
  });

  it('can set data', () => {
    const newUser = updateAtPath(
      user,
      'bonus.1',
      {
        $$set: { num: 0, value: 0 },
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 0, value: 0 },
        { num: 3, value: 30 },
      ],
    });
  });

  it('can append data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$append: [
          { num: 4, value: 40 },
        ],
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 20 },
        { num: 3, value: 30 },
        { num: 4, value: 40 },
      ],
    });
  });

  it('can prepend data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$prepend: [
          { num: 4, value: 40 },
        ],
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 4, value: 40 },
        { num: 1, value: 10 },
        { num: 2, value: 20 },
        { num: 3, value: 30 },
      ],
    });
  });

  it('can exclude data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$exclude: [1],
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 3, value: 30 },
      ],
    });
  });

  it('can extract data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$extract: [1],
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 2, value: 20 },
      ],
    });
  });

  it('can move data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$move: [0, 2],
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 2, value: 20 },
        { num: 3, value: 30 },
        { num: 1, value: 10 },
      ],
    });
  });

  it('can swap data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$swap: [0, 2],
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 3, value: 30 },
        { num: 2, value: 20 },
        { num: 1, value: 10 },
      ],
    });
  });

  it('can merge data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$merge: [
          { value: 15 },
        ],
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 15 },
        { num: 2, value: 20 },
        { num: 3, value: 30 },
      ],
    });
  });

  it('can merge all data', () => {
    const newUser = updateAtPath(
      user,
      'bonus',
      {
        $$mergeAll: { value: 70 },
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 70 },
        { num: 2, value: 70 },
        { num: 3, value: 70 },
      ],
    });
  });
});
