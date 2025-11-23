# Fiche n°17 — Mesurer la fréquentation de vos sites et applications

> **Module Analytics LexOrbital — Conformité CNIL Article 82**

**Objectif** : Permettre au module analytics d'être par défaut conforme à l'exemption CNIL (article 82) tout en étant configurable.

---

> **📘 Contexte CNIL**  
> Cette fiche détaille l'implémentation LexOrbital pour la **mesure d'audience exemptée de consentement** selon les critères de la CNIL.

---

## 📊 Vue d'ensemble : Tableau CNIL → LexOrbital

**"Mesure d'audience exemptée de consentement"**

Le module Analytics LexOrbital est conçu pour respecter **par défaut** les critères CNIL permettant l'exemption de consentement (article 82 LIL), tout en restant configurable pour des besoins spécifiques.

---

## 🧩 1. Finalité strictement limitée à la mesure d'audience

> **📘 Source** : Tableau CNIL page 3

| Objectif CNIL                               | Critère CNIL                                                         | Mesure technique CNIL                                                      | Implémentation LexOrbital                                                                                           |
| ------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Finalité unique : mesure d'audience**     | Fournir instructions pour désactiver toute fonctionnalité hors cadre | N/A                                                                        | Paramètre `analytics.mode = "exempted"` ; toutes les fonctions marketing désactivées ou non incluses dans le bundle |
| **Minimisation des données collectées**     | Headers minimisés (version majeure navigateur/OS)                    | Collecter uniquement : version majeure, type device, taille écran arrondie | SDK FrontRing : normalisation automatique avant envoi                                                               |
| **Collecte limitée à 3 types d'événements** | `page_view`, `interaction` (clic), `performance`                     | Liste hard-codée limite                                                    | API BackRing accepte uniquement `{page_view, interaction, performance}`                                             |

---

## 🧩 2. Sous-traitance (si module utilisé par plusieurs éditeurs)

> **📘 Source** : Tableau CNIL page 3–4

| Objectif CNIL                                       | Critère CNIL                | Mesure technique | Implémentation LexOrbital                                  |
| --------------------------------------------------- | --------------------------- | ---------------- | ---------------------------------------------------------- |
| **Fournir DPA** (accord sous-traitance art. 28)     | DPA standard                | N/A              | Livrer un modèle `DPA.md` dans le module (optionnel)       |
| **Pas de mise en commun des données entre clients** | Aucune mutualisation brute  | N/A              | Base logique séparée par `projectId` ou DB par projet      |
| **Pas de réutilisation pour compte propre**         | Aucune finalité interne     | N/A              | Module analytics ne stocke rien hors métriques anonymisées |
| **Point de contact sous-traitance**                 | Présence d'un support dédié | N/A              | Champ `supportContact` dans config (pour projets SaaS)     |

---

## 🧩 3. Absence totale de suivi "cross-site"

> **📘 Source** : Tableau CNIL page 4 & 7

| Objectif CNIL                                    | Critère CNIL                                  | Mesure technique                                     | Implémentation LexOrbital                                              |
| ------------------------------------------------ | --------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| **Aucun import externe**                         | Pas d'UTM, CRM, campagnes                     | Désactiver collecte UTM / referrer limité au domaine | SDK FrontRing ignore UTM, coupe referrer au host                       |
| **Aucun identifiant cross-domain**               | Cookie en first-party uniquement              | Interdire cookie tiers                               | Module analytics génère ID hashé + sel par projet                      |
| **IP pseudonymisée**                             | Localisation max = ville + troncature IP      | Retirer le dernier octet min.                        | Middleware BackRing tronque IP avant stockage                          |
| **Fingerprinting non cross-site**                | Hash inclut : domaine + composante temporelle | Empêche reuse multi-sites                            | Fonction `generateAnonymousId(projectId, window)` avec sel par station |
| **Pas de collecte d'info perso via formulaires** | N/A                                           | Vérifier payload                                     | Validation schema TS : aucun champ perso autorisé                      |

---

## 🧩 4. Exclusion de toute mesure de "reach" ou croisement

> **📘 Source** : CNIL page 4 & 7

| Objectif CNIL                           | Critère                                  | Mesure technique     | Implémentation LexOrbital                       |
| --------------------------------------- | ---------------------------------------- | -------------------- | ----------------------------------------------- |
| **Pas de croisement inter-sites**       | Toute fonctionnalité de reach désactivée | Désactivation forcée | Paramètre `allowReachMetrics = false` hard-codé |
| **Pas de dédoublonnage multi-domaines** | N/A                                      | N/A                  | Identifiant pseudonyme dépend du `projectId`    |

---

