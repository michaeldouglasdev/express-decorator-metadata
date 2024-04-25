import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserRequest {

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsEmail()
  email: string;
}