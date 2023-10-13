import { UpdatePayload } from '../src/update.types';
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
    expect.safety.not.extends<UpdatePayload<Product>, { id: undefined; code: string }>(PASSED);
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

    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: true; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: true; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: true; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: true; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$delete: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { code: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined; id: number }>(PASSED);
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

    expect.safety.extends<UpdatePayload<Product>, { code: { $$unset: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$unset: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$unset: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$unset: true; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$unset: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { code: { $$delete: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$delete: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: { $$delete: true; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { code: { $$delete: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { enabled: boolean }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined; id: number }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: boolean; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: boolean; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: boolean } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: boolean; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: boolean; nonexistent: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: undefined; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$set: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$unset: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$unset: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$unset: true; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$unset: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$delete: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$delete: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$delete: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { enabled: { $$delete: true; nonexistent: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$delete: undefined; nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { enabled: { $$delete: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { $$set: Product }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: undefined }>(PASSED);
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

    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: true }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: true; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: true; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: true; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: true; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: true; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$delete: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined }>(PASSED);
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

    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; id: number }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; code: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; enabled: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; nonexistent: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category'] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; id: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; code: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; enabled: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Required<Product>['category']; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$unset: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: true; id: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: true; code: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: true; enabled: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$unset: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$unset: true; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$delete: true; id: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$delete: true; code: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$delete: true; enabled: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: true; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: number; $$unset: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: number; $$unset: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: undefined; $$unset: true } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: number; $$delete: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: number; $$delete: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$set: undefined; $$delete: true } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: true; $$delete: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: true; $$delete: undefined } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { id: { $$unset: undefined; $$delete: true } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { [key: number]: Tag } }>(PASSED);
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

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: { [key: number]: Tag } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: { [key: number]: Partial<Tag> } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$merge: Tag } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$merge: Partial<Tag> } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Tag[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Partial<Tag>[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Tag[]; at: undefined | null | number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: Partial<Tag>[]; at: undefined | null | number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$merge: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$replace: { [key: number]: Tag } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$replace: { [key: number]: Partial<Tag> } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$replace: Tag } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$replace: Partial<Tag> } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$replace: Tag[] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$replace: Partial<Tag>[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$replace: Tag[]; at: undefined | null | number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$replace: undefined } }>(PASSED);
  }
}
