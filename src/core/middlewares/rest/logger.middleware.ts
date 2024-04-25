import { NextFunction, Request, Response } from "express";

export function Logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Logging `);
  next();
}