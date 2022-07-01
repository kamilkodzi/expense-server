import { ExpressError } from "../error/ExpressError";
import Joi from "joi";

const paramsSchema = Joi.object({
  id: Joi.string().guid(),
  expenseId: Joi.string(),
});

const validate = (schema?) => {
  return (req, res, next) => {
    let { error } = paramsSchema.validate(req.params);

    if (schema && !error) {
      const bodyValidationResults = schema.validate(req.body);
      
      if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw ExpressError.couldNotStoreInDatabase(msg);
      }
    }
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw ExpressError.couldNotStoreInDatabase(msg);
    }
    console.log("req.params to : ", req.params);
    console.log("bledy po walidacji to : ", error);
    if (error) {
      throw ExpressError.badRequest(
        "Be sure that provided ID match uuid patterns"
      );
    }

    next();
  };
};

export default validate;
