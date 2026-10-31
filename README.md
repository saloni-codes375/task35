# Workout Budyyy — Task 35 (Revised)

Full-stack workout tracker built with React, Express, MongoDB Atlas, Mongoose, React Context + `useReducer`, and TanStack React Query.

## Structure
- `backend/config`: MongoDB connection
- `backend/models`: Workout schema with Mongoose timestamps
- `backend/controllers`: GET, POST, DELETE controller logic
- `backend/routes`: REST API routes
- `backend/middleware`: centralized API error handling
- `frontend/src/context`: Context + `useReducer` global state and React Query
- `frontend/src/components`: workout cards and add-workout form

## Setup
### MongoDB Atlas
Create an Atlas cluster and database user. Allow your current IP in Atlas Network Access. Copy `backend/.env.example` to `backend/.env` and put your real Atlas URI in `MONGO_URI`. Never commit `.env` credentials.

### Backend — terminal 1
```bash
cd backend
npm install
npm run dev
```

### Frontend — terminal 2
```bash
cd frontend
npm install
npm run dev
```
Open the Vite localhost URL shown in the terminal. Frontend API defaults to `http://localhost:4000`; optionally copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.

## API endpoints
- `GET /api/workouts` — fetch all workouts
- `POST /api/workouts` — create workout
- `DELETE /api/workouts/:id` — delete by MongoDB ID

POST body example:
```json
{ "title": "Chest", "load": 15, "reps": 30 }
```

## Assignment checklist
- Exact page title **Workout Budyyy**
- Desktop two-column layout: workout cards left, add form right
- Responsive stacked mobile layout
- Cards show title, load (Kgs), reps, relative created time, delete action
- MongoDB Atlas + Mongoose schema with `createdAt` and `updatedAt`
- Express MVC folders: routes, controllers, models
- Required plural REST paths: `/api/workouts` and `/api/workouts/:id`
- React fetches and displays workouts
- Context + `useReducer` handles set/add/remove global workout state
- React Query handles server fetch/cache and mutations
- Frontend validation, highlighted invalid fields, form-level API error messages
- Backend validation: HTTP 400 for missing/invalid data, 400 invalid ID, 404 missing workout, 500 unexpected errors

## GitHub upload
Run from this project root:
```bash
git init
git add .
git commit -m "Task 35 - Workout Budyyy revised full stack"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Workout-Budyyy.git
git push -u origin main
```
If you already configured a remote, check it with `git remote -v` rather than adding it again.
