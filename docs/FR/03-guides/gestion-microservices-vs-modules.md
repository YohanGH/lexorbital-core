# Gestion des modules : Microservices & modules plug'n'play

> LexOrbital adopte une approche **modulaire monolithique** (modules plug'n'play dans un seul runtime) plutôt qu'une architecture microservices distribuée, pour réduire la complexité opérationnelle tout en conservant la modularité.

## 1. Objectif de la fiche

Clarifier les différences entre l'approche microservices classique et l'architecture modulaire de LexOrbital, justifier ce choix architectural et identifier les cas où chaque approche est pertinente.

## 2. Concepts et décisions clés

### 2.1. Architecture microservices : forces et limites

#### Forces
- **Isolation forte** : chaque service a son propre runtime, base de données, cycle de déploiement
- **Scalabilité indépendante** : on peut scaler uniquement les services sous charge
- **Résilience** : la panne d'un service n'affecte pas les autres (en théorie)
- **Polyglot** : chaque service peut utiliser une stack différente

#### Limites (qui motivent LexOrbital)
- **Complexité opérationnelle** : orchestration (Kubernetes), service mesh (Istio), observabilité distribuée
- **Latence réseau** : chaque appel inter-service passe par le réseau (sérialisation, désérialisation)
- **Transactions distribuées** : gestion complexe de la cohérence (Saga pattern, eventual consistency)
- **Overhead infrastructure** : chaque service a besoin de son propre conteneur, monitoring, logs
- **Déploiement** : coordination des versions, rolling updates, rollback multi-services

### 2.2. Modules plug'n'play LexOrbital : principes

#### Un seul runtime, plusieurs modules
- Tous les modules tournent dans **le même process Node.js** (NestJS)
- Communication **in-memory** (appels de fonctions directs ou event bus local)
- **Pas de sérialisation réseau** pour les appels inter-modules

#### Isolation logique, pas physique
- Chaque module a son propre **contexte DI** (Dependency Injection)
- Les modules ne s'importent **jamais** directement : tout passe par le Meta-Kernel
- Sandboxing possible via **VM contexts** ou **Worker Threads** pour les modules non-trustés

#### Déploiement simplifié
- **Un seul déploiement** pour l'ensemble de la station
- Ajout/retrait de modules sans redémarrage (hot reload)
- Git subtree pour gérer les sources de modules externes

### 2.3. Tableau comparatif

| Critère                     | Microservices              | Modules LexOrbital         |
|-----------------------------|----------------------------|----------------------------|
| **Isolation**               | Processus séparés          | Contextes DI isolés        |
| **Communication**           | HTTP/gRPC (réseau)         | Appels in-memory           |
| **Transactions**            | Saga / 2PC                 | ACID natif (même DB)       |
| **Latence inter-modules**   | ~5-50ms (réseau)           | <1ms (mémoire)             |
| **Scalabilité**             | Indépendante par service   | Verticale (toute la station)|
| **Complexité ops**          | Élevée (K8s, mesh, etc.)   | Faible (monolithe)         |
| **Déploiement**             | Multi-pipelines            | Pipeline unique            |
| **Debugging**               | Distribué (tracing)        | Local (stack trace simple) |
| **Polyglot**                | Oui                        | Non (JavaScript/TypeScript)|
| **Résilience**              | Indépendance des pannes    | Redémarrage global         |

## 3. Implications techniques

### 3.1. Quand choisir LexOrbital (modules)

✅ **Cas d'usage adaptés** :
- Applications **monométier** ou **mono-tenant** avec forte cohésion fonctionnelle
- Équipes de **petite à moyenne taille** (pas de silos organisationnels)
- Besoins de **transactions complexes** entre modules (cohérence forte)
- Infrastructure **limitée** (pas de K8s, pas d'équipe DevOps dédiée)
- **Latence critique** (finance, temps réel) où chaque milliseconde compte

### 3.2. Quand privilégier les microservices

✅ **Cas d'usage adaptés** :
- **Très grande échelle** (centaines de développeurs, dizaines de services)
- Besoins de **scalabilité hétérogène** (certains services x100, d'autres x1)
- **Multi-tenant** avec isolation forte par client
- Équipes **autonomes** avec ownership fort (chacun son service, son déploiement)
- Stack **polyglot** nécessaire (Python pour ML, Go pour perf, etc.)

### 3.3. Approche hybride (future évolution LexOrbital)

LexOrbital pourrait évoluer vers un **modèle hybride** :

```
┌───────────────────────────────────────┐
│   Station LexOrbital (Meta-Kernel)    │  ← Core + modules métier (in-memory)
│   ├── Auth Module                     │
│   ├── Audit Module                    │
│   ├── Dossiers Module                 │
│   └── Documents Module                │
└───────────────────────────────────────┘
            ↓ HTTP/gRPC
┌───────────────────────────────────────┐
│   Microservices externes (optionnels) │  ← Services haute performance
│   ├── OCR Service (Python + Tesseract)│
│   ├── ML Service (TensorFlow)         │
│   └── Search Service (Elasticsearch)  │
└───────────────────────────────────────┘
```

**Principe** : garder le cœur métier en modules (faible latence, transactions), externaliser les services spécialisés (ML, recherche, traitement lourd).

## 5. À retenir

- LexOrbital privilégie les **modules in-memory** pour la simplicité et les performances
- Les microservices restent pertinents pour les **services spécialisés** (ML, OCR, etc.)
- L'approche modulaire réduit drastiquement la **complexité opérationnelle**
- Possible d'évoluer vers un **modèle hybride** si besoin futur de scalabilité hétérogène

## 6. Liens connexes

- [[01_architecture-orbitale]] : Détails techniques de l'architecture modulaire
- [[08_modules-types]] : Catalogue des modules et leur périmètre
- [[03_documentation-et-diagrammes-vivants]] : Comment documenter les dépendances entre modules
