import "reflect-metadata"

import { MetadataKey } from "@constants/constants"
import { FieldData } from "@decorators/field-data";

export function Param(key: string): ParameterDecorator {
  return (target: Object, propertyName: string | symbol, index: number) => {
    const existingPath = Reflect.getMetadata(MetadataKey.PARAM, target, propertyName) || [];

    const path: FieldData = {
      index,
      name: key,
    }

    existingPath.push(path)

    Reflect.defineMetadata(MetadataKey.PARAM, existingPath, target, propertyName);
  }
}