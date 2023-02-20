import { Router } from "express";
import { loginUser } from "../../controllers/userControllers/userControllers.js";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.post("/login", loginUser);

export default usersRouter;
