# 03 · Guides Pratiques

> **Tutoriels pas-à-pas pour créer, intégrer, tester et déployer des modules LexOrbital.**

---

## 📖 Dans cette section

| Document                                         | Description                              | Niveau   |
| ------------------------------------------------ | ---------------------------------------- | -------- |
| [**01 - Démarrage rapide**](./01-quick-start.md) | Installer et lancer votre premier module | Débutant |

---

## 🎯 Objectifs de cette section

Cette section vous guide **étape par étape** pour :

1. **Démarrer** avec LexOrbital rapidement

---

## 🚀 Quick Start

### Prérequis

- **Node.js** ≥ 18
- **pnpm** ou **npm**
- **Docker** (optionnel mais recommandé)
- **Git**

### Installation rapide

```bash
# Cloner le projet
git clone https://github.com/YourOrg/lexorbital-core.git
cd lexorbital-core

# Installer les dépendances
pnpm install

# Lancer le projet
docker-compose up
```

➡️ Voir [Démarrage rapide](./01-quick-start.md) pour plus de détails.

---

## 📦 Créer un module en 5 étapes

### Étape 1 : Cloner le template

```bash
git clone https://github.com/YourOrg/lexorbital-template-module.git my-module
cd my-module
```

### Étape 2 : Configurer le manifest

Éditer `module.json` :

```json
{
  "name": "my-module",
  "version": "1.0.0",
  "type": "back",
  "entry": "./dist/index.js"
}
```

### Étape 3 : Implémenter

Coder dans `src/` :

```typescript
// src/index.ts
export const MyModule = {
  init() {
    console.log("MyModule initialized")
  },
}
```

### Étape 4 : Tester

```bash
pnpm test
```

### Étape 5 : Documenter

Éditer `README.md` du module.

➡️ Voir [Créer un module](./02-creating-a-module.md) pour le guide complet.

---

## 🔧 Intégrer un module via git subtree

### Ajouter un module

```bash
git subtree add \
  --prefix=modules/my-module \
  git@github.com:user/lexorbital-module-my-module.git \
  main --squash
```

### Mettre à jour un module

```bash
git subtree pull \
  --prefix=modules/my-module \
  git@github.com:user/lexorbital-module-my-module.git \
  main --squash
```

➡️ Voir [Workflow Git subtree](./04-git-subtree-workflow.md) pour plus de détails.

---

## 🧪 Tester un module

### Tests unitaires

```bash
pnpm test:unit
```

### Tests d'intégration

```bash
pnpm test:integration
```

### Tests E2E

```bash
pnpm test:e2e
```

➡️ Voir [Tester un module](./06-testing-modules.md) pour le guide complet.

---

## 🐳 Déployer avec Docker

### Build de l'image

```bash
docker build -t my-module:latest .
```

### Lancer le conteneur

```bash
docker run -p 3000:3000 my-module:latest
```

### Orchestration multi-modules

```bash
docker-compose up
```

➡️ Voir [Déployer avec Docker](./08-docker-deployment.md) pour le guide complet.

---

## 📚 Ressources complémentaires

### Documentation interne

- [Template de module](https://github.com/YourOrg/lexorbital-template-module)
- [Manifest de module](../04-reference/01-module-manifest.md)
- [Types de modules](../01-architecture/04-module-types.md)

### Ressources externes

- [Git Subtree Documentation](https://git-scm.com/book/en/v2/Git-Tools-Subtree-Merging)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

<div align="center">

**[⬅️ Conformité](../02-compliance/README.md)** | **[⬆️ Sommaire](../README.md)** | **[Suivant : Référence →](../04-reference/README.md)**

</div>
