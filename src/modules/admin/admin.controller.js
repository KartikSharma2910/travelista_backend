const {
  getAllUsers,
  deleteUser,
  getAllHosts,
  getAllBookings,
  getAllBlogs,
} = require("./admin.service");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
};

const removeUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Delete failed",
    });
  }
};

const getHosts = async (req, res) => {
  try {
    const hosts = await getAllHosts();
    res.json(hosts);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hosts",
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch bookings",
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch blogs",
    });
  }
};

module.exports = {
  getUsers,
  removeUser,
  getHosts,
  getBookings,
  getBlogs,
};
