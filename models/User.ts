import { model, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  isAdmin: { type: Boolean, default: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  family: { type: Schema.Types.ObjectId, ref: "Family" },
  createdAt: { type: Date, immutable: true, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose);

export default model<IUser>("User", UserSchema);
