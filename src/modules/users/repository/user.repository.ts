import { AppError } from "@core/error/app-error";
import { Injectable } from "@decorators/injectable.decorator";
import { LoginRequest } from "@users/models/login.model";
import { UpdatePasswordRequest } from "@users/models/update-password-request.model";
import { User } from "@users/models/user.model";

export const users: User[] = []

@Injectable({ name: "UserRepository" })
export class UserRepository {

  create(user: User): User {
    users.push(user);
    return user;
  }
  getById(id: string): User {
    return users.find(user => user.id === id)!;
  }
  login(login: LoginRequest): User | undefined {
    const { username, password } = login;
    const user = users.find(user => user.username === username && user?.password === password);

    return user;
  }

  updatePassword(id: string, updatePasswordRequest: UpdatePasswordRequest): boolean {
    const { password, newPassword} = updatePasswordRequest;
    const user = users.find(user => user.id);
    if (!user) {
      throw new AppError("User not found")
    }

    if (user.password === password) {
      user.password = newPassword
    }

    return true;
  }
}