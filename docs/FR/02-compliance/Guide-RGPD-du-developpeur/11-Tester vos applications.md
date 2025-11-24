# Fiche n°11 — Tester vos applications

> **Version LexOrbital — Tests de conformité RGPD**

**Objectif** : Mettre en place une stratégie de tests complète garantissant la conformité RGPD et la sécurité des applications LexOrbital.

---

> **📘 Contexte**  
> Les tests sont essentiels pour garantir la conformité RGPD. Cette fiche détaille les tests obligatoires, les outils LexOrbital et les bonnes pratiques pour tester en conformité.

---

## 🧩 1. Tests obligatoires et exigences RGPD

| Domaine de test           | Exigences CNIL                                     | Implémentation LexOrbital                                                        | Niveau                         |
| ------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------ |
| **Tests unitaires**       | Vérifier conformité aux spécifications             | Chaque module embarque le template du `lexorbital-template-module` (Jest/Vitest) | Core + Modules                 |
| **Tests fonctionnels**    | Assurer bon fonctionnement utilisateur             | Tests e2e via Playwright intégrés dans le FrontRing                              | Modules Front                  |
| **Tests de sécurité**     | Fuzzing, scans vulnérabilités                      | CI : `npm run security:scan` (npm audit + Trivy pour images Docker)              | Core + Infra                   |
| **Tests d'intégration**   | Valider les interactions modules ↔ anneaux        | Tests via BackRing + API orchestration                                           | Modules Back                   |
| **Tests RGPD**            | Vérifier conformité aux droits, TTL, anonymisation | Script Meta-Kernel : `validate-rgpd`                                             | Core                           |
| **Tests performance**     | Détecter comportements anormaux                    | K6/Artillery scripts dans `/tests/perf`                                          | Modules Critiques              |
| **Tests d'anonymisation** | Empêcher retour à identité                         | Fonction `assertIsAnonymized()` dans Meta-Kernel                                 | Modules exposant données perso |

---

## 🧩 2. CI/CD et automatisation des tests

| Exigence CNIL                     | Description                                                         | Implémentation LexOrbital                                      |
| --------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Automatiser l'exécution**       | Tests lancés après chaque modification                              | GitHub Actions → workflows `ci.yml` hérités du template module |
| **Sécuriser CI/CD**               | S'assurer que la CI n'a pas accès à du code source privé ou secrets | Secrets chiffrés, permissions GitHub minimales, runners isolés |
| **Métriques associées**           | Couverture, vulnérabilités, duplication                             | Badges auto-générés + rapport CodeQL + SonarLint local         |
| **Détection précoce des erreurs** | Exécuter tests avant merge                                          | PR obligatoire avec état CI "required"                         |
| **Dépendances sûres**             | Alerte CVE                                                          | Dependabot + npm audit en CI                                   |

---

## 🧩 3. Stratégie de test globale (définie en entreprise)

| Type de métrique     | Exemples CNIL                          | Décisions LexOrbital                                                  |
| -------------------- | -------------------------------------- | --------------------------------------------------------------------- |
| **Couverture tests** | % acceptable défini avant dev          | Core : min 80% modules ; 70% front ; 90% pour modules sensibles       |
| **Types de tests**   | unitaires, fonctionnels, sécurité      | Obligatoire : unitaires + lint + sécurité ; optionnel : perf & charge |
| **Réplication code** | Code dupliqué                          | Check via Sonar-like local ou ESLint rules                            |
| **Vulnérabilités**   | Nombre + criticité                     | CI bloque merge si vulnérabilité haut risque                          |
| **Métriques RGPD**   | TTL correct ? anonymisation correcte ? | Commande `npm run validate:rgpd` dans Core                            |

---

## 🧩 4. Données de test (obligation RGPD)

> **⚠️ Important**  
> L'utilisation de données réelles dans les tests est **strictement interdite** par le RGPD.

| Exigence CNIL                          | Risque si non respecté           | Décision LexOrbital                                          |
| -------------------------------------- | -------------------------------- | ------------------------------------------------------------ |
| **Ne pas utiliser données réelles**    | Détournement de finalité, fuite  | Interdit → CI bloque si dump détecté                         |
| **Créer données fictives**             | Réduction des risques            | Utilisation obligatoire de Faker/Tsdx-Faker dans `/fixtures` |
| **Simuler cas extrêmes**               | Dénis de service, crash          | Scénarios fuzzing activés dans CI                            |
| **Anonymisation en cas d'import prod** | Données personnelles résiduelles | Script `sanitize-prod-config.ts` : anonymisation automatique |
| **Sécuriser environnements tests**     | Risques multipliés               | Conteneurs Docker isolés + secrets factices                  |

---

## 🧩 5. Outils internes LexOrbital pour données fictives

