import "reflect-metadata"
import dotenv from "dotenv";
dotenv.config();

import { buildServer } from "@config/build-server";
import { UserController } from "./modules/users/controller/user.controller";
import "@users/service/test-inception.app.service";
import "@users/service/test-inception.site.service";

function boostrap() {
  buildServer({
    controllers: [UserController]
  })
}

boostrap()















  /*const user = new User();

  user.name = 'Michael';
  user.foo({ test: "MD"}, 'hunter');*/

  /*const userService = Container.get<UserService>(UserService);
  console.log('userService', userService);
  console.log('user repo', userService.getRepo()?.name)*/

  /*const userController = TypeDIContainer.get(UserController);
  console.log('userController', userController);

  const propertyNames = Object.getOwnPropertyNames(userController);
  console.log('property names', propertyNames);

  const proto = Object.getPrototypeOf(userController);
  console.log('proto', proto);

  const proto2 = userController.prototype;
  console.log('x', proto2);

  console.log('userCOntrolelr2', userController.xversion)*/
