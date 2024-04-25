import { AppError } from "@core/error/app-error";
import { Injectable } from "@decorators/injectable.decorator";
import { User } from "@users/models/user.model";
import { UserRepository } from "@users/repository/user.repository";
import { IGetUserStrategy  } from '@users/service/get-user-strategy.service';

@Injectable({ name: "GetUserByIdService" })
export class GetUserByIdService implements IGetUserStrategy {

  constructor (private userRepository: UserRepository) {}

  async execute(value: string): Promise<User> {
    const user = this.userRepository.getById(value);

    if (!user) {
      throw new AppError(`User with ID ${value} not found`, 404)
    }
    return user;
  }

}