# Modules Directory

This directory contains LexOrbital modules integrated via **git subtree**.

## Structure

Modules will be organized as follows:

```
modules/
├── lexorbital-module-auth/     # Authentication module
├── lexorbital-module-audit/    # Audit module
├── lexorbital-module-mailer/   # Email sending module
└── ...
```

## Integration via Git Subtree

Modules are developed in separate repositories (e.g., `lexorbital-module-auth`) then integrated into this directory via `git subtree`.

### Add a new module

```bash
git subtree add --prefix=modules/lexorbital-module-<name> \
  https://github.com/YohanGH/lexorbital-module-<name>.git \
  main --squash
```

### Update a module

```bash
git subtree pull --prefix=modules/lexorbital-module-<name> \
  https://github.com/YohanGH/lexorbital-module-<name>.git \
  main --squash
```

### Push local changes

```bash
git subtree push --prefix=modules/lexorbital-module-<name> \
  https://github.com/YohanGH/lexorbital-module-<name>.git \
  main
```

## Module format

Each module must expose a `module.json` file at its root with the following structure:

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

BackRing will read these manifests to discover and load modules.

## Note for POC V1

For now, modules are **mocked** in BackRing.  
Real manifest reading implementation will come in a later version.
