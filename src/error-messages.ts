export default {
  IS_NOT_OPTIONAL_MESSAGE: '${path} must be defined',
  IS_NOT_NULLABLE_MESSAGE: '${path} must be non-nullable',
  MUST_BE_UNDEFINED_MESSAGE: '${path} must be undefined',
  MUST_BE_NULL_MESSAGE: '${path} must be null',
  MUST_BE_AN_OBJECT_MESSAGE: '${path} must be an object',
  MUST_BE_A_STRING_MESSAGE: '${path} must be a string',
};

export function prepareErrorMessage(message: string, path?: string) {
  const nextPath = path ? ('`' + path + '`') : 'Value';
  return message.replaceAll('${path}', nextPath);
}

export function stringify(data: any) {
  if (data == null || typeof data === 'boolean' || typeof data === 'number') {
    return String(data);
  }
  else {
    return '`' + String(data) + '`';
  }
}

export type GetUpdateErrorDesc = {
  problemPath: null | string;
  data: any;
  path?: string;
  update?: any;
};

export class GetUpdateError extends Error {
  desc: GetUpdateErrorDesc;

  constructor(message: string, desc: GetUpdateErrorDesc) {
    super(message);

    this.desc = desc;
  }
}
