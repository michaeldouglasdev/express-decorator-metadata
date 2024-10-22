
# UserController Example with Class-Validator

```typescript
@Controller('/users')
@Injectable({ name: "UserController" })
export class UserController {

  constructor (
    private getUserService: GetUserService,
    private createUserService: CreateUserService,
    private loginService: LoginService,
    private updatePasswordService: UpdatePasswordService,
  ) {}

  @Use([Logger])
  @Post()
  create(
    @Body(CreateUserRequest) user: CreateUserRequest,
  ) {
    this.createUserService.execute(user);

    return {
      user
    }
  }

  @Post('/login')
  login(
    @Body(LoginRequest) login: LoginRequest
  ): string {
    return this.loginService.execute(login);
  }

  @Use([UserAuthenticated])
  @Put('/update-password')
  updatePassword(
    @Body(UpdatePasswordRequest) updatePasswordRequest: UpdatePasswordRequest,
    @Context() context: RequestContext,
  ) {
    return this.updatePasswordService.execute(context.user.id, updatePasswordRequest)
  }

  @Use([Logger])
  @Get('/:id')
  async getById(
    @Param('id') id: string,
  ): Promise<User> {
   const user = await this.getUserService.execute({
      type: GetUserType.ID,
      value: id,
    });

    return user;
  }
}
```

## Class Validator Example for CreateUserRequest

```typescript
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
```
