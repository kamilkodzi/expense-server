import { model, Schema } from "mongoose";

export interface IUser {
  id?: Schema.Types.ObjectId;
  username: string;
  password: string;
  isAdmin: boolean;
  family: Schema.Types.ObjectId;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, unique: true },
  isAdmin: { type: Boolean, default: false },
  family: { type: Schema.Types.ObjectId, ref: "Family", default: null },
  createdAt: { type: Date, immutable: true, default: Date.now },
});

export default model<IUser>("User", UserSchema);
