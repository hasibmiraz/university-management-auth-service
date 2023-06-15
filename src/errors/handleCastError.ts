import { CastError } from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: CastError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
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
