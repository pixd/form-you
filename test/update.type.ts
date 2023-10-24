import { update, updateAtPath, updateWithInstruction } from '../src/update';
import { UpdatePayload } from '../src/update.types';
import { NodeValue } from '../src/path.types';
import { expect, PASSED } from './tools/noop';

/**
 * UpdatePayload
 */
{
  {
    type Product = {
      id: number;
      code: undefined | string;
      enabled?: boolean;
      category?: {
        id: number;
        code: undefined | string;
        enabled?: boolean;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: Tag[];
    };

    type Tag = {
      id: number;
      name: string;
    };

    expect.safety.extends<UpdatePayload<Product>, Partial<Product>>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: undefined; tags: [] }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { id: number; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { id: number; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { id: { nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { id: { $$set: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { id: { $$set: number; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { id: { $$set: number; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: boolean; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: boolean; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { code: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined; tags: [] }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: string; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: string; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { code: { nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { code: { $$set: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$set: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$set: string; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$set: string; nonexistent: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$set: undefined; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$set: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { code: { $$unset: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$unset: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$unset: boolean; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$unset: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$unset: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: boolean; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { enabled: boolean }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined; tags: [] }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: boolean; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: boolean; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$set: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: boolean; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$set: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$set: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: boolean; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$delete: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$delete: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$delete: boolean; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$delete: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$delete: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$delete: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { $$set: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: Product }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: Product; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: Product; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: Product; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: undefined; enabled: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: Product; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: Product; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: boolean }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: boolean; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: boolean; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: boolean; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: boolean; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: boolean; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: boolean }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: boolean; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: boolean; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: boolean; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: boolean; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: boolean; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$set: Product; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$set: Product; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$set: Product; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$set: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$set: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$set: undefined; enabled: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: boolean }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: boolean; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: boolean; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: boolean; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: boolean; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: boolean; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: boolean }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: boolean; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: boolean; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: boolean; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: boolean; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: boolean; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { id: 10 } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: 10; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: 10; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category'] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; id: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; code: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; enabled: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: boolean; id: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: boolean; code: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: boolean; enabled: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: boolean; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: boolean; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$delete: boolean; id: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$delete: boolean; code: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$delete: boolean; enabled: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: boolean; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: boolean; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$set: string; $$unset: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$set: string; $$unset: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$set: undefined; $$unset: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$set: undefined; $$unset: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$set: boolean; $$delete: boolean } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$set: boolean; $$delete: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$unset: boolean; $$delete: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$delete: boolean; $$unset: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { [key: number]: Tag } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { [key: number]: Partial<Tag> } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: Tag }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: Partial<Tag> }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: Tag[] }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: Partial<Tag>[] }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: number[] }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$append: Tag[] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$append: Partial<Tag>[] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$append: Tag } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$append: number[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$append: Tag[]; skip: undefined | null | number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$prepend: Tag[] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$prepend: Partial<Tag>[] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$prepend: Tag } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$prepend: number[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$prepend: Tag[]; skip: undefined | null | number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$exclude: number[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$exclude: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$exclude: number; skip: undefined | null | number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extract: number[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extract: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extract: number; skip: undefined | null | number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$move: [number, number] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$swap: [number, number] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { [key: number]: Tag } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { [key: number]: Partial<Tag> } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$merge: Tag } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$merge: Partial<Tag> } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Tag[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Partial<Tag>[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Tag[]; at: undefined | null | number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Partial<Tag>[]; at: undefined | null | number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$merge: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { tags: { [key: number]: { $$set: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { [key: number]: { $$unset: true } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { [key: number]: { $$delete: true } } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { settings: { [key: number]: { $$set: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { settings: { [key: number]: { $$unset: true } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { settings: { [key: number]: { $$delete: true } } }>(PASSED);
  }
}

/**
 * update
 */
{
  {
    type Product = {
      id: number;
      code: undefined | string;
      enabled?: boolean;
      category?: {
        id: number;
        code: undefined | string;
        enabled?: boolean;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: Tag[];
    };

    type Tag = {
      id: number;
      name: string;
    };

    const product = {} as Product;

    update(product, { id: 10 });

    // @ts-expect-error
    update(product, { nonexistent: '10' });
    // @ts-expect-error
    update(product, { nonexistent: undefined });

    update(product, { id: 10 });
    // @ts-expect-error
    update(product, { id: undefined });
    // @ts-expect-error
    update(product, { id: undefined, tags: [] });
    // @ts-expect-error
    update(product, { id: 10, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { id: 10, nonexistent: undefined });
    // @ts-expect-error
    update(product, { id: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { id: undefined, nonexistent: undefined });

    // @ts-expect-error
    update(product, { id: { nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { id: { nonexistent: undefined } });

    update(product, { id: { $$set: 10 } });
    // @ts-expect-error
    update(product, { id: { $$set: undefined } });
    // @ts-expect-error
    update(product, { id: { $$set: 10, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { id: { $$set: 10, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { id: { $$set: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { id: { $$set: undefined, nonexistent: undefined } });

    // @ts-expect-error
    update(product, { id: { $$unset: true } });
    // @ts-expect-error
    update(product, { id: { $$unset: false } });
    // @ts-expect-error
    update(product, { id: { $$unset: undefined } });
    // @ts-expect-error
    update(product, { id: { $$unset: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { id: { $$unset: true, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { id: { $$unset: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { id: { $$unset: undefined, nonexistent: undefined } });

    // @ts-expect-error
    update(product, { id: { $$delete: true } });
    // @ts-expect-error
    update(product, { id: { $$delete: false } });
    // @ts-expect-error
    update(product, { id: { $$delete: undefined } });
    // @ts-expect-error
    update(product, { id: { $$delete: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { id: { $$delete: true, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { id: { $$delete: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { id: { $$delete: undefined, nonexistent: undefined } });

    update(product, { code: 'abc' });
    update(product, { code: undefined });
    update(product, { code: undefined, tags: [] });
    // @ts-expect-error
    update(product, { code: 'abc', nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { code: 'abc', nonexistent: undefined });
    // @ts-expect-error
    update(product, { code: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { code: undefined, nonexistent: undefined });

    // @ts-expect-error
    update(product, { code: { nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { code: { nonexistent: undefined } });

    update(product, { code: { $$set: 'abc' } });
    update(product, { code: { $$set: undefined } });
    // @ts-expect-error
    update(product, { code: { $$set: 'abc', nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { code: { $$set: 'abc', nonexistent: undefined } });
    // @ts-expect-error
    update(product, { code: { $$set: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { code: { $$set: undefined, nonexistent: undefined } });

    update(product, { code: { $$unset: true } });
    update(product, { code: { $$unset: false } });
    // @ts-expect-error
    update(product, { code: { $$unset: undefined } });
    // @ts-expect-error
    update(product, { code: { $$unset: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { code: { $$unset: true, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { code: { $$unset: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { code: { $$unset: undefined, nonexistent: undefined } });

    // @ts-expect-error
    update(product, { code: { $$delete: true } });
    // @ts-expect-error
    update(product, { code: { $$delete: false } });
    // @ts-expect-error
    update(product, { code: { $$delete: undefined } });
    // @ts-expect-error
    update(product, { code: { $$delete: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { code: { $$delete: true, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { code: { $$delete: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { code: { $$delete: undefined, nonexistent: undefined } });

    update(product, { enabled: true });
    // @ts-expect-error
    update(product, { enabled: undefined });
    // @ts-expect-error
    update(product, { enabled: undefined, tags: [] });
    // @ts-expect-error
    update(product, { enabled: true, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { enabled: true, nonexistent: undefined });
    // @ts-expect-error
    update(product, { enabled: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { enabled: undefined, nonexistent: undefined });

    // @ts-expect-error
    update(product, { enabled: { nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { enabled: { nonexistent: undefined } });

    update(product, { enabled: { $$set: true } });
    // @ts-expect-error
    update(product, { enabled: { $$set: undefined } });
    // @ts-expect-error
    update(product, { enabled: { $$set: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { enabled: { $$set: true, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { enabled: { $$set: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { enabled: { $$set: undefined, nonexistent: undefined } });

    // @ts-expect-error
    update(product, { enabled: { $$unset: true } });
    // @ts-expect-error
    update(product, { enabled: { $$unset: false } });
    // @ts-expect-error
    update(product, { enabled: { $$unset: undefined } });
    // @ts-expect-error
    update(product, { enabled: { $$unset: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { enabled: { $$unset: true, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { enabled: { $$unset: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { enabled: { $$unset: undefined, nonexistent: undefined } });

    update(product, { enabled: { $$delete: true } });
    update(product, { enabled: { $$delete: false } });
    // @ts-expect-error
    update(product, { enabled: { $$delete: undefined } });
    // @ts-expect-error
    update(product, { enabled: { $$delete: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { enabled: { $$delete: true, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { enabled: { $$delete: undefined, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { enabled: { $$delete: undefined, nonexistent: undefined } });

    // @ts-expect-error
    update(product, { $$set: undefined });
    update(product, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] } });
    // @ts-expect-error
    update(product, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, id: 10 });
    // @ts-expect-error
    update(product, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, code: undefined });
    // @ts-expect-error
    update(product, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, enabled: undefined });
    // @ts-expect-error
    update(product, { $$set: undefined, id: 10 });
    // @ts-expect-error
    update(product, { $$set: undefined, code: undefined });
    // @ts-expect-error
    update(product, { $$set: undefined, enabled: undefined });
    // @ts-expect-error
    update(product, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, nonexistent: undefined });
    // @ts-expect-error
    update(product, { $$set: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { $$set: undefined, nonexistent: undefined });

    // @ts-expect-error
    update(product, { $$unset: true });
    // @ts-expect-error
    update(product, { $$unset: false });
    // @ts-expect-error
    update(product, { $$unset: undefined });
    // @ts-expect-error
    update(product, { $$unset: true, id: 10 });
    // @ts-expect-error
    update(product, { $$unset: true, code: undefined });
    // @ts-expect-error
    update(product, { $$unset: true, enabled: undefined });
    // @ts-expect-error
    update(product, { $$unset: undefined, id: 10 });
    // @ts-expect-error
    update(product, { $$unset: undefined, code: undefined });
    // @ts-expect-error
    update(product, { $$unset: undefined, enabled: undefined });
    // @ts-expect-error
    update(product, { $$unset: true, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { $$unset: true, nonexistent: undefined });
    // @ts-expect-error
    update(product, { $$unset: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { $$unset: undefined, nonexistent: undefined });

    // @ts-expect-error
    update(product, { $$delete: true });
    // @ts-expect-error
    update(product, { $$delete: false });
    // @ts-expect-error
    update(product, { $$delete: undefined });
    // @ts-expect-error
    update(product, { $$delete: true, id: 10 });
    // @ts-expect-error
    update(product, { $$delete: true, code: undefined });
    // @ts-expect-error
    update(product, { $$delete: true, enabled: undefined });
    // @ts-expect-error
    update(product, { $$delete: undefined, id: 10 });
    // @ts-expect-error
    update(product, { $$delete: undefined, code: undefined });
    // @ts-expect-error
    update(product, { $$delete: undefined, enabled: undefined });
    // @ts-expect-error
    update(product, { $$delete: true, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { $$delete: true, nonexistent: undefined });
    // @ts-expect-error
    update(product, { $$delete: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(product, { $$delete: undefined, nonexistent: undefined });

    update(product, { category: { id: 10 } });
    // @ts-expect-error
    update(product, { category: { id: 10, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { category: { id: 10, nonexistent: undefined } });
    // @ts-expect-error
    update(product, { category: { nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { category: { nonexistent: undefined } });

    // @ts-expect-error
    update(product, { category: { $$set: undefined } });
    update(product, { category: { $$set: { id: 10, code: 'abc' } } });
    // @ts-expect-error
    update(product, { category: { $$set: { id: 10, code: 'abc' }, id: 10 } });
    // @ts-expect-error
    update(product, { category: { $$set: { id: 10, code: 'abc' }, code: undefined } });
    // @ts-expect-error
    update(product, { category: { $$set: { id: 10, code: 'abc' }, enabled: undefined } });
    // @ts-expect-error
    update(product, { category: { $$set: { id: 10, code: 'abc' }, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { category: { $$set: { id: 10, code: 'abc' }, nonexistent: undefined } });

    // @ts-expect-error
    update(product, { category: { $$unset: true } });
    // @ts-expect-error
    update(product, { category: { $$unset: false } });
    // @ts-expect-error
    update(product, { category: { $$unset: true, id: 10 } });
    // @ts-expect-error
    update(product, { category: { $$unset: true, code: undefined } });
    // @ts-expect-error
    update(product, { category: { $$unset: true, enabled: undefined } });
    // @ts-expect-error
    update(product, { category: { $$unset: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { category: { $$unset: true, nonexistent: undefined } });

    update(product, { category: { $$delete: true } });
    update(product, { category: { $$delete: false } });
    // @ts-expect-error
    update(product, { category: { $$delete: true, id: 10 } });
    // @ts-expect-error
    update(product, { category: { $$delete: true, code: undefined } });
    // @ts-expect-error
    update(product, { category: { $$delete: true, enabled: undefined } });
    // @ts-expect-error
    update(product, { category: { $$delete: true, nonexistent: 'abc' } });
    // @ts-expect-error
    update(product, { category: { $$delete: true, nonexistent: undefined } });

    // @ts-expect-error
    update(product, { code: { $$set: 'abc', $$unset: true } });
    // @ts-expect-error
    update(product, { code: { $$set: 'abc', $$unset: undefined } });
    // @ts-expect-error
    update(product, { code: { $$set: undefined, $$unset: true } });
    // @ts-expect-error
    update(product, { code: { $$set: undefined, $$unset: undefined } });

    // @ts-expect-error
    update(product, { enabled: { $$set: 10, $$delete: true } });
    // @ts-expect-error
    update(product, { enabled: { $$set: 10, $$delete: undefined } });

    // @ts-expect-error
    update(product, { code: { $$unset: true, $$delete: undefined } });
    // @ts-expect-error
    update(product, { enabled: { $$delete: true, $$unset: undefined } });

    update(product, { tags: { '1': { id: 10, name: 'abc' } } });
    update(product, { tags: { '1': { id: 10 } } });
    // @ts-expect-error
    update(product, { tags: { id: 10, name: 'abc' } });
    // @ts-expect-error
    update(product, { tags: { id: 10 } });

    update(product, { tags: [{ id: 10, name: 'abc' }] });
    // @ts-expect-error
    update(product, { tags: [{ id: 10 }] });
    // @ts-expect-error
    update(product, { tags: [10] });

    update(product, { tags: { $$append: [{ id: 10, name: 'abc' }] } });
    // @ts-expect-error
    update(product, { tags: { $$append: [{ id: 10 }] } });
    // @ts-expect-error
    update(product, { tags: { $$append: { id: 10, name: 'abc' } } });
    // @ts-expect-error
    update(product, { tags: { $$append: [10] } });
    update(product, { tags: { $$append: [{ id: 10, name: 'abc' }], skip: undefined } });
    update(product, { tags: { $$append: [{ id: 10, name: 'abc' }], skip: null } });
    update(product, { tags: { $$append: [{ id: 10, name: 'abc' }], skip: 10 } });

    update(product, { tags: { $$prepend: [{ id: 10, name: 'abc' }] } });
    // @ts-expect-error
    update(product, { tags: { $$prepend: [{ id: 10 }] } });
    // @ts-expect-error
    update(product, { tags: { $$prepend: { id: 10, name: 'abc' } } });
    // @ts-expect-error
    update(product, { tags: { $$prepend: [10] } });
    update(product, { tags: { $$prepend: [{ id: 10, name: 'abc' }], skip: undefined } });
    update(product, { tags: { $$prepend: [{ id: 10, name: 'abc' }], skip: null } });
    update(product, { tags: { $$prepend: [{ id: 10, name: 'abc' }], skip: 10 } });

    update(product, { tags: { $$exclude: [10] } });
    update(product, { tags: { $$exclude: 10 } });
    update(product, { tags: { $$exclude: 10, skip: undefined } });
    update(product, { tags: { $$exclude: 10, skip: null } });
    update(product, { tags: { $$exclude: 10, skip: 10 } });

    update(product, { tags: { $$extract: [10] } });
    update(product, { tags: { $$extract: 10 } });
    update(product, { tags: { $$extract: 10, skip: undefined } });
    update(product, { tags: { $$extract: 10, skip: null } });
    update(product, { tags: { $$extract: 10, skip: 10 } });

    update(product, { tags: { $$move: [0, 1] } });

    update(product, { tags: { $$swap: [0, 1] } });

    update(product, { tags: { '1': { id: 10, name: 'abc' } } });
    update(product, { tags: { '1': { id: 10 } } });
    // @ts-expect-error
    update(product, { tags: { $$merge: { id: 10, name: 'abc' } } });
    // @ts-expect-error
    update(product, { tags: { $$merge: { id: 10 } } });
    update(product, { tags: { $$merge: [{ id: 10, name: 'abc' }] } });
    update(product, { tags: { $$merge: [{ id: 10 }] } });
    update(product, { tags: { $$merge: [{ id: 10, name: 'abc' }], at: undefined } });
    update(product, { tags: { $$merge: [{ id: 10, name: 'abc' }], at: null } });
    update(product, { tags: { $$merge: [{ id: 10, name: 'abc' }], at: 10 } });
    update(product, { tags: { $$merge: [{ id: 10 }], at: undefined } });
    update(product, { tags: { $$merge: [{ id: 10 }], at: null } });
    update(product, { tags: { $$merge: [{ id: 10 }], at: 10 } });
    // @ts-expect-error
    update(product, { tags: { $$merge: undefined } });

    // @ts-expect-error
    update(product, { tags: { '0': { $$set: undefined } } });
    // @ts-expect-error
    update(product, { tags: { '0': { $$unset: true } } });
    // @ts-expect-error
    update(product, { tags: { '0': { $$delete: true } } });

    // @ts-expect-error
    update(product, { settings: { '0': { $$set: undefined } } });
    // @ts-expect-error
    update(product, { settings: { '0': { $$unset: true } } });
    // @ts-expect-error
    update(product, { settings: { '0': { $$delete: true } } });

    const optionalProduct = {} as undefined | Product;

    update(optionalProduct, { $$set: undefined });
    update(optionalProduct, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] } });
    // @ts-expect-error
    update(optionalProduct, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, id: 10 });
    // @ts-expect-error
    update(optionalProduct, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, code: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, enabled: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$set: undefined, id: 10 });
    // @ts-expect-error
    update(optionalProduct, { $$set: undefined, code: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$set: undefined, enabled: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, nonexistent: 'abc' });
    // @ts-expect-error
    update(optionalProduct, { $$set: { id: 10, code: 'abc', settings: ['on', 'dark'], tags: [] }, nonexistent: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$set: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(optionalProduct, { $$set: undefined, nonexistent: undefined });

    // @ts-expect-error
    update(optionalProduct, { $$unset: true });
    // @ts-expect-error
    update(optionalProduct, { $$unset: false });
    // @ts-expect-error
    update(optionalProduct, { $$unset: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$unset: true, id: 10 });
    // @ts-expect-error
    update(optionalProduct, { $$unset: true, code: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$unset: true, enabled: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$unset: undefined, id: 10 });
    // @ts-expect-error
    update(optionalProduct, { $$unset: undefined, code: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$unset: undefined, enabled: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$unset: true, nonexistent: 'abc' });
    // @ts-expect-error
    update(optionalProduct, { $$unset: true, nonexistent: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$unset: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(optionalProduct, { $$unset: undefined, nonexistent: undefined });

    // @ts-expect-error
    update(optionalProduct, { $$delete: true });
    // @ts-expect-error
    update(optionalProduct, { $$delete: false });
    // @ts-expect-error
    update(optionalProduct, { $$delete: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$delete: true, id: 10 });
    // @ts-expect-error
    update(optionalProduct, { $$delete: true, code: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$delete: true, enabled: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$delete: undefined, id: 10 });
    // @ts-expect-error
    update(optionalProduct, { $$delete: undefined, code: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$delete: undefined, enabled: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$delete: true, nonexistent: 'abc' });
    // @ts-expect-error
    update(optionalProduct, { $$delete: true, nonexistent: undefined });
    // @ts-expect-error
    update(optionalProduct, { $$delete: undefined, nonexistent: 'abc' });
    // @ts-expect-error
    update(optionalProduct, { $$delete: undefined, nonexistent: undefined });
  }
}

/**
 * updateAtPath
 */
{
  {
    type Product = {
      id: number;
      code: undefined | string;
      enabled?: boolean;
      category?: {
        id: number;
        code: undefined | string;
        enabled?: boolean;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: Tag[];
    };

    type Tag = {
      id: number;
      name: string;
    };

    const product = {} as Product;

    updateAtPath(product, 'id', 10);
    updateAtPath(product, 'id', { $$set: 10 });
    // @ts-expect-error
    updateAtPath(product, 'id', undefined);
    // @ts-expect-error
    updateAtPath(product, 'id', null);
    // @ts-expect-error
    updateAtPath(product, 'id', 'abc');
    // @ts-expect-error
    updateAtPath(product, 'id', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'id', { $$delete: true });

    updateAtPath(product, 'code', 'abc');
    updateAtPath(product, 'code', { $$set: 'abc' });
    updateAtPath(product, 'code', undefined);
    updateAtPath(product, 'code', { $$set: undefined });
    // @ts-expect-error
    updateAtPath(product, 'code', null);
    // @ts-expect-error
    updateAtPath(product, 'code', 10);
    // @ts-expect-error
    updateAtPath(product, 'code', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'code', { $$delete: true });

    updateAtPath(product, 'enabled', true);
    updateAtPath(product, 'enabled', { $$set: true });
    // @ts-expect-error
    updateAtPath(product, 'enabled', undefined);
    // @ts-expect-error
    updateAtPath(product, 'enabled', null);
    // @ts-expect-error
    updateAtPath(product, 'enabled', 10);
    // @ts-expect-error
    updateAtPath(product, 'enabled', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'enabled', { $$delete: true });

    updateAtPath(
      product,
      // @ts-expect-error
      'nonexistent',
      10,
    );

    updateAtPath(product, 'category.id', 10);
    updateAtPath(product, 'category.id', { $$set: 10 });
    // @ts-expect-error
    updateAtPath(product, 'category.id', undefined);
    // @ts-expect-error
    updateAtPath(product, 'category.id', null);
    // @ts-expect-error
    updateAtPath(product, 'category.id', 'abc');
    // @ts-expect-error
    updateAtPath(product, 'category.id', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'category.id', { $$delete: true });

    updateAtPath(product, 'category.code', undefined);
    updateAtPath(product, 'category.code', 'abc');
    updateAtPath(product, 'category.code', { $$set: undefined });
    updateAtPath(product, 'category.code', 'abc');
    // @ts-expect-error
    updateAtPath(product, 'category.code', null);
    // @ts-expect-error
    updateAtPath(product, 'category.code', 10);
    // @ts-expect-error
    updateAtPath(product, 'category.code', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'category.code', { $$delete: true });

    updateAtPath(product, 'category.enabled', true);
    updateAtPath(product, 'category.enabled', { $$set: true });
    // @ts-expect-error
    updateAtPath(product, 'category.enabled', undefined);
    // @ts-expect-error
    updateAtPath(product, 'category.enabled', null);
    // @ts-expect-error
    updateAtPath(product, 'category.enabled', 10);
    // @ts-expect-error
    updateAtPath(product, 'category.enabled', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'category.enabled', { $$delete: true });

    updateAtPath(
      product,
      // @ts-expect-error
      'category.nonexistent',
      10,
    );

    // @ts-expect-error
    updateAtPath(product, 'settings', { '0': { $$set: undefined } });
    // @ts-expect-error
    updateAtPath(product, 'settings', { '0': { $$unset: true } });
    // @ts-expect-error
    updateAtPath(product, 'settings', { '0': { $$delete: true } });

    updateAtPath(product, 'settings.0', 'on');
    // @ts-expect-error
    updateAtPath(product, 'settings.1', 'on');
    updateAtPath(product, 'settings.0', { $$set: 'on' });
    // @ts-expect-error
    updateAtPath(product, 'settings.0', undefined);
    // @ts-expect-error
    updateAtPath(product, 'settings.0', null);
    // @ts-expect-error
    updateAtPath(product, 'settings.0', 'abc');
    // @ts-expect-error
    updateAtPath(product, 'settings.0', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'settings.0', { $$delete: true });
    updateAtPath(
      product,
      // @ts-expect-error
      'settings.length',
      10,
    );
    updateAtPath(
      product,
      // @ts-expect-error
      'settings.nonexistent',
      10,
    );

    // @ts-expect-error
    updateAtPath(product, 'tags', { '0': { $$set: undefined } });
    // @ts-expect-error
    updateAtPath(product, 'tags', { '0': { $$unset: true } });
    // @ts-expect-error
    updateAtPath(product, 'tags', { '0': { $$delete: true } });

    updateAtPath(product, 'tags.0', { id: 10 });
    updateAtPath(product, 'tags.0', { $$set: { id: 10, name: 'abc' } });
    // @ts-expect-error
    updateAtPath(product, 'tags.0', undefined);
    // @ts-expect-error
    updateAtPath(product, 'tags.0', null);
    // @ts-expect-error
    updateAtPath(product, 'tags.0', 'abc');
    // @ts-expect-error
    updateAtPath(product, 'tags.0', { $$unset: true });
    // @ts-expect-error
    updateAtPath(product, 'tags.0', { $$delete: true });
    updateAtPath(
      product,
      // @ts-expect-error
      'tags.length',
      10,
    );
    updateAtPath(
      product,
      // @ts-expect-error
      'tags.nonexistent',
      10,
    );
  }
}

/**
 * updateWithInstruction
 */
{
  {
    type Product = {
      id: number;
      code: undefined | string;
      enabled?: boolean;
      category?: {
        id: number;
        code: undefined | string;
        enabled?: boolean;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: Tag[];
    };

    type Tag = {
      id: number;
      name: string;
    };

    const product = {} as Product;

    updateWithInstruction(product, { path: 'id', update: 10 });
    updateWithInstruction(product, { path: 'id', update: { $$set: 10 } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'id', update: undefined });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'id', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'id', update: 'abc' });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'id', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'id', update: { $$delete: true } });

    updateWithInstruction(product, { path: 'code', update: 'abc' });
    updateWithInstruction(product, { path: 'code', update: { $$set: 'abc' } });
    updateWithInstruction(product, { path: 'code', update: undefined });
    updateWithInstruction(product, { path: 'code', update: { $$set: undefined } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'code', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'code', update: 10 });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'code', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'code', update: { $$delete: true } });

    updateWithInstruction(product, { path: 'enabled', update: true });
    updateWithInstruction(product, { path: 'enabled', update: { $$set: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'enabled', update: undefined });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'enabled', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'enabled', update: 10 });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'enabled', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'enabled', update: { $$delete: true } });

    updateWithInstruction(
      product,
      {
        // @ts-expect-error
        path: 'nonexistent',
        update: 10,
      },
    );

    updateWithInstruction(product, { path: 'category.id', update: 10 });
    updateWithInstruction(product, { path: 'category.id', update: { $$set: 10 } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.id', update: undefined });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.id', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.id', update: 'abc' });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.id', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.id', update: { $$delete: true } });

    updateWithInstruction(product, { path: 'category.code', update: 'abc' });
    updateWithInstruction(product, { path: 'category.code', update: { $$set: 'abc' } });
    updateWithInstruction(product, { path: 'category.code', update: undefined });
    updateWithInstruction(product, { path: 'category.code', update: { $$set: undefined } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.code', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.code', update: 10 });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.code', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.code', update: { $$delete: true } });

    updateWithInstruction(product, { path: 'category.enabled', update: true });
    updateWithInstruction(product, { path: 'category.enabled', update: { $$set: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.enabled', update: undefined });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.enabled', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.enabled', update: 10 });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.enabled', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'category.enabled', update: { $$delete: true } });

    updateWithInstruction(
      product,
      {
        // @ts-expect-error
        path: 'category.nonexistent',
        update: 10,
      },
    );


    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings', update: { '0': { $$set: undefined } } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings', update: { '0': { $$unset: true } } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings', update: { '0': { $$delete: true } } });

    updateWithInstruction(product, { path: 'settings.0', update: 'on' });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings.1', update: 'on' });
    updateWithInstruction(product, { path: 'settings.0', update: { $$set: 'on' } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings.0', update: undefined });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings.0', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings.0', update: 'abc' });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings.0', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'settings.0', update: { $$delete: true } });
    updateAtPath(
      product,
      // @ts-expect-error
      'settings.length',
      10,
    );
    updateAtPath(
      product,
      // @ts-expect-error
      'settings.nonexistent',
      10,
    );

    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags', update: { '0': { $$set: undefined } } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags', update: { '0': { $$unset: true } } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags', update: { '0': { $$delete: true } } });

    updateWithInstruction(product, { path: 'tags.0', update: { id: 10 } });
    updateWithInstruction(product, { path: 'tags.0', update: { $$set: { id: 10, name: 'abc' } } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags.0', update: undefined });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags.0', update: null });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags.0', update: 'abc' });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags.0', update: { $$unset: true } });
    // @ts-expect-error
    updateWithInstruction(product, { path: 'tags.0', update: { $$delete: true } });
    updateWithInstruction(
      product,
      {
        // @ts-expect-error
        path: 'tags.length',
        update: 10,
      },
    );
    updateWithInstruction(
      product,
      {
        // @ts-expect-error
        path: 'tags.nonexistent',
        value: 10,
      },
    );
  }
}
