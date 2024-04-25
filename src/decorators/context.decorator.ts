import { MetadataKey } from "@constants/constants"
import { FieldData } from "@decorators/field-data"

export function Context(): ParameterDecorator {
  return (target: Object, propertyName: string | symbol, index: number) => {
    const existingContext: FieldData[] = Reflect.getMetadata(MetadataKey.CONTEXT, target, propertyName) || [];

    const context: FieldData = {
      index,
      name: String(propertyName),
    }

    existingContext.push(context);

    Reflect.defineMetadata(MetadataKey.CONTEXT, existingContext, target, propertyName);
  }
}