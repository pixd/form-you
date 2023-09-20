import errorMessages, { prepareErrorMessage } from '../../src/error-messages';

export const isNotOptionalMessage = prepareErrorMessage(errorMessages.IS_NOT_OPTIONAL_MESSAGE);
export const isNotNullableMessage = prepareErrorMessage(errorMessages.IS_NOT_NULLABLE_MESSAGE);
// export const mustBeUndefinedMessage = prepareErrorMessage(errorMessages.MUST_BE_UNDEFINED_MESSAGE);
// export const mustBeNullMessage = prepareErrorMessage(errorMessages.MUST_BE_NULL_MESSAGE);
export const mustBeAnObjectMessage = prepareErrorMessage(errorMessages.MUST_BE_AN_OBJECT_MESSAGE);
export const mustBeAnStringMessage = prepareErrorMessage(errorMessages.MUST_BE_A_STRING_MESSAGE);
