import * as mongoose from "mongoose";

import { IUser } from "../interfaces/user";  //inherit from User interface
import { userSchema } from "./schemas/user"; //defined user schema

const User = mongoose.model<IUser>('User', userSchema);

export default User;