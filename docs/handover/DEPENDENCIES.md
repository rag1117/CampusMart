# CampusMart — Dependencies

Versions from `npm list --depth=0` on 2026-10-09.

## Server (`server/package.json`) — runtime

| Package | Version | Type | Purpose | Used in |
|---------|---------|------|---------|---------|
| `express` | 4.22.3 | runtime | HTTP server, routing, JSON middleware | `server/src/server.js`, routes |
| `mongoose` | 8.24.5 | runtime | MongoDB ODM, schemas, queries | `models/*`, `config/db.js` |
| `dotenv` | 16.6.1 | runtime | Load `.env` variables | `server.js`, `seed.js` (via `dotenv/config`) |
| `cors` | 2.8.6 | runtime | Allow frontend origin | `server.js` |
| `bcryptjs` | 2.4.3 | runtime | Password hashing | `models/User.js` |
| `jsonwebtoken` | 9.0.3 | runtime | Sign/verify JWT | `routes/auth.js`, `middleware/auth.js` |

**Dev dependencies:** none declared.

**Unused dependencies:** none identified — all six packages are imported in source.

---

## Client (`client/package.json`)

| Package | Version | Type | Purpose | Used in |
|---------|---------|------|---------|---------|
| `react` | 18.3.1 | runtime | UI library | All `.jsx` components |
| `react-dom` | 18.3.1 | runtime | Render to DOM | `main.jsx` |
| `react-router-dom` | 6.30.6 | runtime | Client-side routes | `App.jsx`, pages, `Layout.jsx` |
| `vite` | 5.4.21 | dev | Dev server and production build | `vite.config.js`, npm scripts |
| `@vitejs/plugin-react` | 4.7.0 | dev | JSX/React support in Vite | `vite.config.js` |

**Unused dependencies:** none identified.

---

## System prerequisites (not npm)

| Tool | Role |
|------|------|
| Node.js | Runs server and npm |
| MongoDB | Database server for `MONGODB_URI` |

---

## Security note

Run `npm audit` in `client/` reported vulnerabilities in dev tooling (Vite chain). For a local academic project this is acceptable; do not run `npm audit fix --force` before demos without testing the build.
