import { NextFunction, Request, Response } from 'express';

const errors: { [errorName: string]:number } = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ValidationError: 400,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  JsonWebTokenError: 401,
  notFoundError: 404,
  unauthorized: 401,
};

const errorhandlerMiddleware = (
  err: Error,
  _req:Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[err.name];
  console.log(status);
  console.log(err.name);
  // if (!status) return res.sendStatus(500);
  // console.log(err.name);
  // console.log(err.message);
  // console.log(err);
  res.status(status || 500).json({ message: err.message });
};

export default errorhandlerMiddleware;
