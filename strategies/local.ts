import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/User";

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
