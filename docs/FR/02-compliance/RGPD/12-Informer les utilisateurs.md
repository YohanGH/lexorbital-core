# FICHE N°12 — INFORMER LES PERSONNES

**Format 100% tableaux — Transparence RGPD-by-design**

> 📘 **Contexte RGPD**  
> L'article 13 du RGPD impose d'informer les personnes sur le traitement de leurs données personnelles. LexOrbital intègre cette obligation de transparence directement dans son architecture, via des manifests déclaratifs et des interfaces utilisateur générées automatiquement.

---

## 🧩 1. Qui informer ? Et quand ? (vue CNIL → LexOrbital)

| Situation                      | Exigence CNIL                                   | Moment où informer                       | Implémentation LexOrbital                                                  |
| ------------------------------ | ----------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| **Collecte directe**           | Données recueillies auprès de la personne       | Immédiatement (au moment de la collecte) | Formulaires FrontRing → bloc "Information RGPD" ; Privacy page obligatoire |
| **Collecte indirecte**         | Données venant d'un tiers, API, partenaire      | Dès que possible, max 1 mois             | Module doit générer notification automatique (email / UI)                  |
| **Collecte via observation**   | Tracking navigation, cookies, Wi-Fi analytics   | Au moment du dépôt des traceurs          | CMP LexOrbital + bannière cookie conforme                                  |
| **Modification substantielle** | Changement finalité, destinataires, base légale | Avant la mise en œuvre                   | Notification UI + email via Mailer module                                  |
| **Violation de données**       | Risque élevé pour les personnes                 | Dès que possible                         | Notification CNIL (72h) + notification personnes                           |

> 💡 **Standard LexOrbital**  
> Chaque module doit déclarer dans son `rgpd-manifest.json` les moments d'information requis, permettant au Meta-Kernel de générer automatiquement les notifications appropriées.

---

## 🧩 2. Obligations d'information — contenu minimal

| Élément obligatoire                     | Description CNIL                              | Implémentation LexOrbital                                |
| --------------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| **Identité du responsable**             | Nom, coordonnées                              | Affiché dans Privacy page (`/privacy`) + manifest global |
| **Finalités**                           | Pourquoi collecte-t-on ?                      | Définies par module dans `rgpd-manifest.json`            |
| **Base légale**                         | Contrat, consentement, intérêt légitime…      | Fiche 15 ; affichée par module dans interface            |
| **Caractère obligatoire ou facultatif** | Indiquer les conséquences du refus            | Formulaires d'inscription / collecte                     |
| **Destinataires**                       | Internes, externes, sous-traitants            | Modules listent `destinataires[]` dans manifest          |
| **Durée conservation**                  | Ou critères de détermination                  | Généré via Fiche 14, visible en Privacy Page             |
| **Droits des personnes**                | Accès, rectification, effacement, opposition… | Pages `/privacy/my-rights` + UI intégrée                 |
| **Contact DPO / data contact**          | Adresse mail ou formulaire                    | `dpo.contact` dans Meta-Kernel                           |
| **Droit de réclamation CNIL**           | Lien vers CNIL                                | Bloc obligatoire dans Privacy page                       |

> ⚠️ **Obligation**  
> Tous ces éléments doivent être présents et accessibles. Le Meta-Kernel valide automatiquement la présence de ces informations dans les manifests des modules.

---

## 🧩 3. Informations supplémentaires — cas particuliers

| Cas spécifique                | Exigence CNIL                               | Implémentation LexOrbital                             |
| ----------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| **Collecte indirecte**        | Mentionner provenance et catégories données | Module affiche `source=C-partenaire` etc.             |
| **Transferts hors UE**        | Mentionner pays + garanties                 | BackRing → afficher configuration (hébergeur / CDN)   |
| **Profilage / décision auto** | Informer & expliquer logique                | Modules ML doivent activer flag `profiling=true`      |
| **Intérêt légitime**          | Mentionner l'intérêt poursuivi              | Champ `legitimateInterestJustification` dans manifest |

---

## 🧩 4. Comment informer ? (formes et UX)

| Critère UX CNIL           | Description                         | Implémentation LexOrbital                               |
| ------------------------- | ----------------------------------- | ------------------------------------------------------- |
| **Accessibilité**         | Information facile à trouver        | Lien footer "Vie privée / Privacy Center"               |
| **Clarté**                | Vocabulaire simple, phrases courtes | Privacy page écrite en "Plain Language"                 |
| **Concise mais complète** | Approche en "2 niveaux"             | Niveau 1 : résumé ; Niveau 2 : détails technique/module |
| **Multisupports**         | Adapté au device                    | UI Web, PDF, Email ; modules IoT → via app compagnon    |
| **Distinguée des CGU**    | Séparer RGPD et juridique           | `/privacy` distinct de `/terms`                         |

