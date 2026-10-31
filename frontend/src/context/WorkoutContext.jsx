
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const WorkoutContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const WORKOUTS_KEY = ["workouts"];
const initialState = { workouts: [], loading: true, error: "" };

function workoutReducer(state, action) {
  switch (action.type) {
    case "SET_WORKOUTS": return { ...state, workouts: action.payload, loading: false, error: "" };
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_ERROR": return { ...state, loading: false, error: action.payload };
    case "ADD_WORKOUT": return { ...state, workouts: [action.payload, ...state.workouts] };
    case "REMOVE_WORKOUT": return { ...state, workouts: state.workouts.filter(w => w._id !== action.payload) };
    default: return state;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed. Please try again.");
  return data;
}

export function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, initialState);
  const queryClient = useQueryClient();
  const workoutsQuery = useQuery({ queryKey: WORKOUTS_KEY, queryFn: () => request("/api/workouts") });

  useEffect(() => {
    if (workoutsQuery.data) dispatch({ type: "SET_WORKOUTS", payload: workoutsQuery.data });
  }, [workoutsQuery.data]);
  useEffect(() => {
    if (workoutsQuery.isLoading) dispatch({ type: "SET_LOADING", payload: true });
    else if (workoutsQuery.error) dispatch({ type: "SET_ERROR", payload: workoutsQuery.error.message });
  }, [workoutsQuery.isLoading, workoutsQuery.error]);

  const addMutation = useMutation({
    mutationFn: workout => request("/api/workouts", { method: "POST", body: JSON.stringify(workout) }),
    onSuccess: created => {
      dispatch({ type: "ADD_WORKOUT", payload: created });
      queryClient.setQueryData(WORKOUTS_KEY, (old = []) => [created, ...old]);
    }
  });
  const deleteMutation = useMutation({
    mutationFn: id => request(`/api/workouts/${id}`, { method: "DELETE" }),
    onSuccess: (_result, id) => {
      dispatch({ type: "REMOVE_WORKOUT", payload: id });
      queryClient.setQueryData(WORKOUTS_KEY, (old = []) => old.filter(w => w._id !== id));
    }
  });

  const value = {
    workouts: state.workouts, isLoading: state.loading, loadError: state.error,
    addWorkout: workout => addMutation.mutateAsync(workout),
    deleteWorkout: id => deleteMutation.mutateAsync(id),
    isAdding: addMutation.isPending,
    deletingId: deleteMutation.isPending ? deleteMutation.variables : null
  };
  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkouts must be used inside WorkoutProvider");
  return context;
}
