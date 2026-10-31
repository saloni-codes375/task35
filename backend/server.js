require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const workoutRoutes = require("./routes/workoutRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Workout Budyyy API is running." }));
app.use("/api/workouts", workoutRoutes);
app.use((req, res) => res.status(404).json({ error: "Route not found." }));
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
connectDB().then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))).catch((error) => {
  console.error(`Database connection failed: ${error.message}`); process.exit(1);
});
