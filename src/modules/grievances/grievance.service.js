const prisma = require("../../config/db");

const getMyGrievances = async (userId) => {
  return prisma.grievance.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createGrievance = async (userId, data) => {
  return prisma.grievance.create({
    data: {
      userId,
      subject: data.subject,
      description: data.description,
      category: data.category,
    },
  });
};

module.exports = {
  getMyGrievances,
  createGrievance,
};
