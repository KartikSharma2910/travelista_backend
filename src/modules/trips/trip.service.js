const prisma = require("../../config/db");

const createTrip = async (data, userId) => {
  return prisma.trip.create({
    data: {
      ...data,
      creatorId: userId,
    },
  });
};

const getMyTrips = async (userId) => {
  return prisma.trip.findMany({
    where: {
      creatorId: userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAllTrips = async (status) => {
  try {
    const where = {};

    if (status && status !== "all") {
      where.status = status;
    }

    const trips = await prisma.trip.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return trips.map((t) => ({
      id: t.id,
      title: t.title || "",
      description: t.description || "",
      trip_type: t.tripType || "road_trip",
      nature: t.nature || "adventure",
      destination: t.destination || "",
      route: t.route || "",
      duration: t.duration || "",
      max_travelers: t.maxTravelers ?? 0,
      total_price: t.totalPrice ?? 0,
      price_model: t.priceModel || "per_person",
      includes_food: t.includesFood ?? false,
      includes_stay: t.includesStay ?? false,
      includes_transport: t.includesTransport ?? false,
      includes_activities: t.includesActivities ?? false,
      start_date: t.startDate ? t.startDate.toISOString() : null,
      end_date: t.endDate ? t.endDate.toISOString() : null,
      image_url: null,
    }));
  } catch (error) {
    console.error("TRIPS ERROR:", error); // 👈 IMPORTANT
    throw error;
  }
};

const getTripById = async (id) => {
  const trip = await prisma.trip.findUnique({
    where: { id },
  });

  if (!trip) return null;

  return {
    id: trip.id,

    title: trip.title,
    description: trip.description,

    trip_type: trip.tripType,
    nature: trip.nature,

    destination: trip.destination,
    route: trip.route,

    duration: trip.duration,

    max_travelers: trip.maxTravelers,

    total_price: trip.totalPrice,
    price_model: trip.priceModel,

    includes_food: trip.includesFood,
    includes_stay: trip.includesStay,
    includes_transport: trip.includesTransport,
    includes_activities: trip.includesActivities,

    trip_direction: trip.tripDirection,

    highlights: trip.highlights || [],
    inclusions: trip.inclusions || [],

    start_date: trip.startDate ? trip.startDate.toISOString() : null,

    end_date: trip.endDate ? trip.endDate.toISOString() : null,

    creatorId: trip.creatorId,

    image_url: null,
  };
};

module.exports = { createTrip, getAllTrips, getTripById, getMyTrips };
