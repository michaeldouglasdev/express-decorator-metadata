import { ClassType } from "@core/models/class-type";

export interface FieldData {
  index: number;
  name?: string;
  value?: any;
  classType?: ClassType;
}