> 💡 **Standard LexOrbital**  
> LexOrbital suit les recommandations CNIL pour une information claire et accessible, avec une approche en deux niveaux permettant de satisfaire à la fois les utilisateurs non techniques et les exigences légales complètes.

---

## 🧩 5. Niveau 1 & Niveau 2 — Modèle LexOrbital

| Niveau       | Contenu CNIL                                                      | Présentation LexOrbital                                         |
| ------------ | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| **Niveau 1** | Finalités + bases légales + destinataires + droits + consentement | Résumé clair dans bannière CMP + page "Information essentielle" |
| **Niveau 2** | Détails complets, techniques, durées, destinataires externes      | Page `/privacy/details`, générée via Meta-Kernel & manifests    |

> 📘 **Architecture**  
> Le modèle à deux niveaux permet de respecter l'obligation de transparence tout en maintenant une expérience utilisateur claire. Le niveau 1 est généré automatiquement depuis les manifests, le niveau 2 est accessible via un lien "En savoir plus".

---

## 🧩 6. Informations pour chaque module (via rgpd-manifest.json)

| Champ manifest        | Description                       |
| --------------------- | --------------------------------- |
| `moduleName`          | Nom du module                     |
| `purposes[]`          | Liste finalités                   |
| `legalBasis[purpose]` | Base légale                       |
| `dataCategories[]`    | Catégories de données collectées  |
| `retention`           | Durée conservation                |
| `destinataires`       | Interne / externe / sous-traitant |
| `dpoContact`          | Email contact                     |
| `userRights`          | Droits activés par module         |
| `informationSummary`  | Bloc de niveau 1                  |

> 💡 **Exemple de structure**  
> Chaque module déclare ses informations dans `rgpd-manifest.json`, permettant au Meta-Kernel de générer automatiquement les pages de transparence et les notifications.

---

## 🧩 7. Analyse selon type de collecte (3 cas majeurs)

### 7.1 Collecte directe (formulaire / inscription)

| Obligations              | Exemple                                   | Implémentation LexOrbital               |
| ------------------------ | ----------------------------------------- | --------------------------------------- |
| **Informer au moment M** | Formulaire inscription                    | Bandeau info juste au-dessus validation |
| **Finalités**            | Création compte, sécurité                 | Texte dynamique issu manifest           |
| **Données obligatoires** | Email obligatoire / pseudonyme facultatif | Indicateur sur champs                   |

### 7.2 Collecte indirecte (partenaires, API)

| Obligations                    | Exemple                     | Implémentation LexOrbital          |
| ------------------------------ | --------------------------- | ---------------------------------- |
| **Informer asap (max 1 mois)** | Import liste clients        | Mail automatique généré par module |
| **Catégories de données**      | Identité, usage, logs       | `dataCategories[]`                 |
| **Provenance**                 | Source publique, partenaire | Champ `source` du manifest         |

### 7.3 Collecte via observation (traceurs)

| Obligations              | Exemple                       | Implémentation LexOrbital             |
| ------------------------ | ----------------------------- | ------------------------------------- |
| **Informer via CMP**     | Cookie analytics, fingerprint | CMP FrontRing                         |
| **Finalités traceurs**   | Statistiques, publicité       | Déclaré dans `traceurs.manifest.json` |
| **Retrait consentement** | Lien sur toutes les pages     | Icône cookie permanente               |

> ⚠️ **Obligation**  
> Chaque type de collecte nécessite une information spécifique et adaptée. LexOrbital génère automatiquement les interfaces et notifications appropriées selon le type déclaré dans le manifest.

---

## 🧩 8. Communication en cas de violation de données

| Exigence CNIL              | Description                        | Implémentation LexOrbital                  |
| -------------------------- | ---------------------------------- | ------------------------------------------ |
| **Notification CNIL**      | Sous 72h                           | Script `violation-report.ts` (Meta-Kernel) |
| **Notification personnes** | Si risque élevé                    | Module Mailer : modèle "Data Breach"       |
| **Contenu notification**   | Nature violation, risques, mesures | Gabarit généré via manifest                |
| **Traçabilité interne**    | Journalisation complète            | Module Audit : `event="data_breach"`       |

