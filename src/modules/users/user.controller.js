const { getUserById, updateUser, getMe } = require("./user.service");

const getOne = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch user",
    });
  }
};

const updateMe = async (req, res) => {
  try {
    const user = await updateUser(req.user.id, req.body);

    res.json(user);
  } catch {
    res.status(500).json({
      error: "Failed to update profile",
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await getMe(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch profile",
    });
  }
};

module.exports = { getOne, updateMe, getMyProfile };
