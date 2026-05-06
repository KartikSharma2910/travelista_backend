const { z } = require("zod");

const createBookingSchema = z.object({
  hostId: z.string(),
  experienceId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]),
});

module.exports = {
  createBookingSchema,

  updateStatusSchema,
};
