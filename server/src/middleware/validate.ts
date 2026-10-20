import type { Request, Response, NextFunction } from 'express';
import { ZodType, type AnyZodObject, type ZodTypeAny } from 'zod';

export type ValidationTarget = {
  body?: AnyZodObject | ZodTypeAny;
  query?: AnyZodObject | ZodTypeAny;
  params?: AnyZodObject | ZodTypeAny;
};

export function validate(schema: ValidationTarget | AnyZodObject | ZodTypeAny) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema instanceof ZodType) {
        req.body = await schema.parseAsync(req.body);
        return next();
      }

      const target = schema as ValidationTarget;
      if (target.body) {
        req.body = await target.body.parseAsync(req.body);
      }
      if (target.query) {
        req.query = await target.query.parseAsync(req.query);
      }
      if (target.params) {
        req.params = await target.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
