const prisma = require("../../config/db");

const createReview = async (travelerId, data) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: data.bookingId,
    },
    include: {
      host: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.travelerId !== travelerId) {
    throw new Error("Not your booking");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: data.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already exists");
  }

  const review = await prisma.review.create({
    data: {
      bookingId: data.bookingId,
      rating: data.rating,
      text: data.text,
      videoUrl: data.videoUrl,
    },
  });

  return review;
};

const getReviewsByHost = async (req, res) => {
  try {
    const { hostId } = req.query;

    if (!hostId) {
      return res.status(400).json({
        error: "hostId is required",
      });
    }
    const data = await prisma.review.findMany({
      where: {
        booking: {
          hostId: hostId,
        },
      },
      include: {
        booking: {
          include: {
            traveler: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch reviews",
    });
  }
};

const getMyReviews = async (userId) => {
  return prisma.review.findMany({
    where: {
      booking: {
        travelerId: userId,
      },
    },
    include: {
      booking: true,
    },
  });
};

module.exports = {
  createReview,
  getReviewsByHost,
  getMyReviews,
};
