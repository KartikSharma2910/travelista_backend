const {
  createReview,
  getReviewsByHost,
  getMyReviews,
} = require("./review.service");
const { createReviewSchema } = require("./review.validation");

const getMine = async (req, res) => {
  const reviews = await getMyReviews(req.user.id);

  res.json(reviews);
};

const create = async (req, res) => {
  try {
    const review = await createReview({
      bookingId: req.body.bookingId,
      rating: req.body.rating,
      text: req.body.text,
      videoUrl: req.body.videoUrl,
    });

    res.status(201).json(review);
  } catch {
    res.status(500).json({
      error: "Failed to create review",
    });
  }
};

const getReviewsDataByHost = async (req, res) => {
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

const getByHost = async (req, res) => {
  try {
    const data = await prisma.review.findMany({
      where: {
        booking: {
          hostId: req.query.hostId,
        },
      },
      include: {
        booking: true,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
};

module.exports = {
  create,
  getMine,
  getByHost,
  getReviewsDataByHost,
};
