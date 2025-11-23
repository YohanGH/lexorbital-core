# Glossaire LexOrbital

> **Vocabulaire technique et conceptuel de la station orbitale.**

---

## 🔤 Termes architecturaux

### Meta-Kernel

**Définition :** Noyau central de configuration et de lois qui régit l'ensemble de l'écosystème LexOrbital.

**Rôle :**

- Définit les conventions (API, logs, sécurité)
- Intègre les règles RGPD by-design
- Fournit la configuration globale (secrets, environnements)
- Expose les contrats que les modules doivent respecter

**Métaphore :** Le centre de gravité de la station orbitale, qui définit les "lois physiques" du système.

**Alias :** Core, Kernel, LexOrbitalCore

---

### Anneaux de connexion / Rings

**Définition :** Interfaces standardisées qui permettent aux modules de se connecter au système.

**Types :**

- **FrontRing** : Interface pour modules front (React, UI)
- **BackRing** : Interface pour modules back (API, BDD, services)

**Rôle :**

- Fournir des points d'entrée standardisés
- Définir les contrats d'intégration
- Gérer le cycle de vie des modules (init, mount, unmount)

**Métaphore :** Anneaux d'amarrage d'une station spatiale, où les vaisseaux se connectent.

**Alias :** Connection Rings, Docking Rings

---

### Module-vaisseau / Module

**Définition :** Service autonome, remplaçable et faiblement couplé qui s'intègre via les anneaux.

**Caractéristiques :**

- **Autonome** : peut être cloné, testé, dockerisé indépendamment
- **Remplaçable** : peut être déconnecté/remplacé sans affecter les autres
- **Versionné** : suit SemVer, publiable sur npm/GitHub Packages
- **Contractuel** : expose un manifest déclarant ses capacités

**Exemples :** `lexorbital-module-auth`, `lexorbital-module-audit`, `lexorbital-module-ui-kit`

**Métaphore :** Vaisseau qui s'arrime à la station, reste autonome, peut repartir.

**Alias :** Module, Vessel, Plugin

---

### Manifest de module

**Définition :** Fichier déclaratif (JSON/TypeScript) qui décrit un module.

**Contient :**

- Nom, version, type (front/back/infra)
- Points d'entrée (main, exports)
- Dépendances
- Capacités (API exposées, hooks, événements)
- Manifest RGPD (optionnel)

**Exemple :**

```json
{
  "name": "auth",
  "version": "1.0.0",
  "type": "back",
  "entry": "./dist/index.js",
  "dependencies": ["database", "logger"],
  "rgpd": {
    "dataTypes": ["email", "password_hash"],
    "retention": "2 years",
    "encryption": true
  }
}
```

**Alias :** Module descriptor, Module contract

---

## 📐 Termes techniques

### Git Subtree

**Définition :** Mécanisme Git qui permet d'intégrer un repository externe comme sous-dossier d'un autre repository.

**Usage dans LexOrbital :**

- Les modules vivent dans leurs propres repos
- `lexorbital-core` les intègre via `git subtree`
- Permet de voir le code source dans le projet fil rouge
- Permet de mettre à jour les modules (`git subtree pull`)

**Commande type :**

```bash
git subtree add --prefix=modules/auth \
  git@github.com:user/lexorbital-module-auth.git \
  main --squash
```

**Alias :** Subtree, Git integration

---

### Docker Compose / Orchestration

**Définition :** Outil pour définir et exécuter des applications multi-conteneurs.

**Usage dans LexOrbital :**

- Chaque module a un `Dockerfile` autonome
- `lexorbital-core` a un `docker-compose.yml` qui orchestre tous les modules
- Permet de lancer la station complète en une commande

**Alias :** Composition, Multi-container orchestration

---

### CI/CD

**Définition :**

- **CI (Continuous Integration)** : automatisation des tests et builds
- **CD (Continuous Deployment)** : automatisation du déploiement

**Usage dans LexOrbital :**

- Chaque module a un workflow CI (`.github/workflows/ci.yml`)
- `lexorbital-core` peut avoir un workflow CD pour déployer la station

**Alias :** Pipeline, Automation

---

## ⚖️ Termes juridiques et conformité

### RGPD / GDPR

**Définition :** Règlement Général sur la Protection des Données (UE).

**Principes intégrés dans LexOrbital :**

- Minimisation des données
- Consentement explicite
- Droit d'accès, rectification, oubli
- Chiffrement et sécurité
- Journalisation et traçabilité
- Durée de conservation (TTL)

**Alias :** Data protection, Privacy by design

---

### Privacy by Design

**Définition :** Approche qui intègre la protection des données dès la conception du système.

**Application dans LexOrbital :**

- Le Meta-Kernel impose des règles RGPD
- Les modules héritent de ces contraintes
- Les manifestes RGPD documentent les traitements

