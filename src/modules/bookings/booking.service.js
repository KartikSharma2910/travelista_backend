const prisma = require("../../config/db");

const createBooking = async (travelerId, data) => {
  const experience = await prisma.experience.findUnique({
    where: {
      id: data.experienceId,
    },
  });
  if (!experience) {
    throw new Error("Experience not found");
  }

  const totalPrice = experience.price;

  const booking = await prisma.booking.create({
    data: {
      travelerId,
      hostId: data.hostId,
      experienceId: data.experienceId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: "PENDING",
      totalPrice,
    },
  });

  return booking;
};

const getMyBookings = async (userId) => {
  return prisma.booking.findMany({
    where: {
      travelerId: userId,
    },
    include: {
      host: true,
      experience: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });
};

const updateBookingStatus = async (id, status) => {
  return await prisma.booking.update({
    where: { id },
    data: { status },
  });
};

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus,
};
