const express = require("express");

const usersController = require("./controllers/users.controller");

const router = express.Router();

router.post("/", usersController.login);

router.post("/join", usersController.create);

router.post("/google", usersController.login);

router.post("/googleJoin", usersController.googleCreate);

module.exports = router;
