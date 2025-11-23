# 📚 LexOrbital Documentation

> **Une station orbitale d'architecture logicielle—modulaire, conforme, documentée.**

[![Documentation Status](https://img.shields.io/badge/docs-active-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## 🌍 Language / Langue

- **[🇫🇷 Documentation Française](./FR/README.md)** — Documentation complète en français
- **[🇬🇧 English Documentation](./EN/README.md)** — Complete documentation in English

---

## 📖 Quick Navigation

### 🎯 By Role

| Role | Start Here |
|------|------------|
| **Architect** | [Architecture Overview](./FR/01-architecture/README.md) / [EN](./EN/01-architecture/README.md) |
| **Developer** | [Developer Guide](./FR/03-guides/developer-guide.md) / [EN](./EN/03-guides/developer-guide.md) |
| **DPO / Legal** | [Compliance Guide](./FR/02-compliance/README.md) / [EN](./EN/02-compliance/README.md) |
| **Product Owner** | [Project Overview](./FR/00-introduction/00-overview.md) / [EN](./EN/00-introduction/00-overview.md) |

### 🗂️ By Topic

| Topic | Description |
|-------|-------------|
| **Introduction** | Philosophy, concepts, origin of LexOrbital |
| **Architecture** | Meta-Kernel, rings, modules, patterns |
| **Compliance** | RGPD/GDPR, French law, security by design |
| **Guides** | Step-by-step tutorials, how-to guides |
| **Reference** | API docs, manifests, contracts |
| **Contributing** | How to contribute to the ecosystem |

---

## 🏗️ Documentation Structure

```
docs/
├── README.md                      # This file - Main entry point
│
├── FR/                            # 🇫🇷 French Documentation
│   ├── README.md                  # French landing page
│   ├── 00-introduction/           # Philosophy & concepts
│   ├── 01-architecture/           # Technical architecture
│   ├── 02-compliance/             # RGPD, security, legal
│   ├── 03-guides/                 # Practical guides
│   ├── 04-reference/              # API & technical reference
│   └── 05-contributing/           # Contribution guidelines
│
├── EN/                            # 🇬🇧 English Documentation
│   ├── README.md                  # English landing page
│   ├── 00-introduction/           # Philosophy & concepts
│   ├── 01-architecture/           # Technical architecture
│   ├── 02-compliance/             # GDPR, security, legal
│   ├── 03-guides/                 # Practical guides
│   ├── 04-reference/              # API & technical reference
│   └── 05-contributing/           # Contribution guidelines
│
├── templates/                     # 📄 Reusable documentation templates
│   ├── module-readme.md           # Template for module documentation
│   ├── architecture-decision.md   # ADR template
│   ├── api-contract.md            # API documentation template
│   └── compliance-manifest.md     # RGPD manifest template
│
├── diagrams/                      # 🎨 Visual assets
│   ├── architecture/              # Architecture diagrams
│   ├── flows/                     # Workflow diagrams
│   └── concepts/                  # Conceptual illustrations
│
├── generated/                     # 🤖 Auto-generated documentation
│   ├── api/                       # API docs (OpenAPI, TypeDoc)
│   └── exports/                   # PDF, DOCX exports
│
└── sources-and-references.md      # 📚 Bibliography & references
```

---

## 🎯 Documentation Principles

### 1. **Clarity First**
- Technical precision without jargon overload
- Visual diagrams complement written explanations
- Examples for every concept

### 2. **Modular Like the Code**
- Each document is self-contained
- Cross-references create a knowledge graph
- Templates ensure consistency

### 3. **Compliance-Aware**
- Legal implications documented alongside technical choices
- RGPD/GDPR considerations integrated, not appended
- Security patterns explained and justified

### 4. **Living Documentation**
- Updated with code changes
- Auto-generated where possible
- Versioned and changelog-tracked

### 5. **Exemplary Quality**
- Serves as a reference for other projects
- Multilingual by design
- Accessible to technical and non-technical audiences

---

## 🚀 Quick Start

### For Developers

1. Read [Project Overview](./FR/00-introduction/00-overview.md)
2. Understand the [Meta-Kernel concept](./FR/01-architecture/01-meta-kernel.md)
3. Follow the [Module Creation Guide](./FR/03-guides/creating-a-module.md)
4. Review the [Module Template](https://github.com/YourOrg/lexorbital-template-module)

### For Architects

1. Review [Architecture Philosophy](./FR/01-architecture/00-philosophy.md)
2. Study [Orbital Architecture Pattern](./FR/01-architecture/02-orbital-pattern.md)
3. Explore [Module Types](./FR/01-architecture/04-module-types.md)
4. Understand [Integration Patterns](./FR/01-architecture/05-integration-patterns.md)

### For Compliance Officers

1. Read [Compliance Overview](./FR/02-compliance/00-overview.md)
2. Study [RGPD by Design](./FR/02-compliance/01-rgpd-by-design.md)
3. Review [Privacy Patterns](./FR/02-compliance/02-privacy-patterns.md)
4. Check [Audit & Logging](./FR/02-compliance/03-audit-logging.md)

---

## 📝 Documentation Standards

### File Naming

- **Numerical prefix** for ordering: `00-`, `01-`, `02-`
- **Kebab-case** for readability: `meta-kernel.md`, `privacy-patterns.md`
- **Descriptive names** that reflect content

### Markdown Conventions

- **H1** for document title (one per file)
- **H2-H6** for hierarchical structure
- **Code blocks** with language specified
- **Callouts** for important notes (using blockquotes with emoji)
- **Tables** for structured data
- **Links** using relative paths

### Diagrams

- **Mermaid** for flowcharts and sequence diagrams
- **Excalidraw** for conceptual illustrations
- **PlantUML** for UML diagrams
- **ASCII art** for simple terminal-friendly visuals

---

## 🤝 Contributing to Documentation

Documentation improvements are always welcome! See [Contributing Guide](./FR/05-contributing/documentation.md).

### What to Contribute

- **Fix typos and clarity issues**
- **Add missing examples**
- **Translate content** (EN ↔ FR)
- **Create new guides** for common tasks
- **Improve diagrams** and visual explanations
- **Add cross-references** between related topics

### How to Contribute

1. Fork the repository
2. Create a branch: `docs/your-improvement`
3. Follow the documentation standards
4. Submit a pull request
5. Request review from maintainers

---

## 📊 Documentation Roadmap

### ✅ Phase 1: Foundation (Current)

- [x] Documentation structure
- [x] French landing pages
- [ ] Core architecture documents
- [ ] Basic compliance guides

### 🚧 Phase 2: Completion

- [ ] Complete all FR sections
- [ ] English translations
- [ ] Module documentation templates
- [ ] API reference generation

### 🔮 Phase 3: Enhancement

- [ ] Interactive diagrams
- [ ] Video tutorials
- [ ] Advanced guides
- [ ] Community contributions

---

## 📚 External Resources

- [LexOrbital Main Repository](https://github.com/YourOrg/lexorbital-core)
- [Module Template](https://github.com/YourOrg/lexorbital-template-module)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [Security Policy](../SECURITY.md)

---

## 📄 License

This documentation is licensed under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

The LexOrbital code is licensed under [MIT License](../LICENSE).

---

<div align="center">

**[⬆️ Back to Top](#-lexorbital-documentation)**

Made with 🚀 by the LexOrbital community

</div>

