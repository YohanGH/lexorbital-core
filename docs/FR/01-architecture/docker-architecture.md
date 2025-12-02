# Architecture Docker RGPD-Compliant

**Isolation · Multi-stage builds · Sécurité par design**

> 📘 **Contexte RGPD**  
> Ce guide explique l'architecture Docker de LexOrbital, conçue pour garantir l'isolation totale des services et la conformité RGPD dès la conception.

---

## 🧩 1. Pourquoi deux Dockerfiles pour le frontend ?

### 1.1 Dockerfile (Production)

**Rôle** : Image optimisée pour la production avec nginx

**Caractéristiques** :

- ✅ Multi-stage build (réduction de taille finale)
- ✅ Serveur nginx pour servir les assets statiques
- ✅ Optimisations de sécurité et performance
- ✅ Image finale légère (~50MB vs ~500MB avec Node)

**Utilisation** : Déploiement en production, CI/CD

### 1.2 Dockerfile.dev (Développement)

**Rôle** : Environnement de développement avec hot-reload

**Caractéristiques** :

- ✅ Serveur de développement Vite intégré
- ✅ Hot-reload automatique (modifications visibles instantanément)
- ✅ Volumes montés pour le code source
- ✅ Outils de développement inclus

**Utilisation** : Développement local avec `docker-compose`

> 💡 **Standard LexOrbital**  
> La séparation dev/prod garantit que les outils de développement ne sont jamais inclus en production, réduisant la surface d'attaque et la taille des images.

---

## 🧩 2. Multi-stage builds : AS builder et AS production

### 2.1 Concept du multi-stage build

Un **multi-stage build** permet d'utiliser plusieurs images Docker dans un même Dockerfile, en ne gardant que le résultat final.

```
┌─────────────────┐
│ Stage 1: Builder│  ← Node.js + outils de build
│  - Install deps │
│  - Build app    │
│  - Génère /dist │
└────────┬────────┘
         │ COPY --from=builder
         ▼
┌─────────────────┐
│ Stage 2: Prod   │  ← nginx léger
│  - Copie /dist  │
│  - Configure    │
│  - Image finale │
└─────────────────┘
```

### 2.2 Avantages pour la sécurité RGPD

| Avantage                      | Impact RGPD                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| **Réduction de taille**       | Moins de composants = moins de vulnérabilités potentielles            |
| **Isolation des outils**      | Les outils de build (Node, npm, etc.) ne sont pas dans l'image finale |
| **Surface d'attaque réduite** | Seul nginx est exposé, pas Node.js ni les dépendances de dev          |
| **Reproductibilité**          | Builds identiques grâce au frozen lockfile                            |

**Résultat** :

- Image builder : ~500MB (Node.js + dépendances)
- Image production : ~50MB (nginx + assets statiques)
- **Réduction de 90%** de la taille et de la surface d'attaque

---

## 🧩 3. Explication des directives Docker

### 3.1 ARG (Arguments de build)

