# Architecture de LexOrbital Core

## Vue d'ensemble

**LexOrbital Core** est le Meta-Kernel du système LexOrbital. Il consiste en :

- **BackRing** : API backend qui orchestre les modules
- **FrontRing** : Console frontend pour visualiser et contrôler le système
- **Infrastructure** : Docker Compose pour l'environnement local
- **Modules** : Répertoire qui recevra les modules intégrés via git subtree

## Structure du Repository

```
lexorbital-core/
├── backend/          # BackRing - API Express (Node/TS)
├── frontend/         # FrontRing - Console React (Vite/TS)
├── infra/            # Docker Compose pour développement local
├── modules/          # Modules intégrés via git subtree (vide pour la POC)
├── docs/             # Documentation
└── ...
```

## BackRing (backend/)

### Rôle

Le BackRing est le cœur de l'orchestration des modules. Il expose une API REST qui permet :

- De vérifier le statut du système (`/health`)
- De lister les modules disponibles (`/modules`)
- De charger et orchestrer les modules (à venir)

### Endpoints (POC V1)

- `GET /health` → Retourne `{ status: "ok", service: "lexorbital-core" }`
- `GET /modules` → Retourne une liste mockée de modules

### Technologies

- Node.js 20+
- TypeScript (strict)
- Express
- CORS

## FrontRing (frontend/)

### Rôle

Le FrontRing est la console orbitale qui permet de visualiser l'état du système.

### Fonctionnalités (POC V1)

- Affiche le statut de `/health`
- Liste les modules retournés par `/modules`
- Rafraîchit automatiquement toutes les 5 secondes

### Technologies

- React 18
- TypeScript (strict)
- Vite
- Pas de framework UI (styles inline pour la POC)

## Infrastructure (infra/)

### Docker Compose

Le fichier `docker-compose.local.yml` permet de lancer :

- `core-back` : BackRing sur le port 4000
- `core-front` : FrontRing sur le port 3000

Les deux services partagent un réseau Docker pour communiquer.

### Utilisation

```bash
cd infra
docker-compose -f docker-compose.local.yml up
```

## Modules (modules/)

### Rôle

Ce répertoire accueillera les modules LexOrbital intégrés via **git subtree**.

### Intégration

Chaque module est développé dans un dépôt séparé (`lexorbital-module-<name>`) puis intégré ici via `git subtree`.

### Format

Chaque module doit exposer un `module.json` à sa racine avec les métadonnées nécessaires (nom, version, type, endpoints, contrats).

### POC V1

Pour la POC V1, les modules sont **mockés** directement dans le BackRing.  
La lecture réelle des manifests viendra dans une version ultérieure.

## État actuel (POC V1)

### ✅ Implémenté

- BackRing avec endpoints `/health` et `/modules` (mocké)
- FrontRing avec console minimale affichant le statut et les modules
- Docker Compose pour lancer l'infrastructure locale
- Structure de base avec documentation

### 🔄 À venir

- Lecture réelle des manifests `module.json` depuis `modules/`
- Chargement dynamique des modules
- Contrats et validation des modules
- Gestion des dépendances entre modules
- Système de plugins pour étendre les fonctionnalités

## Design Diegétique

Le système suit une métaphore "orbitale" :

- **Meta-Kernel** = Étoile centrale
- **Rings** (Back/Front) = Anneaux autour du noyau
- **Modules** = Vaisseaux/satellites qui orbitent autour du système

Cette architecture permet une séparation claire des responsabilités et une modularité forte.
