import "reflect-metadata"

import { RequestHandler } from "express"
import { MetadataKey } from "@constants/constants"

export function Use(middlewares: RequestHandler[]): MethodDecorator {
  return (target: object, methodName: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(MetadataKey.MIDDLEWARE, middlewares, target, methodName)
  }
}