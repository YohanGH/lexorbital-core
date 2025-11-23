# Fiche n°14 — Gérer la durée de conservation des données

## 🌑 1. Cycle complet de conservation (adapté LexOrbital)

> **📘 Source** : Structure CNIL — Base active / Archivage intermédiaire / Suppression

| Phase | Description CNIL | Implémentation LexOrbital |
|-------|------------------|--------------------------|
| **Base active** | Données accessibles aux services opérationnels, nécessaires à l'objectif | Tables principales des modules (auth, audit, analytics…) sous TTL ou dates d'expiration |
| **Archivage intermédiaire** | Données non utilisées mais encore nécessaires pour obligations légales / preuve | Stockage séparé (`archived_...`), accès restreint, via BackRing + Meta-Kernel |
| **Archivage définitif / Suppression** | Suppression ou anonymisation irréversible | Job Meta-Kernel TTL purge + anonymisation statique pour stats |

---

## 🌒 2. Tableau général des durées de conservation — LexOrbital-core + Modules

> **📘 Note**  
> Ce tableau fait office de **référence globale LexOrbital**.  
> Chaque module rajoute sa ligne dans son `rgpd-manifest.json`.  
> Le Meta-Kernel peut générer la fiche CNIL automatique depuis ces tables.

### 📊 Tableau 1 — Données du Meta-Kernel (globales)

| Catégorie | Origine | Finalité | Base active | Archivage intermédiaire | Suppression / Anonymisation |
|-----------|---------|----------|-------------|------------------------|----------------------------|
| **Manifests** (`module.json` / `rgpd-manifest.json`) | Modules | Chargement, documentation vivante | Indéfinie (nécessaire au fonctionnement) | Pas d'archivage | Mis à jour via Git ; versions obsolètes supprimées |
| **Logs système du Meta-Kernel** | Core | Débogage, sécurité générale | 6–12 mois (comme recommandé CNIL pour journaux) | Jusqu'à 24 mois si incident | Suppression automatique |
| **Clés/Secrets internes** | Infra | Sécurité chiffrage | Rotation selon politique (6–12 mois) | Historique min. | Anciennes clés supprimées (pattern Encryption) |

### 📊 Tableau 2 — Données du BackRing

