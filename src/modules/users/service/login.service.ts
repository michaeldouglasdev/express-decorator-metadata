import jwt from 'jsonwebtoken';
import { AppError } from '@core/error/app-error';
import { Injectable } from '@decorators/injectable.decorator';
import { LoginRequest } from '@users/models/login.model';
import { UserRepository } from '@users/repository/user.repository';

@Injectable({ name: "LoginService" })
export class LoginService {
  constructor(
    private userRepository: UserRepository,
  ) {

  }
  execute(login: LoginRequest): string {
    const user = this.userRepository.login(login)
    if (!user) {
      throw new AppError('Username and password does not match');
    }

    const token = jwt.sign({
      user
    }, 'secret-md')

    return token;
  }
}