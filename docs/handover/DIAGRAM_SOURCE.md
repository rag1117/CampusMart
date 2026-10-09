# CampusMart — Diagram Source (Mermaid)

Edit these blocks for reports or paste into [Mermaid Live Editor](https://mermaid.live). All diagrams reflect **implemented** code unless labeled *proposed*.

---

## 1. System architecture

**Explains:** Browser, React app, Express API, MongoDB — actual deployment for local dev.

**Code basis:** `client/`, `server/src/server.js`, `server/src/config/db.js`

```mermaid
flowchart LR
  subgraph Client["User device"]
    Browser["Web browser"]
    React["React SPA (Vite)"]
    Browser --> React
  end

  subgraph Server["Node.js host"]
    Express["Express API :PORT"]
  end

  subgraph Data["Database"]
    MongoDB[(MongoDB)]
  end

  React -->|"HTTP JSON REST fetch"| Express
  Express -->|"Mongoose driver"| MongoDB
```

**Assumption:** Single machine development; no separate CDN or load balancer.

---

## 2. Use cases (implemented)

**Explains:** What actors can do today.

**Code basis:** Routes in `auth.js`, `products.js`; public pages in `client/src/pages/`

```mermaid
flowchart TB
  Guest((Guest / Buyer))
  Student((Registered Student))

  Guest --> UC1[Browse listings]
  Guest --> UC2[Search and filter]
  Guest --> UC3[View product details]
  Guest --> UC4[Register account]
  Guest --> UC5[Log in]

  Student --> UC1
  Student --> UC2
  Student --> UC3
  Student --> UC6[Create listing]
  Student --> UC7[Edit own listing]
  Student --> UC8[Delete own listing]
  Student --> UC9[View my listings]
  Student --> UC10[Contact seller via email link]
```

*Proposed (not implemented):* in-app chat, payments, admin moderation.

---

## 3. Activity: Browse and open detail

**Explains:** Main buyer workflow.

```mermaid
flowchart TD
  A[Open /products] --> B{API reachable?}
  B -->|No| E[Show error + retry]
  B -->|Yes| C[GET /api/products]
  C --> D{Results empty?}
  D -->|Yes| F[Empty state message]
  D -->|No| G[Render ProductCard grid]
  G --> H[User clicks card]
  H --> I[GET /api/products/:id]
  I --> J[Show detail + mailto contact]
```

**Files:** `Products.jsx`, `ProductDetail.jsx`, `products.js`

---

## 4. Entity-relationship (actual schema)

**Explains:** Only `User` and `Product` collections with seller reference.

**Code basis:** `User.js`, `Product.js`

```mermaid
erDiagram
  USER ||--o{ PRODUCT : sells
  USER {
    ObjectId _id PK
    string name
    string email UK
    string password
    string college
    datetime createdAt
    datetime updatedAt
  }
  PRODUCT {
    ObjectId _id PK
    string title
    string description
    number price
    string category
    string condition
    string imageUrl
    ObjectId seller FK
    string contactEmail
    boolean isActive
    datetime createdAt
    datetime updatedAt
  }
```

No Order, Cart, or Message entities exist in code.

---

## 5. Sequence: Create listing (authenticated)

**Explains:** End-to-end IPC via HTTP.

```mermaid
sequenceDiagram
  actor User
  participant CreateProduct as CreateProduct.jsx
  participant API as api/client.js
  participant Express as products.js route
  participant Auth as requireAuth
  participant DB as MongoDB

  User->>CreateProduct: Submit form
  CreateProduct->>CreateProduct: Guard required fields
  CreateProduct->>API: apiRequest POST /products
  API->>Express: HTTP + Bearer JWT
  Express->>Auth: Verify token
  Auth->>DB: Find user
  Auth-->>Express: req.user
  Express->>Express: Validate price and fields
  Express->>DB: Product.create
  DB-->>Express: product document
  Express-->>API: 201 JSON
  API-->>CreateProduct: product
  CreateProduct->>User: Navigate to detail page
```

---

## 6. Collaboration / communication (frontend ↔ backend)

**Explains:** Module responsibilities in one request (evaluation “collaboration diagram”).

```mermaid
flowchart TB
  subgraph Frontend
    P[Page component]
    C[apiRequest]
  end
  subgraph Backend
    R[Express Router]
    M[requireAuth middleware]
    H[Route handler]
    MO[Mongoose Model]
  end

  P -->|"function call"| C
  C -->|"HTTP POST JSON"| R
  R --> M
  M --> H
  H --> MO
  MO -->|"JSON response"| C
  C -->|"setState / navigate"| P
```

**IPC note:** Here IPC means **inter-process communication between browser and Node** over TCP/HTTP, not shared memory between OS processes on one machine.

---

## Missing information

- Production hosting topology (not implemented).
- SSL/TLS termination (local HTTP only).
