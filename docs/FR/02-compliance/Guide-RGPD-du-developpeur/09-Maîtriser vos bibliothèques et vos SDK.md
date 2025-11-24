# FICHE N°9 — MAÎTRISER VOS BIBLIOTHÈQUES & SDK

> 📘 **Contexte RGPD**  
> La gestion des dépendances et des SDK tiers est critique pour la sécurité et la conformité RGPD. LexOrbital intègre des processus stricts de validation et de maintenance pour garantir que chaque bibliothèque respecte les exigences de sécurité et de vie privée.

---

## 🧩 1. Faire un choix éclairé (avant d'ajouter une dépendance)

| Exigence CNIL                                          | Risques                                | Décision LexOrbital                                                    |
| ------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------- |
| **Ajouter uniquement les dépendances utiles**          | Surface d'attaque inutile              | Chaque module doit justifier chaque dépendance (`dependency-manifest`) |
| **Activer uniquement les fonctionnalités nécessaires** | Fonctions cachées, failles inutiles    | Import sélectif : `import { featureNeeded }`                           |
| **Choisir des bibliothèques maintenues**               | Paquets abandonnés = vecteur d'attaque | Vérification : commit récent, communauté, maintenance                  |
| **Préférer open-source actif**                         | Bugs non corrigés                      | Script automatique `npm audit`, dépendances vérifiées CI               |
| **Vérifier support commercial si SDK propriétaire**    | Rupture de maintenance                 | Vérifier SLA + mise à jour garantie                                    |

> 💡 **Standard LexOrbital**  
> Chaque dépendance doit être justifiée et documentée dans le manifest du module. Aucune dépendance ne peut être ajoutée sans validation préalable.

---

## 🧩 2. Prise en compte de la vie privée (Privacy & RGPD-by-design)

| Critère CNIL                                              | Risques                         | Implémentation LexOrbital                               |
| --------------------------------------------------------- | ------------------------------- | ------------------------------------------------------- |
| **Informer l'utilisateur si SDK collecte des données**    | Collecte cachée                 | CMP obligatoire si SDK émet traceurs                    |
| **Consentement obligatoire pour collecte non nécessaire** | Non-conformité art. 82 ePrivacy | CMP + `sdk.requiresConsent = true` dans manifest        |
| **Encadrement transferts hors UE**                        | Violations RGPD                 | Vérifier clauses SCC + localisation serveurs            |
| **Contrat de sous-traitance conforme art. 28**            | Responsabilité juridique        | DPA obligatoire pour tout SDK tiers                     |
| **Vérifier finalité du SDK**                              | Publicité = consentement        | Rejet automatique des SDK contenant tracking non neutre |

> ⚠️ **Obligation RGPD**  
> Tout SDK collectant des données personnelles doit être déclaré dans le manifest RGPD du module et nécessiter un consentement explicite si la collecte n'est pas strictement nécessaire.

---

## 🧩 3. Risques particuliers liés aux SDK (CNIL → LexOrbital)

| Type de SDK                           | Risques                                     | Politique LexOrbital                                                    |
| ------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| **SDK publicitaires**                 | Tracking, géolocalisation, ID publicitaires | Interdits par défaut ; activables seulement avec consentement explicite |
| **Outils CAPTCHA (Google reCAPTCHA)** | Transmission données → Google               | Exiger consentement ; privilégier hCaptcha                              |
| **SDK analytique invasif**            | Profilage                                   | Interdit si non "exempté CNIL"                                          |
| **SDK sécurité terminal**             | Collecte device fingerprint                 | Consentement obligatoire et documentation                               |
| **API mobile**                        | IDFA/Android ID                             | Doit être désactivé ou anonymisé                                        |

> ⚠️ **Obligation**  
> Les SDK à risque élevé pour la vie privée sont interdits par défaut dans LexOrbital. Leur utilisation nécessite une justification exceptionnelle et un consentement explicite.

---

## 🧩 4. Évaluer & auditer un SDK (analyse interne)

