const {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
  getRecommendedExperiences,
} = require("./experience.service");

const {
  createExperienceSchema,
  updateExperienceSchema,
} = require("./experience.validation");

const create = async (req, res) => {
  try {
    const validatedData = createExperienceSchema.parse(req.body);
    const experience = await createExperience(validatedData);

    res.status(201).json({
      message: "Experience created",
      experience,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const experiences = await getAllExperiences();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch experiences",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const experience = await getExperienceById(req.params.id);
    res.json(experience);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch experience",
    });
  }
};

const update = async (req, res) => {
  try {
    const validatedData = updateExperienceSchema.parse(req.body);
    const experience = await updateExperience(req.params.id, validatedData);
    res.json(experience);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteExperience(req.params.id);
    res.json({
      message: "Experience deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Delete failed",
    });
  }
};

const getRecommended = async (req, res) => {
  try {
    const data = await getRecommendedExperiences();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch experiences",
    });
  }
};

const getByHost = async (req, res) => {
  try {
    const data = await prisma.experience.findMany({
      where: {
        hostId: req.query.hostId,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  getByHost,
  getRecommended,
};
