const prisma = require("../../config/db");

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

const getMe = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

module.exports = { getUserById, updateUser, getMe };
