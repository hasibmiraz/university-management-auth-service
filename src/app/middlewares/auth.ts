import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiErrors';
import { JwtHelpers } from '../../helper/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.');
      }

      // verifytoken
      const verifiedUser = JwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      req.user = verifiedUser;
      if (!requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access.');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