> ⚠️ **Obligation critique**  
> La notification à la CNIL doit être effectuée dans les 72 heures suivant la découverte de la violation. LexOrbital fournit des scripts automatisés pour faciliter cette déclaration, mais la responsabilité légale reste au responsable de traitement.

---

## 🧩 9. Formes d'information supportées par LexOrbital

| Support                        | Usage                                     | Exemples                         |
| ------------------------------ | ----------------------------------------- | -------------------------------- |
| **Pages UI**                   | Niveau 1 & 2                              | `/privacy`, `/privacy/details`   |
| **Pop-in / Banner**            | CMP                                       | Consentement cookies             |
| **Infobulles contextualisées** | Champ formulaire                          | "Pourquoi on demande ce champ ?" |
| **Emails automatiques**        | Information indirecte / violation données | Template mail                    |
| **Documentation PDF**          | Export légal                              | Générée via Meta-Kernel          |
| **QR code**                    | Dispositifs externes                      | Modules IoT                      |

> 💡 **Standard LexOrbital**  
> LexOrbital supporte plusieurs formats d'information pour s'adapter aux différents contextes d'usage et aux exigences légales. Les formats sont générés automatiquement depuis les manifests.

---

## 🧩 10. Risques en cas de mauvaise information

| Risque                             | Impact RGPD           | Prévention LexOrbital             |
| ---------------------------------- | --------------------- | --------------------------------- |
| **Information incompréhensible**   | Défaut transparence   | UX simplifiée (design.cnil.fr)    |
| **Omission d'une finalité**        | Traitement illicite   | Validation automatique manifest   |
| **Information au mauvais moment**  | Consentement invalide | CMP + UI pré-recueil              |
| **Informations trop volumineuses** | Non-conformité        | Hiérarchie niveaux 1/2            |
| **Absence de contact DPO**         | Non-respect RGPD      | `dpoContact` requis dans manifest |

> ⚠️ **Obligation**  
> Une mauvaise information peut invalider le consentement et rendre le traitement illicite. LexOrbital intègre des validations automatiques pour prévenir ces risques.

---

## 🧩 11. Synthèse LexOrbital — Matrice Transparence (vue finale)

| Élément à informer    | Où ?                 | Quand ?      | Par qui ?            | Comment ?              |
| --------------------- | -------------------- | ------------ | -------------------- | ---------------------- |
| **Finalités**         | CMP + Privacy page   | Dès collecte | Module               | Niveau 1/2             |
| **Bases légales**     | Privacy détails      | Dès collecte | Module               | Texte clair            |
| **Destinataires**     | Privacy détails      | Dès collecte | Module               | Liste + raisons        |
| **Conservation**      | Privacy détails      | Dès collecte | Module               | Durées Fiche 14        |
| **Droits**            | `/privacy/my-rights` | Dès collecte | Meta-Kernel          | Actions possibles      |
| **Contact DPO**       | Footer + Privacy     | Toujours     | Meta-Kernel          | Email                  |
| **Réclamation CNIL**  | Privacy              | Toujours     | Meta-Kernel          | Lien CNIL              |
| **Violation données** | Email + UI           | <72h         | Responsable sécurité | Template "data breach" |

> ✅ **Synthèse**  
> Cette matrice résume l'ensemble des obligations d'information et leur implémentation dans LexOrbital. Chaque élément est géré automatiquement via les manifests et le Meta-Kernel.

---

## 📚 Ressources complémentaires

- [CNIL - Informer les personnes](https://www.cnil.fr/fr/informer-les-personnes)
- [CNIL - Modèles de mentions d'information](https://www.cnil.fr/fr/modeles-de-mentions-dinformation)
- [CNIL - Design et RGPD](https://design.cnil.fr/)
- [Fiche 13 - Préparer l'exercice des droits des personnes](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md)
- [Fiche 14 - Gérer la durée de conservation des données](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md)
- [Fiche 15 - Prendre en compte les bases légales](./15-Prendre%20en%20compte%20les%20bases%20légales%20dans%20l'implémentation%20technique.md)
- [Fiche 16 - Analyser les traceurs](./16-Analyser%20les%20traceurs.md)

---

**Navigation** : [← Fiche 11](./11-Tester%20vos%20applications.md) | [Sommaire](./00_SOMMAIRE.md) | [Fiche 13 →](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md)
