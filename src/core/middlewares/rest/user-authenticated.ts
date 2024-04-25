import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthToken } from "@core/models/auth-token.model";
import { AppError } from "@core/error/app-error";

export function UserAuthenticated(req: Request, _res: Response, next: NextFunction) {
  const token = req.get('authorization');
  if (!token) {
    throw new AppError('User must be logged')
  }

  const decodedToken = jwt.decode(token) as AuthToken;
  req.context = req.context ?? {}
  req.context.user = decodedToken.user;
  next();
}