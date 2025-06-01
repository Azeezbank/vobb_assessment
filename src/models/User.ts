// User Schema page with User model

import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default model<IUser>("User", userSchema);
