import { model, Schema } from "mongoose";

export interface IExpense {
  expenseName: string;
  value: number;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const ExpenseSchema: Schema = new Schema<IExpense>({
  expenseName: String,
  value: Number,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, immutable: true, default: Date.now },
});

export default model<IExpense>("Expense", ExpenseSchema);
