import { ExpressError } from "../error/ExpressError";
import User from "../models/User";

class UserController {
  isLoggedIn = async (req, res) => {
    console.log("tuta jtestuej");
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
      .select(["username", "firstName", "lastName", "family"])
      .populate({
        path: "family",
        select: ["familyName", "headOfFamily"],
      });
    res.status(200).json(user);
  };

  myProfile = async (req, res) => {
    const { id } = req.user;
    console.log(id);
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
    res.cookie("klucz", "wartosc", {
      maxAge: 9000000,
      sameSite: "None",
      secure: true,
    });
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
