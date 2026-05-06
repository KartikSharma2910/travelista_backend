const express = require("express");
const router = express.Router();

const { create, getAll, getOne, getMine } = require("./trip.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getAll);
router.get("/me", authMiddleware, getMine);
router.get("/:id", authMiddleware, getOne);

module.exports = router;
