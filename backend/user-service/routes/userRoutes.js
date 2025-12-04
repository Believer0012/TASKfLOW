import express from "express";
import * as userController from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/token", userController.refreshToken);
userRouter.post("/logout", userController.logout);

export default userRouter;
