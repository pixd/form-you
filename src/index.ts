import { prepareErrorMessage } from './error-messages';
import BaseSchema  from './Schema/BaseSchema';
import ObjectSchema from './Schema/ObjectSchema';
import StringSchema from './Schema/StringSchema';
import { update } from './update/update';
import { updateAtPath } from './update/updateAtPath';
import { updateWithInstruction } from './update/updateWithInstruction';
import ValidationError from './ValidationError';

import type { SchemaCloneProps } from './Schema/BaseSchema';
import type { Shape, ShapeData } from './Schema/ObjectSchema';
import type { AnySchema, SchemaDataType } from './types';

export {
  prepareErrorMessage,
  update,
  updateAtPath,
  updateWithInstruction,
  ValidationError,
};

// Schemas
export {
  BaseSchema,
  ObjectSchema,
  StringSchema,
};

export type {
  AnySchema,
  SchemaCloneProps,
  SchemaDataType,
  Shape,
  ShapeData,
};
