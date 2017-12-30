import * as mongoose from "mongoose";
import * as crypto  from "crypto";
import * as jwt from "jsonwebtoken";
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

export interface IUser extends mongoose.Document {
  email?: string;
  firstName?: string;
  lastName?: string;
  hash?: String;
  salt?: String;
};

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1); // Expired in 1 day

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: Math.floor(expiry.getTime() / 1000),
  }, config.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;