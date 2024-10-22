import { Get, Post, Put } from "@decorators/methods-http.decorator";

import { Controller } from "@decorators/controller.decorator";

import { Body } from "@decorators/body.decorator";
import { Logger } from "@core/middlewares/rest/logger.middleware";
import { Use } from "@decorators/use.decorator";

import { CreateUserRequest } from "@users/models/create-user-request.model";
import { Query } from "@decorators/query.decorator";
import { User } from "@users/models/user.model";
import { GetUserService } from "@users/service/get-user.service";
import { GetUserType } from "@users/service/get-user-strategy.service";
import { CreateUserService } from "@users/service/create-user.service";

import { Injectable } from "@decorators/injectable.decorator";

import { LoginRequest } from "@users/models/login.model";
import { LoginService } from "@users/service/login.service";
import { UserAuthenticated } from "@core/middlewares/rest/user-authenticated";
import { UpdatePasswordRequest } from "@users/models/update-password-request.model";
import { UpdatePasswordService } from "@users/service/update-password.service";
import { Context } from "@decorators/context.decorator";
import { RequestContext } from "@core/models/context";
import { Param } from "@decorators/param.decorator";

@Controller("/users")
@Injectable({ name: "UserController" })
export class UserController {
  constructor(
    private getUserService: GetUserService,
    private createUserService: CreateUserService,
    private loginService: LoginService,
    private updatePasswordService: UpdatePasswordService
  ) {}

  @Use([Logger])
  @Post()
  create(@Body(CreateUserRequest) user: CreateUserRequest) {
    this.createUserService.execute(user);

    return {
      user,
    };
  }

  @Post("/login")
  login(@Body(LoginRequest) login: LoginRequest): string {
    return this.loginService.execute(login);
  }

  @Use([UserAuthenticated])
  @Put("/update-password")
  updatePassword(
    @Body(UpdatePasswordRequest) updatePasswordRequest: UpdatePasswordRequest,
    @Context() context: RequestContext
  ) {
    return this.updatePasswordService.execute(
      context.user.id,
      updatePasswordRequest
    );
  }

  @Use([Logger])
  @Get("/:id")
  async getById(@Param("id") id: string): Promise<User> {
    const user = await this.getUserService.execute({
      type: GetUserType.ID,
      value: id,
    });

    return user;
  }
}