## 🧩 5. Production exclusive de statistiques anonymes

> **📘 Source** : CNIL page 4, 7–8

| Objectif CNIL                      | Critère                                                 | Mesure technique                        | Implémentation LexOrbital                                             |
| ---------------------------------- | ------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------- |
| **Rapports uniquement anonymes**   | Agrégation et arrondi                                   | Données présentées au 10 le plus proche | Route `GET /stats` renvoie uniquement des agrégats                    |
| **Anonymisation effective**        | Combinaison de critères ne permet pas ré-identification | Analyse interne                         | Stockage pseudonymisé + mixage par période                            |
| **Aucun suivi utilisateur unique** | Désactivation "session replay"                          | Interdit                                | Le module ne contient aucune fonction replay, blocage au compile-time |

---

## 🧩 6. Droit d'opposition des utilisateurs

> **📘 Source** : CNIL page 4 & 8

| Objectif CNIL                         | Critère                             | Mesure technique                               | Implémentation LexOrbital                                              |
| ------------------------------------- | ----------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| **Modalité d'opposition obligatoire** | Lien / bouton facilement accessible | Opposition via cookie ou fingerprint blocklist | SDK FrontRing : `analytics.disable()` + cookie `analytics_optout=true` |
| **Opposition durable**                | Préserver le refus dans le temps    | Cookie spécifique ou empreinte en blocklist    | Meta-Kernel gère liste opt-out global par station                      |

---

## 🧩 7. Durées de conservation et cookie lifetime (CNIL)

> **📘 Source** : Synthèse CNIL "Recommandations"

| Élément                               | Exigence CNIL                            | Implémentation LexOrbital                                 |
| ------------------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| **Durée de vie cookie**               | ≤ 13 mois (non prorogés automatiquement) | Cookie `anon_id` expirant à 13 mois, sans update auto     |
| **Durée de conservation des données** | ≤ 25 mois                                | Pattern TTL (Meta-Kernel) supprime événements >25 mois    |
| **Réexamen périodique**               | Durées revues régulièrement              | Ajout dans `rgpd-manifest.json` : review tous les 12 mois |

---

## 🛰️ Synthèse : Comportement par défaut du module Analytics LexOrbital

| Fonction               | Valeur par défaut                            | Conforme CNIL ? |
| ---------------------- | -------------------------------------------- | :-------------: |
| **Mode**               | `"exempted"`                                 |   ✅ Toujours   |
| **Cookie**             | 1st-party uniquement                         |       ✅        |
| **IP**                 | Troncature dernier octet min                 |       ✅        |
| **Données collectées** | `page_view`, `interaction`, `performance`    |       ✅        |
| **Données interdites** | marketing, campagnes, CRM, UTM               |       ✅        |
| **Export stats**       | Agrégats anonymes                            |       ✅        |
| **Session replay**     | Jamais                                       |       ✅        |
| **Cross-site**         | Impossible                                   |       ✅        |
| **Opt-out**            | Disponible dans politique de confidentialité |       ✅        |
| **TTL**                | Cookie 13 mois, données 25 mois              |       ✅        |

> **✅ Conclusion**  
> Le module Analytics LexOrbital est **conforme par défaut** aux critères CNIL pour l'exemption de consentement (article 82 LIL).

---

## 🚀 Bonus

**Fiche 17 – Audience**

| Rubrique            | Valeur LexOrbital                                                   |
| ------------------- | ------------------------------------------------------------------- |
| **Finalité**        | Mesure technique d'audience, optimisation ergonomie, perf           |
| **Base légale**     | Exemption art. 82 LIL (si mode exempté activé)                      |
| **Traceurs**        | Cookie anonymisé first-party, 13 mois                               |
| **Données**         | Headers minimisés, ID pseudonyme, `page_view`/`interactions`/`perf` |
| **Destinataires**   | Aucun tiers par défaut                                              |
| **Sous-traitance**  | Possible, avec isolation projet par projet                          |
| **Conservation**    | 25 mois (TTL automatique)                                           |
| **Opposition**      | Lien "désactiver la mesure d'audience" dans politique RGPD          |
| **Risques limités** | Pas de suivi cross-site, pas de données perso, pas de marketing     |

---

## 📚 Ressources complémentaires

- [CNIL — Mesure d'audience exemptée de consentement](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-et-autres-traceurs-que-dit-la-loi)
- [CNIL — Article 82 LIL](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006528460/)
- [CNIL — Recommandations sur les cookies](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-et-autres-traceurs-que-dit-la-loi)

---

<div align="center">

**[⬅️ Précédent](./16_fiche-droits-utilisateurs.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./18_fiche-export-donnees.md)**

</div>
