const express = require("express");
const router = express.Router();
const authRoutes = require("../modules/auth/auth.routes");
const reelRoutes = require("../modules/reels/reel.routes");
const blogRoutes = require("../modules/blogs/blog.routes");
const hostRoutes = require("../modules/hosts/host.routes");
const reviewRoutes = require("../modules/reviews/review.routes");
const bookingRoutes = require("../modules/bookings/booking.routes");
const experienceRoutes = require("../modules/experiences/experience.routes");
const destinationRoutes = require("../modules/destinations/destination.routes");
const tripRoutes = require("../modules/trips/trip.routes");
const userRoutes = require("../modules/users/user.routes");
const grievanceRoutes = require("../modules/grievances/grievance.routes");

router.use("/auth", authRoutes);
router.use("/hosts", hostRoutes);
router.use("/reels", reelRoutes);
router.use("/blogs", blogRoutes);
router.use("/trips", tripRoutes);
router.use("/users", userRoutes);
router.use("/grievances", grievanceRoutes);
router.use("/reviews", reviewRoutes);
router.use("/bookings", bookingRoutes);
router.use("/experiences", experienceRoutes);
router.use("/destinations", destinationRoutes);

module.exports = router;
