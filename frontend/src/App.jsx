import React from "react";
import { Activity, Dumbbell } from "lucide-react";
import { useWorkouts } from "./context/WorkoutContext";
import WorkoutDetails from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";

export default function App() {
  const { workouts, isLoading, loadError } = useWorkouts();

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Workout Budyyy home">
          <span className="brand-icon"><Dumbbell size={21} /></span>
          <span>workout<span className="brand-accent">budyyy</span></span>
        </a>
        <span className="topbar-tag"><Activity size={15} /> YOUR FITNESS JOURNAL</span>
      </header>

      <section className="intro">
        <p className="eyebrow">YOUR ROUTINE, YOUR PROGRESS</p>
        <h1>Workout <span>Budyyy</span></h1>
        <p className="intro-copy">Keep showing up. Every rep counts.</p>
      </section>

      <section className="dashboard" aria-label="Workout dashboard">
        <div className="workout-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE TRACKER</p>
              <h2>Your Workouts <span className="count">{workouts.length}</span></h2>
            </div>
            <span className="section-note">LATEST FIRST</span>
          </div>

          {isLoading && <div className="state-message">Loading your workouts...</div>}
          {loadError && <div className="state-message error-state" role="alert">{loadError}</div>}
          {!isLoading && !loadError && workouts.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon"><Dumbbell size={25} /></span>
              <h3>No workouts yet</h3>
              <p>Add your first workout using the form. You’ve got this!</p>
            </div>
          )}
          <div className="workout-list">
            {workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
          </div>
        </div>

        <WorkoutForm />
      </section>

      <footer className="footer">
        <span>WORKOUT BUDYYY</span>
        <span>BUILT ONE REP AT A TIME <span className="footer-dot">●</span></span>
      </footer>
    </main>
  );
}
