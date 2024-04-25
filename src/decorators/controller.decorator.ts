import { validateSync } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { MetadataKey } from "@constants/constants";
import { AppRouter } from "@routes/app-router";
import { METHOD_HTTP } from "@decorators/methods-http.decorator";
import { plainToInstance } from 'class-transformer';
import { FieldData } from "@decorators/field-data";
import { Injector } from "@core/injector/injector";
import { FieldConfigType, FieldConfigurator } from "@decorators/utils/field-config/field-config";
import { FieldConfigBody } from "@decorators/utils/field-config/field-config-body";
import { FieldConfigParams } from "@decorators/utils/field-config/field-config-params";
import { FieldConfigQuery } from "@decorators/utils/field-config/field-config-query";
import { FieldConfigContext } from "@decorators/utils/field-config/field-config-context";
import { MetadataMap } from "./metadata-map";
import { AppError } from "@core/error/app-error";

FieldConfigurator.add(new FieldConfigBody())
FieldConfigurator.add(new FieldConfigParams())
FieldConfigurator.add(new FieldConfigQuery())
FieldConfigurator.add(new FieldConfigContext())

export function methodHandler(target: any, methodName: string) {

  const metadatas = {
    body: Reflect.getMetadata(MetadataKey.BODY, target.prototype, methodName),
    query: Reflect.getMetadata(MetadataKey.QUERY, target.prototype, methodName),
    params: Reflect.getMetadata(MetadataKey.PARAM, target.prototype, methodName),
    context: Reflect.getMetadata(MetadataKey.CONTEXT, target.prototype, methodName)
  };

  const args: any[] = [];

  function extractData(req: Request, type: FieldConfigType, fields?: FieldData[]) {

    fields?.map(field => {
      const configExecutor = FieldConfigurator.get(type);
      const data = configExecutor?.execute(req, field);

      validate(field, data)

      args[field.index] = data;
    })
  }

  return async function (req: Request, res: Response, next: NextFunction) {
    Object.entries(metadatas).forEach(([type, fields]) => extractData(req, type as FieldConfigType, fields));

    const metadata = MetadataMap.getByTarget(target);
    if (!metadata) {
      throw new AppError(`Target is not injectable`);
    }
    const controller = Injector.get<any>(metadata.name);
    const method = controller[methodName].bind(controller);
    let result;
    try {
      result = await method(...args);
    } catch (e) {
      return next(e);
    }

    res.send(result);
  }
}

export function Controller(domain: string): ClassDecorator {
  return (target: Function) => {
    const router = AppRouter.getInstance();

    Object.getOwnPropertyNames(target.prototype).forEach(methodName => {
      if (methodName != 'constructor') {
        const methodHttp: keyof typeof METHOD_HTTP = Reflect.getMetadata(MetadataKey.METHOD, target.prototype, methodName);
        const path = Reflect.getMetadata(MetadataKey.PATH, target.prototype, methodName) || [];
        const middlewares = Reflect.getMetadata(MetadataKey.MIDDLEWARE, target.prototype, methodName) || [];

        if (path) {
          router[methodHttp](
            `${domain}${path}`,
            ... middlewares,
            methodHandler(target, methodName),
          );
        }
      }
    })
  }
}

function validate(field: FieldData, data: any) {
  if (field?.classType) {
    //const instance = plainToClass(field?.classType, data)
    const instance = plainToInstance(field?.classType, data)
    const errors = validateSync(instance, { stopAtFirstError: true});

    if (errors.length) {
      const constraints = errors[0].constraints;
      if (constraints) {
        const key = Object.keys(constraints);
        const firstError = constraints[key[0]];

        throw new Error(firstError);
      }
    }
  }
}