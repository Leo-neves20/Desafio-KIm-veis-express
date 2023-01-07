import { Router } from "express";
import verifyIsAdmMiddleware from "../middleware/verifyIsAdm.middleware";
import verifyTokenMiddleware from "../middleware/verifyToken.middleware";
import verifyUserIdMiddleware from "../middleware/user/verifyUserId.middleware";
import { createUserSchema, userUpdateSchema } from "../schema/users.schema";
import validatedBody from "../middleware/validatedBody.schema";
import verifyKeysPatchMiddleware from "../middleware/user/verifyKeysPatch.middleware";
import verifyIsActiveMiddleware from "../middleware/user/verifyIsActive.middleware";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controller/user.controller";

const usersRouter = Router();

usersRouter.post("", 
    validatedBody(createUserSchema), 
    createUserController
);

usersRouter.get(
  "",
  verifyTokenMiddleware,
  verifyIsAdmMiddleware,
  listUsersController
);

usersRouter.patch(
  "/:id",
  verifyKeysPatchMiddleware,
  verifyTokenMiddleware,
  verifyIsAdmMiddleware,
  verifyIsActiveMiddleware,
  validatedBody(userUpdateSchema),
  updateUserController
);

usersRouter.delete(
  "/:id",
  verifyTokenMiddleware,
  verifyUserIdMiddleware,
  verifyIsAdmMiddleware,
  deleteUserController
);

export default usersRouter;
