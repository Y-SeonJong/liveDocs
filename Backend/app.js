const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const index = require("./routes");
const loginRouter = require("./routes/login");
const docsRouter = require("./routes/docs");
const passportConfig = require("./passport");

const app = express();

passportConfig();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", () => {
  console.error("connected error");
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊어져 있습니다.");
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECERT));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/login", loginRouter);
app.use("/docs", docsRouter);

app.use(function (req, _, next) {
  const err = new Error(`${req.url} 페이지가 존재하지 않습니다..`);
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, _) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ status: false, error: err.message });
});

module.exports = app;
