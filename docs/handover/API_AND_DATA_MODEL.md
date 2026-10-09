# CampusMart — API and Data Model

All paths are relative to the API base URL (`VITE_API_URL`, default `http://localhost:5000/api`).

## Authentication

Protected routes expect header:

`Authorization: Bearer <JWT>`

Token is issued by `POST /auth/register` and `POST /auth/login`. Handler: `server/src/middleware/auth.js` (`requireAuth`).

---

## Endpoints

### `GET /health`

| | |
|---|---|
| **Purpose** | Liveness check |
| **Auth** | None |
| **Source** | `server/src/server.js` |

**Success (200):** `{ "status": "ok", "service": "CampusMart API" }`

---

### `POST /auth/register`

| | |
|---|---|
| **Purpose** | Create user account |
| **Auth** | None |
| **Source** | `server/src/routes/auth.js` |

**Body (JSON):**

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | |
| `email` | Yes | Unique, lowercased |
| `password` | Yes | Min 6 characters |
| `college` | No | Display only |

**Success (201):** `{ "token": "<jwt>", "user": { "id", "name", "email", "college" } }`

**Errors:** 400 missing fields / short password; 409 duplicate email

---

### `POST /auth/login`

**Body:** `{ "email", "password" }` (both required)

**Success (200):** Same shape as register

**Errors:** 400 missing fields; 401 invalid credentials

---

### `GET /auth/me`

**Auth:** Required

**Success (200):** `{ "user": { "id", "name", "email", "college" } }`

**Errors:** 401 missing/invalid token

---

### `GET /products/meta/categories`

**Auth:** None

**Success (200):** `{ "categories": string[], "conditions": string[] }`

**Note:** Route must be registered before `GET /products/:id` (implemented in `products.js`).

---

### `GET /products`

**Auth:** None

**Query parameters (all optional):**

| Param | Behavior |
|-------|----------|
| `search` | MongoDB `$text` search on title/description |
| `category` | Exact match; use `all` or omit to skip |
| `condition` | Enum value; `all` to skip |
| `minPrice` | Number, `price >= minPrice` |
| `maxPrice` | Number, `price <= maxPrice` |

**Success (200):** `{ "products": Product[] }` — each product includes populated `seller` `{ name, email, college }`

**Source:** `buildProductQuery()` in `server/src/routes/products.js`

---

### `GET /products/mine`

**Auth:** Required

**Success (200):** `{ "products": Product[] }` for `req.user._id`

---

### `GET /products/:id`

**Auth:** None

**Success (200):** `{ "product": Product }` with populated seller

**Errors:** 404 if missing or `isActive` is false

---

### `POST /products`

**Auth:** Required

**Body:** `title`, `description`, `price`, `category` required; optional `condition`, `imageUrl`, `contactEmail`

**Success (201):** `{ "product": Product }`

**Errors:** 400 validation; 401 no token

---

### `PUT /products/:id`

**Auth:** Required; must be listing owner

**Body:** Any subset of listing fields; `isActive` boolean allowed

**Success (200):** `{ "product": Product }`

**Errors:** 403 not owner; 404; 400 bad price

---

### `DELETE /products/:id`

**Auth:** Required; owner only

**Success (200):** `{ "message": "Product deleted" }`

**Errors:** 403, 404

---

## Product JSON shape (typical)

Mongoose adds `_id`, `createdAt`, `updatedAt`. Example fields:

```json
{
  "_id": "...",
  "title": "string",
  "description": "string",
  "price": 350,
  "category": "Books",
  "condition": "Good",
  "imageUrl": "https://...",
  "seller": { "_id": "...", "name": "...", "email": "...", "college": "..." },
  "contactEmail": "seller@example.com",
  "isActive": true
}
```

---

## Database models

### User (`server/src/models/User.js`)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | max 80 |
| `email` | String | Yes | unique, validated format |
| `password` | String | Yes | min 6; hashed with bcrypt on save; hidden by default in queries |
| `college` | String | No | default `""` |
| `createdAt`, `updatedAt` | Date | Auto | timestamps |

**Methods:** `comparePassword(candidate)` — used at login

---

### Product (`server/src/models/Product.js`)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | String | Yes | max 120 |
| `description` | String | Yes | max 2000 |
| `price` | Number | Yes | min 0 |
| `category` | String | Yes | max 60 |
| `condition` | String | No | enum: New, Like New, Good, Fair; default Good |
| `imageUrl` | String | No | external URL only |
| `seller` | ObjectId → User | Yes | ref `User` |
| `contactEmail` | String | No | defaults to user email on create route |
| `isActive` | Boolean | No | default true |
| timestamps | | | |

**Indexes:** text on `title` + `description`; compound `{ category, price }`

**Relationship:** One User → many Products (`seller` foreign key). No separate Order or Message collections.

---

## Sample / seed data

`npm run seed` creates user `demo.student@campusmart.test` and three products. Clearly labeled as **sample data** in `server/src/scripts/seed.js`, not production data.
