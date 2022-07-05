import { model, Schema } from "mongoose";

export interface IExpense {
  name: string;
  value: number;
  author: Schema.Types.ObjectId;
  createdAt: Date;
  family: Schema.Types.ObjectId;
}

const ExpenseSchema: Schema = new Schema<IExpense>({
  name: String,
  value: Number,
  family: { type: Schema.Types.ObjectId, ref: "Family" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, immutable: true, default: Date.now },
});

export default model<IExpense>("Expense", ExpenseSchema);
