import { Document, Model, model} from "mongoose";

import userSchema = require("./schemas/user");
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);