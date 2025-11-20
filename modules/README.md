# Modules Directory

Ce répertoire contient les modules LexOrbital intégrés via **git subtree**.

## Structure

Les modules seront organisés comme suit :

```
modules/
├── lexorbital-module-auth/     # Module d'authentification
├── lexorbital-module-audit/    # Module d'audit
├── lexorbital-module-mailer/   # Module d'envoi d'emails
└── ...
```

## Intégration via Git Subtree

Les modules sont développés dans des dépôts séparés (ex: `lexorbital-module-auth`) puis intégrés dans ce répertoire via `git subtree`.

### Ajouter un nouveau module

```bash
git subtree add --prefix=modules/lexorbital-module-<name> \
  https://github.com/YohanGH/lexorbital-module-<name>.git \
  main --squash
```

### Mettre à jour un module

```bash
git subtree pull --prefix=modules/lexorbital-module-<name> \
  https://github.com/YohanGH/lexorbital-module-<name>.git \
  main --squash
```

### Pousser des modifications locales

```bash
git subtree push --prefix=modules/lexorbital-module-<name> \
  https://github.com/YohanGH/lexorbital-module-<name>.git \
  main
```

## Format des modules

Chaque module doit exposer un fichier `module.json` à sa racine avec la structure suivante :

```json
{
  "name": "lexorbital-module-<name>",
  "version": "1.0.0",
  "type": "back|front|both",
  "description": "...",
  "endpoints": [...],
  "contracts": {...}
}
```

Le BackRing lira ces manifests pour découvrir et charger les modules.

## Note pour la POC V1

Pour l'instant, les modules sont **mockés** dans le BackRing.  
L'implémentation de la lecture réelle des manifests viendra dans une version ultérieure.
