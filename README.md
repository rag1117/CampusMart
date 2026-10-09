# CampusMart

CampusMart is a **campus-focused student marketplace** built with the MERN stack (MongoDB, Express, React, Node.js). Students can register, browse listings, view product details, contact sellers by email, and manage their own listings.

## Features (current status)

| Feature | Status |
|---------|--------|
| Landing page | Implemented |
| Browse product listings | Implemented & API tested |
| Product detail + contact email | Implemented |
| Search and filters (category, condition, price) | Implemented |
| Register / login (JWT) | Implemented & API tested |
| Create / edit / delete own listings | Implemented |
| MongoDB persistence | Implemented & seed tested |
| Input validation & error messages | Implemented |
| Loading / empty / error UI | Implemented |
| Responsive layout | Implemented |

**Not included (by design):** payments, in-app chat, OTP/college ERP verification, image uploads to server (optional image URL only).

## Tech stack

- **Frontend:** React 18, Vite, React Router, CSS
- **Backend:** Node.js, Express 4
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` password hashing

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection string

## Installation

```bash
# Clone or open the project, then:
cd server && npm install
cd ../client && npm install
```

## Environment setup

Copy example env files and edit values locally (never commit real secrets):

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**Server (`server/.env`) — variable names only:**

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing login tokens |
| `CLIENT_ORIGIN` | Frontend URL for CORS (default Vite `http://localhost:5173`) |

**Client (`client/.env`):**

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Base URL for API (default `http://localhost:5000/api`) |

## Run the application

**Terminal 1 — API:**

```bash
cd server
npm run dev
# or: npm start
```

**Terminal 2 — frontend:**

```bash
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

**macOS note:** If the API fails to bind to port `5000`, set `PORT=5001` in `server/.env` and `VITE_API_URL=http://localhost:5001/api` in `client/.env`.

### Optional: sample data

```bash
cd server
npm run seed
```

Demo account after seed: `demo.student@campusmart.test` / `demo123`

## Scripts

| Location | Script | Description |
|----------|--------|-------------|
| `server` | `npm start` | Run API |
| `server` | `npm run dev` | Run API with file watch |
| `server` | `npm run seed` | Insert demo user and products |
| `server` | `npm run test:api` | Smoke-test API (server must be running) |
| `client` | `npm run dev` | Vite dev server |
| `client` | `npm run build` | Production build to `client/dist` |
| `client` | `npm run preview` | Preview production build |

## Project structure

```
CampusMart/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # fetch wrapper
│       ├── components/
│       ├── context/        # Auth state
│       └── pages/
├── server/                 # Express API
│   └── src/
│       ├── config/         # DB connection
│       ├── models/         # Mongoose schemas
│       ├── routes/         # REST routes
│       ├── middleware/
│       └── scripts/seed.js
├── docs/
│   ├── SRS_DRAFT.md
│   ├── PPT_CONTENT.md
│   └── handover/           # Files to share with ChatGPT for SRS/diagrams
├── TASKS.md
└── README.md
```

## How to test core features

1. **Health:** `curl http://localhost:5000/api/health`
2. **List products:** `curl http://localhost:5000/api/products`
3. **Login:** POST `/api/auth/login` with JSON `{ "email", "password" }`
4. **Create listing:** POST `/api/products` with `Authorization: Bearer <token>`
5. **UI:** Browse → open a product → register → sell → my listings → edit/delete
6. **API smoke script** (server must be running):  
   `cd server && API_BASE=http://localhost:5001/api npm run test:api`  
   (Use the same host/port as your running API.)

## Limitations

- Email registration does **not** prove official student enrollment.
- No payment gateway or escrow.
- Product images are external URLs only (no multer/upload pipeline).
- JWT stored in `localStorage` (acceptable for a student demo, not production-hardened).
- No automated test suite yet; verification is manual + API smoke tests.

## Documentation

- Task tracker: [TASKS.md](./TASKS.md)
- SRS draft: [docs/SRS_DRAFT.md](./docs/SRS_DRAFT.md)
- Presentation draft: [docs/PPT_CONTENT.md](./docs/PPT_CONTENT.md)
- ChatGPT handover guide: [docs/handover/SHARE_WITH_CHATGPT.md](./docs/handover/SHARE_WITH_CHATGPT.md)

## Development methodology

**Iterative incremental development** on a single MERN codebase: inspect requirements → scaffold server and client → implement core CRUD and auth → seed data → document actual behavior. Suitable for a BCA mid-term demo with explainable, modular folders (routes, models, pages).
