export default {
  IS_NOT_OPTIONAL_MESSAGE: '${path} must be defined',
  IS_NOT_NULLABLE_MESSAGE: '${path} must be non-nullable',
  MUST_BE_UNDEFINED_MESSAGE: '${path} must be undefined',
  MUST_BE_NULL_MESSAGE: '${path} must be null',
  MUST_BE_AN_OBJECT_MESSAGE: '${path} must be an object',
};

export function prepareErrorMessage(message: string, path?: string) {
  const nextPath = path ? ('`' + path + '`') : 'Value';
  return message.replaceAll('${path}', nextPath);
}
