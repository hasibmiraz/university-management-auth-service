import { ZodError, ZodIssue } from 'zod';
import { GenericErrorResponse } from '../interfaces/common';
import { GenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error.',
    errorMessages: errors,
  };
};
export default handleZodError;
