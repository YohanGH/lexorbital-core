# 📚 Sommaire — Documentation RGPD LexOrbital

> **Guide complet de conformité RGPD pour l'écosystème LexOrbital**

---

## 🎯 Objectif de cette section

Cette section dédiée au RGPD fournit :

1. **Guide complet RGPD** — référence exhaustive pour comprendre et appliquer le RGPD dans LexOrbital
2. **Fiches thématiques** — guides pratiques par sujet (consentement, TTL, chiffrement, etc.)
3. **Exemples de code** — implémentations concrètes des patterns RGPD
4. **Checklist de conformité** — vérifier que votre module est conforme

---

## 📖 Table des matières

### 🔰 Fondamentaux

| Fiche | Description | Lien |
|-------|-------------|------|
| **01 - Guide RGPD LexOrbital** | Guide de référence complet | [📖 01_guide-rgpd-lexorbital.md](./01_guide-rgpd-lexorbital.md) |
| **02 - Préparer son développement** | Privacy by Design & Sécurité Agile | [📖 02-Préparer son developpement.md](./02-Préparer%20son%20developpement.md) |

### 🔐 Sécurité et Conformité

| Fiche | Description | Lien |
|-------|-------------|------|
| **03 - Sécuriser son environnement de développement** | Bonnes pratiques sécurité dev | [📖 03_Securiser-environnement-dev.md](./03_Securiser-environnement-dev.md) |
| **04 - Gérer son code source** | Sécurité Git, secrets, versioning | [📖 04_Gerer-code-source.md](./04_Gerer-code-source.md) |
| **05 - Faire un choix éclairé de son architecture** | Architecture conforme RGPD | [📖 05_Choix-architecture.md](./05_Choix-architecture.md) |
| **06 - Sécuriser vos sites web, vos applications et vos serveurs** | Sécurité applicative | [📖 06_Securiser-applications.md](./06_Securiser-applications.md) |

### 📊 Données et Minimisation

| Fiche | Description | Lien |
|-------|-------------|------|
| **07 - Identifier les données à caractère personnel** | Classification des données | [📖 07_Identifier-donnees.md](./07_Identifier-donnees.md) |
| **08 - Minimiser les données collectées** | Principe de minimisation | [📖 08_Minimiser-donnees.md](./08_Minimiser-donnees.md) |
| **09 - Gérer les profils utilisateurs** | Gestion des comptes utilisateurs | [📖 09_Gerer-profils-utilisateurs.md](./09_Gerer-profils-utilisateurs.md) |

### 🛠️ Développement et Qualité

| Fiche | Description | Lien |
|-------|-------------|------|
| **10 - Maîtriser vos bibliothèques et vos SDK** | Gestion des dépendances | [📖 10_Maitriser-bibliotheques.md](./10_Maitriser-bibliotheques.md) |
| **11 - Veiller à la qualité de votre code et sa documentation** | Standards de code | [📖 11_Qualite-code.md](./11_Qualite-code.md) |
| **12 - Tester vos applications** | Tests de conformité RGPD | [📖 12_Tester-applications.md](./12_Tester-applications.md) |

### 👤 Droits des Utilisateurs

| Fiche | Description | Lien |
|-------|-------------|------|
| **13 - Préparer l'exercice des droits des personnes** | Accès, rectification, effacement, portabilité | [📖 13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md) |

### ⏱️ Conservation et Traçabilité

| Fiche | Description | Lien |
|-------|-------------|------|
| **14 - Gérer la durée de conservation des données** | Pattern TTL et archivage | [📖 14-Gérer%20la%20durée%20de%20conservation%20des%20données.md](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) |

### ⚖️ Bases Légales et Consentement

| Fiche | Description | Lien |
|-------|-------------|------|
| **15 - Prendre en compte les bases légales dans l'implémentation technique** | Bases légales RGPD | [📖 15_Bases-legales.md](./15_Bases-legales.md) |
| **16 - Consentement** | Gestion du consentement | [📖 16_Consentement.md](./16_Consentement.md) |

### 📈 Traceurs et Analytics

| Fiche | Description | Lien |
|-------|-------------|------|
| **17 - Analyser les pratiques en matière de traceurs** | Cookies et traceurs | [📖 17_Analyser-traceurs.md](./17_Analyser-traceurs.md) |
| **18 - Mesurer la fréquentation** | Module Analytics conforme CNIL | [📖 17-Mesurer%20la%20fréquentation.md](./17-Mesurer%20la%20fréquentation.md) |

### 🛡️ Sécurité Avancée

| Fiche | Description | Lien |
|-------|-------------|------|
| **19 - Se prémunir contre les attaques informatiques** | Sécurité offensive | [📖 19_Se-premunir-attaques.md](./19_Se-premunir-attaques.md) |

---

## 🗺️ Parcours de lecture recommandés

### Parcours "DPO / Conformité" (1h30)

