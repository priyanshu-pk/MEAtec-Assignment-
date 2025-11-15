import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error | ZodError,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      data: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    if ((err as any).code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Duplicate entry. This record already exists.',
      });
    }
  }

  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

