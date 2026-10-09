# What to Share with ChatGPT (SRS, Diagrams, Viva)

Use this package so another AI can produce an **accurate** SRS and slides from your **real** implementation — not generic marketplace text.

## 1. Always share these documentation files

Upload or paste contents of:

1. `docs/handover/PROJECT_CONTEXT.md`
2. `docs/handover/CODE_MAP.md`
3. `docs/handover/API_AND_DATA_MODEL.md`
4. `docs/handover/DEPENDENCIES.md`
5. `docs/handover/IMPLEMENTATION_STATUS.md`
6. `docs/handover/DIAGRAM_SOURCE.md`
7. `docs/handover/VIVA_STUDY_GUIDE.md`
8. `TASKS.md`
9. Your college **evaluation rubric** or project requirement PDF (if you have it)

## 2. Share source when details must be verified

Documentation is a **map**, not a substitute for code. Also include:

- `server/src/routes/` (auth + products)
- `server/src/models/`
- `client/src/pages/` and `client/src/api/client.js`
- `README.md`

Or zip the repo **excluding**:

- `node_modules/`
- `client/dist/`
- `.env` and any secrets
- `.git/` (optional)

## 3. Prompt suggestion

> Using only the attached handover files and source, write a final SRS and refine Mermaid diagrams. Mark anything not found in code as proposed. Do not invent payment, chat, or college verification features.

## 4. Do NOT share

- `server/.env`, `client/.env`
- Passwords, JWT secrets, MongoDB Atlas passwords
- Personal phone numbers or real student data

## 5. After ChatGPT generates SRS

Compare requirement IDs to `IMPLEMENTATION_STATUS.md` and fix mismatches before submission.
