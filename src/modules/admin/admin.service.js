const prisma = require("../../config/db");
const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      host: true,
    },
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

const getAllHosts = async () => {
  return await prisma.host.findMany({
    include: {
      user: true,
    },
  });
};

const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      traveler: true,
      host: true,
      experience: true,
    },
  });
};

const getAllBlogs = async () => {
  return await prisma.blog.findMany({
    include: {
      author: true,
    },
  });
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllHosts,
  getAllBookings,
  getAllBlogs,
};
