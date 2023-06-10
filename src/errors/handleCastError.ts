import { CastError } from 'mongoose';
import { GenericErrorResponse } from '../interfaces/common';
import { GenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: CastError): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid id.',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error.',
    errorMessages: errors,
  };
};

export default handleCastError;
