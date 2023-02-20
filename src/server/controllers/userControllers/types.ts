import type { JwtPayload } from "jsonwebtoken";
import type { User } from "../../../database/models/userModel/types";

export interface CustomTokenPayload
  extends JwtPayload,
    Pick<User, "username" | "email"> {
  id: string;
}

export type LoginBody = Pick<User, "username" | "password">;
