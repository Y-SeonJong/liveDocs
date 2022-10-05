const express = require("express");

const indexController = require("./controllers/indexs.controller");

const router = express.Router();

router.get("/user/:id", indexController.showMyDocs);

router.get("/", indexController.showMainPage)

module.exports = router;
