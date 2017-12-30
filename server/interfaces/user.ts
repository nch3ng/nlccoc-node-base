import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email?: string;
  firstName?: string;
  lastName?: string;
  hash?: String;
  salt?: String;
};