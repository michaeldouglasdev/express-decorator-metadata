import { Request } from "express";
import { FieldData } from "@decorators/field-data";

export type FieldConfigType = 'body' | 'query' | 'params' | 'context'

export interface FieldConfig {
  type: FieldConfigType;
  execute(req: Request, field: FieldData): any;
}

export class FieldConfigurator {
  private static fieldConfigs = new Map<FieldConfigType, FieldConfig>();

  static add(fieldConfig: FieldConfig) {
    FieldConfigurator.fieldConfigs.set(fieldConfig.type, fieldConfig);
  }

  static get(type: FieldConfigType) {
    return FieldConfigurator.fieldConfigs.get(type);
  }
}