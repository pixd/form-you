import { update, updateAtPath, updateWithInstruction } from '../src/update';

type Sailor = {
  name: string;
  sex: 'm' | 'f';
  subSailors?: Sailor[];
};

type Ship = {
  name: string;
  price?: number;
  company: {
    name: string;
    address: {
      city: string;
      street: string;
      house?: number;
    };
  };
  capitan: 'none' | Omit<Sailor, 'subSailors'>;
  sailors: 'none' | Sailor[];
  voyages: 'none' | string[];
};

const ship: Ship = {
  name: 'Yellow Submarine',
  price: 1969,
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
  ],
  voyages: 'none',
};

describe('update', () => {
  it('Test 1', () => {
    const nextShip = updateWithInstruction(ship, {
      path: 'sailors.0',
      update: { name: 'test1' },
    });

    expect(nextShip).toEqual({
      name: 'Yellow Submarine',
      price: 1969,
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

describe('updateAtPath', () => {
  it('Test 1', () => {
    const nextShip = update(ship, {
      name: 'test1',
    });

    expect(nextShip).toEqual({
      name: 'test1',
      price: 1969,
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
    const nextShip = updateAtPath(ship, 'company', {
      name: 'test1',
    });

    expect(nextShip).toEqual({
      name: 'Yellow Submarine',
      price: 1969,
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

  it('Test 3', () => {
    const nextShip = updateAtPath(ship, 'sailors.0.subSailors.0', {
      name: 'test1',
    });

    expect(nextShip).toEqual({
      name: 'Yellow Submarine',
      price: 1969,
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

  it('Test 4', () => {
    const nextShip = updateAtPath(ship, 'sailors.0.subSailors.0.name', 'test1');

    expect(nextShip).toEqual({
      name: 'Yellow Submarine',
      price: 1969,
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

  it('$$set', () => {
    const nextShip = update(ship, {
      price: { $$set: undefined },
    });

    expect(nextShip).toStrictEqual({
      name: 'Yellow Submarine',
      price: undefined,
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
            { name: 'Paul', sex: 'm' },
            { name: 'Ringo', sex: 'm' },
            { name: 'George', sex: 'm' },
          ],
        },
      ],
      voyages: 'none',
    });
  });

  it('$$unset', () => {
    const nextShip = update(ship, {
      price: { $$unset: true },
    });

    expect(nextShip).toStrictEqual({
      name: 'Yellow Submarine',
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
