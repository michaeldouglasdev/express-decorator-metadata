import { faker } from "@faker-js/faker";
import { Injectable } from "@decorators/injectable.decorator";
import { CreateUserRequest } from "@users/models/create-user-request.model";
import { User } from "@users/models/user.model";
import { UserRepository } from "@users/repository/user.repository";

@Injectable({ name: "CreateUserService" })
export class CreateUserService {

  constructor (
    private userRepository: UserRepository
  ) {}

  execute(createUser: CreateUserRequest): User {
    const { email, name, password, username} = createUser;

    const user: User = {
      id: String(faker.number.int()),
      name,
      email,
      username,
      password
    }

    const createdUser = {...this.userRepository.create(user)};

    delete createdUser.password;
    return createdUser
  }
}