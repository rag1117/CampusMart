# Software Requirements Specification (DRAFT)

**Project:** CampusMart  
**Status:** DRAFT — aligned to repository as of 2026-10-09  
**Author role:** Student BCA project documentation (verify before final submission)

---

## 1. Introduction

### 1.1 Purpose

This SRS describes requirements for CampusMart, a web-based campus marketplace. It supports mid-term evaluation and viva.

### 1.2 Scope

In-scope: user accounts, product listings, browse/search, contact via email link, seller CRUD on own listings.  
Out-of-scope (proposed only): payments, in-app chat, official enrollment verification.

### 1.3 Intended audience

Evaluators, student developer, future maintainers.

### 1.4 Definitions

| Term | Meaning |
|------|---------|
| JWT | JSON Web Token for session after login |
| Listing | Product document in MongoDB |
| MERN | MongoDB, Express, React, Node.js |

---

## 2. Overall description

### 2.1 Product perspective

Standalone web application: React client + Express API + MongoDB.

### 2.2 Product functions (summary)

Registration, authentication, browse/filter listings, view details, create/edit/delete own listings, email contact.

### 2.3 User classes

| Class | Description |
|-------|-------------|
| Guest | Browse and view details |
| Registered student | All guest actions plus manage own listings |

### 2.4 Operating environment

- Node.js 18+, modern browser, MongoDB 6+
- Development: localhost ports 5173 (client), configurable API port

### 2.5 Constraints and assumptions

- Email registration does not verify college enrollment.
- Images are URLs, not uploaded files.
- Assumes network access between client and API.

---

## 3. Functional requirements

| ID | Requirement | Status | Source files |
|----|-------------|--------|--------------|
| FR-01 | System shall display a landing page describing CampusMart | Implemented | `Home.jsx` |
| FR-02 | System shall list active products | Implemented | `products.js` GET `/`, `Products.jsx` |
| FR-03 | System shall show product detail including seller and contact | Implemented | `ProductDetail.jsx`, GET `/:id` |
| FR-04 | System shall filter by category, condition, price, text search | Implemented | `buildProductQuery`, `Products.jsx` |
| FR-05 | User shall register with name, email, password | Implemented | `auth.js` POST `/register` |
| FR-06 | User shall log in and receive JWT | Implemented | `auth.js` POST `/login` |
| FR-07 | Authenticated user shall create a listing | Implemented | POST `/products`, `CreateProduct.jsx` |
| FR-08 | User shall view own listings | Implemented | GET `/mine`, `MyListings.jsx` |
| FR-09 | User shall update own listing only | Implemented | PUT `/:id` |
| FR-10 | User shall delete own listing only | Implemented | DELETE `/:id` |
| FR-11 | System shall reject unauthenticated write operations | Implemented | `requireAuth` |
| FR-12 | System shall validate required fields and price | Implemented | Routes + Mongoose schemas |
| FR-13 | User shall contact seller via email link | Implemented | `mailto:` in `ProductDetail.jsx` |
| FR-14 | Admin moderation panel | Proposed | Not implemented |
| FR-15 | In-app messaging | Proposed | Not implemented |

---

## 4. Non-functional requirements

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-01 | Usable on mobile and desktop | Partially verified | Responsive CSS; visual test NOT RUN |
| NFR-02 | Maintainable module structure | Implemented | Separate routes/models/pages |
| NFR-03 | Passwords not stored plain text | Implemented | bcrypt |
| NFR-04 | API errors return JSON message | Implemented | `errorHandler.js` |
| NFR-05 | Sub-second list API on small dataset | NOT MEASURED | No load test |
| NFR-06 | 99.9% uptime | Proposed | Local dev only |

---

## 5. External interface requirements

### 5.1 User interface

React pages: Home, Products, Detail, Login, Register, Sell, My listings, Edit.

### 5.2 API interfaces

REST JSON under `/api/*` — see `docs/handover/API_AND_DATA_MODEL.md`.

### 5.3 Database interfaces

MongoDB via Mongoose; connection string `MONGODB_URI`.

---

## 6. Data requirements

### 6.1 User entity

Fields: name, email (unique), password (hashed), college (optional). See `User.js`.

### 6.2 Product entity

Fields: title, description, price, category, condition, imageUrl, seller (FK User), contactEmail, isActive. See `Product.js`.

### 6.3 Relationships

User 1 — N Product via `seller`.

---

## 7. System architecture and design

Stack: React (Vite), Express, Mongoose, MongoDB.  
Diagrams: `docs/handover/DIAGRAM_SOURCE.md`.

Methodology: **incremental development** — core API, then UI, then documentation.

---

## 8. Error handling and security

### 8.1 Implemented

- Password hashing (bcrypt)
- JWT for authenticated routes
- Owner check on update/delete
- Input validation (route + schema)
- CORS restricted to `CLIENT_ORIGIN`
- `.env` for secrets (not committed)

### 8.2 Missing / weak (document honestly)

- No rate limiting
- No refresh tokens
- JWT in localStorage (XSS risk if XSS existed)
- No HTTPS enforcement in dev
- No email verification
- No role-based admin

---

## 9. Testing

| Test ID | Description | Expected | Actual | Status |
|---------|-------------|----------|--------|--------|
| T-01 | Client production build | Success | Vite build OK | PASS 2026-10-09 |
| T-02 | GET /api/health | 200 ok | 200 | PASS |
| T-03 | GET /api/products | JSON array | 3+ after seed | PASS |
| T-04 | Login missing fields | 400 | 400 | PASS |
| T-05 | Login demo user | token | token | PASS |
| T-06 | POST product no auth | 401 | 401 | PASS |
| T-07 | POST product auth | 201 | 201 | PASS |
| T-08 | PUT other user's product | 403 | 403 | PASS |
| T-09 | Search query | filtered results | 1 for "charger" | PASS |
| T-10 | npm run test:api | 7/7 | 7/7 | PASS |
| T-11 | Browser manual walkthrough | All pages work | — | NOT RUN |
| T-12 | PUT own product | Updated fields | — | NOT RUN |

---

## 10. Limitations and future enhancements

Current limitations in README. Future: upload images, .edu email validation, favorites, reporting.

---

## 11. Traceability matrix

| Req ID | Feature | Source / API | Test |
|--------|---------|--------------|------|
| FR-01 | Landing | `Home.jsx` | T-11 |
| FR-02 | Browse | GET `/products` | T-03 |
| FR-03 | Detail | GET `/:id` | T-11 |
| FR-04 | Filter | query params | T-09 |
| FR-05 | Register | POST `/register` | T-11 |
| FR-06 | Login | POST `/login` | T-05 |
| FR-07 | Create | POST `/products` | T-07 |
| FR-08 | Mine | GET `/mine` | T-11 |
| FR-09 | Update | PUT `/:id` | T-12 |
| FR-10 | Delete | DELETE `/:id` | T-07 |
| FR-11 | Auth gate | `requireAuth` | T-06 |
| FR-12 | Validation | models + routes | T-04 |

---

*End of DRAFT — verify against latest `TASKS.md` before printing.*
