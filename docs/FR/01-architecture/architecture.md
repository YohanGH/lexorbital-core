# Architecture de LexOrbital Core

> L'architecture orbitale de LexOrbital organise les composants en **anneaux concentriques** autour d'un **Meta-Kernel** central, permettant une orchestration cohérente tout en garantissant l'isolation et la modularité.

## 1. Objectif de la fiche

Décrire en détail l'organisation en couches (anneaux) de LexOrbital, le rôle du Meta-Kernel et les principes de communication entre modules. Cette fiche est la référence technique pour comprendre comment les modules s'intègrent à la station.

## 2. Concepts et décisions clés

### 2.1. Le Meta-Kernel : cerveau de la station

Le **Meta-Kernel** est le noyau central de LexOrbital. Il assure :

#### Orchestration des modules

- Découverte automatique des modules (via manifestes)
- Gestion du cycle de vie : initialisation, health checks, graceful shutdown
- Injection de dépendances inter-modules

#### Configuration centralisée

- Variables d'environnement par anneau/module
- Secrets management (intégration Vault/K8s secrets)
- Feature flags et configuration dynamique

#### Routage et communication

- Event bus (événements inter-modules)
- API Gateway interne (routage HTTP)
- Gestion des droits d'accès (ACL par module)

### 2.2. Les anneaux fonctionnels

#### Meta-Kernel

- **Responsabilité** : Orchestration, configuration, health
- **Technologies** : NestJS, TypeORM, Bull (queues)
- **Modules** : `core-kernel`, `config-manager`, `module-loader`

### 2.3. Principes de communication

#### Communication synchrone (HTTP/RPC)

```typescript
// Module A appelle Module B via le Meta-Kernel
const result = await this.metaKernel.invoke("module-b", "methodName", params)
```

#### Communication asynchrone (Event Bus)

```typescript
// Module A émet un événement
this.eventBus.emit('dossier.created', { dossierId: '123' });

// Module B écoute l'événement
@OnEvent('dossier.created')
handleDossierCreated(payload: { dossierId: string }) {
  // Logique de réaction
}
```

#### Isolation et sandbox

- Chaque module tourne dans son propre contexte (DI isolé)
- Les modules ne se chargent **jamais** directement entre eux
- Toutes les communications passent par le Meta-Kernel

## 3. Implications techniques

### 3.2. Structure du Meta-Kernel

```
meta-kernel/
├── src/
│   ├── frontend/
│   ├── backend/
│   ├── infra/
│   ├── modules/
│   │   └── [modules amarrés dynamiquement]
│   └── main.ts
├── config/
│   ├── manifests/                   # Manifestes des modules chargés
└── package.json
```

### 3.3. Cycle de vie d'un module

1. **Découverte** : Le Meta-Kernel scanne `manifests/` au démarrage
2. **Validation** : Vérification du manifeste (`lexorbital.module.json`)
3. **Chargement** : Import dynamique du module (ESM)
4. **Injection** : Fourniture des services du kernel (eventBus, config, etc.)
5. **Initialisation** : Appel du hook `onModuleInit()`
6. **Santé** : Polling du endpoint `/health` du module
7. **Arrêt** : Appel du hook `onModuleDestroy()` lors du shutdown
