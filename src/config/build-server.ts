import { AppError } from "@core/error/app-error";
import { AppRouter } from "@routes/app-router";
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";
import { ClassType } from "@core/models/class-type";

const PORT = 3000;

interface ServerOptions {
  controllers: ClassType[];
  port?: number;
  errorHandler?: (err: Error, request: Request, response: Response, _next: NextFunction) => express.Response;
  onStart?: () => void
}
export function buildServer(options: ServerOptions) {
  const {
    errorHandler = handleError,
    port = PORT,
    onStart = handleStartServer
  } = options;
  const app = express()

  const router = AppRouter.getInstance();
  app.use(bodyParser.json());
  app.use(router);
  app.use(errorHandler)
  app.listen(port, onStart);
}

function handleStartServer() {
  console.log(`\u{1F680} Listening on port ${PORT}`)
}

function handleError(err: Error, _request: Request, response: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

