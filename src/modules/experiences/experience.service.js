const prisma = require("../../config/db");

const createExperience = async (data) => {
  return await prisma.experience.create({
    data,
  });
};

const getAllExperiences = async () => {
  const experiences = await prisma.experience.findMany({
    include: {
      host: {
        include: {
          user: true,
        },
      },
    },
  });

  return experiences.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description || "Amazing experience",
    image: e.image || "https://via.placeholder.com/400",
    price: e.price,
    duration: e.duration || "Full Day",
    category: e.category,
    difficulty: e.difficulty,
    rating: e.rating || 4.5,
    reviewCount: e.reviewCount || 0,
    hostId: e.hostId,
    hostName: e.host?.user?.name || "Host",
    hostCity: e.host?.city || "India",
  }));
};

const getExperienceById = async (id) => {
  return await prisma.experience.findUnique({
    where: { id },
  });
};

const updateExperience = async (id, data) => {
  return await prisma.experience.update({
    where: { id },
    data,
  });
};

const deleteExperience = async (id) => {
  return await prisma.experience.delete({
    where: { id },
  });
};

const getRecommendedExperiences = async () => {
  return prisma.experience.findMany({
    take: 8,
    orderBy: {
      id: "desc",
    },
  });
};

module.exports = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
  getRecommendedExperiences,
};
