import { INJECTABLE_PROPERTY_METADATA } from "@constants/constants";

export function Inject(token: string): PropertyDecorator | ParameterDecorator {
  return (
    target: object, propertyKey: string | symbol, index?: number
  ) => {
    const type = token || Reflect.getMetadata('design:type', target);
    const type2 = Reflect.getMetadata('design:type', target);
    let properties = Reflect.getMetadata(INJECTABLE_PROPERTY_METADATA, target) || [];
    properties = [...properties, { propertyKey, type, index}]

    Reflect.defineMetadata(INJECTABLE_PROPERTY_METADATA, properties, target)
    console.log('AI', Reflect.getMetadata(token, target))
  }
}