| Outil interne                 | Usage                              | Localisation               | Description                                |
| ----------------------------- | ---------------------------------- | -------------------------- | ------------------------------------------ |
| **`faker.ts`**                | Génération noms, emails fictifs    | Meta-Kernel utilities      | Basé sur Faker.js ou @faker-js             |
| **`generateDataset.ts`**      | Génère datasets entiers pour tests | BackRing `/tests/fixtures` | Simule utilisateurs, sessions, audit…      |
| **`sanitize-prod-config.ts`** | Nettoie données importées          | Scripts/Core               | Hash IDs, remplace emails, supprime tokens |
| **`rgpd-test-validator.ts`**  | Vérifie conformité jeux de tests   | Meta-Kernel                | Détecte données potentiellement sensibles  |

> **💡 Utilisation**  
> Ces outils sont intégrés dans le template module LexOrbital et disponibles automatiquement dans tous les modules.

---

## 🧩 6. Tests liés aux droits des personnes (RGPD)

> **📘 Note**  
> Renforce les fiches Droit d'accès / Effacement / Portabilité / Opposition déjà conçues.

| Droit RGPD               | Test à effectuer             | Implémentation LexOrbital                              |
| ------------------------ | ---------------------------- | ------------------------------------------------------ |
| **Droit d'accès**        | Export complet user          | API `/privacy/export` + test d'intégrité               |
| **Droit à l'effacement** | Supprimer toutes les données | Test `deleteOrAnonymize(userId)` sur chaque module     |
| **Droit d'opposition**   | Opposer tracking / modules   | Vérification cookie `analytics_optout` + désactivation |
| **Droit rectification**  | Modifier champ personnel     | Test d'update contrôlé dans Auth                       |
| **Droit limitation**     | Mise en quarantaine          | Test flag `isLimited=true` et lecture read-only        |
| **Droit portabilité**    | Export JSON/CSV              | Vérification format & contenu non sensible             |

---

## 🧩 7. Tests de sécurité obligatoires en RGPD

| Type de test               | CNIL                            | Mise en œuvre LexOrbital                                    |
| -------------------------- | ------------------------------- | ----------------------------------------------------------- |
| **Fuzzing**                | Tester comportement hors normes | Intégré avec fast-check ou fuzzing-js dans module sensitive |
| **Scan vulnérabilités**    | Détection CVE                   | Trivy pour images ; npm audit ; CodeQL                      |
| **Tests injection**        | SQL / XSS                       | K6/OWASP ZAP sur BackRing/FrontRing                         |
| **Tests accès illégitime** | Contrôle ACL et RBAC            | Simuler rôles & attaques (RBAC unit tests)                  |
| **Tests brute-force**      | Login Auth                      | Rate limit tests + lockout                                  |
| **Tests cryptographie**    | Hashing + rotation clés         | Vérification automatique via scripts Core                   |

---

## 🧩 8. Ce qui est strictement interdit (RGPD)

> **🚫 Interdictions absolues**  
> Ces pratiques sont **strictement interdites** et contrôlées automatiquement par LexOrbital.

| Interdit                               | Risque CNIL           | Contrôle LexOrbital                  |
| -------------------------------------- | --------------------- | ------------------------------------ |
| **Données réelles dans tests**         | Détournement finalité | Analyse automatique dans CI          |
| **Clés de production dans tests**      | Exposition de secret  | GitLeaks intégré dans CI             |
| **Dump production sans anonymisation** | Fuite massive         | Script d'anonymisation obligatoire   |
| **Tests sur infra live**               | Risques incident      | Tous tests en containers isolés      |
| **CI avec accès non restreint**        | Prise de contrôle     | Permissions minimales GitHub Actions |

---

## 🧩 9. Integration Rings ↔ Modules pour tests

| Couches           | Rôle                          | Tests associés                                   |
| ----------------- | ----------------------------- | ------------------------------------------------ |
| **Meta-Kernel**   | Normes, RGPD, helpers         | Tests RGPD + TTL + anonymisation                 |
| **BackRing**      | APIs, orchestration           | Tests API, sécurité, fuzzing                     |
| **FrontRing**     | UI, UX, affichage             | Tests e2e + accessibilité                        |
| **Modules Back**  | Métier (auth, audit, mailer…) | Tests unitaires + intégration + données fictives |
| **Modules Front** | Interface module              | Tests composants + interactions                  |
| **Infra**         | Docker, CI                    | Tests sécurité infra + build                     |

---

## 📋 Checklist de conformité tests

Avant de merger un module, vérifier :

- [ ] Tests unitaires présents (min 80% couverture)
- [ ] Tests RGPD exécutés (`npm run validate:rgpd`)
- [ ] Aucune donnée réelle dans les fixtures
- [ ] Tests de sécurité passés (npm audit, Trivy)
- [ ] Tests des droits utilisateurs implémentés
- [ ] CI configurée avec permissions minimales
- [ ] Données fictives générées via outils LexOrbital

---

## 📚 Ressources complémentaires

- [CNIL — Guide du développeur](https://www.cnil.fr/developpeur)
- [Tests RGPD LexOrbital](../03-guides/06-testing-modules.md)
- [Module Audit](../02-compliance/03-audit-logging.md)
- [Template Module](https://github.com/YourOrg/lexorbital-template-module)

---

<div align="center">

**[⬅️ Précédent](./10_Maitriser-bibliotheques.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./12_Informer-utilisateurs.md)**

</div>
