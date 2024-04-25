import { IsString, MinLength } from "class-validator";

export class LoginRequest {

  @IsString()
  @MinLength(6)
  username: string;

  @MinLength(4)
  password: string;
}