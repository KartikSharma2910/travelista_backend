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
  updateStatus,
  getSaved,
  save,
  removeCompletely,
} = require("./host.controller");
const { applyHost } = require("./host.application.controller");

router.post("/", authMiddleware, roleMiddleware("HOST"), create);
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/apply", applyHost);
router.put("/:id", authMiddleware, roleMiddleware("HOST"), update);
router.delete("/:id", authMiddleware, roleMiddleware("HOST"), remove);
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateStatus,
);
router.get("/saved", authMiddleware, getSaved);
router.post("/save/:id", authMiddleware, save);
router.delete("/save/:id", authMiddleware, removeCompletely);

module.exports = router;
