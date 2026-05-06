const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const { create, getAll, getOne, update, remove } = require("./blog.controller");

router.post("/", authMiddleware, roleMiddleware("ADMIN", "HOST"), create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN", "HOST"), update);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), remove);

module.exports = router;
