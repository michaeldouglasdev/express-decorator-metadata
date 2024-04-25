import { Injectable } from "@decorators/injectable.decorator";
import { UpdatePasswordRequest } from "@users/models/update-password-request.model";
import { UserRepository } from "@users/repository/user.repository";

@Injectable({ name: "UpdatePasswordService" })
export class UpdatePasswordService {

  constructor(
    private userRepository: UserRepository,
  ){}

  execute(id: string, updatePasswordRequest: UpdatePasswordRequest): boolean {
    return this.userRepository.updatePassword(id, updatePasswordRequest);
  }
}