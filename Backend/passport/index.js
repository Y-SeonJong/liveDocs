const passport = require("passport");

const User = require("../models/User");
const local = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: id }).lean();

    try {
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  local();
}
