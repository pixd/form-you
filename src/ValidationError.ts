export enum PredefinedValidationTestName {
  $ANY_REJECT_UNDEFINED = '$ANY_REJECT_UNDEFINED',
  $ANY_REJECT_NULL = '$ANY_REJECT_NULL',
  $ANY_UNDEFINED = '$ANY_UNDEFINED',
  $ANY_NOT_UNDEFINED = '$ANY_NOT_UNDEFINED',
  $ANY_NULL = '$ANY_NULL',
  $ANY_NOT_NULL = '$ANY_NOT_NULL',
  $OBJECT_MUST_BE_AN_OBJECT = '$OBJECT_MUST_BE_AN_OBJECT',
  $STRING_MUST_BE_A_STRING = '$STRING_MUST_BE_A_STRING',
}

export class ValidationError extends Error {
  testName: string;

  value: any;

  constructor(message: string, testName: string, value: any) {
    super(message);
    this.testName = testName;
    this.value = value;
  }
}
