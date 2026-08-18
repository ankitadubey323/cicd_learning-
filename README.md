# Todo App (Node + React)

Simple fullstack Todo application scaffold with a clear frontend/backend split.

- Backend: Node.js (ES modules), Express, Mongoose
- Frontend: React with Vite
- Auth: JWT-based login/register

## Project structure

- `frontend/` contains the React app
- `backend/` contains the Express API server
- each app has its own `.env` file based on the included `.env.example`

## Run the app

1. Install dependencies at the project root:
   npm install
2. Copy the env files and fill in your values:
   - `frontend/.env.example` -> `frontend/.env`
   - `backend/.env.example` -> `backend/.env`
3. Start both apps together:
   npm run dev

Optional commands:
- `npm run dev:frontend`
- `npm run dev:backend`
- `npm run build`
