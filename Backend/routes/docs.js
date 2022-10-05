const express = require("express")

const docsesController = require("./controllers/docses.controller");

const router = express.Router();

router.post("/new", docsesController.create);

router.post("/:id", docsesController.typingDocs);

module.exports = router;