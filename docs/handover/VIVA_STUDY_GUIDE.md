# CampusMart — Viva Study Guide

Study this with your **actual code open**. Answers reference real files.

---

## Simple project explanation

CampusMart is a **student marketplace website**. Sellers register, post items stored in MongoDB, and buyers browse, filter, and email sellers. The frontend is React; the backend is Express; they talk using **REST JSON over HTTP**.

---

## Architecture walkthrough

1. User opens Vite dev server (`client`) → React Router shows a page.
2. Page calls `apiRequest()` → `fetch` to Express (`server`).
3. Express route uses Mongoose → MongoDB.
4. JSON comes back → React updates the screen.

---

## IPC (important for BCA)

**In this project:** IPC = communication between **browser process** and **Node server process** via **HTTP** (request/response, JSON body). That is the standard way to explain a MERN web app.

**Not used here:** OS pipes, shared memory, message queues. If your syllabus defines IPC differently, ask your faculty which definition they expect.

---

## Modularity, coupling, cohesion

| Idea | CampusMart example |
|------|-------------------|
| **Modularity** | Separate folders: `routes/`, `models/`, `pages/` |
| **Cohesion** | `auth.js` only handles authentication |
| **Coupling** | Frontend coupled to API URLs and JSON shapes in `api/client.js`; low coupling between User and Product models except `seller` ref |

---

## Libraries (short)

See `DEPENDENCIES.md`. Key ones: React (UI), Express (API), Mongoose (database), bcryptjs (password hash), jsonwebtoken (login tokens).

---

## Limitations and future scope

No payments, no chat, no official student ID check, external image URLs only, JWT in localStorage.

---

## Viva questions and answers (25+)

1. **What is CampusMart?**  
   A campus-focused marketplace for students to list and browse items. (`README.md`)

2. **Which stack did you use?**  
   MERN: MongoDB, Express, React, Node.js. (`package.json` files)

3. **Where does the React app start?**  
   `client/src/main.jsx` mounts `App` inside `BrowserRouter` and `AuthProvider`.

4. **How are routes defined on the frontend?**  
   `client/src/App.jsx` uses React Router `<Routes>` and `<Route>`.

5. **What is `apiRequest`?**  
   A wrapper around `fetch` in `client/src/api/client.js` that adds JSON headers and JWT if logged in.

6. **Where is the JWT stored?**  
   `localStorage` key `campusmart_token` (`getStoredToken` / `setStoredToken`).

7. **How does login work end-to-end?**  
   `Login.jsx` → `AuthContext.login` → POST `/api/auth/login` → server returns token → stored → `user` state set.

8. **How are passwords stored?**  
   Hashed with bcrypt in `User` model `pre('save')` hook (`server/src/models/User.js`).

9. **What middleware protects create listing?**  
   `requireAuth` in `server/src/middleware/auth.js`.

10. **How does the server know the user owns a product?**  
    Compares `product.seller.toString()` to `req.user._id` in PUT/DELETE (`products.js`).

11. **What HTTP method lists all products?**  
    GET `/api/products`.

12. **How do filters work?**  
    Query string → `buildProductQuery()` builds a Mongoose filter object.

13. **What is a guard condition? Give an example.**  
    Early return when email/password missing in login route (`auth.js`).

14. **Difference between function declaration and arrow function in your project?**  
    Declaration: `async function connectDatabase()`. Arrow: `(req, res, next) =>` in `asyncHandler`.

15. **What is async/await used for?**  
    Waiting for MongoDB calls without blocking the event loop, e.g. `await Product.find()`.

16. **What does `asyncHandler` do?**  
    Catches rejected promises in async routes and passes errors to `errorHandler`.

17. **What collections exist in MongoDB?**  
    `users` and `products` (Mongoose model names User, Product).

18. **Explain the User–Product relationship.**  
    One user, many products; `Product.seller` is ObjectId ref to User.

19. **What is CRUD in your API?**  
    Create POST, Read GET, Update PUT, Delete DELETE on `/api/products`.

20. **Status code for unauthorized create?**  
    401 when no token (`requireAuth`).

21. **Status code when editing someone else's listing?**  
    403 with message in `products.js` PUT handler.

22. **What is CORS and why use it?**  
    Cross-Origin Resource Sharing; `cors` package allows React origin to call API (`server.js`).

23. **What is the seed script?**  
    `server/src/scripts/seed.js` inserts **sample** demo user and products — not real users.

24. **Does registration prove you are a college student?**  
    No — only email/password signup; optional college text field is not verified.

25. **What happens on empty product search results?**  
    `Products.jsx` shows “No listings match your filters yet.”

26. **How is price validated?**  
    Server checks `Number(price)` and `>= 0` on POST/PUT; Mongoose schema also has `min: 0`.

27. **What is React Context used for?**  
    Global auth state in `AuthContext.jsx` (`user`, `login`, `logout`).

28. **What is `ProtectedRoute`?**  
    Redirects to `/login` if not authenticated (`ProtectedRoute.jsx`).

29. **How would you demo the project?**  
    Start MongoDB, server, client; seed; browse; login demo user; create listing (`PROJECT_CONTEXT.md`).

30. **What is not implemented?**  
    Payments, chat, OTP, image upload to server (`PROJECT_CONTEXT.md` planned list).

---

## Practice: trace on paper

Draw the sequence from **Sell form submit** to **MongoDB insert** without looking — then check `DIAGRAM_SOURCE.md` §5.
