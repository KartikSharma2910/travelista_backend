const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("./destination.controller");

router.post("/", authMiddleware, roleMiddleware("ADMIN"), create);
router.get("/", getAll);
router.get("/:name", getOne);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), update);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), remove);

module.exports = router;
