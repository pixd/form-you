import { updateWithInstruction } from '../../src/update/updateWithInstruction';

describe('updateWithInstruction', () => {
  const user = {
    nick: 'Antonio',
    bonus: [
      { num: 1, value: 10 },
      { num: 2, value: 20 },
      { num: 3, value: 30 },
    ],
  };

  it('can update data', () => {
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus.1',
        update: { value: 25 },
      },
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
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus.1',
        update: {
          $$set: { num: 0, value: 0 },
        },
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
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus',
        update: {
          $$append: [
            { num: 4, value: 40 },
          ],
        },
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
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus',
        update: {
          $$prepend: [
            { num: 4, value: 40 },
          ],
        },
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
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus',
        update: {
          $$exclude: [1],
        },
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
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus',
        update: {
          $$extract: [1],
        },
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
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus',
        update: {
          $$move: [0, 2],
        },
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
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus',
        update: {
          $$swap: [0, 2],
        },
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

  it('can apply data', () => {
    const newUser = updateWithInstruction(
      user,
      {
        path: 'bonus',
        update: {
          $$apply: { value: 15 },
          length: 1,
          skip: 1,
        },
      },
    );

    expect(newUser).toStrictEqual({
      nick: 'Antonio',
      bonus: [
        { num: 1, value: 10 },
        { num: 2, value: 15 },
        { num: 3, value: 30 },
      ],
    });
  });
});
