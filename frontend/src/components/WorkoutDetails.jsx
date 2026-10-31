import React,{ useState } from "react";
import { Trash2, Dumbbell } from "lucide-react";
import { useWorkouts } from "../context/WorkoutContext";

function timeAgo(dateValue) {
  if (!dateValue) return "just now";
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(dateValue).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `about ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  return `about ${days} ${days === 1 ? "day" : "days"} ago`;
}

export default function WorkoutDetails({ workout }) {
  const { deleteWorkout, deletingId } = useWorkouts();
  const [error, setError] = useState("");
  const isDeleting = deletingId === workout._id;

  async function handleDelete() {
    setError("");
    try {
      await deleteWorkout(workout._id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <article className="workout-card">
      <div className="workout-card-content">
        <div className="workout-title-row">
          <span className="workout-mark"><Dumbbell size={15} /></span>
          <h2>{workout.title}</h2>
        </div>
        <p><strong>Load (in Kgs):</strong> {workout.load}</p>
        <p><strong>Reps:</strong> {workout.reps}</p>
        <p className="time-ago">{timeAgo(workout.createdAt)}</p>
        {error && <p className="inline-error">{error}</p>}
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete ${workout.title} workout`}
        title="Delete workout"
      >
        <Trash2 size={18} />
      </button>
    </article>
  );
}
