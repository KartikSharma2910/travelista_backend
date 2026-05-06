const express = require("express");
const router = express.Router();

const { getOne, updateMe, getMyProfile } = require("./user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.put("/me", authMiddleware, updateMe);
router.get("/me", authMiddleware, getMyProfile);
router.get("/:id", authMiddleware, getOne);

module.exports = router;