**Alias :** Privacy-first, Data protection by design

---

### Security by Default

**Définition :** Approche qui active la sécurité par défaut (pas en option).

**Application dans LexOrbital :**

- Chiffrement activé par défaut
- Validation stricte des entrées
- Sanitisation automatique
- Rate limiting
- HTTPS obligatoire en production

**Alias :** Secure by default, Security-first

---

### TTL (Time To Live)

**Définition :** Durée de vie maximale d'une donnée avant suppression automatique.

**Usage dans LexOrbital :**

- Chaque type de donnée a un TTL défini
- Les modules de nettoyage automatique suppriment les données expirées
- Conforme RGPD (minimisation de la durée de conservation)

**Exemple :** Logs conservés 1 an, tokens de session 24h, données utilisateur 2 ans après inactivité.

**Alias :** Data retention, Expiration policy

---

## 🎨 Termes conceptuels

### Architecture orbitale

**Définition :** Pattern architectural inspiré des stations spatiales : un noyau central, des anneaux d'amarrage, des modules détachables.

**Avantages :**

- **Modularité** : ajout/retrait facile de modules
- **Évolutivité** : modules indépendants, scalables séparément
- **Maintenabilité** : isolation des responsabilités
- **Réutilisabilité** : modules utilisables dans d'autres projets

**Alias :** Modular architecture, Plugin architecture

---

### Forma platonicienne

**Définition :** Concept philosophique de Platon : les idées pures (Formes) précèdent les objets concrets.

**Application dans LexOrbital :**

- Le Meta-Kernel définit la _Forma_ (les lois)
- Les modules sont les _participations_ (les implémentations concrètes)
- L'architecture précède le code

**Alias :** Platonic Form, Essence vs Implementation

---

### Vision galiléenne / Dynamique

**Définition :** Les modules peuvent "orbiter" autour du noyau, se déplacer, évoluer, tant qu'ils respectent les lois du noyau.

**Application dans LexOrbital :**

- Modules autonomes, mobiles, détachables
- Évolution indépendante (versioning)
- Stabilité du centre, liberté de la périphérie

**Alias :** Dynamic modules, Orbital dynamics

---

## 🛠️ Termes méthodologiques

### Convention over Configuration

**Définition :** Privilégier des conventions par défaut plutôt que de tout configurer.

**Application dans LexOrbital :**

- Structure de dossiers standardisée
- Naming conventions (kebab-case, prefixes)
- Manifests avec schémas par défaut

**Alias :** Sensible defaults, Standard conventions

---

### SemVer (Semantic Versioning)

**Définition :** Système de versioning : `MAJOR.MINOR.PATCH`

- **MAJOR** : changements incompatibles
- **MINOR** : nouvelles fonctionnalités compatibles
- **PATCH** : corrections de bugs

**Application dans LexOrbital :**

- Tous les modules suivent SemVer
- `standard-version` automatise le changelog

**Exemple :** `1.2.3` → `1.3.0` (ajout feature), `2.0.0` (breaking change)

**Alias :** Versioning, Release management

---

### Conventional Commits

**Définition :** Format standardisé de messages de commit.

**Format :** `type(scope): subject`

**Types :**

- `feat`: nouvelle fonctionnalité
- `fix`: correction de bug
- `docs`: documentation
- `refactor`: refactoring
- `test`: tests
- `chore`: tâches techniques

**Application dans LexOrbital :**

- Tous les repos utilisent Conventional Commits
- Husky + commitlint forcent le format
- `standard-version` génère le changelog automatiquement

**Exemple :** `feat(auth): add OAuth2 support`

**Alias :** Commit conventions, Structured commits

---

## 📚 Termes liés à la documentation

### ADR (Architecture Decision Record)

**Définition :** Document qui capture une décision architecturale importante.

**Structure :**

- Contexte
- Décision
- Conséquences
- Alternatives envisagées

**Usage dans LexOrbital :**

- Documenter les choix techniques majeurs
- Justifier les patterns choisis
- Historique des décisions

**Alias :** Decision log, Technical decision

---

### Living Documentation

**Définition :** Documentation qui évolue avec le code, souvent auto-générée.

**Application dans LexOrbital :**

- Diagrammes générés depuis le code (Mermaid)
- API docs générées (TypeDoc, OpenAPI)
- Changelogs automatiques

**Alias :** Dynamic documentation, Auto-generated docs

---

## 🔗 Voir aussi

- [Architecture orbitale](../01-architecture/02-orbital-pattern.md)
- [RGPD by design](../02-compliance/01-rgpd-by-design.md)
- [Créer un module](../03-guides/02-creating-a-module.md)

---

<div align="center">

**[⬅️ Vue d'ensemble](./00-overview.md)** | **[⬆️ Introduction](./README.md)** | **[Suivant : Origine du projet →](./03-origin-story.md)**

</div>
