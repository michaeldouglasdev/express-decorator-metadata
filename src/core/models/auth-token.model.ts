import { User } from "@users/models/user.model";

export interface AuthToken {
  user: User;
}