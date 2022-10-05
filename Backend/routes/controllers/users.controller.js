const bcyrpt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

exports.create = async (req, res, next) => {
  const { email, nick, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res.json({
        message: "해당 이메일이 현재 존재합니다",
        status: false,
      });
    }

    const hash = await bcyrpt.hash(password, 10);

    const user = await User.create({
      email,
      nick,
      password: hash,
      provider: "local",
    });

    return res.json({ status: true, user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.googleCreate = async (req, res, next) => {
  const { email, nick } = req.body;

  try {
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res.json({
        message: "해당 이메일이 현재 존재합니다.",
        status: false,
      });
    }

    const user = await User.create({
      email,
      nick,
      provider: "google",
      password: "google social",
    });

    return res.json({ status: true, user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }

      if (!user) {
        return res.json({ message: info.message, status: false });
      }

      return req.login(user, { session: false }, async (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }

        const fullUserWithOutPwd = await User.findOne({
          where: { id: user._id },
          attributes: {
            exclude: ["password"],
          },
        });

        const accessToken = jwt.sign(
          {
            email: user.email,
            name: user.nick,
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "15s",
            issuer: "weather",
            subject: "user_info",
          }
        );

        const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: "1d",
          issuer: "weather",
          subject: "user_info",
        });

        fullUserWithOutPwd.token = refreshToken;
        await fullUserWithOutPwd.save();
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        
        return res.json({ status: true, accessToken });
      });
    }
  )(req, res, next);
};

