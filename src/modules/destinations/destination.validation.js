const { z } = require("zod");

const createDestinationSchema = z.object({
  name: z.string().min(2),
  state: z.string().min(2),
});

const updateDestinationSchema = createDestinationSchema.partial();

module.exports = {
  createDestinationSchema,
  updateDestinationSchema,
};
