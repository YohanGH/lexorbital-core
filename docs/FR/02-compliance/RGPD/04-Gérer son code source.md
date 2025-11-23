# FICHE N°4 — GÉRER SON CODE SOURCE

**Tableaux · DevSecOps · GitHub hardened · RGPD-friendly**

> 📘 **Contexte RGPD**  
> La gestion sécurisée du code source est fondamentale pour garantir la traçabilité, la sécurité et la conformité RGPD. LexOrbital intègre des pratiques strictes de gestion Git, d'authentification renforcée et de protection des secrets pour répondre aux exigences CNIL.

---

## 🧩 1. Gestionnaire de code source — exigences CNIL → LexOrbital

| Sujet | Exigence CNIL | Risques | Implémentation LexOrbital |
|-------|---------------|---------|--------------------------|
| **Stockage du code** | Utiliser un vrai gestionnaire (pas FTP) | Perte historique, fuite fichiers | GitHub / GitLab avec sauvegarde automatique |
| **Historique modifications** | Conserver chronologie | Perte de traçabilité | Branches, PR, merge requests |
| **Authentification forte** | MFA + SSH | Compromission dépôt | MFA obligatoire GitHub + clés ED25519 |
| **Paramétrage sécurité** | Limitations par utilisateur | Accès non maîtrisés | Roles GitHub : admin / write / read |

> 💡 **Standard LexOrbital**  
> Tous les dépôts LexOrbital utilisent GitHub avec authentification forte obligatoire et gestion fine des permissions pour garantir la sécurité et la traçabilité.

---

## 🧩 2. Authentification & accès (GitHub hardened)

| Domaine | Risque | Exigence CNIL | Mise en œuvre LexOrbital |
|---------|--------|---------------|-------------------------|
| **MFA obligatoire** | Compte compromis | Auth forte | GitHub 2FA enforced |
| **Clés SSH** | Vol / fuite de tokens | Auth sécurisée | Clé ED25519 + passphrase requise |
| **Jetons d'accès** | Mauvaise gestion | Jetons individuels | PAT minimaux, expiration obligatoire |
| **Codes de récupération** | Perte d'accès | À stocker en coffre | Stockage dans Bitwarden / KeePass |
| **Permissions** | Excès privilèges | Principe du moindre privilège | Lecture = rings ; écriture = core owner |

> ⚠️ **Obligation**  
> L'authentification forte (MFA) est obligatoire pour tous les comptes ayant accès aux dépôts LexOrbital. Aucune exception n'est tolérée.

---

## 🧩 3. Gestion fine des permissions

| Niveau | Droits | Usage LexOrbital |
|--------|--------|------------------|
| **Admin** | Toutes actions | Meta-Kernel maintainers |
| **Write** | PR + push branches | Développeurs modules |
| **Read** | Lecture seule | Modules externes / CI |
| **Triage** | Gérer issues, labels | Équipe documentation |

> 💡 **Standard LexOrbital**  
> Les permissions sont attribuées selon le principe du moindre privilège. Seuls les maintainers du Meta-Kernel ont les droits administrateur.

---

## 🧩 4. Sauvegardes & disponibilité

| Élément | Risque | Solution CNIL | Mise en œuvre LexOrbital |
|---------|--------|---------------|-------------------------|
| **Serveur Git** | Perte totale | Sauvegardes régulières | GitHub auto + clone miroir interne |
| **Branches** | Perte progression | Stratégie branches | GitFlow-lite : `main` / `dev` / `feature/*` |
| **Artefacts** | Perte de builds | Résilience CI | Stockage GitHub Artifacts |

> 💡 **Standard LexOrbital**  
> La résilience est garantie par des sauvegardes automatiques GitHub et un clone miroir interne pour les dépôts critiques.

---

## 🧩 5. Stratégie de branches (obligation CNIL : éviter conflits & erreurs)

| Nom branche | Rôle | Règle LexOrbital |
|-------------|------|------------------|
| **main** | Production stable | Protégée, PR + review obligatoire |
| **dev** | Intégration | Préparation des releases |
| **feature/\*** | Travail modulaire | Un module = une branche |
| **hotfix/\*** | Correction urgente | Merge → main + dev |

> ⚠️ **Obligation CNIL**  
> La stratégie de branches permet d'éviter les conflits et les erreurs qui pourraient compromettre la sécurité ou la conformité RGPD. Aucun push direct sur `main` n'est autorisé.

---

## 🧩 6. Branches protégées (sécurité renforcée)

| Protection | But | Mise en œuvre LexOrbital |
|------------|-----|-------------------------|
| **Interdiction push direct** | Éviter erreurs humaines | Obligatoire sur `main` et `dev` |
| **Review obligatoire** | Contrôle qualité | 1 review min. (2 pour core) |
| **CI obligatoire** | Empêcher code vulnérable | Lint + tests + audit dépendances |
| **Signature commits** | Authenticité | Enforcement verified |

> ⚠️ **Obligation**  
> Les branches `main` et `dev` sont protégées avec des règles strictes : aucun push direct, review obligatoire, et CI complète avant merge.

---

## 🧩 7. Qualité du code — outils automatisés

| Outil | But | Intégration LexOrbital |
|-------|-----|------------------------|
| **ESLint** | Style & erreurs | Pre-commit + CI |
| **Prettier** | Format uniforme | Pré-commit |
| **SonarQube / CodeQL** | Détection vulnérabilités | Analyse sécurité CI |
| **Commitlint** | Messages normés | Husky |
| **Git hooks** | Bloquer mauvais commits | Pré-commit + pré-push |

> 💡 **Standard LexOrbital**  
> La qualité du code est garantie par des outils automatisés intégrés dans les hooks Git et la CI, empêchant le merge de code non conforme.

