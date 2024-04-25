import { Request } from "express";
import { FieldData } from "@decorators/field-data";
import { FieldConfig, FieldConfigType } from "@decorators/utils/field-config/field-config";

export class FieldConfigBody implements FieldConfig {
  type: FieldConfigType = 'body';

  execute(req: Request, field: FieldData): any {
    return field?.name ? req.body[field.name] : req.body;
  }
}