const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

passport.serializeUser((user, done) => {
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

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }, async (err, user) => {
//       //   console.log("tutaj");
//       if (err) {
//         console.log(err);
//         return done(err);
//       }
//       if (!user) {
//         console.log("tutaj");
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         console.log("tua" + user.verifyPassword(password));
//         return done(null, false);
//       }
//       console.log("sprawdznie passworda" + user.verifyPassword(passport));
//       return done(null, user);
//     });
//   })
// );

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
