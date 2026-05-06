const {
  createBooking,
  getMyBookings,
  updateBookingStatus,
} = require("./booking.service");
const {
  createBookingSchema,
  updateStatusSchema,
} = require("./booking.validation");

const create = async (req, res) => {
  try {
    const validatedData = createBookingSchema.parse(req.body);
    const booking = await createBooking(req.user.id, validatedData);
    res.status(201).json({
      message: "Booking created",
      booking,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getMine = async (req, res) => {
  try {
    const bookings = await getMyBookings(req.user.id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch bookings",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const validatedData = updateStatusSchema.parse(req.body);
    const booking = await updateBookingStatus(
      req.params.id,
      validatedData.status,
    );
    res.json(booking);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  create,
  getMine,
  updateStatus,
};
