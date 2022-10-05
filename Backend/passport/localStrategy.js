const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  }, async (email, password, done) => {
    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return done(null, false, { message: "가입되지 않은 회원입니다." });
      }

      if (existingUser.provider === "google") {
        return done(null, existingUser);
      }

      const result = await bcrypt.compare(password, existingUser.password);

      if (!result) {
        return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
      }

      done(null, existingUser);
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
