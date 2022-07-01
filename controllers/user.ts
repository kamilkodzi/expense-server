import { ExpressError } from "../error/ExpressError";
// import Family from "../models/Family";
// import Expense from "../models/Expense";
import User from "../models/User";

class UserController {
  userData = async (req, res) => {
    const user = await User.findById(req.user.id)
      .select(["username", "firstName", "lastName", "family"])
      .populate({
        path: "family",
        select: ["familyName", "headOfFamily"],
      });
    res.status(200).json(user);
  };

  // familyData = async (req, res) => {
  //   const userFamily = await User.findById(req.user.id);
  //   if (userFamily.family) {
  //     const family = await Family.findById(userFamily.family)
  //       .populate({
  //         path: "headOfFamily",
  //         select: ["firstName", "lastName", "username"],
  //       })
  //       .populate({
  //         path: "members",
  //         select: ["firstName", "lastName", "username"],
  //       })
  //       .populate({
  //         path: "expenses",
  //         select: ["value", "name", "author"],
  //         populate: {
  //           path: "author",
  //           select: ["firstName", "lastName", "username"],
  //         },
  //       });
  //     res.status(200).json(family);
  //   } else {
  //     res
  //       .status(200)
  //       .json({ message: "You have no family - please join any." });
  //   }
  // };

  remove = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User removed" });
  };

  create = async (req, res) => {
    try {
      const { username, password, firstName, lastName } = req.body;
      const user = new User({ username, firstName, lastName });
      const newUser = await User.register(user, password);
      res.status(200).json({
        message: "User created",
        data: {
          fistrName: newUser.firstName,
          lastName: newUser.lastName,
        },
      });
    } catch (error) {
      throw ExpressError.couldNotStoreInDatabase(error.message);
    }
  };

  login = async (req, res) => {
    res.status(200).json({ message: `Welcome back ${req.user.firstName}!` });
  };
}

const userController = new UserController();
export default userController;
