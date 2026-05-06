const prisma = require("../../config/db");

const createDestination = async (data) => {
  return await prisma.destination.create({
    data,
  });
};

const getAllDestinations = async () => {
  const destinations = await prisma.destination.findMany();

  return destinations.map((d) => ({
    id: d.id,
    name: d.name,
    state: d.state,
    tagline: d.tagline || "",
    description: d.description || "",
    bestSeason: d.bestSeason || "",
    avgTemp: d.avgTemp || "",
    highlights: d.highlights || [],
    experienceTags: d.experienceTags || [],
    hostCount: d.hostCount || 0,
    sites: d.sites || [],
  }));
};

const getDestinationByName = async (name) => {
  return await prisma.destination.findFirst({
    where: { name },
  });
};

const updateDestination = async (id, data) => {
  return await prisma.destination.update({
    where: { id },

    data,
  });
};

const deleteDestination = async (id) => {
  return await prisma.destination.delete({
    where: { id },
  });
};

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationByName,
  updateDestination,
  deleteDestination,
};
