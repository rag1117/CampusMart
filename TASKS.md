# CampusMart — Task Tracker

## A. Project status

| Item | Value |
|------|-------|
| **Current stage** | Initial build — repository was empty; scaffolding MERN stack |
| **Overall implementation** | IN PROGRESS |
| **Frontend** | NOT STARTED → building |
| **Backend** | NOT STARTED → building |
| **Database** | BLOCKED until MongoDB URI configured; code ready |
| **Known blockers** | MongoDB must be running locally or Atlas URI in `server/.env` |
| **Last verification** | 2026-10-09 (initial inspection: empty repo) |

## B. Feature completion tracker

| Feature | Priority | Status | Relevant files | How to test | Notes |
|---------|----------|--------|----------------|-------------|-------|
| Landing page | P0 | NOT STARTED | `client/src/pages/Home.jsx` | Open `/` | |
| Browse listings | P0 | NOT STARTED | `client/src/pages/Products.jsx`, `server/routes/products.js` | GET `/api/products` | |
| Product detail | P0 | NOT STARTED | `client/src/pages/ProductDetail.jsx` | Click a product | |
| Search / filter | P1 | NOT STARTED | `Products.jsx`, products route query | Use search box and category | |
| Register / login | P0 | NOT STARTED | `auth` routes, `AuthContext` | POST `/api/auth/register`, `/login` | JWT in localStorage |
| Create listing | P0 | NOT STARTED | `CreateProduct.jsx`, POST products | Logged-in user | |
| Edit / delete own listing | P0 | NOT STARTED | `EditProduct.jsx`, PUT/DELETE | Owner only | |
| Backend REST API | P0 | NOT STARTED | `server/routes/*` | curl or browser | |
| MongoDB persistence | P0 | NOT STARTED | `server/models/*`, `config/db.js` | Create product, restart server | |
| Input validation | P1 | NOT STARTED | `server/middleware/validate.js` | Send invalid body | |
| Loading / empty / error UI | P1 | NOT STARTED | Page components | Disconnect API | |
| Responsive layout | P1 | NOT STARTED | `client/src/index.css` | Resize window | |

*Status values: NOT STARTED | IN PROGRESS | IMPLEMENTED | TESTED | BLOCKED*

## C. Development milestones

1. **Repository inspection and setup** — IN PROGRESS
2. **Frontend foundation** — NOT STARTED
3. **Backend and API** — NOT STARTED
4. **Database integration** — NOT STARTED
5. **Core marketplace features** — NOT STARTED
6. **Validation and error handling** — NOT STARTED
7. **Testing and debugging** — NOT STARTED
8. **Technical documentation and diagrams** — NOT STARTED
9. **Final demonstration and viva preparation** — NOT STARTED

## D. Programming concepts to learn

*Will be filled with actual file paths as implementation completes.*

## E. Evaluation readiness checklist

- [ ] Working demonstration
- [ ] Required features tested
- [ ] Completion estimate documented
- [ ] SRS draft aligned with code
- [ ] Diagrams checked against code
- [ ] Dependencies explained
- [ ] IPC explained (HTTP client-server)
- [ ] Modularity / coupling / cohesion notes
- [ ] Mock viva completed

## F. Current and next tasks

**Completed:** Empty-repo inspection

**In progress:** Project scaffold (server + client + docs)

**Next three tasks:**
1. Finish server models, routes, and seed script
2. Finish React pages and API client
3. Run install/build, manual API smoke tests, update handover docs

**Known bugs:** None yet (greenfield)
