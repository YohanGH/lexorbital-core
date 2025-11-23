# Configuration Nginx - Infrastructure

Ce répertoire contient les configurations nginx pour l'infrastructure (reverse-proxy, load balancing, etc.).

## Structure

```
infra/nginx/
├── README.md                    # Ce fichier
├── reverse-proxy.conf.example   # Configuration reverse-proxy (exemple)
└── ssl/                         # Certificats SSL (non versionnés)
```

## Différence avec les configs frontend

### Configs dans `frontend/nginx*.conf`

- **Usage** : Nginx **dans le conteneur frontend**
- **Rôle** : Servir les fichiers statiques compilés (HTML, CSS, JS)
- **Port** : 8080 (interne au conteneur)
- **Copie** : Intégrées dans l'image Docker du frontend

### Configs dans `infra/nginx/`

- **Usage** : Nginx **reverse-proxy** (service séparé)
- **Rôle** : Router le trafic entre frontend et backend
- **Port** : 80/443 (exposé publiquement)
- **Montage** : Volume monté dans un conteneur nginx séparé

## Architecture recommandée

```
Internet
   │
   ▼
┌─────────────────────┐
│ Reverse-Proxy Nginx │  ← Configs dans infra/nginx/
│    (infra)          │     Port 443 (HTTPS)
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌─────────┐
│ Frontend│  │ Backend  │
│ Nginx   │  │ Node.js  │
│(frontend)│  │(backend)│
└─────────┘  └─────────┘
```

## Utilisation

### Reverse-proxy (production)

1. Créer `reverse-proxy.conf` basé sur `reverse-proxy.conf.example`
2. Configurer les certificats SSL dans `ssl/`
3. Ajouter le service nginx dans `docker-compose.prod.yml`

```yaml
reverse-proxy:
  image: nginx:1.27-alpine
  volumes:
    - ./nginx/reverse-proxy.conf:/etc/nginx/nginx.conf:ro
    - ./nginx/ssl:/etc/nginx/ssl:ro
  ports:
    - "80:80"
    - "443:443"
```

## Sécurité RGPD

- ✅ TLS 1.2+ obligatoire
- ✅ Headers de sécurité configurés
- ✅ Logs minimisés (pas de collecte de données personnelles)
- ✅ Rate limiting configuré
- ✅ Certificats SSL gérés séparément
