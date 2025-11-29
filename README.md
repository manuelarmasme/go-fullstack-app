# Go Fullstack App

## Overview
This repository is a hands-on exercise that walks through building a small Todo API with Go and exposing it through a Fiber server backed by MongoDB, then consuming that API from a React application that uses TanStack Query for async data flows and Chakra UI for styling. The aim is to understand end-to-end API creation in Go and how a modern React stack can drive the client experience.

## Tech Stack
- **Backend:** Go 1.25, Fiber, MongoDB Driver, dotenv for configuration, CORS middleware.
- **Database:** MongoDB (Atlas or local) storing todos in the `golang_db.todos` collection.
- **Frontend:** React 19, Vite, TypeScript, TanStack Query, Chakra UI, React Icons, next-themes for color mode.
- **Tooling:** Go modules for the API, pnpm for the React workspace, ESLint + Prettier for linting and formatting.

## Project Structure
```
.
├── main.go               # Fiber API exposing CRUD endpoints under /api/v1/todos
├── go.mod                # Go module definition and dependencies
├── client/               # React + Vite single page app
│   ├── src/features/todos # Feature module that consumes the Go API
│   └── ...
└── tmp/                  # Scratch space (not part of the main app)
```

## Getting Started
### Prerequisites
- Go 1.25+
- Node.js 18+ and pnpm 9+
- MongoDB connection string (local or hosted)

### Backend (Go API)
1. Create a `.env` file and set:
   ```bash
   MONGODB_URI=mongodb+srv://...
   CLIENT_URL=http://localhost:5173
   PORT=4000 # optional, defaults to 4000
   ```
2. Install dependencies (if needed):
   ```bash
   go mod tidy
   ```
3. Run the API:
   ```bash
   go run main.go
   ```
4. The server listens on `http://localhost:4000` and exposes `GET/POST/PATCH/DELETE /api/v1/todos`.

### Frontend (React + TanStack + Chakra)
1. Install dependencies:
   ```bash
   cd client
   pnpm install
   ```
2. Start the dev server:
   ```bash
   pnpm dev
   ```
3. Vite serves the app on `http://localhost:5173` and interacts with the Go API defined by `CLIENT_URL`.

## API Surface
- `GET /api/v1/todos` — fetch all todos from MongoDB.
- `POST /api/v1/todos` — create a todo (expects `{ body: string }`).
- `PATCH /api/v1/todos/:id` — mark a todo as completed.
- `DELETE /api/v1/todos/:id` — remove a todo by id.

## Frontend Highlights
- TanStack Query handles fetching, caching, and mutating todo data against the Go API.
- Chakra UI components (including the generated toaster/tooltip helpers) provide accessible styling and theming.
- Feature-based folder structure keeps todo-related UI isolated for easier experimentation.

Feel free to extend either side of the stack—add new fields to the Go API, or expand the React UI with more Chakra components—to deepen the fullstack workflow practice.
