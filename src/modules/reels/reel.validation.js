const { z } = require("zod");

const createReelSchema = z.object({
  caption: z.string().min(3),
  hashtags: z.array(z.string()),
});

module.exports = {
  createReelSchema,
};
