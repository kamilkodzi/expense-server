import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/User";

passport.serializeUser((user: User, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const result = await User.findOne({ username: username });
    if (result) {
      done(null, result);
    }
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await User.findOne({ username: username });
      if (result === null) {
        done(null, false);
      } else {
        if (result.password === password) {
          done(null, result);
        } else {
          done(null, false);
        }
      }
    } catch (error) {
      done(error, false);
    }
  })
);
