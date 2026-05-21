# Dhaaga Onboarding

A React + Vite frontend and Express backend for the Dhaaga onboarding application.

## Quick start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Production
- Frontend uses `VITE_API_URL` to connect to the backend.
- Set `VITE_API_URL=https://dhaaga-onboarding.onrender.com` for production.

## Notes
- The frontend sources are under `frontend/`.
- The backend sources are under `backend/`.
- CORS is configured in `backend/server.js` to allow the deployed Vercel frontend origin.

## Environment files
- `frontend/.env` is ignored by git and should contain the production API URL.
- `frontend/.env.example` documents the expected variable.
