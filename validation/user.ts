import Joi from "joi";
import { IUser } from "../models/User";

export const loginSchema: Joi.ObjectSchema<IUser> = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .rule({
      message: "Password must be alphanumeric between 3 to 30 characters",
    })
    .required(),
});

export const registerSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
});
