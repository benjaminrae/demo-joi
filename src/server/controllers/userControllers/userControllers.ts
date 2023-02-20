import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../database/models/userModel/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import type { CustomTokenPayload, LoginBody } from "./types";
import { environment } from "../../../loadEnvironments.js";

export const loginUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const invalidCredentialsMessage = "Invalid username or password";
  const unauthorizedCode = 401;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new CustomError(
        "User not found",
        unauthorizedCode,
        invalidCredentialsMessage
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new CustomError(
        "Invalid password",
        unauthorizedCode,
        invalidCredentialsMessage
      );
    }

    const tokenPayload: CustomTokenPayload = {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
    };
    const token = jwt.sign(tokenPayload, environment.jwtSecret);

    res.set("Authorization", `Bearer ${token}`);

    res.status(200).json({ message: "Bearer authorization has been set" });
  } catch (error: unknown) {
    next(error);
  }
};
