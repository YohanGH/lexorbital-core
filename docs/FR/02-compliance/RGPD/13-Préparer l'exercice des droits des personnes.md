# Fiche n°13 — Préparer l'exercice des droits des personnes

> **Version LexOrbital — Droits RGPD intégrés**

**Objectif** : Implémenter les droits des personnes (accès, rectification, effacement, portabilité, opposition, limitation) de manière conforme et automatisée dans LexOrbital.

---

## 🔎 Vue générale (tableau synthétique)

| Élément | Exigence CNIL | Implémentation LexOrbital |
|---------|---------------|---------------------------|
| **Accessibilité** | Indiquer où exercer les droits (mail, formulaire, UI) | FrontRing : menu "Vie privée" + page `/privacy/my-data` |
| **Authentification** | Vérifier l'identité avant modification/suppression | Module Auth : re-auth ou MFA pour opérations sensibles |
| **Traçabilité** | Journaliser toutes les opérations liées aux droits | Module Audit : `event.type = "data_subject_request"` |
| **Multi-canaux** | Accepter mail, formulaire, interface | LexOrbital propose : UI intégrée + point d'entrée API + email |
| **Design** | Interfaces claires, accessibles, guidées | Inspiré de [design.cnil.fr](https://design.cnil.fr) (exemples UI) |
| **Suivi** | Tenir la personne informée | Notifications email automatisées (via module mailer) |
| **Archivage** | Conserver preuves des demandes | Table dédiée `dsr_requests` dans BackRing |
| **Export / téléchargement** | Formats lisibles, standardisés | JSON, CSV, ZIP (via module Exporter) |

---

## 🧩 1. Tableau complet par droit (CNIL → LexOrbital)

> **📘 Note**  
> La version la plus importante pour la documentation officielle LexOrbital.

### 1.1 Droit d'accès

| Dimension | CNIL – Exigences | Implémentation LexOrbital |
|-----------|------------------|---------------------------|
| **Finalité** | Obtenir une copie lisible de toutes les données | Page FrontRing "Mes données" + export ZIP |
| **Interface** | Possibilité d'afficher les données ou les télécharger | Modules exposent `getAllUserData(userId)` |
| **Sécurité** | Authentification forte avant accès | Re-auth obligatoire + contrôle `roles: ["owner"]` |
| **Volume** | Possibilité de scinder les données si volumineux | Exportateur génère plusieurs fichiers (`auth.json`, `audit.json`, `prefs.json`, etc.) |
| **Traçabilité** | Toute consultation doit être auditée | `audit.log({ who, what:"access_request", when })` |

### 1.2 Droit à l'effacement

| Dimension | CNIL – Exigences | Implémentation LexOrbital |
|-----------|------------------|---------------------------|
| **Finalité** | Effacer toutes les données d'une personne | Appel Meta-Kernel `deleteOrAnonymize(userId)` |
| **Sous-traitants** | Notifier ceux qui détiennent des données | Module mailer : "hook effacement" pour modules externes |
| **Sauvegardes** | Empêcher restauration de données supprimées | Masquage / anonymisation lors de la restauration |
| **Modules** | Chaque module doit implémenter sa stratégie d'effacement | Auth : delete user ; Audit : purge ; Analytics : anonymisation |
| **Preuve** | Garder une trace administrative de la demande | Table `dsr_requests.archive` |

### 1.3 Droit d'opposition

| Dimension | CNIL – Exigences | Implémentation LexOrbital |
|-----------|------------------|---------------------------|
| **Finalité** | S'opposer à un traitement particulier | UI : boutons dédiés (Analytics, Newsletters, etc.) |
| **Effet** | Cesser toute collecte future + effacer l'historique selon cas | Analytics : cookie `analytics_optout=true` + purge events |
| **Portée** | Peut viser un module ou l'ensemble | `module-manifest` expose traitements opposables |
| **Technique** | Flag `user.preferences.oppositions[module] = true` | BackRing désactive routes concernées |
| **Traçabilité** | Journalisation obligatoire | Audit : `event.type = "opposition_exercised"` |

### 1.4 Droit à la portabilité

| Dimension | CNIL – Exigences | Implémentation LexOrbital |
|-----------|------------------|---------------------------|
| **Format** | Fichiers lisibles par machine (JSON, CSV, XML) | Exporter ZIP contenant : `user.json`, `history.json`, `analytics.csv` |
| **Contenu** | Données fournies par la personne + données générées | Modules implémentent `exportUserData` |
| **UI** | Bouton "Télécharger mes données" | Disponible dans `/privacy/my-data` |
| **Sécurité** | Authentification avant téléchargement | Re-auth obligatoire |
| **Transmission** | Possibilité de transmettre à un autre service | Le ZIP respecte des schémas standardisés |

### 1.5 Droit à la rectification

| Dimension | CNIL – Exigences | Implémentation LexOrbital |
|-----------|------------------|---------------------------|
| **Finalité** | Corriger des données inexactes | Module Auth : `update profile` ; autres modules idem |
| **UI** | Interface dans le compte utilisateur | `/account/edit` |
| **Traçabilité** | Journalisation des modifications | Audit : `event.type = "rectification"` |
| **Sécurité** | Vérification identité | Re-auth ou MFA selon module |

### 1.6 Droit à la limitation

| Dimension | CNIL – Exigences | Implémentation LexOrbital |
|-----------|------------------|---------------------------|
| **Finalité** | Bloquer temporairement un traitement | Flag `user.isLimited=true` |
| **Effet** | Données mises en "quarantaine" | Tables secondaires `archived_limited` |
| **UI Admin** | Activation manuelle par admin | `/admin/users/[id]/limit-processing` |
| **Module** | Modules respectent le flag automatiquement | Accès en read-only ; aucune écriture |
| **Traçabilité** | Audit de toutes les opérations | `event.type="limitation_applied"` |

---

## 🧩 2. Points de contact, accessibilité et design CNIL

> **📘 Source** : Incorporation des principes du site officiel [design.cnil.fr](https://design.cnil.fr)

| Sujet | Bonnes pratiques CNIL | Implémentation LexOrbital |
|-------|----------------------|---------------------------|
| **Accessibilité** | Localisation logique (compte, footer, privacy) | Lien "Vie privée / Exercer mes droits" dans FrontRing |
| **Clarté** | Explication courte des droits | Composants UI standard : `<UserRightsExplain />` |
| **Formulaires** | Champs simples, guidés | Formulaire `/privacy/request` |
| **Processus** | État d'avancement visible | Timeline UI ("Demande reçue → En cours → Terminé") |
| **Modèles** | Proposer des modèles de demandes | Section "FAQ" ou "Modèles CNIL" |
| **Suivi** | Confirmation par email | Module Mailer + templates `dsr.received`, `dsr.completed` |
| **Historique** | Possibilité de télécharger l'historique | Archive dans `/privacy/history` |
| **Ton & design** | Interface rassurante, non technique | Couleurs neutres, langage simple (design.cnil.fr) |

---

## 🧩 3. Gestion opérationnelle interne (BackRing / Meta-Kernel)

| Élément | Exigence | Implémentation LexOrbital |
|---------|----------|---------------------------|
| **Réception demandes** | Canal unique interne | Table `dsr_requests` |
| **Assignation** | Attribuer au bon module | Chaque module expose `handleDSR()` |
| **Délai** | 1 mois (prolongation 2 mois possible) | BackRing enregistre deadline |
| **Journalisation** | Obligatoire | Module Audit |
| **Archivage** | Preuve accessible en cas de contestation | Archive intermédiaire 3 ans max |
| **Notifications** | Avertir utilisateur des étapes | Mailer + Webhooks UI |

---

## 🧩 4. Intégration dans les modules LexOrbital

Chaque module doit exposer dans son `rgpd-manifest.json` :

| Champ | Description | Exemple |
|-------|-------------|---------|
| `dataSubjectRights.access` | Module supporte droit d'accès ? | `"full"` |
| `dataSubjectRights.erasure` | Effacement possible ? | `"anonymize"` ou `"delete"` |
| `dataSubjectRights.rectification` | Rectifiable ? | `"partial"` |
| `dataSubjectRights.opposition` | Opposable ? | `"module_only"` |
| `dataSubjectRights.portability` | Exportable ? | `"json, csv"` |
| `dataSubjectRights.limitation` | Mise en quarantaine possible ? | `"yes"` |

> **💡 Exemple de manifest**  
> ```json
> {
>   "dataSubjectRights": {
>     "access": "full",
>     "erasure": "anonymize",
>     "rectification": "partial",
>     "opposition": "module_only",
>     "portability": "json, csv",
>     "limitation": "yes"
>   }
> }
> ```

---

## 🧩 5. Synthèse des risques + mesures RGPD by design

| Risque | CNIL | Mesure LexOrbital |
|--------|------|-------------------|
| **Accès non autorisé** lors de l'exercice des droits | Vérifier identité | Auth MFA + re-auth obligatoire |
| **Perte de preuve** | Archivage recommandé | Table `dsr_requests.archive` |
| **Mauvaise suppression** | Convergence avec TTL & effacement | Meta-Kernel : `deleteOrAnonymize()` |
| **Mauvaise compréhension** par utilisateur | Design CNIL | UI guidée + tooltips |
| **Aucun suivi** | Obligation de feedback | Mailer + UI timeline |

> **✅ Conclusion**  
> LexOrbital intègre **par design** tous les droits RGPD avec :
> - ✅ Interfaces utilisateur conformes CNIL
> - ✅ Traçabilité complète via module Audit
> - ✅ Automatisation via Meta-Kernel
> - ✅ Support multi-modules via manifests

---

## 📚 Ressources complémentaires

- [CNIL — Exercice des droits](https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles)
- [CNIL Design System](https://design.cnil.fr)
- [CNIL — Modèles de lettres](https://www.cnil.fr/fr/modeles-de-lettres)
- [Module Audit LexOrbital](../02-compliance/03-audit-logging.md)

---

<div align="center">

**[⬅️ Précédent](./12_fiche-minimisation.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./14-Gérer la durée de conservation des données.md)**

</div>
