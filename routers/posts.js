const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

// Rotta per l'index
router.get("/", postsController.index);

// Rotta per lo show
router.get("/:slug", postsController.show);

// Rotta per il create
router.get("/create", postsController.create);

module.exports = router;
