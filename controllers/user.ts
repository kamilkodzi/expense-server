import { ExpressError } from "../error/ExpressError";
import User from "../models/User";

class UserController {
  isLoggedIn = async (req, res) => {
    if (req.isAuthenticated()) {
      res
        .status(200)
        .json({ message: "you are logged in", username: req.user.username });
    } else {
      res.status(401).json({ message: "you are not logged in" });
    }
  };
  getAllusers = async (req, res) => {
    const user = await User.find().select([
      "username",
      "firstName",
      "lastName",
      "family",
    ]);
    res.status(200).json(user);
  };

  userData = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
      .select(["username", "family"])
      .populate({
        path: "family",
        select: ["familyName", "headOfFamily", "budget"],
        populate: { path: "headOfFamily", select: "username" },
      });
    res.status(200).json(user);
  };

  myProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
      .select(["username", "family"])
      .populate({
        path: "family",
        select: ["familyName", "headOfFamily", "members", "expenses", "budget"],
        populate: { path: "members", select: "username" },
      })
      .populate({
        path: "family",
        select: ["familyName", "headOfFamily", "members", "expenses", "budget"],
        populate: { path: "expenses", select: ["name", "value", "_id"] },
      })
      .populate({
        path: "family",
        select: ["familyName", "headOfFamily", "members", "expenses", "budget"],
        populate: { path: "headOfFamily", select: "username" },
      });
    res.status(200).json(user);
  };

  remove = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User removed" });
  };

  createOrLogIn = async (req, res) => {
    const checkUser = await User.findOne({ username: req.body.username });
    if (checkUser) {
      res.status(200).json({
        message: checkUser._id,
      });
    } else {
      try {
        const { username } = req.body;
        const user = new User({ username });
        await user.save();
        res.status(200).json({
          message: user.id,
        });
      } catch (error) {
        throw ExpressError.couldNotStoreInDatabase(error.message);
      }
    }
  };

  login = async (req, res) => {
    res.status(200).json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
    });
  };

  logout = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "You succesfully logout" });
  };
}

const userController = new UserController();
export default userController;
