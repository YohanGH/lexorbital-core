# Fiche n°6 : Template module (Husky, commits, SemVer)

> Le **template LexOrbital** (`lexorbital-template-module`) fournit une structure standardisée pour créer des modules : configuration Git (Husky), commits conventionnels, tests, CI/CD et manifestes RGPD pré-configurés.

## 1. Objectif de la fiche

Décrire la structure et l'outillage du template de module LexOrbital, permettant aux développeurs de démarrer rapidement tout en respectant les standards de qualité (linting, tests, commits, versioning).

## 2. Concepts et décisions clés

### 2.1. Pourquoi un template ?

#### Problèmes sans template

- 🔄 **Duplication de configuration** : chaque module réinvente la roue (ESLint, Prettier, Husky)
- 📝 **Commits incohérents** : pas de standard de messages (debug, fix bug, etc.)
- 🐛 **Qualité variable** : certains modules ont des tests, d'autres non
- 📦 **Versioning anarchique** : 1.0.0 → 2.5.3 sans justification

#### Avantages du template LexOrbital

- ✅ **Standardisation** : tous les modules ont la même structure
- ✅ **Quality gates** : impossible de commit sans lint/tests
- ✅ **Versioning automatique** : SemVer calculé depuis les commits
- ✅ **Conformité RGPD** : manifeste pré-configuré à remplir

### 2.2. Structure du template

```
lexorbital-template-module/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Tests + lint sur PR
│       ├── release.yml               # Publication automatique (npm/GitHub)
│       └── docs.yml                  # Génération doc Pandoc
├── .husky/
│   ├── pre-commit                    # Lint-staged (ESLint + Prettier)
│   ├── commit-msg                    # Validation Conventional Commits
│   └── pre-push                      # Tests avant push
├── docs/
│   ├── README.md                     # Documentation du module
│   ├── 00_getting-started.md
│   ├── 01_api-reference.md
│   └── templates/
│       ├── lexorbital.html
│       └── pandoc.css
├── src/
│   ├── index.ts                      # Point d'entrée principal
│   ├── module.ts                     # Classe NestJS Module
│   ├── services/
│   ├── controllers/
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── lexorbital.module.json            # Manifeste technique
├── rgpd-manifest.json                # Manifeste RGPD
├── package.json                      # Dépendances + scripts
├── tsconfig.json                     # Configuration TypeScript
├── eslint.config.cjs                 # ESLint flat config
├── .prettierrc                       # Prettier config
├── commitlint.config.ts              # Commitlint (Conventional Commits)
├── CHANGELOG.md                      # Changelog auto-généré
└── README.md                         # Documentation principale
```

## 3. Implications techniques

### 3.1. Git Hooks avec Husky

#### Installation

```bash
pnpm install
pnpm prepare
```

### 3.2. Conventional Commits → SemVer automatique

#### Format des commits

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Exemples** :

```
feat(auth): add OAuth2 support

Implements OAuth2 authorization code flow with PKCE.

BREAKING CHANGE: AuthService.login() signature changed
```

```
fix(audit): correct retention policy calculation

Fixes #123
```

#### Génération automatique de version (semantic-release)

**Règles de versioning** :

- `fix:` → **PATCH** (1.0.0 → 1.0.1)
- `feat:` → **MINOR** (1.0.0 → 1.1.0)
- `BREAKING CHANGE:` → **MAJOR** (1.0.0 → 2.0.0)

### 3.3. Tests automatisés

- vitest
- supertest

#### Structure des tests

```
tests/
├── unit/
│   ├── services/
│   │   └── auth.service.spec.ts
│   └── controllers/
│       └── auth.controller.spec.ts
├── integration/
│   └── auth-flow.spec.ts
└── e2e/
    └── auth.e2e-spec.ts
```

## 5. À retenir

- **Husky** : hooks Git automatiques (lint, tests, commits)
- **Conventional Commits** : format standardisé (`feat:`, `fix:`, etc.)
- **Semantic Release** : versioning SemVer automatique
- **Tests obligatoires** : coverage minimum 80% (configuré dans Vitest)
- **CI/CD** : GitHub Actions pour tests + release automatique

## 6. Liens connexes

- [[04_manifestes-lexorbital]] : Format des manifestes à remplir
- [[07_workflow-subtree]] : Comment amarrer un module via git subtree
- [[08_modules-types]] : Catalogue des modules existants
- [[03_documentation-et-diagrammes-vivants]] : Génération doc avec Pandoc
