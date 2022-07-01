import { model, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser {
  // id?: Schema.Types.ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  family: Schema.Types.ObjectId;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  isAdmin: { type: Boolean, default: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  family: { type: Schema.Types.ObjectId, ref: "Family", default: null },
  createdAt: { type: Date, immutable: true, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    console.log("You reach post delete middleware in UserSchema");
    //implements remove of all expenses assigned to that user,
    //implements remove of Family that was created by that user
  }
});

export default model<IUser>("User", UserSchema);