1. [Guide RGPD LexOrbital](./01_guide-rgpd-lexorbital.md) — référence complète
2. [Préparer son développement](./02-Préparer%20son%20developpement.md) — Privacy by Design
3. [Gérer la durée de conservation](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) — TTL et archivage
4. [Préparer l'exercice des droits](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md) — droits utilisateurs
5. [Mesurer la fréquentation](./17-Mesurer%20la%20fréquentation.md) — analytics conforme

### Parcours "Développeur Backend" (1h)

1. [Préparer son développement](./02-Préparer%20son%20developpement.md) — comprendre l'approche
2. [Minimiser les données](./08_Minimiser-donnees.md) — patterns de minimisation
3. [Gérer la durée de conservation](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) — implémenter TTL
4. [Préparer l'exercice des droits](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md) — API droits utilisateurs

### Parcours "Développeur Frontend" (45 min)

1. [Consentement](./16_Consentement.md) — implémenter le consentement
2. [Mesurer la fréquentation](./17-Mesurer%20la%20fréquentation.md) — analytics exempté
3. [Préparer l'exercice des droits](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md) — UI droits utilisateurs

---

## 🔍 Recherche rapide

### Par concept RGPD

- **Consentement** → [Fiche 16](./16_Consentement.md)
- **Minimisation** → [Fiche 08](./08_Minimiser-donnees.md)
- **TTL / Rétention** → [Fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md)
- **Droit d'accès** → [Fiche 13](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md)
- **Droit à l'oubli** → [Fiche 13](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md)
- **Analytics** → [Fiche 18](./17-Mesurer%20la%20fréquentation.md)
- **Privacy by Design** → [Fiche 02](./02-Préparer%20son%20developpement.md)

### Par tâche développeur

- **Implémenter le consentement** → [Fiche 16](./16_Consentement.md)
- **Définir un TTL** → [Fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md)
- **Permettre l'export des données** → [Fiche 13](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md)
- **Configurer analytics conforme** → [Fiche 18](./17-Mesurer%20la%20fréquentation.md)
- **Vérifier la conformité** → [Fiche 02](./02-Préparer%20son%20developpement.md)

---

## 📊 Principes RGPD dans LexOrbital

### Les 6 piliers de la conformité LexOrbital

| Principe | Description | Fiche associée |
|----------|-------------|----------------|
| **1. Minimisation** | Ne collecter que le strict nécessaire | [Fiche 08](./08_Minimiser-donnees.md) |
| **2. Consentement** | Obtenir un consentement explicite et éclairé | [Fiche 16](./16_Consentement.md) |
| **3. Sécurité** | Chiffrer et protéger les données | [Fiche 06](./06_Securiser-applications.md) |
| **4. Durée limitée** | Supprimer les données expirées (TTL) | [Fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) |
| **5. Droits** | Permettre accès, rectification, oubli | [Fiche 13](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md) |
| **6. Traçabilité** | Logger les opérations sensibles | [Fiche 02](./02-Préparer%20son%20developpement.md) |

---

## 📚 Ressources complémentaires

### Documentation LexOrbital

- [RGPD by design](../02-compliance/01-rgpd-by-design.md) — Vue d'ensemble de l'approche LexOrbital
- [Privacy Patterns](../02-compliance/02-privacy-patterns.md) — Patterns techniques de confidentialité
- [Audit & Logging](../02-compliance/03-audit-logging.md) — Système de journalisation
- [Manifest RGPD](../04-reference/02-rgpd-manifest.md) — Spécification du manifest

### Ressources externes

- [RGPD - Texte officiel](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)
- [Guide RGPD du développeur (CNIL)](https://github.com/YohanGH/Guide-RGPD-du-developpeur)
- [Outil PIA (CNIL)](https://www.cnil.fr/fr/outil-pia-telechargez-et-installez-le-logiciel-de-la-cnil)
- [Design System CNIL](https://design.cnil.fr)
- [EDPB Guidelines](https://edpb.europa.eu/)

---

## 🤝 Contribuer

Cette documentation RGPD est vivante et s'améliore grâce à la communauté.

**Vous pouvez :**
- Corriger des erreurs juridiques
- Ajouter des exemples de code
- Proposer de nouvelles fiches thématiques
- Améliorer la clarté des explications
- Signaler des manquements

➡️ Voir [Guide de contribution](../../05-contributing/02-documentation.md)

---

## ⚠️ Avertissement

> **⚖️ Disclaimer légal**  
> Cette documentation est fournie à titre informatif et éducatif. Elle ne constitue pas un conseil juridique. Pour toute question juridique spécifique, consultez un avocat spécialisé en droit des données personnelles ou votre DPO.

---

<div align="center">

**[⬅️ Retour Conformité](../02-compliance/README.md)** | **[⬆️ Sommaire Principal](../README.md)**

Dernière mise à jour : 2025-11-23

</div>
