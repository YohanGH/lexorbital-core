# LexOrbital FrontRing

Frontend console of the LexOrbital Meta-Kernel.

Minimal orbital console that displays:

- Service status (`/health`)
- List of modules (`/modules`)

## Development

```bash
pnpm install
pnpm dev      # Development with hot-reload (http://localhost:3000)
pnpm build    # Production build
pnpm preview  # Preview production build
```

## Environment variables

- `VITE_API_URL` : Backend URL (default: `http://localhost:4000`)
