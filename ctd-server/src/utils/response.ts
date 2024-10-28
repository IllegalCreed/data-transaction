import { ApiResponse } from 'src/types/interfaces/api-response.interface';
import { ErrorCodeMessages, ErrorCode } from 'src/constants/error-codes';

export function createErrorResponse<T = any>(
  errorCode: ErrorCode,
  data?: T,
): ApiResponse<T> {
  return {
    code: errorCode,
    msg: ErrorCodeMessages[errorCode],
    data,
  };
}

export function createSuccessResponse<T = any>(
  data: T,
  msg?: string,
): ApiResponse<T> {
  return {
    code: 0,
    msg,
    data,
  };
}
