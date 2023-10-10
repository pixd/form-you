import { UpdatePayload } from '../src/update.types';
import { expect, PASSED } from './tools/noop';

/**
 * UpdatePayload
 */
{
  {
    type Product = {
      name: string;
      code: undefined | string;
      category?: {
        id: number;
        name?: string;
      };
      settings: ['on' | 'off', 'dark' | 'light'];
      tags: string[];
      sort?: number;
    };

    expect.safety.extends<UpdatePayload<Product>, Partial<Product>>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { name: string; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { name: string; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { name: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { name: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { code: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: string; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: string; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { code: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { sort: number }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { sort: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { sort: number; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { sort: number; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { sort: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { sort: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { $$set: Product }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$set: Product; name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: Product; name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: undefined; name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: undefined; name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: Product; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: Product; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$set: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$unset: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; name: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$unset: undefined; name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$unset: undefined; name: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { $$unset: true; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$unset: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$set: Product; name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product; name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined; name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined; name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: Product; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$set: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$unset: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; name: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; name: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$unset: true; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$unset: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$delete: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; name: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; name: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; name: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; name: undefined }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; nonexistent: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<undefined | Product>, { $$delete: true; nonexistent: undefined }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; nonexistent: string }>(PASSED);
    expect.safety.extends<UpdatePayload<undefined | Product>, { $$delete: undefined; nonexistent: undefined }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { nonexistent: string } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Exclude<Product['category'], undefined> } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$set: Exclude<Product['category'], undefined>; id: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Exclude<Product['category'], undefined>; id: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Exclude<Product['category'], undefined>; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$set: Exclude<Product['category'], undefined>; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$unset: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$unset: true; id: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$unset: true; id: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$unset: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$unset: true; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: true } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { $$delete: true; id: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: true; id: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: true; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { $$delete: true; nonexistent: undefined } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { name: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: string; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: string; nonexistent: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: undefined; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { nonexistent: undefined } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$set: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$set: undefined } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$set: string; nonexistent: string } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$set: string; nonexistent: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$set: undefined; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$set: undefined; nonexistent: undefined } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$unset: true } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$unset: undefined } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$unset: true; nonexistent: string } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$unset: true; nonexistent: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$unset: undefined; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$unset: undefined; nonexistent: undefined } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$delete: true } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$delete: undefined } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$delete: true; nonexistent: string } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$delete: true; nonexistent: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$delete: undefined; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$delete: undefined; nonexistent: undefined } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { id: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: number; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: number; nonexistent: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: undefined; nonexistent: string } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: undefined; nonexistent: undefined } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { nonexistent: undefined } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { category: { id: { $$set: number } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$set: undefined } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: { $$set: number; nonexistent: string } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { id: { $$set: number; nonexistent: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$set: undefined; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$set: undefined; nonexistent: undefined } } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$unset: true } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$unset: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$unset: true; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$unset: true; nonexistent: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$unset: undefined; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$unset: undefined; nonexistent: undefined } } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$delete: true } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$delete: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$delete: true; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$delete: true; nonexistent: undefined } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$delete: undefined; nonexistent: string } } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { category: { id: { $$delete: undefined; nonexistent: undefined } } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$set: string; $$unset: true } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$set: string; $$unset: undefined } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$set: undefined; $$unset: true } } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$set: string; $$delete: true } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$set: string; $$delete: undefined } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$set: undefined; $$delete: true } } }>(PASSED);

    expect.safety.not.extends<UpdatePayload<Product>, { category: { name: { $$unset: true; $$delete: true } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$unset: true; $$delete: undefined } } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { category: { name: { $$unset: undefined; $$delete: true } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$set: string[] } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$set: { [key: number]: string } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: string[] }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: string }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: number[] }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$append: string[] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$append: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$append: number[] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$prepend: string[] } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$prepend: number } }>(PASSED);
    expect.safety.not.extends<UpdatePayload<Product>, { tags: { $$prepend: number[] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$exclude: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$exclude: number[] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$excludeLeft: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$excludeLeft: number; skip: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$excludeLeft: number; skip: number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$excludeRight: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$excludeRight: number; skip: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$excludeRight: number; skip: number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extract: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extract: number[] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extractLeft: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extractLeft: number; skip: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extractLeft: number; skip: number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extractRight: number } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extractRight: number; skip: undefined } }>(PASSED);
    expect.safety.extends<UpdatePayload<Product>, { tags: { $$extractRight: number; skip: number } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$move: [number, number] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$swap: [number, number] } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$merge: { [key: number]: string } } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$apply: string } }>(PASSED);

    expect.safety.extends<UpdatePayload<Product>, { tags: { $$reset: string } }>(PASSED);
  }
}