**Définition** : Variables passées au moment du build (pas disponibles à l'exécution)

```dockerfile
ARG UID=1001
ARG GID=1001
```

**Utilisation** :

- Permet de personnaliser l'UID/GID de l'utilisateur non-root
- Peut être surchargé : `docker build --build-arg UID=2000 .`
- **Sécurité RGPD** : Garantit que le conteneur ne s'exécute pas en root

**Exemple d'utilisation** :

```dockerfile
ARG UID=1001
RUN adduser -u $UID -S appuser
```

### 3.2 LABEL (Métadonnées)

**Définition** : Métadonnées attachées à l'image Docker

```dockerfile
LABEL org.opencontainers.image.title="LexOrbital FrontRing"
LABEL compliance.rgpd="by-design"
LABEL compliance.cnil="compliant"
```

**Utilisation RGPD** :

- **Traçabilité** : Identifie l'origine et la version de l'image
- **Conformité** : Déclare explicitement la conformité RGPD
- **Audit** : Permet de scanner et vérifier les images
- **Gouvernance** : Facilite la gestion des images en production

**Labels recommandés pour RGPD** :

```dockerfile
LABEL org.opencontainers.image.version="0.1.0"      # Version
LABEL org.opencontainers.image.vendor="LexOrbital"  # Éditeur
LABEL compliance.rgpd="by-design"                    # Conformité RGPD
LABEL security.scanning="enabled"                   # Scanning activé
LABEL data.location="EU"                            # Localisation données
```

### 3.3 HEALTHCHECK (Vérification de santé)

**Définition** : Commande exécutée périodiquement pour vérifier que le conteneur fonctionne

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1
```

**Paramètres** :

- `--interval=30s` : Vérifie toutes les 30 secondes
- `--timeout=3s` : Timeout de 3 secondes par vérification
- `--start-period=5s` : Période de grâce au démarrage (5 secondes)
- `--retries=3` : 3 échecs consécutifs = conteneur unhealthy

**Impact RGPD** :

- **Disponibilité** : Garantit que le service est accessible
- **Monitoring** : Permet de détecter les pannes rapidement
- **Conformité** : Assure la disponibilité des données (article 32 RGPD)

**État du conteneur** :

- `healthy` : Le healthcheck passe
- `unhealthy` : 3 échecs consécutifs
- `starting` : Pendant la période de grâce

---

## 🧩 4. Organisation des configurations nginx

### 4.1 Deux types de configurations nginx

Dans LexOrbital, il existe **deux types de configurations nginx** :

#### 📁 Configurations dans `frontend/nginx*.conf`

- **Rôle** : Nginx **dans le conteneur frontend**
- **Usage** : Servir les fichiers statiques compilés (HTML, CSS, JS)
- **Port** : 8080 (interne au conteneur)
- **Intégration** : Copiées dans l'image Docker lors du build
- **Fichiers** :
  - `nginx.conf` : Configuration du serveur virtuel
  - `nginx-main.conf` : Configuration principale nginx

#### 📁 Configurations dans `infra/nginx/`

- **Rôle** : Nginx **reverse-proxy** (service séparé)
- **Usage** : Router le trafic entre frontend et backend
- **Port** : 80/443 (exposé publiquement)
- **Intégration** : Monté comme volume dans un conteneur nginx séparé
- **Fichiers** :
  - `reverse-proxy.conf.example` : Template de configuration
  - `ssl/` : Certificats SSL (non versionnés)

### 4.2 Architecture complète

```
Internet (HTTPS:443)
   │
   ▼
┌─────────────────────┐
│ Reverse-Proxy Nginx │  ← infra/nginx/reverse-proxy.conf
│    (infra)          │     Route: / → frontend
└──────────┬──────────┘     Route: /api → backend
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌─────────┐
│ Frontend│  │ Backend  │
│ Nginx   │  │ Node.js  │
│(frontend)│  │(backend)│
│:8080    │  │:4000    │
└─────────┘  └─────────┘
```

### 4.3 Pourquoi cette organisation ?

| Aspect             | `frontend/nginx*.conf`           | `infra/nginx/`                             |
| ------------------ | -------------------------------- | ------------------------------------------ |
| **Responsabilité** | Service frontend uniquement      | Infrastructure globale                     |
| **Modification**   | Rebuild image frontend           | Redémarrage service reverse-proxy          |
| **Isolation**      | Configs encapsulées dans l'image | Configs partagées entre services           |
| **Sécurité**       | Moins de surface d'attaque       | Point d'entrée unique (TLS, rate limiting) |

> 💡 **Standard LexOrbital**  
> Les configs nginx du frontend restent dans `frontend/` car elles sont spécifiques au service. Les configs de reverse-proxy sont dans `infra/nginx/` pour centraliser la gestion de l'infrastructure.

---

## 🧩 5. Pourquoi nginx dans le Dockerfile frontend ?

### 5.1 Architecture de production

En production, une application frontend React/Vue/Angular est **compilée en fichiers statiques** (HTML, CSS, JS). Ces fichiers doivent être servis par un serveur web.

### 5.2 Pourquoi nginx et pas Node.js ?

| Critère         | nginx                            | Node.js (Vite dev server)             |
| --------------- | -------------------------------- | ------------------------------------- |
| **Taille**      | ~5MB                             | ~150MB                                |
| **Mémoire**     | ~10MB                            | ~100MB+                               |
| **Performance** | Optimisé pour fichiers statiques | Optimisé pour développement           |
| **Sécurité**    | Surface d'attaque minimale       | Plus de dépendances = plus de risques |
| **Hot-reload**  | Non (pas nécessaire en prod)     | Oui (utile en dev uniquement)         |

### 5.3 Avantages nginx pour RGPD

1. **Minimisation des données** :
   - nginx peut désactiver les logs d'accès (RGPD : minimisation)
   - Configuration RGPD-friendly dans `nginx.conf`

2. **Sécurité renforcée** :
   - Headers de sécurité (CSP, X-Frame-Options, etc.)
   - Protection contre les attaques courantes
   - Pas d'exécution de code côté serveur

3. **Performance** :
   - Cache des assets statiques
   - Compression gzip
   - Gestion efficace des connexions

### 5.4 Configuration RGPD dans nginx.conf

```nginx
# RGPD: Désactiver les logs d'accès (pas de collecte de données)
access_log off;

# RGPD: Headers de confidentialité
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# Sécurité: Headers de protection
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

---

## 🧩 6. Architecture docker-compose pour isolation RGPD

### 6.1 Principes d'isolation RGPD

| Principe                          | Implémentation Docker                        |
| --------------------------------- | -------------------------------------------- |
| **Séparation des données**        | Volumes dédiés par service                   |
| **Isolation réseau**              | Réseaux Docker séparés par zone              |
| **Principe de moindre privilège** | Utilisateurs non-root, capabilities limitées |
| **Chiffrement**                   | Volumes chiffrés, TLS obligatoire            |
| **Auditabilité**                  | Logs centralisés, labels de traçabilité      |

### 6.2 Architecture recommandée (zones de sécurité)

```
┌─────────────────────────────────────────────────────────┐
│                    Zone Frontend                        │
│  ┌──────────────┐                                       │
│  │ core-front   │  (nginx, port 8080)                  │
│  └──────────────┘                                       │
│         │                                               │
│         ▼                                               │
│  ┌──────────────┐                                       │
│  │ reverse-proxy│  (traefik/nginx, port 443)          │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│                    Zone Backend                         │
│  ┌──────────────┐                                       │
│  │ core-back    │  (Node.js, port 4000)                │
│  └──────────────┘                                       │
│         │                                               │
│         ▼                                               │
│  ┌──────────────┐                                       │
│  │ postgres     │  (port 5432, réseau interne)        │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Meilleures pratiques docker-compose RGPD

#### ✅ 1. Réseaux isolés par zone

```yaml
networks:
  frontend-network:
    driver: bridge
    internal: false # Accès Internet autorisé
  backend-network:
    driver: bridge
    internal: true # Pas d'accès Internet direct
  database-network:
    driver: bridge
    internal: true # Accès uniquement depuis backend
```

#### ✅ 2. Volumes chiffrés pour données sensibles

```yaml
volumes:
  postgres-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /secure/path/to/data
    # Chiffrement au niveau du système de fichiers
```

#### ✅ 3. Utilisateurs non-root

```yaml
services:
  core-back:
    user: "1001:1001" # UID:GID non-root
    security_opt:
      - no-new-privileges:true
```

#### ✅ 4. Limitation des ressources

```yaml
services:
  core-back:
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M
        reservations:
          cpus: "0.5"
          memory: 256M
```

#### ✅ 5. Secrets gérés séparément

```yaml
services:
  postgres:
    secrets:
      - postgres_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/postgres_password

secrets:
  postgres_password:
    external: true # Géré par Docker Swarm ou Vault
```

#### ✅ 6. Labels de conformité

```yaml
services:
  core-back:
    labels:
      - "compliance.rgpd=by-design"
      - "data.location=EU"
      - "data.retention=30d"
```

#### ✅ 7. Healthchecks sur tous les services

```yaml
services:
  core-back:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

#### ✅ 8. Logs limités et rotation

```yaml
services:
  core-back:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "compliance.rgpd"
```

---

## 📚 Ressources complémentaires

- [CNIL - Sécurité des données](https://www.cnil.fr/fr/securite-des-donnees)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [Fiche 6 - Sécuriser vos sites web](../02-compliance/Guide-RGPD-du-developpeur/06-Sécuriser%20vos%20sites%20web,%20vos%20applications%20et%20vos%20serveurs.md)
- [Fiche 5 - Architecture éclairée](../02-compliance//Guide-RGPD-du-developpeur/05-Faire%20un%20choix%20éclairé%20de%20son%20architecture.md)

---

**Navigation** : [← Guides](../03-guides/README.md) | [Sommaire RGPD](../02-compliance/RGPD/00_SOMMAIRE.md)
