# Configuration Nginx - Frontend

Ce répertoire contient les configurations nginx **spécifiques au conteneur frontend**.

## Fichiers

- `nginx.conf` : Configuration du serveur virtuel (port 8080)
- `nginx-main.conf` : Configuration principale nginx

## Usage

Ces configurations sont **copiées dans l'image Docker** du frontend lors du build :

```dockerfile
COPY --chown=appuser:appuser nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=appuser:appuser nginx-main.conf /etc/nginx/nginx.conf
```

## Rôle

- ✅ Servir les fichiers statiques compilés (HTML, CSS, JS)
- ✅ Gérer le routing SPA (fallback vers index.html)
- ✅ Headers de sécurité RGPD
- ✅ Compression gzip
- ✅ Cache des assets statiques

## Port

- **8080** : Port interne au conteneur (non-root user)
- En production, exposé via reverse-proxy sur le port 443 (HTTPS)

## Différence avec infra/nginx/

| Aspect          | `frontend/nginx*.conf`     | `infra/nginx/`                 |
| --------------- | -------------------------- | ------------------------------ |
| **Usage**       | Dans le conteneur frontend | Service reverse-proxy séparé   |
| **Rôle**        | Servir fichiers statiques  | Router trafic frontend/backend |
| **Port**        | 8080 (interne)             | 80/443 (public)                |
| **Intégration** | Copié dans l'image Docker  | Monté comme volume             |

## Modification

Pour modifier ces configs :

1. Éditer `nginx.conf` ou `nginx-main.conf`
2. Rebuild l'image Docker : `docker build -t frontend .`
3. Redémarrer le conteneur

⚠️ **Note** : Ces configs sont spécifiques au service frontend. Pour un reverse-proxy, voir `infra/nginx/`.
