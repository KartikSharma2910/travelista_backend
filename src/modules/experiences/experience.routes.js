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
  getRecommended,
} = require("./experience.controller");

router.post("/", authMiddleware, roleMiddleware("HOST"), create);
router.get("/", getAll);
router.get("/recommended", authMiddleware, getRecommended);
router.get("/:id", getOne);
router.put("/:id", authMiddleware, roleMiddleware("HOST"), update);
router.delete("/:id", authMiddleware, roleMiddleware("HOST"), remove);

module.exports = router;
