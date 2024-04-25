import { INJECTABLE_METADATA } from "@constants/constants";
import { Injector } from "@core/injector/injector";
import { Metadata, MetadataMap } from "./metadata-map";

export interface InjectableOptions {
  name: string;
}
export function Injectable(options: InjectableOptions): ClassDecorator {
  return (target: any) => {

    Reflect.defineMetadata(INJECTABLE_METADATA, options, target);
    const metadata: Metadata = {
      name: options.name,
      target: target,
    }
    MetadataMap.set(options.name, metadata);
    //Injector.setMetadata(options.name || target?.name, target);
  }
}