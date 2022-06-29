import { model, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: Boolean;
}

const UserSchema: Schema = new Schema({
  isAdmin: { type: Boolean, default: false },
  firstName: String,
  lastName: String,
  family: { type: Schema.Types.ObjectId, ref: "Family" },
});

UserSchema.plugin(passportLocalMongoose);

export default model<IUser>("User", UserSchema);
