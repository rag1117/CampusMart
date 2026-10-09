# CampusMart — Code Map

Beginner-oriented map of the **actual** source tree. Status reflects code review + API tests on 2026-10-09.

## Top-level layout

| Path | Responsibility |
|------|----------------|
| `client/` | React SPA (Vite) |
| `server/` | Express REST API + Mongoose |
| `docs/` | SRS draft, PPT draft, handover package |
| `TASKS.md` | Feature tracker |

---

## Backend files

| File | Responsibility | Key exports / functions | Status |
|------|----------------|-------------------------|--------|
| `server/src/server.js` | App entry, middleware, routes mount | `startServer()` | Implemented, tested |
| `server/src/config/db.js` | MongoDB connection | `connectDatabase()` | Implemented, tested |
| `server/src/models/User.js` | User schema, password hash | `User` model, `comparePassword` | Implemented |
| `server/src/models/Product.js` | Listing schema | `Product`, `PRODUCT_CONDITIONS` | Implemented |
| `server/src/routes/auth.js` | Register, login, me | `createToken`, routes | Implemented, tested |
| `server/src/routes/products.js` | CRUD + filters | `buildProductQuery` | Implemented, tested |
| `server/src/middleware/auth.js` | JWT verification | `requireAuth` | Implemented, tested |
| `server/src/middleware/errorHandler.js` | Central errors | `errorHandler` | Implemented |
| `server/src/utils/asyncHandler.js` | Async try/catch wrapper | `asyncHandler` | Implemented |
| `server/src/scripts/seed.js` | **Sample** demo data | default export flow | Implemented, tested |
| `server/src/scripts/smoke-api.js` | API smoke checks | `run()` | Implemented, tested |

---

## Frontend files

| File | Responsibility | Key components / functions | Status |
|------|----------------|----------------------------|--------|
| `client/src/main.jsx` | React bootstrap | `AuthProvider`, `BrowserRouter` | Implemented |
| `client/src/App.jsx` | Route table | `App` | Implemented |
| `client/src/api/client.js` | HTTP helper | `apiRequest`, token storage | Implemented, tested via UI paths |
| `client/src/context/AuthContext.jsx` | Auth state | `AuthProvider`, `useAuth`, `login`, `register` | Implemented |
| `client/src/components/Layout.jsx` | Header/footer/nav | `Layout` | Implemented |
| `client/src/components/ProductCard.jsx` | Grid card | `ProductCard`, `formatPrice` | Implemented |
| `client/src/components/ProductForm.jsx` | Shared sell/edit form | `ProductForm` | Implemented |
| `client/src/components/ProtectedRoute.jsx` | Login gate | `ProtectedRoute` | Implemented |
| `client/src/components/LoadingMessage.jsx` | Loading UI | | Implemented |
| `client/src/components/ErrorMessage.jsx` | Error UI | | Implemented |
| `client/src/pages/Home.jsx` | Landing | | Implemented |
| `client/src/pages/Products.jsx` | Browse + filters | `loadProducts`, `handleSubmit` | Implemented |
| `client/src/pages/ProductDetail.jsx` | Single listing | | Implemented |
| `client/src/pages/Login.jsx` | Login form | `handleSubmit` | Implemented |
| `client/src/pages/Register.jsx` | Sign-up form | | Implemented |
| `client/src/pages/CreateProduct.jsx` | New listing | wrapped in `ProtectedRoute` | Implemented |
| `client/src/pages/EditProduct.jsx` | Edit/delete | owner guard | Implemented |
| `client/src/pages/MyListings.jsx` | Seller dashboard | | Implemented |
| `client/src/pages/NotFound.jsx` | 404 page | | Implemented |
| `client/src/index.css` | Responsive styles | | Implemented |

---

## End-to-end trace: Create a listing

| Step | Location | What happens |
|------|----------|----------------|
| 1 | User clicks **Sell** | `Layout.jsx` → React Router `/sell` |
| 2 | Auth check | `ProtectedRoute.jsx` → redirect `/login` if no user |
| 3 | Form submit | `CreateProduct.jsx` → `handleSubmit(form)` |
| 4 | Guard (client) | Checks title, description, category |
| 5 | HTTP POST | `api/client.js` → `POST /products` + Bearer token |
| 6 | Express | `products.js` → `requireAuth` → validate body |
| 7 | Database | `Product.create({ ... seller: req.user._id })` |
| 8 | Response | 201 `{ product }` |
| 9 | UI | `navigate(/products/:id)` |

**Missing links:** None for this feature.

---

## End-to-end trace: Browse with filter

| Step | Location | What happens |
|------|----------|----------------|
| 1 | `/products` | `Products.jsx` mounts |
| 2 | `useEffect` | Calls `GET /products` and `GET /products/meta/categories` |
| 3 | User applies filters | `handleSubmit` → builds query string |
| 4 | Server | `buildProductQuery(req.query)` → `Product.find(filter)` |
| 5 | UI | Maps results to `ProductCard` or empty state |

---

## Modularity notes (for viva)

- **Cohesion:** `routes/auth.js` handles only auth; `routes/products.js` only products.
- **Coupling:** Frontend depends on API JSON shapes in `api/client.js`; backend does not import frontend.
- **IPC (this project):** Inter-process communication is **HTTP/JSON** between browser and Node server (not OS pipes).

---

## Programming concepts by file (examples)

| Concept | Example location |
|---------|------------------|
| Function declaration | `async function connectDatabase()` in `db.js` |
| Arrow function | `asyncHandler` wrapper in `asyncHandler.js` |
| Guard / early return | `requireAuth` if no Bearer token |
| Loop | `sampleProducts.forEach` equivalent `for...of` in `seed.js` |
| Condition | Owner check in `PUT /products/:id` |
| async/await | All route handlers |
| try/catch | Implicit via `asyncHandler` + `errorHandler` |
| CRUD | `products.js` GET/POST/PUT/DELETE |
| JSON | `express.json()` + `fetch` body |
