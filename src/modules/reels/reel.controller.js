const { createReel, getAllReels, likeReel } = require("./reel.service");
const { createReelSchema } = require("./reel.validation");

const create = async (req, res) => {
  try {
    const validatedData = createReelSchema.parse(req.body);
    const reel = await createReel(req.user.id, validatedData);
    res.status(201).json({
      message: "Reel created",
      reel,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const reels = await getAllReels();
    res.json(reels);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch reels",
    });
  }
};

const like = async (req, res) => {
  try {
    const reel = await likeReel(req.params.id);
    res.json({
      message: "Reel liked",
      reel,
    });
  } catch (error) {
    res.status(500).json({
      error: "Like failed",
    });
  }
};

module.exports = {
  create,
  getAll,
  like,
};
