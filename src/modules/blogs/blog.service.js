const prisma = require("../../config/db");

const createBlog = async (userId, data) => {
  return await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      authorId: userId,
    },
  });
};

const getAllBlogs = async () => {
  return await prisma.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

const getBlogById = async (id) => {
  return await prisma.blog.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
};

const updateBlog = async (id, data) => {
  return await prisma.blog.update({
    where: { id },
    data,
  });
};

const deleteBlog = async (id) => {
  return await prisma.blog.delete({
    where: { id },
  });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