---

## 🧩 8. Secrets & mots de passe — obligations CNIL (critique RGPD)

| Type de secret | Risques | Solution recommandée | Implémentation LexOrbital |
|----------------|---------|----------------------|--------------------------|
| **.env** | Fuite massive | Ne jamais commiter | `.gitignore` obligatoire |
| **Clés API** | Vol, fraude | Séparer du repo | GitHub Secrets |
| **Tokens/prod** | Compromission système | Coffre-fort secure | Vault ou Bitwarden |
| **Identifiants tests** | Fuite indirecte | Générés en CI | `faker.js` |
| **Fichiers sensibles** | Historique Git | Chiffrement | `git-crypt` |

> ⚠️ **Obligation critique RGPD**  
> Aucun secret ne doit jamais être commité dans le dépôt Git. Les secrets sont gérés via GitHub Secrets, Vault ou des coffres-forts sécurisés. Toute fuite de secret doit être traitée comme une violation de données.

---

## 🧩 9. Purge de l'historique Git (données perso / secrets)

| Exigence CNIL | Risque | Méthode LexOrbital |
|---------------|--------|-------------------|
| **Purger dépôt après fuite** | Données toujours stockées | `git filter-repo` |
| **Supprimer fichier dans historique** | Traçabilité dangereuse | BFG Repo-Cleaner |
| **Vérifier après purge** | Fichier encore accessible | Script audit "sensitive patterns" |

> ⚠️ **Obligation CNIL**  
> En cas de fuite de données personnelles ou de secrets dans l'historique Git, une purge complète doit être effectuée. LexOrbital fournit des scripts automatisés pour cette opération critique.

---

## 🧩 10. Publication de code en ligne — précautions RGPD

| Danger | Exemples | Contre-mesure LexOrbital |
|--------|----------|------------------------|
| **Secrets exposés** | `.env`, clés SSH | Scan automatique via GitHub Secret Scanning |
| **Données personnelles dans code** | Logs, tests | Données fictives uniquement |
| **Historique risqué** | Ancien commit fuité | Purge préalable obligatoire |
| **Packages malveillants** | Typosquatting | Validation dépendance (Fiche 9) |

> ⚠️ **Obligation**  
> Avant toute publication publique d'un dépôt, un audit complet doit être effectué pour détecter les secrets, données personnelles ou historique compromettant. GitHub Secret Scanning est activé automatiquement.

---

## 🧩 11. Procédures Dev / CI / branches

| Procédure | Exigence CNIL | Mise en œuvre LexOrbital |
|-----------|---------------|-------------------------|
| **Dév parallèle** | Pas travailler tous sur main | GitFlow-lite |
| **Tests automatisés** | Qualité code | GitHub Actions (lint + test) |
| **Merges contrôlés** | Reviews obligatoires | PR review |
| **Analyse sécurité** | Détection vulnérabilités | CodeQL + npm audit |
| **Protection secrets** | Aucun secret en clair | CI variables chiffrées |

> 💡 **Standard LexOrbital**  
> Toutes les procédures de développement sont automatisées et intégrées dans le processus CI/CD, garantissant la qualité et la sécurité à chaque étape.

---

## 🧩 12. Outils recommandés

| Catégorie | Outils | Usage |
|-----------|--------|-------|
| **Gestion Git** | Git, GitHub, GitLab | Versionning moderne |
| **Authentification** | SSH, 2FA | Connexion secure |
| **Wiki/Docs** | GitHub Wiki, Obsidian, Docusaurus | Documentation versionnée |
| **Sécurité** | Vault, git-crypt, Keywhiz | Gestion secrets |
| **Hooks Git** | Husky | Pré-commit & pré-push |
| **Dépendances** | Dependabot | Mises à jour automatisées |

> 💡 **Standard LexOrbital**  
> Ces outils sont intégrés dans l'écosystème LexOrbital pour garantir la sécurité, la qualité et la conformité RGPD du code source.

---

## 🧩 13. Synthèse LexOrbital — Cadre final code source

| Domaine | Exigence RGPD | Réponse LexOrbital |
|---------|---------------|-------------------|
| **Sécurité accès** | Auth forte | MFA, SSH, tokens limités |
| **Traçabilité** | Historique complet | GitHub + PR review |
| **Contrôle code** | Lint + audit | CI complet |
| **Secrets** | Jamais en dépôt | `.gitignore` + vault |
| **Branches** | Protégées | GitFlow-lite |
| **Documentation** | Versionnée | `/docs` dans repo |
| **Suppression données perso** | Purge historique | Script automatisé |

> ✅ **Synthèse**  
> LexOrbital intègre toutes les exigences RGPD en matière de gestion du code source, avec des processus automatisés garantissant la sécurité, la traçabilité et la conformité à chaque étape du développement.

---

## 📚 Ressources complémentaires

- [CNIL - Sécurité des données](https://www.cnil.fr/fr/securite-des-donnees)
- [CNIL - Traçabilité et documentation](https://www.cnil.fr/fr/documentation-et-tracabilite)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Fiche 3 - Sécuriser son environnement de développement](./03-Sécuriser%20son%20environnement%20de%20développement.md)
- [Fiche 9 - Maîtriser vos bibliothèques et vos SDK](./09-Maîtriser%20vos%20bibliothèques%20et%20vos%20SDK.md)
- [Fiche 10 - Veiller à la qualité de votre code](./10-Veiller%20à%20la%20qualité%20de%20votre%20code%20et%20sa%20documentation.md)

---

**Navigation** : [← Fiche 3](./03-Sécuriser%20son%20environnement%20de%20développement.md) | [Sommaire](./00_SOMMAIRE.md) | [Fiche 5 →](./05-Choisir%20un%20hébergeur.md)