| Étape                             | Objectif                   | Mise en œuvre LexOrbital           |
| --------------------------------- | -------------------------- | ---------------------------------- |
| **Lire documentation**            | Comprendre fonctionnement  | Lecture obligatoire avant ajout    |
| **Modifier config par défaut**    | Defaults souvent dangereux | `config.overrideRequired = true`   |
| **Vérifier données collectées**   | Risques transfert + RGPD   | Liste des endpoints + logs SDK     |
| **Examiner dépendances internes** | Supply-chain complexe      | Outil `dependency-cruiser` dans CI |
| **Auditer transmissions réseau**  | Suivre data envoyées       | Proxy dev + Wireshark + console    |
| **Identifier destinataires**      | RGPD art. 13/14            | Champ `recipients[]` dans manifest |

> 💡 **Standard LexOrbital**  
> Chaque SDK doit passer par un processus d'audit complet avant intégration, incluant l'analyse de la documentation, des dépendances, et des transmissions réseau.

---

## 🧩 5. Supply-chain security & dépendances

### 5.1 Vérification des dépendances NPM/SDK

| Contrôle                    | Risque                 | Implémentation LexOrbital                  |
| --------------------------- | ---------------------- | ------------------------------------------ |
| **npm audit**               | Vulnérabilités connues | Obligatoire CI                             |
| **Vérifier typosquatting**  | Packages malveillants  | Script interne : comparaison Levenshtein   |
| **Vérifier hash intégrité** | Attaque supply-chain   | `package-lock.json` versionné              |
| **Signature des paquets**   | Altération             | Vérifier signatures si possibles           |
| **Vérifier mainteneurs**    | Compte compromis       | Surveillance changements propriétaires NPM |

### 5.2 Outils d'analyse recommandés

| Outil                      | Usage                | Dans LexOrbital         |
| -------------------------- | -------------------- | ----------------------- |
| **dependency-cruiser**     | Graph dépendances JS | Intégré au Meta-Kernel  |
| **Exodus Privacy**         | Analyse SDK Android  | Audit modules mobiles   |
| **otool**                  | Dépendances binaires | Pour builds desktop/IOS |
| **npm audit / yarn audit** | Vulnérabilités       | CI obligatoire          |
| **OWASP Dependency-Check** | Analyse profonde     | Option avancée          |

> 💡 **Standard LexOrbital**  
> La sécurité de la chaîne d'approvisionnement est garantie par des outils automatisés intégrés dans le processus CI/CD, avec des vérifications à chaque commit.

---

## 🧩 6. Encadrement juridique & RGPD

| Critère                | Exigence           | Mise en œuvre LexOrbital                   |
| ---------------------- | ------------------ | ------------------------------------------ |
| **Sous-traitance**     | Contrat art. 28    | Ajouter `dpa.md` au dossier module         |
| **Finalité**           | Transparence       | Déclarée dans manifest RGPD                |
| **Consentement**       | SDK non-nécessaire | CMP avec finalité explicite                |
| **Transferts hors UE** | Encadrement        | Vérifier pays + SCC                        |
| **Documentation**      | Obligatoire        | Page module : "Données collectées par SDK" |

> ⚠️ **Obligation RGPD**  
> Tout SDK tiers collectant des données personnelles doit avoir un contrat de sous-traitance conforme à l'article 28 du RGPD (DPA) et être documenté dans le manifest RGPD du module.

---

## 🧩 7. Maintenir les SDK & bibliothèques

| Tâche                                 | Importance              | Intégration LexOrbital          |
| ------------------------------------- | ----------------------- | ------------------------------- |
| **Gestionnaire dépendances**          | Liste fiable            | NPM + lockfile obligatoire      |
| **Mises à jour régulières**           | Patching vulnérabilités | Dependabot activé               |
| **Surveiller packages abandon**       | End-of-Life             | Alerte automatique dans CI      |
| **Vérifier changement propriétaires** | Risque injection        | Vérification automatique GitHub |
| **Valider versions majeures**         | Breaking changes        | Sandbox test modules            |
| **Veille sécurité**                   | CVE, CWE                | Flux CERT-FR + GitHub Security  |

