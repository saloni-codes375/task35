const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Exercise title is required"],
      trim: true,
      minlength: [2, "Exercise title must be at least 2 characters"],
      maxlength: [60, "Exercise title cannot exceed 60 characters"]
    },
    load: {
      type: Number,
      required: [true, "Load is required"],
      min: [0, "Load cannot be negative"],
      max: [1000, "Load cannot exceed 1000 kg"]
    },
    reps: {
      type: Number,
      required: [true, "Reps are required"],
      min: [1, "Reps must be at least 1"],
      max: [1000, "Reps cannot exceed 1000"],
      validate: {
        validator: Number.isInteger,
        message: "Reps must be a whole number"
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
