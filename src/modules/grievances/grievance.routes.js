const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth.middleware");
const { getMine, create } = require("./grievance.controller");

router.get("/me", auth, getMine);
router.post("/", auth, create);

module.exports = router;