> 💡 **Standard LexOrbital**  
> La maintenance des dépendances est automatisée via Dependabot et des alertes CI, garantissant une réaction rapide aux vulnérabilités et aux packages abandonnés.

---

## 🧩 8. Tableau synthèse — Validation d'un SDK avant intégration

| Question                                     | Oui = accepter ?     | Implémentation LexOrbital         |
| -------------------------------------------- | -------------------- | --------------------------------- |
| **Le SDK est-il maintenu ?**                 | ✔ seuil minimal     | Politique : commit < 6 mois       |
| **Collecte-t-il des données ?**              | ❌ sans consentement | CMP obligatoire                   |
| **A-t-il un DPA ?**                          | ✔ obligatoire       | Vérification contractuelle        |
| **Est-il open-source avec communauté ?**     | ✔ recommandé        | Vérification GitHub               |
| **Envoie-t-il données hors UE ?**            | ❌ sauf encadrement  | Vérification privacy policy       |
| **Offre-t-il import minimal ?**              | ✔                   | `import` lite versions            |
| **Peut-on désactiver les fonctionnalités ?** | ✔ nécessaire        | Paramètre `disableTelemetry=true` |

> ✅ **Synthèse**  
> Un SDK ne peut être intégré dans LexOrbital que s'il répond positivement à toutes ces questions. Le processus de validation est documenté et automatisé dans le Meta-Kernel.

---

## 🧩 9. Checklist qualité de dépendance (LexOrbital)

| Contrôle                            | Outil              | CI ?      |
| ----------------------------------- | ------------------ | --------- |
| **Audit vulnérabilités**            | npm audit          | ✔        |
| **Analyse structure dépendances**   | dependency-cruiser | ✔        |
| **Vérification configuration safe** | Script interne     | ✔        |
| **Analyse trafic réseau SDK**       | Proxy dev          | ❌ manuel |
| **Revue licences**                  | license-checker    | ✔        |
| **Vérif. size impact (perf)**       | Webpack analyzer   | ✔        |

> 💡 **Standard LexOrbital**  
> Cette checklist est appliquée automatiquement dans le processus CI/CD pour chaque nouvelle dépendance ou mise à jour majeure.

---

## 🧩 10. Synthèse finale — Matrice décisionnelle LexOrbital

| Dimension       | Critère                                 | OK = intégrer |
| --------------- | --------------------------------------- | ------------- |
| **Sécurité**    | Maintenu, sans vulnérabilités critiques | ✔            |
| **Vie privée**  | Consentement gérable, finalité claire   | ✔            |
| **RGPD**        | DPA + non-transfert non encadré         | ✔            |
| **Technique**   | API stable, config minimale             | ✔            |
| **Performance** | Faible overhead                         | ✔            |
| **Architec.**   | Import partiel possible                 | ✔            |

> ✅ **Synthèse**  
> Un SDK ne peut être intégré dans LexOrbital que s'il répond positivement à toutes ces dimensions. Cette matrice décisionnelle guide le processus de validation et garantit la conformité RGPD et la sécurité.

---

## 📚 Ressources complémentaires

- [CNIL - Sécurité des données](https://www.cnil.fr/fr/securite-des-donnees)
- [CNIL - Sous-traitants et transferts de données](https://www.cnil.fr/fr/sous-traitants-et-transferts-de-donnees)
- [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/)
- [npm audit Documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Fiche 2 - Préparer son développement](./02-Préparer%20son%20developpement.md)
- [Fiche 3 - Sécuriser son environnement de développement](./03-Sécuriser%20son%20environnement%20de%20développement.md)
- [Fiche 10 - Veiller à la qualité de votre code](./10-Veiller%20à%20la%20qualité%20de%20votre%20code%20et%20sa%20documentation.md)

---

**Navigation** : [← Fiche 8](./08-Gérer%20les%20accès%20et%20les%20droits.md) | [Sommaire](./00_SOMMAIRE.md) | [Fiche 10 →](./10-Veiller%20à%20la%20qualité%20de%20votre%20code%20et%20sa%20documentation.md)
