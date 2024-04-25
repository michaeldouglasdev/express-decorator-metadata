import { MinLength } from "class-validator";

export class UpdatePasswordRequest {

  @MinLength(4)
  password: string;

  @MinLength(4)
  newPassword: string;
}