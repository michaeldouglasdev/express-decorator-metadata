import { INJECTABLE_PROPERTY_METADATA } from "@constants/constants";
import { MetadataMap } from "@decorators/metadata-map";

export interface Constructable<T> {
  new (...args: any[]): T;
}

export class Injector {
  private static container = new Map<string, any>();

  static get<T>(key: string) : T {
    const metadata = MetadataMap.get(key);
    if (!metadata) {
      throw new Error(`Target is not injectable. Use @Injectable decorator on class`);
    }

    const { target } = metadata;

    const inject: any[] = Reflect.getMetadata(INJECTABLE_PROPERTY_METADATA, target) || [];
    const dependencies: [] = Reflect.getMetadata('design:paramtypes', target) || [];
    const instances = dependencies.map((dep, index) => {

      const injectProperty = inject.find(item => item.index === index);
      if (injectProperty) {
        return Injector.get(injectProperty.type)
      }
      const metadata = MetadataMap.getByTarget(dep)
      return Injector.get(metadata.name);
    })

    let instance = Injector.container.get(target.name)
    if (!instance) {
      instance = new target(...instances);
      Injector.container.set(target.name, instance)
    }

    return instance;
  }
}
