import { model, Schema } from "mongoose";

export interface IFamily {
  familyName: string;
  createdAt?: Date;
  headOfFamily: Schema.Types.ObjectId;
  members?: [Schema.Types.ObjectId];
  budget?: number;
  expenses?: [Schema.Types.ObjectId];
}

const FamilySchema: Schema = new Schema<IFamily>({
  familyName: { type: String, required: true },
  headOfFamily: { type: Schema.Types.ObjectId, ref: "User" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, immutable: true, default: Date.now },
  budget: { type: Number, default: 100 },
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
});

export default model<IFamily>("Family", FamilySchema);
