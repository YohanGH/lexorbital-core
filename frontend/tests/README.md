# Tests - Documentation

## Couverture des tests

Seuls les tests de routing sont conservés. Les tests vérifient que les routes sont correctement configurées et que les composants de page sont rendus aux chemins attendus.

### Tests de routing

- ✅ **Tests d'intégration des routes** - `tests/integration/routes.test.tsx`
  - Vérifie que toutes les routes principales sont accessibles
  - Teste la navigation entre les routes
  - Vérifie le rendu des composants aux bons chemins

- ✅ **Tests unitaires du router** - `tests/unit/lib/router.test.ts`
  - Teste les constantes de routes (ROUTES)
  - Teste les fonctions utilitaires (navigateTo, matchesRoute, extractParams)

## Structure des tests

```
tests/
├── integration/
│   └── routes.test.tsx          # Tests d'intégration des routes
├── unit/
│   └── lib/
│       └── router.test.ts       # Tests du router
└── setup.ts                      # Configuration des tests
```

## Exécution des tests

```bash
# Exécuter tous les tests
npm run tests

# Exécuter les tests en mode watch
npm run tests:watch

# Exécuter les tests avec l'interface UI
npm run tests:ui
```

## Note

Les tests de contenu des pages ont été supprimés car le contenu des pages est encore en cours de réflexion. Seuls les tests de routing sont conservés pour garantir que les pages sont accessibles aux bons chemins.
