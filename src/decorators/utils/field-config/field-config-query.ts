import { Request } from "express";
import { FieldData } from "@decorators/field-data";
import { FieldConfig, FieldConfigType } from "@decorators/utils/field-config/field-config";

export class FieldConfigQuery implements FieldConfig {
  type: FieldConfigType = 'query';

  execute(req: Request, field: FieldData): any {
    return field?.name ? req.query[field.name] : req.query;
  }
}