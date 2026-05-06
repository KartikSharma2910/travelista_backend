const prisma = require("../../config/db");

const createHost = async (userId, data) => {
  const existingHost = await prisma.host.findUnique({
    where: {
      userId,
    },
  });

  if (existingHost) {
    throw new Error("Host profile already exists");
  }

  const host = await prisma.host.create({
    data: {
      userId,
      city: data.city,
      bio: data.bio,
    },
  });
  return host;
};

const getAllHosts = async () => {
  const hosts = await prisma.host.findMany({
    include: {
      user: true,
    },
  });

  return hosts.map((h) => ({
    id: h.id,
    name: h.user.name,
    city: h.city,
    tagline: h.tagline || "",
    bio: h.bio || "",
    image: h.image || "https://via.placeholder.com/300",
    rating: h.rating || 0,
    reviewCount: h.reviewCount || 0,
    services: h.services || [],
    languages: h.languages || [],
    pricePerDay: h.pricePerDay || 0,
    verified: h.verified || false,
    safetyScore: h.safetyScore || 0,
    responseTime: h.responseTime || "1 hour",
    specialties: h.specialties || [],
    expertiseTags: h.expertiseTags || [],
    introVideoUrl: h.introVideoUrl || null,
    stayInfo: h.stayInfo || null,
    transportInfo: h.transportInfo || null,
    foodInfo: h.foodInfo || null,
  }));
};

const getHostById = async (id) => {
  return await prisma.host.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

const updateHost = async (id, data) => {
  return await prisma.host.update({
    where: { id },
    data,
  });
};

const updateHostStatus = async (id, status) => {
  return prisma.host.update({
    where: { id },
    data: {
      verified: status === "verified",
    },
  });
};

const deleteHost = async (id) => {
  return await prisma.host.delete({
    where: { id },
  });
};

const getSavedHosts = async (userId) => {
  return prisma.savedHost.findMany({
    where: { userId },
    include: {
      host: {
        include: {
          user: true,
        },
      },
    },
  });
};

const saveHost = async (userId, hostId) => {
  return prisma.savedHost.create({
    data: { userId, hostId },
  });
};

const removeHost = async (userId, hostId) => {
  return prisma.savedHost.deleteMany({
    where: { userId, hostId },
  });
};

module.exports = {
  createHost,
  getAllHosts,
  getHostById,
  updateHost,
  updateHostStatus,
  deleteHost,
  getSavedHosts,
  saveHost,
  removeHost,
};
