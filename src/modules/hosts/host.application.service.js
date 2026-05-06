const prisma = require("../../config/db");

const createHostApplication = async (data) => {
  const {
    name,
    email,
    phone,
    city,
    state,
    services,
    languages,
    bio,
    tagline,
    specialties,
    pricePerDay,
    homestayRooms,
    vehicleType,
  } = data;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: "temp_password",
      role: "HOST",
    },
  });

  const host = await prisma.host.create({
    data: {
      userId: user.id,
      city,
      bio,
      tagline,
      pricePerDay: Number(pricePerDay),
      services,
      languages,
      specialties,
      verified: false,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
  });
  return host;
};

module.exports = {
  createHostApplication,
};
