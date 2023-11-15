const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);
router.get("/", adminController.index);

module.exports = router;
