import "reflect-metadata"

import { MetadataKey } from "@constants/constants";

export enum METHOD_HTTP {
  get,
  post,
  put,
  patch,
  delete,
  options
}

export function createRouteDecorator(methodHttp: keyof typeof METHOD_HTTP) {
  return function (path: string = '/'): MethodDecorator {
    return (target: object, methodName: string | symbol, descriptor: PropertyDescriptor) => {
      Reflect.defineMetadata(MetadataKey.METHOD, methodHttp, target, methodName);
      Reflect.defineMetadata(MetadataKey.PATH, path, target, methodName)
    }
  }
}

export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Patch = createRouteDecorator('patch');
export const Put = createRouteDecorator('put');


