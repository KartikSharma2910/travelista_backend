const { z } = require("zod");

const createExperienceSchema = z.object({
  title: z.string().min(3),
  price: z.number(),
  category: z.string(),
  difficulty: z.string(),
  groupSize: z.number(),
  highlights: z.array(z.string()),
});

const updateExperienceSchema = createExperienceSchema.partial();

module.exports = {
  createExperienceSchema,
  updateExperienceSchema,
};
