const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

// GET /api/workouts
const getWorkouts = async (req, res, next) => {
  try { res.status(200).json(await Workout.find().sort({ createdAt: -1 })); }
  catch (error) { next(error); }
};

// POST /api/workouts
const createWorkout = async (req, res, next) => {
  try {
    const { title, load, reps } = req.body || {};
    if (title === undefined || load === undefined || reps === undefined ||
        String(title).trim() === "" || load === "" || reps === "") {
      return res.status(400).json({ error: "Please provide exercise title, load, and reps." });
    }
    const cleanTitle = String(title).trim();
    const numericLoad = Number(load);
    const numericReps = Number(reps);
    if (cleanTitle.length < 2 || cleanTitle.length > 60)
      return res.status(400).json({ error: "Title must be between 2 and 60 characters." });
    if (!Number.isFinite(numericLoad) || numericLoad < 0 || numericLoad > 1000)
      return res.status(400).json({ error: "Load must be a valid number from 0 to 1000 Kgs." });
    if (!Number.isInteger(numericReps) || numericReps < 1 || numericReps > 1000)
      return res.status(400).json({ error: "Reps must be a whole number from 1 to 1000." });
    const workout = await Workout.create({ title: cleanTitle, load: numericLoad, reps: numericReps });
    return res.status(201).json(workout);
  } catch (error) {
    if (error.name === "ValidationError") return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join(". ") });
    next(error);
  }
};

// DELETE /api/workouts/:id
const deleteWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid workout ID." });
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) return res.status(404).json({ error: "Workout not found." });
    return res.status(200).json({ message: "Workout deleted successfully.", id });
  } catch (error) { next(error); }
};
module.exports = { getWorkouts, createWorkout, deleteWorkout };
