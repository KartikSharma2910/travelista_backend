const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const user1 = await prisma.user.create({
    data: {
      name: "Ravi Sharma",
      email: "ravi@example.com",
      password: "hashedpassword",
      role: "HOST",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Priya Verma",
      email: "priya@example.com",
      password: "hashedpassword",
      role: "HOST",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Amit Singh",
      email: "amit@example.com",
      password: "hashedpassword",
      role: "HOST",
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: "Tanveer Singh",
      email: "tanveer@example.com",
      password: "hashedpassword",
      role: "ADMIN",
    },
  });

  const host1 = await prisma.host.create({
    data: {
      userId: user1.id,
      city: "Jaipur",
      bio: "Local heritage expert with 10 years of guiding experience.",
      tagline: "Explore Jaipur like a royal",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
      rating: 4.8,
      reviewCount: 120,
      services: ["Guided Tours", "Food Walk", "Photography"],
      languages: ["English", "Hindi"],
      pricePerDay: 2500,
      verified: true,
      specialties: ["Heritage", "Culture"],
      expertiseTags: ["History", "Architecture"],
    },
  });

  const host2 = await prisma.host.create({
    data: {
      userId: user2.id,
      city: "Varanasi",
      bio: "Spiritual guide helping travelers explore Varanasi deeply.",
      tagline: "Feel the soul of India",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.7,
      reviewCount: 98,
      services: ["Temple Tours", "Boat Ride"],
      languages: ["English", "Hindi"],
      pricePerDay: 2200,
      verified: true,
      specialties: ["Spiritual", "Culture"],
      expertiseTags: ["Temple", "Meditation"],
    },
  });

  const host3 = await prisma.host.create({
    data: {
      userId: user3.id,
      city: "Kerala",
      bio: "Nature and backwater specialist.",
      tagline: "Relax in God's own country",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      rating: 4.9,
      reviewCount: 150,
      services: ["Backwater Tour", "Village Visit"],
      languages: ["English", "Malayalam"],
      pricePerDay: 3000,
      verified: true,
      specialties: ["Nature"],
      expertiseTags: ["Backwaters"],
    },
  });

  await prisma.experience.createMany({
    data: [
      {
        title: "Jaipur Heritage Walk",
        description: "Explore Jaipur's hidden royal gems.",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
        price: 1500,
        duration: "4 Hours",
        category: "Heritage",
        difficulty: "Easy",
        groupSize: 10,
        highlights: ["Amber Fort", "City Palace"],
        hostId: host1.id,
      },

      {
        title: "Varanasi Ganga Aarti Tour",
        description: "Witness magical evening Aarti.",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc",
        price: 1200,
        duration: "3 Hours",
        category: "Spiritual",
        difficulty: "Easy",
        groupSize: 15,
        highlights: ["Ganga Aarti"],
        hostId: host2.id,
      },

      {
        title: "Kerala Backwater Cruise",
        description: "Relax in scenic Kerala backwaters.",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
        price: 2800,
        duration: "Full Day",
        category: "Nature",
        difficulty: "Easy",
        groupSize: 8,
        highlights: ["Houseboat"],
        hostId: host3.id,
      },
    ],
  });

  // DESTINATIONS

  await prisma.destination.createMany({
    data: [
      {
        name: "Jaipur",
        state: "Rajasthan",
        tagline: "The Pink City",
        description: "Royal palaces and forts.",
        bestSeason: "Oct – Mar",
        avgTemp: "25°C",
        highlights: ["Amber Fort", "Hawa Mahal"],
        experienceTags: ["Heritage"],
        hostCount: 1,
      },

      {
        name: "Varanasi",
        state: "Uttar Pradesh",
        tagline: "Spiritual Capital",
        description: "Ancient holy city.",
        bestSeason: "Nov – Feb",
        avgTemp: "22°C",
        highlights: ["Ganga Aarti"],
        experienceTags: ["Spiritual"],
        hostCount: 1,
      },

      {
        name: "Kerala",
        state: "Kerala",
        tagline: "God's Own Country",
        description: "Nature and backwaters.",
        bestSeason: "Sep – Mar",
        avgTemp: "28°C",
        highlights: ["Backwaters"],
        experienceTags: ["Nature"],
        hostCount: 1,
      },
    ],
  });

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
