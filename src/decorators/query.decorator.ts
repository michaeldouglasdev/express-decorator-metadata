import "reflect-metadata"
import { MetadataKey } from "@constants/constants";
import { FieldData } from "@decorators/field-data";


export function Query(key: string): ParameterDecorator {
  return (target: object, propertyName: string | symbol, index: number) => {
    const existingQuery = Reflect.getMetadata(MetadataKey.QUERY, target, propertyName) || [];

    const query: FieldData = {
      index,
      name: key
    }

    existingQuery.push(query);

    Reflect.defineMetadata(MetadataKey.QUERY, existingQuery, target, propertyName);
  }
}