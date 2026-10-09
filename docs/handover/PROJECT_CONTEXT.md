# CampusMart — Project Context

## Project name and purpose

**CampusMart** — a web application where students can list and browse second-hand items (books, electronics, furniture, etc.) and contact sellers via email.

## Problem statement

Students often buy and sell items on campus through informal channels (groups, notices). CampusMart centralizes listings in one searchable place with basic accounts and ownership rules.

## Intended users

- **Students (sellers):** register, post listings, edit/delete their own items.
- **Students (buyers):** browse, filter, view details, email sellers.

## Actually implemented features

- Landing page with how-it-works
- Product listing grid with cards
- Product detail page with seller info and `mailto:` contact
- Query filters: text search, category, condition, min/max price
- User registration and login (JWT returned to client)
- Session restore via `GET /api/auth/me`
- Create product (authenticated)
- List own products (`/api/products/mine`)
- Update and delete own products only (403 for others)
- MongoDB persistence (User, Product collections)
- Seed script with demo data
- Central API error handler and Mongoose validation errors
- Frontend loading, empty, and error states

## Partially implemented features

- **Text search:** requires MongoDB text index on Product (created in schema); works when `search` query is provided.
- **Edit page access control:** frontend checks owner; non-owners see an error message (GET product is still public).

## Planned but not implemented

- Server-side image upload
- Admin moderation panel
- Password reset / email OTP
- College domain verification
- In-app messaging
- Payments

## Technology stack (actual)

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite 5, React Router 6, CSS |
| Backend | Node.js, Express 4, ES modules |
| Database | MongoDB, Mongoose 8 |
| Auth | JWT + bcryptjs |

## Repository folder structure

See [README.md](../../README.md#project-structure).

## Install and run

1. `cd server && npm install && cp .env.example .env` (fill values locally)
2. `cd client && npm install && cp .env.example .env`
3. Start MongoDB
4. `cd server && npm run seed` (optional)
5. `npm run dev` in `server` and `client`
6. Visit `http://localhost:5173`

## Environment variable names (no secrets)

**Server:** `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`  
**Client:** `VITE_API_URL`

## Database models and relationships

- **User:** name, email (unique), password (hashed), college (optional)
- **Product:** listing fields + `seller` → `ObjectId` ref **User**
- One user → many products (1:N)

## Frontend → backend flow

1. React page calls `apiRequest()` in `client/src/api/client.js`
2. `fetch` sends JSON to `VITE_API_URL` + path
3. Protected routes add `Authorization: Bearer <token>`
4. Express route handler runs validation and Mongoose operations
5. JSON response updates React state

## API endpoint inventory

See [API_AND_DATA_MODEL.md](./API_AND_DATA_MODEL.md).

## Authentication and authorization

- **Register/Login:** returns JWT; client stores in `localStorage` key `campusmart_token`
- **Protected routes:** `requireAuth` middleware on create/update/delete/mine/me
- **Authorization:** product update/delete compares `product.seller` to `req.user._id`

## Validation and errors

- Route-level guard checks (missing fields, bad price)
- Mongoose schema validation
- `errorHandler` maps ValidationError, duplicate key, CastError to HTTP status

## Current limitations

Listed in README; no payment, no real student ID verification.

## Known bugs

- None confirmed after initial API smoke tests (2026-10-09). Port `5000` may be occupied on macOS (AirPlay); use another `PORT` in `.env` if needed.

## How to demonstrate

1. Show home page and browse listings (seed data).
2. Log in as demo user or register new account.
3. Create a listing on **Sell**.
4. Show **My listings**, edit price, optionally delete.
5. Log out; browse as guest; open detail and show contact email link.
6. Show MongoDB documents (Compass/CLI) or API JSON in Postman/curl.

## Development methodology

**Incremental iteration** on a monolithic MERN app (not microservices). Document-as-you-build using `docs/handover/` and `TASKS.md`.

## Decisions requiring confirmation

- Whether evaluators require **.edu-only email** (not implemented).
- Whether **IPC** should be explained as HTTP client-server only (recommended for this stack) vs OS pipes/shared memory.
