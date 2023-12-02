import { getAtPath } from '../../src/path/path';
import { NodeValue, PossiblePath, PossibleValue } from '../../src/path/path.types';
import { expect, PASSED } from '../tools/expect';

/**
 * getAtPath
 */
{
  {
    type Product = {
      name: string;
      category: {
        id: number;
      };
      brand?: {
        id: number;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    const product = {} as Product;

    const name = getAtPath(product, 'name');
    expect.equal<typeof name, string>(PASSED);

    const unknownNameProp = getAtPath(product, 'name.abc');
    expect.equal<typeof unknownNameProp, never>(PASSED);

    const lengthNameProp = getAtPath(product, 'name.length');
    expect.equal<typeof lengthNameProp, never>(PASSED);

    const category = getAtPath(product, 'category');
    expect.equal<typeof category, { id: number }>(PASSED);

    const categoryId = getAtPath(product, 'category.id');
    expect.equal<typeof categoryId, number>(PASSED);

    const brand = getAtPath(product, 'brand');
    expect.equal<typeof brand, undefined | { id: number }>(PASSED);

    const brandId = getAtPath(product, 'brand.id');
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
    type Product = {
      name: string;
      category: {
        id: number;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    type Path = PossiblePath<Product>;

    expect.safety.not.extends<Path, string>(PASSED);
    expect.safety.extends<Path, 'name'>(PASSED);
    expect.safety.extends<Path, 'category'>(PASSED);
    expect.safety.extends<Path, 'category.id'>(PASSED);
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
    type Product = {
      name: string;
      subProduct: {
        enabled: boolean;
        item: Product;
      };
    };

    type Path = PossiblePath<Product>;

    expect.safety.not.extends<Path, string>(PASSED);
    expect.safety.extends<Path, 'name'>(PASSED);
    expect.safety.extends<Path, 'subProduct'>(PASSED);
    expect.safety.extends<Path, 'subProduct.enabled'>(PASSED);
    expect.safety.extends<Path, 'subProduct.item'>(PASSED);
    expect.safety.not.extends<Path, 'subProduct.item.'>(PASSED);
    expect.safety.not.extends<Path, 'subProduct.item.a'>(PASSED);
    expect.safety.extends<Path, 'subProduct.item.name'>(PASSED);
    expect.safety.extends<Path, 'subProduct.item.subProduct'>(PASSED);
    expect.safety.extends<Path, 'subProduct.item.subProduct.enabled'>(PASSED);
    expect.safety.extends<Path, 'subProduct.item.subProduct.item'>(PASSED);
    expect.safety.extends<Path, 'subProduct.item.subProduct.item.'>(PASSED);
    expect.safety.extends<Path, 'subProduct.item.subProduct.item.a'>(PASSED);
  }
}

/**
 * PossibleValue
 */
{
  {
    type Product = {
      name: string;
      category: {
        id: number;
      };
      settings: boolean[];
    };

    type Value = PossibleValue<Product>;

    expect.equal<Value, string | { id: number } | number | boolean[] | boolean>(PASSED);
  }

  {
    type User = {
      phone?: string;
    };

    type Value = PossibleValue<User>;

    expect.equal<Value, undefined | string>(PASSED);
  }

  {
    type User = {
      settings: ['on' | 'off', 'dark' | 'light'];
    };

    type SettingsValue = PossibleValue<User>;

    expect.equal<SettingsValue, 'on' | 'off' | 'dark' | 'light' | ['on' | 'off', 'dark' | 'light']>(PASSED);
  }

  {
    type Settings = ['on' | 'off', 'dark' | 'light'];

    type SettingsValue = PossibleValue<Settings>;

    expect.equal<SettingsValue, 'on' | 'off' | 'dark' | 'light'>(PASSED);
  }

  {
    type Settings = string[];

    type SettingsValue = PossibleValue<Settings>;

    expect.equal<SettingsValue, string>(PASSED);
  }

  {
    type Settings = undefined | null | boolean | number;

    type SettingsValue = PossibleValue<Settings>;

    expect.equal<SettingsValue, undefined | null | boolean | number>(PASSED);
  }
}

/**
 * NodeValue
 */
{
  {
    type Product = {
      name: string;
      category: {
        id: number;
      };
      brand?: {
        id: number;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    expect.equal<NodeValue<Product, 'name'>, string>(PASSED);
    expect.equal<NodeValue<Product, 'name'>, string>(PASSED);
    expect.equal<NodeValue<Product, 'category'>, { id: number }>(PASSED);
    expect.equal<NodeValue<Product, 'category.id'>, number>(PASSED);
    expect.equal<NodeValue<Product, 'brand'>, undefined | { id: number }>(PASSED);
    expect.equal<NodeValue<Product, 'brand.id'>, number>(PASSED);
    expect.equal<NodeValue<Product, 'settings'>, ['on' | 'off', 'dark' | 'light']>(PASSED);
    expect.equal<NodeValue<Product, 'settings.0'>, 'on' | 'off'>(PASSED);
    expect.equal<NodeValue<Product, 'settings.1'>, 'dark' | 'light'>(PASSED);
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'settings.2'>, undefined>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'settings.abc'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'settings.length'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'settings.'>, unknown>(
      PASSED,
    );
    expect.equal<NodeValue<Product, 'tags'>, string[]>(PASSED);
    expect.equal<NodeValue<Product, 'tags.0'>, string>(PASSED);
    expect.equal<NodeValue<Product, 'tags.1'>, string>(PASSED);
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'tags.abc'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'tags.length'>, unknown>(
      PASSED,
    );
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'tags.'>, unknown>(
      PASSED,
    );
    expect.equal<NodeValue<Product, 'sort'>, undefined | number>(PASSED);
    // @ts-expect-error
    expect.equal<NodeValue<Product, 'nonexistent'>, unknown>(
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

    expect.equal<NodeValue<EmptyPropNameTest, ''>, string>(PASSED);

    expect.equal<NodeValue<EmptyPropNameTest, 'inner.'>, number>(PASSED);

    // @ts-expect-error
    expect.equal<NodeValue<EmptyPropNameTest, 'inner..'>, never>(
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

    expect.equal<NodeValue<EmptyPropNameTest, '.'>, number>(PASSED);

    // @ts-expect-error
    expect.equal<NodeValue<EmptyPropNameTest, '..'>, never>(
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

    expect.equal<NodeValue<EmptyPropNameTest, '..'>, number>(PASSED);

    // @ts-expect-error
    expect.equal<NodeValue<EmptyPropNameTest, '...'>, never>(
      PASSED,
    );
  }
}
