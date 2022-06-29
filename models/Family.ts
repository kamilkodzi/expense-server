import { model, Schema } from "mongoose";

export interface IFamily {
  familyName: string;
  headOfFamily: Schema.Types.ObjectId;
  members?: [Schema.Types.ObjectId];
  budget?: number;
}

const FamilySchema: Schema = new Schema<IFamily>({
  familyName: { type: String, required: true },
  headOfFamily: { type: Schema.Types.ObjectId, ref: "User" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  budget: { type: Number, default: 0 },
});

export default model<IFamily>("Family", FamilySchema);
