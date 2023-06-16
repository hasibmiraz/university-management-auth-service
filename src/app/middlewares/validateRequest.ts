import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

export const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body, params, query, cookies } = req;
    try {
      await schema.parseAsync({
        body,
        params,
        query,
        cookies,
      });

      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
