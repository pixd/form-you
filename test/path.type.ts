import { getAtPath } from '../src/path';
import { NodeValue, PossiblePath, PossibleValue } from '../src/path.types';
import { expect, PASSED } from './tools/noop';

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
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    const product = {} as Product;

    const name = getAtPath(product, 'name');
    expect.equal<typeof name, string>(PASSED);

    const category = getAtPath(product, 'category');
    expect.equal<typeof category, { id: number }>(PASSED);

    const categoryId = getAtPath(product, 'category.id');
    expect.equal<typeof categoryId, number>(PASSED);

    const settings = getAtPath(product, 'settings');
    expect.equal<typeof settings, ['on' | 'off', 'dark' | 'light']>(PASSED);

    const firstSetting = getAtPath(product, 'settings.0');
    expect.equal<typeof firstSetting, 'on' | 'off'>(PASSED);

    const secondSetting = getAtPath(product, 'settings.1');
    expect.equal<typeof secondSetting, 'dark' | 'light'>(PASSED);

    const thirdSetting = getAtPath(product, 'settings.2');
    expect.equal<typeof thirdSetting, unknown>(PASSED);

    const dotSetting = getAtPath(product, 'settings.');
    expect.equal<typeof dotSetting, unknown>(PASSED);

    const tags = getAtPath(product, 'tags');
    expect.equal<typeof tags, string[]>(PASSED);

    const firstTag = getAtPath(product, 'tags.0');
    expect.equal<typeof firstTag, string>(PASSED);

    const secondTag = getAtPath(product, 'tags.1');
    expect.equal<typeof secondTag, string>(PASSED);

    const dotTag = getAtPath(product, 'tags.');
    expect.equal<typeof dotTag, unknown>(PASSED);

    const nonexistent = getAtPath(product, 'nonexistent');
    expect.equal<typeof nonexistent, unknown>(PASSED);
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

    expect.equal<Value, string>(PASSED);
  }

  {
    type User = {
      settings: ['on' | 'off', 'dark' | 'light'];
    };

    type SettingsValue = PossibleValue<User>;

    expect.equal<SettingsValue, 'on' | 'off' | 'dark' | 'light' | ['on' | 'off', 'dark' | 'light']>(PASSED);
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
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    expect.equal<NodeValue<Product, 'name'>, string>(PASSED);
    expect.equal<NodeValue<Product, 'category'>, { id: number }>(PASSED);
    expect.equal<NodeValue<Product, 'category.id'>, number>(PASSED);
    expect.equal<NodeValue<Product, 'settings'>, ['on' | 'off', 'dark' | 'light']>(PASSED);
    expect.equal<NodeValue<Product, 'settings.0'>, 'on' | 'off'>(PASSED);
    expect.equal<NodeValue<Product, 'settings.1'>, 'dark' | 'light'>(PASSED);
    expect.equal<NodeValue<Product, 'settings.2'>, unknown>(PASSED);
    expect.equal<NodeValue<Product, 'settings.'>, unknown>(PASSED);
    expect.equal<NodeValue<Product, 'tags'>, string[]>(PASSED);
    expect.equal<NodeValue<Product, 'tags.0'>, string>(PASSED);
    expect.equal<NodeValue<Product, 'tags.1'>, string>(PASSED);
    expect.equal<NodeValue<Product, 'tags.'>, unknown>(PASSED);
    expect.equal<NodeValue<Product, 'sort'>, undefined | number>(PASSED);
    expect.equal<NodeValue<Product, 'nonexistent'>, unknown>(PASSED);
  }
}
