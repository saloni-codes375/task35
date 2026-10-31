import React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useWorkouts } from "../context/WorkoutContext";

const initialValues = { title: "", load: "", reps: "" };

export default function WorkoutForm() {
  const { addWorkout, isAdding } = useWorkouts();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  function validate() {
    const next = {};
    if (!values.title.trim()) next.title = "Exercise title is required.";
    else if (values.title.trim().length < 2) next.title = "Enter at least 2 characters.";

    if (values.load === "") next.load = "Load is required.";
    else if (!Number.isFinite(Number(values.load)) || Number(values.load) < 0)
      next.load = "Enter a valid load (0 or more).";

    if (values.reps === "") next.reps = "Reps are required.";
    else if (!Number.isInteger(Number(values.reps)) || Number(values.reps) < 1)
      next.reps = "Reps must be a whole number above 0.";

    return next;
  }

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setServerError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setServerError("");
    if (Object.keys(validationErrors).length) return;

    try {
      await addWorkout({
        title: values.title.trim(),
        load: Number(values.load),
        reps: Number(values.reps)
      });
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setServerError(error.message);
    }
  }

  return (
    <section className="form-panel">
      <div className="form-heading">
        <span className="form-icon"><Plus size={17} /></span>
        <div>
          <p className="eyebrow">MAKE IT COUNT</p>
          <h2>Add a New Workout</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Exercise Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Chest"
          value={values.title}
          onChange={updateField}
          className={errors.title ? "invalid" : ""}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}

        <label htmlFor="load">Load (in Kgs)</label>
        <input
          id="load"
          name="load"
          type="number"
          min="0"
          step="0.5"
          placeholder="e.g. 15"
          value={values.load}
          onChange={updateField}
          className={errors.load ? "invalid" : ""}
          aria-invalid={Boolean(errors.load)}
        />
        {errors.load && <span className="field-error">{errors.load}</span>}

        <label htmlFor="reps">Reps</label>
        <input
          id="reps"
          name="reps"
          type="number"
          min="1"
          step="1"
          placeholder="e.g. 30"
          value={values.reps}
          onChange={updateField}
          className={errors.reps ? "invalid" : ""}
          aria-invalid={Boolean(errors.reps)}
        />
        {errors.reps && <span className="field-error">{errors.reps}</span>}

        {serverError && <div className="form-error" role="alert">{serverError}</div>}
        <button className="submit-button" type="submit" disabled={isAdding}>
          <Plus size={17} />
          {isAdding ? "Adding..." : "Add Workout"}
        </button>
      </form>
      <p className="form-footnote">Small steps. Stronger every day.</p>
    </section>
  );
}
