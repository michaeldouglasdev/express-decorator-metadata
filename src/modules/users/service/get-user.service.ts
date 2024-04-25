import { Injectable } from "@decorators/injectable.decorator";
import { Injector } from "@core/injector/injector";
import { User } from "@users/models/user.model";
import { GetUserInput, GetUserStrategyService, IGetUserStrategy } from "@users/service/get-user-strategy.service";

@Injectable({ name: "GetUserService" })
export class GetUserService {

  async execute(userInput: GetUserInput): Promise<User> {
    /*const { type, value } = userInput;
    const getUserService = Injector.get<IGetUserStrategy>(GetUserStrategyService[type]);
    const user =  await getUserService.execute(value);

    return user;*/

    return {
      id: "",
      name: "",
      username: "",
      email: ""
    }

  }
}