import { ExpressError } from "../error/ExpressError";
import User from "../models/User";

class UserController {
  userData = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
      .select(["username", "firstName", "lastName", "family"])
      .populate({
        path: "family",
        select: ["familyName", "headOfFamily"],
      });
    res.status(200).json(user);
  };

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

  logout = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "You succesfully logout" });
  };
}

const userController = new UserController();
export default userController;