| Catégorie | Finalité | Base active | Archivage | Suppression |
|-----------|----------|-------------|-----------|-------------|
| **Sessions BackRing** | Auth + interactions | Durée de session (ex : 30 min – 24h) | Aucun | Auto-expiration |
| **Logs d'erreurs BackRing** | Debug | 3 mois | Jusqu'à 12 mois | Purge automatique |
| **Événements internes** (bus d'événements) | Orchestration modules | Selon besoin (24–72h) | Aucun | Purge via TTL |

### 📊 Tableau 3 — Données du FrontRing

| Catégorie | Finalité | Base active | Archivage | Suppression |
|-----------|----------|-------------|-----------|-------------|
| **Cookies de session** | Auth front | Durée session | Aucun | Expiration automatique |
| **Cookies analytics** (mode exempté) | Statistiques anonymes | ≤ 13 mois (CNIL) | Aucun | Suppression / rotation |
| **Paramètres UI** | Préférences locales | 12 mois | Aucun | Nettoyage local storage |

### 📊 Tableau 4 — Modules Canoniques LexOrbital

#### 🔐 Module Auth (Gestion utilisateurs)

> **⚠️ Fortement encadré RGPD**

| Données | Finalité | Base active | Archivage | Suppression |
|---------|----------|-------------|-----------|-------------|
| **Comptes utilisateurs** | Authentification | Pendant l'usage | Aucun | Sur demande (droit effacement) |
| **Hash mots de passe** | Auth | Tant que compte actif | Aucun | Suppression immédiate après effacement |
| **Tokens / sessions** | Auth | 15 min – 24h | Aucun | Auto-expiration |
| **Logs de connexion** | Sécurité | 6 mois – 1 an (CNIL) | Jusqu'à 24 mois si fraude | Purge automatique |
| **Emails, identifiants** | Gestion compte | Durée vie utilisateur | Aucun | Suppression compte |

#### 🛰️ Module Audit (journalisation)

> **📘 Obligation CNIL typique 6–12 mois**

| Données | Finalité | Base active | Archivage | Suppression |
|---------|----------|-------------|-----------|-------------|
| **Événements audit** (who / what / when / where) | Sécurité, conformité | 6–12 mois | Jusqu'à 24 mois si obligation légale interne | Purge TTL |
| **Logs sensibles** (modif droits, accès admin) | Sécurité renforcée | 12 mois | 24 mois | Purge automatisée |

#### 📈 Module Analytics (exempté consentement)

> **📘 Référence CNIL fiche analytics et auto-évaluation pages 3–8**

| Données | Base active | Archivage | Suppression |
|---------|-------------|-----------|-------------|
| **Événements anonymes** (`page_view`, `interaction`, `performance`) | 25 mois max | Aucun | TTL automatique |
| **Cookie ID first-party** | 13 mois max | Aucun | Expiration |
| **IP tronquée** | Volatil (jamais stockée complète) | Aucun | Non conservée |
| **Données agrégées** | Indéfini (non personnelles) | Statistiques | Conservent anonymes |

#### ✉️ Module Mailer

| Données | Finalité | Base active | Archivage | Suppression |
|---------|----------|-------------|-----------|-------------|
| **Journaux d'envoi** | Diagnostic | 1–3 mois | 6 mois | Purge |
| **Templates email** | Fonctionnel | Indéfini | Aucun | Sur suppression module |
| **Logs SMTP** | Technique | 1–6 mois | Aucun | Purge |

#### 🧩 Module RBAC (permissions)

| Données | Finalité | Base active | Archivage | Suppression |
|---------|----------|-------------|-----------|-------------|
| **Rôles internes** | Contrôle accès | Indéfini | Aucun | Suppression compte |
| **Logs attribution rôles** | Sécurité | 6–12 mois | 24 mois si nécessaire | TTL |

#### 🗄️ Module CI / Infra

| Données | Finalité | Base active | Archivage | Suppression |
|---------|----------|-------------|-----------|-------------|
| **Logs CI** (build/tests) | Suivi builds | 1–3 mois | 12 mois | Purge |
| **Artifacts** | Déploiement | 1–6 mois | Aucun | TTL |

---

## 🌕 3. Tableau "Obligations — Cycle complet" (vue CNIL → LexOrbital)

| Phase CNIL | Exigence | Concrétisation LexOrbital |
|------------|----------|---------------------------|
| **Base active** | Accessible uniquement le temps nécessaire | Pattern TTL + champs `expiresAt` imposés par Meta-Kernel |
| **Archivage intermédiaire** | Accès restreint → exceptionnel | Tables `archived_*` avec accès BackRing seulement |
| **Suppression / anonymisation** | Définitive, irréversible | Modules appliquent anonymisation + purge TTL |
| **Homogénéité** | Mêmes mécanismes que droit à l'effacement | Fonction `metaKernel.deleteOrAnonymize()` réutilisée |

---

## 🌕 4. Proposition pour `rgpd-manifest.json` (template commun)

Chaque module devra ajouter :

```json
{
  "retention": {
    "baseActive": "ex: 12 months",
    "archival": "ex: 24 months",
    "deletion": "automatic TTL purge",
    "anonymization": "yes/no, method"
  }
}
```

> **💡 Avantage**  
> Ce format permet au Meta-Kernel de **générer automatiquement** la documentation CNIL et d'appliquer les règles de purge.

---

## 🌖 5. Analyse complète des cas possibles dans LexOrbital

Ci-dessous, tous les types de données que LexOrbital peut être amené à gérer (présent + futur) :

| Famille | Modules concernés | Exemple | Risque | Durée typique |
|---------|-------------------|---------|--------|---------------|
| **Identité** | Auth | email, pseudo | 🔴 Élevée | Durée compte |
| **Sécurité** | Audit, Auth | logs login | 🟠 Modérée | 6–12 mois |
| **Événementielle** | Analytics | événements anonymes | 🟢 Faible | 25 mois |
| **Technique** | BackRing | erreurs, perf | 🟢 Faible | 1–12 mois |
| **Admin** | RBAC | modifications rôles | 🔴 Élevée | 12–24 mois |
| **Communication** | Mailer | logs emails | 🟢 Faible | 1–3 mois |
| **CI / DevOps** | CI | build logs | 🟢 Faible | 1–6 mois |
| **Contenus** | Modules métier futurs | items, posts | ⚪ Variable | Variable |
| **Paiement** (si ajout futur) | module paiement | tokens, logs | 🔴 Très élevée | 5–10 ans (loi) |
| **Santé** (interdit sauf module spécifique) | module santé | infos médicales | 🔴 Très élevée | 20 ans (loi) |

---

## 🌔 6. Recommandation d'architecture LexOrbital pour la conservation

### ✅ Pattern TTL (déjà dans les notes RGPD by design)

Intégré dans le Meta-Kernel avec :

- Champ obligatoire `expiresAt`
- Purge automatique
- Compatibilité droit effacement

### ✅ Separation of Concerns : base active / archive

Deux schémas/dossiers par module :

```
main_table      → Base active
archived_table  → Archivage intermédiaire
```

### ✅ Automatisation via CI + scripts

Le job : `scripts/purge-expired.ts` (ou via module infra) appliqué sur :

- `audit`
- `analytics`
- `mailer logs`
- `CI logs`
- etc.

> **💡 Architecture recommandée**  
> Cette approche garantit une **conformité automatique** et une **traçabilité complète** des durées de conservation.

---

## 📚 Ressources complémentaires

- [CNIL — Durées de conservation](https://www.cnil.fr/fr/duree-de-conservation-des-donnees)
- [CNIL — Guide du développeur](https://www.cnil.fr/developpeur)
- [Pattern TTL LexOrbital](../02-compliance/02-privacy-patterns.md)

---

<div align="center">

**[⬅️ Précédent](./13_fiche-chiffrement.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./15_fiche-journalisation.md)**

</div>
