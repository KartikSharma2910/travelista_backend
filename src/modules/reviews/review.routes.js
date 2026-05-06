const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const {
  create,
  getByHost,
  getMine,
  getReviewsDataByHost,
} = require("./review.controller");

router.get("/me", authMiddleware, getMine);
router.post("/", authMiddleware, roleMiddleware("TRAVELER"), create);
router.get("/host", getReviewsDataByHost);
router.get("/host/:hostId", getByHost);

module.exports = router;
