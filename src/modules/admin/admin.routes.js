const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");

const roleMiddleware = require("../../middleware/role.middleware");

const {
  getUsers,

  removeUser,

  getHosts,

  getBookings,

  getBlogs,
} = require("./admin.controller");

router.use(authMiddleware, roleMiddleware("ADMIN"));

router.get("/users", getUsers);

router.delete("/users/:id", removeUser);

router.get("/hosts", getHosts);

router.get("/bookings", getBookings);

router.get("/blogs", getBlogs);

module.exports = router;
