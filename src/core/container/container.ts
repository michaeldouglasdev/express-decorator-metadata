import { INJECTABLE_METADATA } from "@constants/constants";
import { ClassType } from "@core/models/class-type";

export class Container {

  static get<T>(target: any): T {
    const injectable = Reflect.getMetadata(INJECTABLE_METADATA, target);

    if (!injectable) {
      throw new Error('Target is not injetable');
    }

    const dependencies = Reflect.getMetadata('design:paramtypes', target) || [];
    const instances = dependencies.map((dep: any) => Container.get(dep));

    return new target(...instances);
  }

  static set(key: string | ClassType, value: any): void {
    //Reflect.defineMetadata(INJECTABLE_METADATA, true, value)
  }
}