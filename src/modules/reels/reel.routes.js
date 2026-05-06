const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const { create, getAll, like } = require("./reel.controller");

router.post("/", authMiddleware, create);
router.get("/", getAll);
router.post("/:id/like", authMiddleware, like);

module.exports = router;
