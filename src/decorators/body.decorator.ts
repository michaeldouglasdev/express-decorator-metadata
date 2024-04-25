import "reflect-metadata"

import { MetadataKey } from "@constants/constants"
import { ClassType } from "@core/models/class-type";
import { FieldData } from "@decorators/field-data";

export function Body(classType?: ClassType): ParameterDecorator;
export function Body(key?: string): ParameterDecorator;
export function Body(key: string, classType: ClassType): ParameterDecorator;
export function Body(...key: any[]): ParameterDecorator {
  return (target: object, methodName: string | symbol, index: number) => {
    const name = key.find(k => typeof k === 'string');
    const classType = key.find(k => k instanceof Object);

    const existingBody = Reflect.getMetadata(MetadataKey.BODY, target, methodName) || [];

    const bodyData: FieldData = {
      index,
      name,
      classType
    }
    existingBody.push(bodyData);

    Reflect.defineMetadata(MetadataKey.BODY, existingBody, target, methodName);
  }
}