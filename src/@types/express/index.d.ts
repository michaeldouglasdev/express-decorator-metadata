import { RequestContext } from "@core/models/context";

declare global {
  namespace Express {
    export interface Request {
      context: RequestContext;
    }
  }
}