const { z } = require("zod");

const createReviewSchema = z.object({
  bookingId: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string().min(5),
  videoUrl: z.string().optional(),
});

module.exports = {
  createReviewSchema,
};
