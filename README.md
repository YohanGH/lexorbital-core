# LexOrbital Core

> **An orbital station of modular software architecture — modular, GDPR-compliant, documented.**

[![Documentation](https://img.shields.io/badge/docs-complete-brightgreen)](./docs)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

---

## 🎯 What is LexOrbital?

**LexOrbital** is a modular web architecture ecosystem designed as an orbital station:

- **Meta-Kernel**: Global configuration + laws (GDPR, security)
- **Connection Rings**: Standardized front/back interfaces (FrontRing / BackRing)
- **Module-Vessels**: Autonomous, replaceable, plug'n'play services

> _"Modules are vessels — autonomous, replaceable, orbiting a stable core."_

---

## 📚 Documentation

**Complete documentation available** in [`docs/`](./docs):

| Section                      | Description               | Link                                |
| ---------------------------- | ------------------------- | ----------------------------------- |
| 🇫🇷 **French Documentation**  | Complete guide in French  | [📖 docs/FR/](./docs/FR)            |
| 🇬🇧 **English Documentation** | Complete guide in English | [📖 docs/EN/](./docs/EN)            |
| 📑 **Index**                 | Comprehensive navigation  | [📑 docs/INDEX.md](./docs/INDEX.md) |

**Recommended paths:**

- **Quick Start** → [Quick Start Guide](./docs/EN/03-guides/01-quick-start.md)
- **Understand the architecture** → [Orbital Architecture](./docs/EN/01-architecture/02-orbital-pattern.md)
- **Create a module** → [Module Creation Guide](./docs/EN/03-guides/02-creating-a-module.md)
- **Check GDPR compliance** → [GDPR by Design](./docs/EN/02-compliance/01-gdpr-by-design.md)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (or npm/yarn)
- **Docker** & Docker Compose

### Launch the project

**Option 1: With Docker (recommended)**

```bash
# Start all services
pnpm docker:dev

# In background
pnpm docker:dev:d

# Stop services
pnpm docker:dev:down
```

**Access:**

- 🔹 **BackRing**: http://localhost:4000
- 🔹 **FrontRing**: http://localhost:3000

---

## 🛠️ Tech Stack

| Layer             | Technologies                 |
| ----------------- | ---------------------------- |
| **Backend**       | Node.js, TypeScript, NestJS  |
| **Frontend**      | React, TypeScript, Vite      |
| **Database**      | PostgreSQL                   |
| **Orchestration** | Docker, Docker Compose       |
| **CI/CD**         | GitHub Actions               |

---

## 🔒 Security

**DO NOT publish vulnerabilities as public issues.**

➡️ See [SECURITY.md](./SECURITY.md)

---

## 🤝 Contributing

Contributions are welcome! Before contributing:

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Check [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
3. Follow the [Contribution Standards](./docs/EN/05-contributing/01-contribution-guide.md)

**Types of contributions:**

- 🐛 Fix a bug
- ✨ Add a feature
- 📝 Improve documentation
- 🚀 Create a community module

---

## 📄 License

This project is licensed under [MIT](./LICENSE).

---

## 🔗 Useful Links

- **Complete documentation**: [docs/](./docs)
- **Module template**: [lexorbital-template-module](https://github.com/YourOrg/lexorbital-template-module)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)
- **Support**: [SUPPORT.md](./SUPPORT.md)

---

<div align="center">

**Made with 🚀 by the LexOrbital community**

[Documentation](./docs) • [Contributing](./CONTRIBUTING.md) • [Issues](https://github.com/YourOrg/lexorbital-core/issues)

</div>
