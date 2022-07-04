import Joi from "joi";

export const addFamily = Joi.object({
  familyName: Joi.string().min(3).max(30).required(),
  headOfFamily: Joi.string().required(),
});

export const setBudget = Joi.object({
  budgetValue: Joi.number().min(0).required(),
});

export const addExpense = Joi.object({
  value: Joi.number().min(0).required(),
  name: Joi.string().min(1).max(30).required(),
});

export const editExpense = Joi.object({
  value: Joi.number().min(0),
  name: Joi.string().min(1).max(30),
});
