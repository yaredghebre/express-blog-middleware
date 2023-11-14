const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const multer = require("multer");

// Rotta per l'index
router.get("/", postsController.index);

// Rotta per lo SHOW
router.get("/:slug", postsController.show);

// Rotta per il CREATE
router.get("/create", postsController.create);

// Creo Rotta per lo STORE
router.post(
  "/",
  multer({ dest: "public/imgs/posts" }).single("image"),
  postsController.store
);
module.exports = router;
