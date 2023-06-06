import { GenericErrorMessage } from './error';

export type GenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
};
