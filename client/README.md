# React + TanStack + Chakra Client

This Vite-powered React application consumes the Go Todo API exposed under `/api/v1/todos`. It demonstrates how to pair TanStack Query’s data-management model with Chakra UI’s component system to build a responsive and theme-aware client for the Go exercise.

## Tech Stack
- **React 19 + TypeScript + Vite** for a fast DX and modern JSX runtime.
- **TanStack Query v5** to fetch, cache, and mutate todos from the Go API without manual state juggling.
- **Chakra UI 3 + next-themes** for accessible UI primitives, color-mode switching, and consistent design tokens.
- **ESLint, Prettier, and TypeScript** keep the codebase typed and linted.

## Getting Started
```bash
cd client
pnpm install
pnpm dev
```
Vite serves the client on `http://localhost:5173`. Make sure the Go API is running and that CORS allows this origin.

## Environment Variables
Create a `client/.env` (or `.env.local`) and point each endpoint to your Go API instance:
```
VITE_API_GO_URL_GET_TODOS=http://localhost:4000/api/v1/todos
VITE_API_GO_URL_CREATE_TODO=http://localhost:4000/api/v1/todos
VITE_API_GO_URL_UPDATE_TODO=http://localhost:4000/api/v1/todos
VITE_API_GO_URL_DELETE_TODO=http://localhost:4000/api/v1/todos
```
Adjust the URLs if you run the API elsewhere or behind a proxy.

## Available Scripts
- `pnpm dev` – start Vite in development mode.
- `pnpm build` – type-check and create a production build.
- `pnpm preview` – preview the built assets locally.
- `pnpm lint` – run ESLint with the shared config.

## Feature Notes
- `src/features/todos` contains the UI and hooks that call the Go API through TanStack Query.
- Chakra UI providers (see `src/components/ui/provider.tsx`) configure themes, color mode, toasts, and tooltips shared across the app.
- Reusable constants for API URLs live in `src/lib/constant/constant.ts`, keeping fetch logic declarative and environment-driven.

Use this client as a sandbox to explore how React, TanStack Query, and Chakra UI coordinate when consuming a Go-based REST API.
    },
