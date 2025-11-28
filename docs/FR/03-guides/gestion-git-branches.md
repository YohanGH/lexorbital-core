# Gestion Git — Système de branches

> **Modèle de gestion Git par branches pour LexOrbital**

---

## 🟩 Branches permanentes

- **main** → code stable, publié
- **develop** →
- **staging** → pré-release (optionnel mais utile)

## 🟦 Branches temporaires

- **feature/<titre>** → nouveauté
- **fix/<issue>** → correction de bug
- **docs/<section>** → documentation
- **chore/<tâche>** → CI, tooling, dépendances

## 🔁 Cycle de vie

1. Créer une branche depuis main :
2. Faire des commits signés GPG sur la branche
3. Faire un pull request vers la branche main
4. Attendre que le pull request soit mergé
5. Supprimer la branche

## Sécurité par branche (husky, CI, Github)

- **husky** : pre-commit hooks
- **CI** : continuous integration
- **GitHub Actions** : workflows

## Sécurité par branche Gtihub repository (rulesets)

- Proteger les branche de la suppression:
  - main
  - develop
  - staging

**Branch rules**

- **Restrict creations**
  Only allow users with bypass permission to create matching refs.
- **Restrict updates**
  Only allow users with bypass permission to update matching refs.
- **Restrict deletions**
  Only allow users with bypass permissions to delete matching refs.
- **Require linear history**
  Prevent merge commits from being pushed to matching refs.
- **Require deployments to succeed**
  Choose which environments must be successfully deployed to before refs can be pushed into a ref that matches this rule.
- **Require pull request reviews before merging**
  Require a pull request review before merging matching refs.
  - **Required approvals**
    - The number of approving reviews that are required before a pull request can be merged.
  - **Dismiss stale pull request approvals when new commits are pushed**
    - New, reviewable commits pushed will dismiss previous pull request review approvals.
  - **Require review from Code Owners**
    - Require an approving review in pull requests that modify files that have a designated code owner.
  - **Require approval of the most recent reviewable push**
    - Whether the most recent reviewable push must be approved by someone other than the person who pushed it.
  - **Require conversation resolution before merging**
    - All conversations on code must be resolved before a pull request can be merged.
  - **Automatically request Copilot code review**
    - Request Copilot code review for new pull requests automatically if the author has access to Copilot code review and their premium requests quota has not reached the limit.
- **Require signed commits**
  Commits pushed to matching refs must have verified signatures. [GPG](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)
- **Require a pull request before merging**
  Require all commits be made to a non-target branch and submitted via a pull request before they can be merged.
- **Require status checks to pass**
  Choose which status checks must pass before the ref is updated. When enabled, commits must first be pushed to another ref where the checks pass.
  - **Require branches to be up to date before merging**
    - Whether pull requests targeting a matching branch must be tested with the latest code. This setting will not take effect unless at least one status check is enabled.
    - List of status checks:
      - Tests
      - Linting
      - CodeQL
      - Build
- **Block force pushes**
  Prevent users with push access from force pushing to refs.
- **Require code scanning results**
  Choose which tools must provide code scanning results before the reference is updated. When configured, code scanning must be enabled and have results for both the commit and the reference being updated.
- **Required tools and alert thresholds**
  CodeQL
  Tools that must provide code scanning results for this rule to pass. Learn more about enabling code scanning.
- **Require code quality results**
  Choose which severity levels of code quality results should block pull request merges. When configured, a code quality analysis must be done on the pull request before the changes can be merged.
- **Severity**
  The lowest severity level at which code quality reviews need to be resolved before commits can be merged.

## 📚 Liens vers la documentation Git

- **Git** : Distributed version control system
  - Official documentation : https://git-scm.com
- **Git Subtree** : Module integration
  - Documentation : https://git-scm.com/book/en/v2/Git-Tools-Subtree-Merging
- **git-crypt** : Transparent file encryption in Git
  - Repository : https://github.com/AGWA/git-crypt
  - Used for securing sensitive files in version control
- **Git Flow** : A successful Git branching model
  - Article : https://nvie.com/posts/a-successful-git-branching-model/
  - Reference for branching strategies and workflow

---

<div align="center">

**[⬅️ Retour aux guides](./README.md)** | **[⬆️ Sommaire](../README.md)**

</div>
