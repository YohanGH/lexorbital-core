# LexOrbital FrontRing

Frontend console du Meta-Kernel LexOrbital.

Console orbitale minimale qui affiche :
- Le statut du service (`/health`)
- La liste des modules (`/modules`)

## Développement

```bash
pnpm install
pnpm dev      # Développement avec hot-reload (http://localhost:3000)
pnpm build    # Build de production
pnpm preview  # Preview du build de production
```

## Variables d'environnement

- `VITE_API_URL` : URL du backend (défaut: `http://localhost:4000`)
