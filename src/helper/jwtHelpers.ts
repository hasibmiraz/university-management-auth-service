import jwt, { Secret } from 'jsonwebtoken';
export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string =>
  jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });

export const JwtHelpers = {
  createToken,
};
