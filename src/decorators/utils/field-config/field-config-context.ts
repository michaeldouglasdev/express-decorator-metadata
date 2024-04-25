import { Request } from "express";
import { FieldData } from "@decorators/field-data";
import { FieldConfig, FieldConfigType } from "@decorators/utils/field-config/field-config";

export class FieldConfigContext implements FieldConfig {
  type: FieldConfigType = 'context';

  execute(req: Request, _field: FieldData): any {
    return req.context
  }
}