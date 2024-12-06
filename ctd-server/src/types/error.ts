import { ErrorCode } from 'src/common/constants/error-codes';

export class ExpectedError extends Error {
  public errorCode: ErrorCode;
  constructor(errorCode: ErrorCode, message?: string) {
    super(message || errorCode.toString());
    this.name = 'ExpectedError';
    this.errorCode = errorCode;
  }
}
