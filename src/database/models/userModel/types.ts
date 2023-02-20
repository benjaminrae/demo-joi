import type { InferSchemaType } from "mongoose";
import type { userSchema } from "./User";

export type User = InferSchemaType<typeof userSchema>;
