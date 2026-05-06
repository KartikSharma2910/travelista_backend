const prisma = require("../../config/db");

const createReel = async (userId, data) => {
  return await prisma.reel.create({
    data: {
      caption: data.caption,
      hashtags: data.hashtags,
      userId,
    },
  });
};

const getAllReels = async () => {
  return await prisma.reel.findMany({
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

const likeReel = async (id) => {
  return await prisma.reel.update({
    where: { id },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
};

module.exports = {
  createReel,
  getAllReels,
  likeReel,
};
