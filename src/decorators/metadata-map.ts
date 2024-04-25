import { Constructable } from "@core/injector/injector";

export interface Metadata {
  name: string;
  target: any;
}

export class MetadataMap {
  private static container = new Map<string, Metadata>();
  private static containerClass = new Map<Constructable<any>, Metadata>()

  static set(key: string, metadata: Metadata) {
    this.container.set(key, metadata);
    this.containerClass.set(metadata.target, metadata);
  }

  static get(key: string): Metadata {
    return this.container.get(key)!;
  }

  static setClass(key: Constructable<any>, metadata: Metadata) {
    this.containerClass.set(key, metadata);
  }

  static getByTarget(key: Constructable<any>): Metadata {
    return this.containerClass.get(key)!;
  }
}