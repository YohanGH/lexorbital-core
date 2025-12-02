# Gestion des modules avec git subtree & scripts d'amarrage {#workflow-subtree}

> LexOrbital utilise **git subtree** pour amarrer des modules externes (dépôts Git indépendants) dans le monorepo `lexorbital-core`, tout en conservant l'historique Git et la possibilité de contribuer upstream.

## 1. Objectif de la fiche

Expliquer le workflow de gestion des modules via git subtree, les avantages par rapport à git submodule, et fournir les scripts d'amarrage/mise à jour/contribution pour les développeurs.

## 2. Concepts et décisions clés

### 2.1. Git subtree vs Git submodule

#### Problèmes des submodules

- ❌ **Complexité** : `git submodule init`, `git submodule update --recursive`, etc.
- ❌ **État détaché** : les submodules sont souvent en HEAD détaché (detached HEAD)
- ❌ **Friction pour les contributeurs** : oubli fréquent de `--recurse-submodules`
- ❌ **Commits fantômes** : références de commits qui peuvent disparaître

#### Avantages des subtrees

- ✅ **Transparence** : le code du module est **physiquement présent** dans le repo
- ✅ **Clone simple** : `git clone` suffit, pas de commande supplémentaire
- ✅ **Historique préservé** : l'historique du module externe est fusionné
- ✅ **Contribution upstream facile** : `git subtree push` renvoie les commits vers le module

### 2.2. Architecture du monorepo avec subtrees

```
lexorbital-core/
├── backend/
│   └── src/
│       ├── meta-kernel/
│       └── modules/
│           ├── lexorbital-module-auth/          ← git subtree de lexorbital-module-auth
│           ├── lexorbital-module-mailer/         ← git subtre  e de lexorbital-module-mailer
│           ├── lexorbital-module-audit/      ← git subtree de lexorbital-module-audit
│           └── ...
├── frontend/
└── modules/                          ← Aussi des subtrees (modules standalone)
```

Chaque module sous `modules/` est un subtree d'un dépôt Git externe (ex: `https://github.com/lexorbital/lexorbital-module-auth`).

## 3. Implications techniques

### 3.1. Ajouter un module (amarrage initial)

#### Commande manuelle

```bash
# 1. Ajouter le remote du module
git remote add lexorbital-module-auth https://github.com/lexorbital/lexorbital-module-auth.git

# 2. Ajouter le subtree
git subtree add --prefix=modules/lexorbital-module-auth lexorbital-module-auth main --squash

# 3. (Optionnel) Supprimer le remote si on ne veut pas polluer
git remote remove lexorbital-module-auth
```

**Explication des flags** :

- `--prefix=modules/lexorbital-module-auth` : où placer le module dans le monorepo
- `lexorbital-module-auth` : nom du remote (peut être l'URL directement)
- `main` : branche du module à ajouter
- `--squash` : fusionner l'historique en un seul commit (recommandé pour éviter pollution)

**Script d'amarrage (`scripts/add-module.sh`)** :

**Usage** :

```bash
chmod +x scripts/add-module.sh
./scripts/add-module.sh lexorbital-module-auth https://github.com/lexorbital/lexorbital-module-auth.git
```

### 3.2. Mettre à jour un module (pull upstream)

#### Commande manuelle

```bash
# 1. Ajouter le remote si pas déjà fait
git remote add lexorbital-module-auth https://github.com/lexorbital/lexorbital-module-auth.git

# 2. Pull les changements upstream
git subtree pull --prefix=modules/lexorbital-module-auth lexorbital-module-auth main --squash

# 3. Résoudre les conflits si nécessaire
```

**Script de mise à jour (`scripts/update-module.sh`)** :

**Usage** :

```bash
./scripts/update-module.sh lexorbital-module-auth https://github.com/lexorbital/lexorbital-module-auth.git
```

### 3.3. Contribuer à un module (push upstream)

Si vous modifiez un module dans le monorepo et voulez renvoyer les changements vers le dépôt du module :

#### Commande manuelle

```bash
# 1. Ajouter le remote du module
git remote add auth-module https://github.com/lexorbital/lexorbital-auth-module.git

# 2. Push uniquement les commits concernant ce module
git subtree push --prefix=modules/auth-module auth-module main

# 3. Créer une PR sur le dépôt du module
```

**Note** : `git subtree push` peut être **lent** (il doit filtrer l'historique). Alternative : travailler directement dans le dépôt du module, puis pull dans le monorepo.

## 4. Checklist de mise en œuvre

### Pour ajouter un module externe

- [ ] Vérifier que le module a un `lexorbital.module.json` valide
- [ ] Exécuter `./scripts/add-module.sh <nom> <url-repo>`
- [ ] Vérifier que le Meta-Kernel charge bien le module (démarrer l'app)
- [ ] Commit et push

### Pour mettre à jour un module

- [ ] Exécuter `./scripts/update-module.sh <nom> <url-repo>`
- [ ] Vérifier les breaking changes (lire CHANGELOG du module)
- [ ] Exécuter les tests du monorepo : `npm test`
- [ ] Commit et push

### Pour désamarrer un module

- [ ] Vérifier qu'aucun autre module ne dépend de lui (check `dependencies` des manifestes)
- [ ] Exécuter `./scripts/remove-module.sh <nom>`
- [ ] Supprimer les références au module dans la config du Meta-Kernel

## 5. À retenir

- **Git subtree** : modules externes intégrés dans le monorepo (transparence totale)
- **Amarrage** : `git subtree add --prefix=modules/X <repo> main --squash`
- **Mise à jour** : `git subtree pull --prefix=modules/X <repo> main --squash`
- **Scripts fournis** : `add-module.sh`, `update-module.sh`, `remove-module.sh`
