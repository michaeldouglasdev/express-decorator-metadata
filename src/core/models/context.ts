import { User } from "@users/models/user.model";

/*export interface RequestContext {
  context: Context;
}*/

export interface RequestContext {
  user: Omit<User, 'password'>
}