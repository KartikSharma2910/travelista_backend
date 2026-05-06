const {
  createTrip,
  getAllTrips,
  getTripById,
  getMyTrips,
} = require("./trip.service");

const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const trip = await createTrip(req.body, userId);
    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create trip" });
  }
};

const getAll = async (req, res) => {
  try {
    const { status } = req.query;
    const trips = await getAllTrips(status);
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch trips",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await getTripById(id);

    if (!trip) {
      return res.status(404).json({
        error: "Trip not found",
      });
    }

    res.json(trip);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch trip",
    });
  }
};

const getMine = async (req, res) => {
  try {
    const trips = await getMyTrips(req.user.id);
    res.json(trips);
  } catch {
    res.status(500).json({
      error: "Failed to fetch trips",
    });
  }
};

module.exports = { create, getAll, getOne, getMine };
