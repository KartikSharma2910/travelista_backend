const { z } = require("zod");

const createBlogSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
  category: z.string().min(2),
});

const updateBlogSchema = createBlogSchema.partial();

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};
