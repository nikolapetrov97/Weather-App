import mongoose, { Document, Schema } from "mongoose";

export interface Location {
  key?: string;
  country?: string;
  region?: string;
  city?: string;
}

export interface IUser {
  favorites: Location[];
  settings: { measurement: string };
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    favorites: { type: Array, required: true },
    settings: { type: Object, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IUserModel>("User", UserSchema);
