const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const { create, getMine, updateStatus } = require("./booking.controller");

router.post("/", authMiddleware, roleMiddleware("TRAVELER"), create);
router.get("/me", authMiddleware, getMine);
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("HOST", "ADMIN"),
  updateStatus,
);

module.exports = router;
