const { z } = require("zod");

const createHostSchema = z.object({
  city: z.string().min(2),
  bio: z.string().min(10),
});

const updateHostSchema = z.object({
  city: z.string().min(2).optional(),
  bio: z.string().min(10).optional(),
});

module.exports = {
  createHostSchema,
  updateHostSchema,
};
