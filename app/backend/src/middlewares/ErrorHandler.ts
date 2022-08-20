import { NextFunction, Request, Response } from 'express';

const errors: { [errorName: string]:number } = {
  validationError: 400,
  notFoundError: 404,
};

const errorhandlerMiddleware = (
  err: Error,
  _req:Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[err.name];
  // if (!status) return res.sendStatus(500);
  console.log(err);

  res.status(status || 500).json({ message: err.message });
};

export default errorhandlerMiddleware;