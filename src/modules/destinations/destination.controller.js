const {
  createDestination,
  getAllDestinations,
  getDestinationByName,
  updateDestination,
  deleteDestination,
} = require("./destination.service");

const {
  createDestinationSchema,
  updateDestinationSchema,
} = require("./destination.validation");

const create = async (req, res) => {
  try {
    const validatedData = createDestinationSchema.parse(req.body);
    const destination = await createDestination(validatedData);

    res.status(201).json({
      message: "Destination created",
      destination,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await getAllDestinations();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch destinations",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const destination = await getDestinationByName(req.params.name);
    res.json(destination);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch destination",
    });
  }
};

const update = async (req, res) => {
  try {
    const validatedData = updateDestinationSchema.parse(req.body);
    const destination = await updateDestination(req.params.id, validatedData);
    res.json(destination);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteDestination(req.params.id);
    res.json({
      message: "Destination deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Delete failed",
    });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
