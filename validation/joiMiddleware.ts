import { ExpressError } from "../error/ExpressError";
import Joi from "joi";

const paramsSchema = Joi.object({
  id: Joi.string().hex().length(24),
  expenseId: Joi.string().hex().length(24),
});

const validate = (schema?) => {
  return (req, res, next) => {
    let { error } = paramsSchema.validate(req.params);
    if (schema && !error) {
      const bodyValidationResults = schema.validate(req.body);
      error = bodyValidationResults?.error;
    }

    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw ExpressError.couldNotStoreInDatabase(msg);
    } else {
      next();
    }
  };
};

export default validate;
