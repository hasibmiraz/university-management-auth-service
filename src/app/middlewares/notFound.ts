import { NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
};

export default notFound;
