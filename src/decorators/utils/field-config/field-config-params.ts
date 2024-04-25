import { Request } from "express";
import { FieldData } from "@decorators/field-data";
import { FieldConfig, FieldConfigType } from "@decorators/utils/field-config/field-config";

export class FieldConfigParams implements FieldConfig {
  type: FieldConfigType = 'params';

  execute(req: Request, field: FieldData): any {
    return field?.name ? req.params[field.name] : req.params;
  }
}