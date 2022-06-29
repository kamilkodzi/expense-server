import { model, Schema } from "mongoose";

export interface IFamily {
  familyName: string;
  headOfFamily: any;
  members: [];
}

const FamilySchema: Schema = new Schema<IFamily>({
  familyName: { type: String, required: true },
  headOfFamily: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model<IFamily>("Family", FamilySchema);
