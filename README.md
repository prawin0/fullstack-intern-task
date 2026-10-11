# Mini SaaS Template Store

A full-stack MERN app where users can register, log in, browse templates, and favorite them.

**Author:** YOUR NAME · your.email@example.com · github.com/your-username
**Live demo:** (add Vercel/Netlify frontend URL) · **API:** (add Render URL)

## Tech Stack
- **Frontend:** React 18 (Vite), React Router, Axios, TailwindCSS
- **Backend:** Node.js, Express.js, JWT, bcryptjs, express-validator
- **Database:** MongoDB + Mongoose

## Features
- Register / Login with JWT auth and hashed passwords
- Browse templates, search, and filter by category
- Favorite / un-favorite templates; favorited cards are highlighted
- "My Favorites" page behind a protected route; Logout button

## Project Structure
```
fullstack-intern-task/
├── server/
│   └── src/ { config, models, controllers, middleware, routes, seed, app.js, server.js }
└── client/
    └── src/ { api, context, components, pages, App.jsx, main.jsx }
```

## Setup

### Prerequisites
Node 18+ and a MongoDB instance (local or MongoDB Atlas).

### Backend
```bash
cd server
npm install
cp .env.example .env     # then edit MONGO_URI and JWT_SECRET
npm run seed             # seeds 7 sample templates
npm run dev              # http://localhost:5000
```

### Frontend
```bash
cd client
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm run dev              # http://localhost:5173
```

## API Reference
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | – | Register (name, email, password) |
| POST | /api/auth/login | – | Login, returns JWT |
| GET | /api/auth/me | ✔ | Current user |
| GET | /api/templates?search=&category= | – | List templates (with optional filters) |
| GET | /api/templates/categories | – | List categories |
| GET | /api/templates/:id | – | Template details |
| GET | /api/favorites | ✔ | Logged-in user's favorites |
| POST | /api/favorites/:templateId | ✔ | Add to favorites |
| DELETE | /api/favorites/:templateId | ✔ | Remove from favorites |

## Deployment
- **Backend (Render):** root dir `server`, build `npm install`, start `npm start`. Env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your frontend URL).
- **Frontend (Vercel/Netlify):** root dir `client`, build `npm run build`, output `dist`. Env var: `VITE_API_URL` (your Render URL + `/api`).
  - Netlify: add `client/public/_redirects` with `/* /index.html 200`. Vercel: add a `vercel.json` rewrite to `/index.html`.
