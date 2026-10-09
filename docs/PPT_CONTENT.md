# CampusMart — Mid-Term Presentation Draft (Slide Outline)

Convert each section to one PowerPoint slide. Do not claim features marked *not implemented*.

---

### Slide 1 — Title

**Title:** CampusMart — Campus Student Marketplace  
**Content:** Your name, BCA, roll number, guide name, date  
**Visual:** App logo text or screenshot of Home page  
**Evidence:** `client/src/pages/Home.jsx`  
**Speaker notes:** “CampusMart helps students buy and sell items on campus using a simple website.”

---

### Slide 2 — Problem statement

**Title:** Problem  
**Content:** Informal buying/selling is scattered; hard to search and trust contact info  
**Visual:** Bullet list  
**Evidence:** `docs/handover/PROJECT_CONTEXT.md`  
**Speaker notes:** Explain real pain point before showing solution.

---

### Slide 3 — Objectives

**Title:** Objectives  
**Content:** Central listings; student accounts; search; seller manages own posts; email contact  
**Evidence:** FR-01–FR-13 in `docs/SRS_DRAFT.md`

---

### Slide 4 — Scope

**Title:** Scope  
**Content:** In: MERN marketplace core. Out: payments, chat, college ERP (*proposed*)  
**Evidence:** SRS §1.2, `PROJECT_CONTEXT.md`

---

### Slide 5 — Technology stack

**Title:** Tech Stack  
**Content:** MongoDB, Express, React (Vite), Node; JWT auth  
**Visual:** Table from README  
**Evidence:** `package.json` files, `DEPENDENCIES.md`

---

### Slide 6 — Methodology

**Title:** Development approach  
**Content:** Incremental iterations — backend models/API → frontend pages → seed data → documentation  
**Evidence:** `TASKS.md` milestones  
**Speaker notes:** “We used Agile-like small steps suitable for a solo student project.”

---

### Slide 7 — System architecture

**Title:** Architecture  
**Content:** Browser → React → REST → Express → MongoDB  
**Visual:** Mermaid from `DIAGRAM_SOURCE.md` §1 (export as image)  
**Evidence:** `server.js`, `client/src/api/client.js`

---

### Slide 8 — Use cases

**Title:** Use cases  
**Visual:** Diagram §2 in `DIAGRAM_SOURCE.md`  
**Speaker notes:** Distinguish guest vs registered student.

---

### Slide 9 — Database design

**Title:** Database (ER)  
**Content:** User and Product; seller foreign key  
**Visual:** ER diagram §4  
**Evidence:** `User.js`, `Product.js`

---

### Slide 10 — API overview

**Title:** REST API  
**Content:** `/auth/*`, `/products/*`, JWT on writes  
**Evidence:** `API_AND_DATA_MODEL.md`  
**Screenshot suggestion:** Postman or curl output (no secrets)

---

### Slide 11 — Frontend modules

**Title:** Frontend structure  
**Content:** Pages, components, AuthContext, api client  
**Evidence:** `CODE_MAP.md`  
**Screenshot:** Browse page grid

---

### Slide 12 — Backend modules

**Title:** Backend structure  
**Content:** Routes, models, middleware, error handler  
**Evidence:** `server/src/` tree

---

### Slide 13 — Demo flow

**Title:** Working features  
**Content:** Browse → detail → register/login → sell → my listings → edit/delete  
**Evidence:** `IMPLEMENTATION_STATUS.md`  
**Speaker notes:** Live demo script from `PROJECT_CONTEXT.md`

---

### Slide 14 — Sequence diagram

**Title:** Create listing flow  
**Visual:** Sequence §5 in `DIAGRAM_SOURCE.md`  
**Evidence:** `CreateProduct.jsx`, `products.js`

---

### Slide 15 — IPC / client-server communication

**Title:** Frontend–backend communication  
**Content:** HTTP + JSON; fetch from React to Express (IPC in web sense)  
**Evidence:** `api/client.js`, CORS in `server.js`  
**Speaker notes:** Mention syllabus definition of IPC if asked.

---

### Slide 16 — Modularity & cohesion

**Title:** Software design qualities  
**Content:** Separate auth vs product routes; cohesive pages; low coupling via REST contract  
**Evidence:** `VIVA_STUDY_GUIDE.md` modularity section

---

### Slide 17 — Libraries

**Title:** Dependencies  
**Content:** express, mongoose, react, bcryptjs, jsonwebtoken, etc.  
**Evidence:** `DEPENDENCIES.md`

---

### Slide 18 — Validation & security

**Title:** Security (actual)  
**Content:** bcrypt, JWT, owner checks; gaps: no OTP, localStorage token  
**Evidence:** SRS §8  
**Speaker notes:** Honesty scores points in viva.

---

### Slide 19 — Testing

**Title:** Testing & results  
**Content:** Build PASS; API smoke 7/7; curl tests listed; browser E2E NOT RUN  
**Evidence:** `IMPLEMENTATION_STATUS.md`, `SRS_DRAFT.md` §9  
**Do not claim** full UI automation.

---

### Slide 20 — Limitations & future work

**Title:** Limitations  
**Content:** No payments; sample seed data; external image URLs only  
**Evidence:** README limitations

---

### Slide 21 — Completion status

**Title:** Project completion estimate  
**Content:** 100% core features coded; ~73% verified via tests (see TASKS.md formula)  
**Evidence:** `TASKS.md` § completion

---

### Slide 22 — Conclusion

**Title:** Conclusion  
**Content:** Working MERN marketplace suitable for campus demo; documentation package for SRS  
**Call to action:** Questions

---

### Slide 23 — Backup: sample data

**Title:** Demo account (*sample data*)  
**Content:** After `npm run seed`: demo.student@campusmart.test / demo123 — clearly labeled fake data  
**Evidence:** `seed.js`
