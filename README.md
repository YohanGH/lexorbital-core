# **LexOrbital – core**

## 📦 **Structure**

```bash
lexorbital-core/
├── backend/             # BackRing - API Express (Node/TS)
├── frontend/            # FrontRing - Console React (Vite/TS)
├── infra/               # Docker Compose pour développement local
├── modules/             # Modules intégrés via git subtree
├── docs/                # Documentation
└── ...
```

## 🛠️ **Getting Started**

### Prérequis

- Node.js 20+
- pnpm (ou npm/yarn)
- Docker & Docker Compose (pour l'infrastructure)

### Développement Local

#### Option 1 : Avec Docker Compose (Recommandé)

```bash
cd infra
docker-compose -f docker-compose.local.yml up
```

- BackRing : http://localhost:4000
- FrontRing : http://localhost:3000

#### Option 2 : Sans Docker

**BackRing :**
```bash
cd backend
pnpm install
pnpm dev  # Port 4000
```

**FrontRing :**
```bash
cd frontend
pnpm install
pnpm dev  # Port 3000
```

### Endpoints BackRing (POC V1)

- `GET /health` → `{ status: "ok", service: "lexorbital-core" }`
- `GET /modules` → Liste mockée de modules

Voir [docs/architecture.md](docs/architecture.md) pour plus de détails.

## 📜 **Module Manifest (`module.json`)**

## 📐 **Development Rules (Mandatory)**

Every LexOrbital module MUST:

- use **Conventional Commits** (`feat:`, `fix:`, `refactor:`…)
- include a **Dockerfile** (module-scoped only)
- include at least **one healthcheck test** + **one functional test**
- expose a complete **module.json** manifest
- provide a clear **README**
- pass the included **CI** without errors

No module can be integrated into the Station without fulfilling these rules.

## 🔒 **Security**

Do **not** open public issues for vulnerabilities.  
Instead, follow the instructions in:

➡️ `SECURITY.md`

---

## 🤝 **Contributing**

Before contributing or opening an issue, please read:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`

---

## 🛸 **LexOrbital Philosophy**

LexOrbital modules are conceived as:

- **vessels**
- **orbiting a law-driven core**
- bound by shared **contracts**
- minimal, secure, and replaceable

> _“Modules are vessels — autonomous, replaceable, orbiting a stable core.”_

---

## 📝 **License**

Add your module’s license here (MIT recommended).

---

## 🧭 **Maintainers**

Add maintainer names or GitHub handles here.

---

Thank you for contributing to **LexOrbital**  
and helping build a modular, compliant, and elegant architecture.
