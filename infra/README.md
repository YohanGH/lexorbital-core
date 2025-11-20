# Infrastructure LexOrbital

----
MENTION FUTUR MODULE
----

Infrastructure Docker Compose pour le développement local du Meta-Kernel.

## Services

- **core-back** : BackRing (port 4000)
- **core-front** : FrontRing (port 3000)

## Utilisation

### Lancer l'infrastructure

```bash
cd infra
docker-compose -f docker-compose.local.yml up
```

Ou en arrière-plan :

```bash
docker-compose -f docker-compose.local.yml up -d
```

### Arrêter l'infrastructure

```bash
docker-compose -f docker-compose.local.yml down
```

### Voir les logs

```bash
docker-compose -f docker-compose.local.yml logs -f
```

### Rebuild après modifications des Dockerfiles

```bash
docker-compose -f docker-compose.local.yml up --build
```

## Configuration

Les services partagent un réseau Docker (`lexorbital-network`) pour communiquer.

Le BackRing expose son API sur `http://localhost:4000`  
Le FrontRing expose son interface sur `http://localhost:3000`

### Variables d'environnement

- `NODE_ENV` : `development` (par défaut)
- `PORT` : Port du BackRing (4000 par défaut)
- `VITE_API_URL` : URL du BackRing pour le FrontRing (`http://core-back:4000`)

## Hot-reload

Les volumes montent le code source directement, permettant le hot-reload :

- Modifications dans `../backend/src/` → BackRing se recharge automatiquement (tsx watch)
- Modifications dans `../frontend/src/` → FrontRing se recharge automatiquement (Vite HMR)

## Notes

Cette infrastructure est destinée au **développement local** uniquement.  
Pour la production, voir les instructions de déploiement dans la documentation principale.
