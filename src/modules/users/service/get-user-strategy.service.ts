import { User } from "@users/models/user.model";
import { GetUserByIdService } from "@users/service/get-user-by-id.service"

export const enum GetUserType {
  ID = 'ID'
}

export interface GetUserInput {
  type: GetUserType;
  value: string;
}
export interface IGetUserStrategy {
  execute: (value: string) => Promise<User>
}

export type GetUserStrategyType = {
  [k in GetUserType]: ThisType<IGetUserStrategy>;
}

export const GetUserStrategyService: GetUserStrategyType = {
  [GetUserType.ID]: GetUserByIdService,
}