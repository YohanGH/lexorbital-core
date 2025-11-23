# 02 · Conformité & Réglementation

> **RGPD by design, sécurité par défaut, conformité au droit français intégrée dans l'architecture.**

---

## 📖 Dans cette section

| Document                                                         | Description                          | Audience          |
| ---------------------------------------------------------------- | ------------------------------------ | ----------------- |
| [**00 - Vue d'ensemble**](./00-overview.md)                      | Compliance dans LexOrbital           | Tous              |
| [**01 - RGPD by design**](./01-rgpd-by-design.md)                | Intégration RGPD dans l'architecture | DPO, Architectes  |
| [**02 - Patterns de confidentialité**](./02-privacy-patterns.md) | Minimisation, TTL, chiffrement       | Développeurs      |
| [**03 - Audit et journalisation**](./03-audit-logging.md)        | Traçabilité et logs RGPD             | Développeurs, DPO |
| [**04 - Sécurité par défaut**](./04-security-by-default.md)      | Security patterns intégrés           | Développeurs      |
| [**05 - Droits des utilisateurs**](./05-user-rights.md)          | Accès, rectification, oubli          | Développeurs, DPO |

### Sous-dossier spécialisé

- [**RGPD/** — Référence complète RGPD](./RGPD/00_SOMMAIRE.md)

---

## ⚖️ Vision : Un "Code civil logiciel"

Le Meta-Kernel LexOrbital joue le rôle d'un **code civil logiciel**, une charte normative qui impose :

✅ Minimisation de la collecte  
✅ Expiration automatique des données (TTL)  
✅ Consentement explicite et traçable  
✅ Droit à l'oubli et à la rectification  
✅ Journalisation des opérations sensibles  
✅ Chiffrement au repos et en transit  
✅ Séparation stricte des responsabilités  
✅ Documentation claire des traitements

> **⚖️ Principe fondateur**  
> La conformité n'est pas un ajout tardif, mais une **loi constitutive** qui façonne tous les modules, tous les échanges et toute l'architecture.

---

## 🎯 Objectifs de cette section

Après avoir lu cette section, vous saurez :

1. **Pourquoi** la conformité est intégrée dans l'architecture
2. **Comment** implémenter les patterns RGPD (minimisation, TTL, chiffrement)
3. **Comment** auditer et journaliser les opérations sensibles
4. **Comment** garantir la sécurité by-default
5. **Comment** implémenter les droits des utilisateurs (accès, oubli, rectification)

---

## 🗺️ Parcours de lecture recommandés

### Parcours "DPO / Conformité" (1h)

1. [Vue d'ensemble](./00-overview.md) — compliance dans LexOrbital
2. [RGPD by design](./01-rgpd-by-design.md) — intégration architecturale
3. [Patterns de confidentialité](./02-privacy-patterns.md) — patterns techniques
4. [Audit et journalisation](./03-audit-logging.md) — traçabilité
5. [Droits des utilisateurs](./05-user-rights.md) — implémentation
6. [Guide RGPD complet](./RGPD/01_guide-rgpd-lexorbital.md) — référence

### Parcours "Développeur" (45 min)

1. [RGPD by design](./01-rgpd-by-design.md) — comprendre l'approche
2. [Patterns de confidentialité](./02-privacy-patterns.md) — patterns concrets
3. [Sécurité par défaut](./04-security-by-default.md) — bonnes pratiques
4. [Audit et journalisation](./03-audit-logging.md) — implémenter les logs
5. → Ensuite : [Module Audit](./RGPD/01_guide-rgpd-lexorbital.md)

### Parcours "Décideur" (20 min)

1. [Vue d'ensemble](./00-overview.md) — pourquoi la conformité ?
2. [RGPD by design](./01-rgpd-by-design.md) — approche architecturale
3. → Ensuite : [Origine du projet](../00-introduction/03-origin-story.md)

---

## 📊 Intégration de la conformité dans l'architecture

La conformité RGPD se décline à **trois niveaux** :

### Niveau 1 : Meta-Kernel (Législatif)

Le Meta-Kernel définit les règles :

- Politiques de données (minimisation, consentement, base légale)
- Patterns de sécurité (encryption, gestion des secrets, contrôle d'accès)
- Contrats d'API imposant la minimisation
- Conventions de journalisation et de TTL

### Niveau 2 : Anneaux (Interfaces)

Les anneaux imposent des contraintes :

- Types de données autorisées (minimisation)
- Formats normalisés (schémas RGPD-friendly)
- Événements obligatoires (consentement, logs, suppression)
- Obligation de chiffrer les communications

### Niveau 3 : Modules (Exécution)

Les modules implémentent :

- Adoption des patterns et helpers RGPD fournis par le noyau
- Manifest déclarant les traitements (`module-manifest` RGPD)
- API contractuelle avec champs minimisés
- Intégration dans l'audit trail
- TTL et chiffrement appliqués au niveau module

---

## 🔐 Principes de conformité

### 1. Privacy by Design

La protection des données est intégrée **dès la conception**.

**Application :**

- Le Meta-Kernel impose des règles RGPD
- Les modules héritent de ces contraintes
- Les manifestes RGPD documentent les traitements

### 2. Security by Default

La sécurité est **activée par défaut**, pas en option.

**Application :**

- Chiffrement activé par défaut
- Validation stricte des entrées
- Sanitisation automatique
- Rate limiting
- HTTPS obligatoire en production

### 3. Minimisation des données

Ne collecter que le **strict nécessaire**.

**Application :**

- Schémas de données minimaux
- Champs optionnels par défaut
- Validation stricte des types
- Pas de données superflues

### 4. Durée de conservation limitée (TTL)

Les données ont une **durée de vie maximale**.

**Application :**

- Chaque type de donnée a un TTL défini
- Nettoyage automatique des données expirées
- Logs conservés selon la réglementation

### 5. Droits des utilisateurs

Les utilisateurs peuvent **accéder, rectifier, supprimer** leurs données.

**Application :**

- API d'accès aux données
- Endpoints de rectification
- Mécanisme de droit à l'oubli (anonymisation ou suppression)

---

## 🛡️ Modules de conformité LexOrbital

| Module                                | Rôle                           | Status         |
| ------------------------------------- | ------------------------------ | -------------- |
| `lexorbital-module-audit`             | Journalisation RGPD            | ✅ Prioritaire |
| `lexorbital-module-consent`           | Gestion des consentements      | 🚧 Roadmap     |
| `lexorbital-module-privacy-dashboard` | Dashboard utilisateur (droits) | 🚧 Roadmap     |
| `lexorbital-module-data-export`       | Export des données utilisateur | 🚧 Roadmap     |
| `lexorbital-module-right-to-forget`   | Droit à l'oubli                | 🚧 Roadmap     |

---

## 📚 Ressources complémentaires

### Documentation interne

- [Guide RGPD LexOrbital](./RGPD/01_guide-rgpd-lexorbital.md)
- [Manifest RGPD](../04-reference/02-rgpd-manifest.md)
- [Module Audit](./03-audit-logging.md)

### Ressources externes

- [CNIL - Guide du développeur](https://github.com/YohanGH/Guide-RGPD-du-developpeur)
- [RGPD - Texte officiel](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)
- [CNIL - Outil PIA](https://www.cnil.fr/fr/outil-pia-telechargez-et-installez-le-logiciel-de-la-cnil)
- [EDPB - Guidelines](https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2019/guidelines-42019-article-25-data-protection_en)

### Documentation externe dans le projet

- [Sources et références](../../sources-and-references.md)

---

<div align="center">

**[⬅️ Architecture](../01-architecture/README.md)** | **[⬆️ Sommaire](../README.md)** | **[Suivant : Guides →](../03-guides/README.md)**

</div>
