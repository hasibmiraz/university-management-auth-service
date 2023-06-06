import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import config from '../../config';
import handleValidationError from '../../errors/handleValidationError';
import { GenericErrorMessage } from '../../interfaces/error';

const globalErrorHandler = (
  err: Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong.';
  let errorMessages: GenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
