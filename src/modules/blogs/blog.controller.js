const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("./blog.service");
const { createBlogSchema, updateBlogSchema } = require("./blog.validation");

const create = async (req, res) => {
  try {
    const validatedData = createBlogSchema.parse(req.body);
    const blog = await createBlog(req.user.id, validatedData);
    res.status(201).json({
      message: "Blog created",
      blog,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch blogs",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch blog",
    });
  }
};

const update = async (req, res) => {
  try {
    const validatedData = updateBlogSchema.parse(req.body);
    const blog = await updateBlog(req.params.id, validatedData);
    res.json(blog);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteBlog(req.params.id);
    res.json({
      message: "Blog deleted",
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
