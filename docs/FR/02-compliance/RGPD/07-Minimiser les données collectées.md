# FICHE N°7 — MINIMISER LES DONNÉES COLLECTÉES

**Minimisation RGPD-by-design · Manifest déclaratif · TTL automatique**

> 📘 **Contexte RGPD**  
> Le principe de minimisation est fondamental dans le RGPD : ne collecter que les données strictement nécessaires à la finalité déclarée. LexOrbital intègre ce principe directement dans son architecture via des manifests déclaratifs, des validations automatiques et des mécanismes de réduction de précision.

---

## 🧩 1. Principes de minimisation (traduction LexOrbital)

| Exigence CNIL | Application dans LexOrbital | Composant concerné |
|---------------|----------------------------|-------------------|
| **Collecter uniquement les données adéquates, pertinentes et nécessaires** | Le `rgpd-manifest.json` de chaque module impose de déclarer finalités + données collectées ; CI vérifie la cohérence. | Meta-Kernel, Modules |
| **Documenter les types de données avant la collecte** | Diagrammes vivants et pages générées automatiquement via manifests (ZK – Documentation vivante). | Docs vivantes, CI |
| **Ne pas collecter certaines données pour certaines catégories d'utilisateurs** | Déclarer dans le manifest les "dataSubjects" + règles conditionnelles de collecte. | Module + Manifests |
| **Réduire la précision des données (ex: année au lieu de date complète)** | Patterns RGPD : helper `reducePrecision()` dans Meta-Kernel. | Meta-Kernel |
| **Éviter les données sensibles par défaut** | CI bloque les catégories "santé / pénal" sauf si `requiresSensitiveData=true` dans manifest. | Meta-Kernel + CI |
| **Minimiser les données dans les logs** | Module Audit : events structurés sans données sensibles ; filtres automatiques. | `lexorbital-module-audit` |

> ⚠️ **Obligation RGPD**  
> La minimisation des données est vérifiée automatiquement par la CI. Aucune donnée non déclarée dans le manifest ne peut être collectée. Les données sensibles nécessitent une justification explicite.

---

## 🧩 2. Modèle de décision avant collecte

| Question | Décision LexOrbital | Impact technique |
|----------|---------------------|------------------|
| **Cette donnée est-elle indispensable à la finalité ?** | Si NON → interdite dans `rgpd-manifest.json`. | Build bloque. |
| **Existe-t-il une version moins précise ?** | Si OUI → remplacement automatique (ex: zip→département ; date→année). | Utilitaires Meta-Kernel. |
| **La donnée est-elle sensible ?** | Si OUI → refuser par défaut ; nécessiter tag `requiresSensitiveData`. | CI strict. |
| **Servira-t-elle à d'autres finalités ?** | Si OUI → module doit le déclarer explicitement (finalités multiples). | Manifest RGPD. |
| **Est-elle optionnelle ?** | Si OUI → bascule UX : consentement ou fonctionnalité opt-in. | FrontRing. |

> 💡 **Standard LexOrbital**  
> Chaque donnée collectée doit passer ce modèle de décision avant d'être intégrée dans le manifest. La CI valide automatiquement ces règles.

---

## 🧩 3. Minimisation par couche orbitale (Meta-Kernel → Anneaux → Modules)

| Niveau | Rôle RGPD | Mécanismes dans LexOrbital |
|--------|-----------|---------------------------|
| **Meta-Kernel** | Impose minimisation + schémas | Types RGPD (`DataCategory`, `Purpose`), helpers de réduction de précision, schéma JSON des manifests. |
| **BackRing** | Valide la collecte à l'entrée | Middleware "validateMinimalPayload" ; rejet des champs non autorisés. |
| **FrontRing** | UX minimisation + opt-in | Composants React respectant le manifest (ex: fonctionnalité géolocalisation → opt-in et TTL court). |
| **Modules** | Déclarent et justifient chaque donnée | `rgpd-manifest.json` + tests module "no extra fields collected". |
| **Infra** | Cloisonnement + protection | Données sensibles jamais mises dans logs / sauvegardes en clair. |

> 💡 **Architecture LexOrbital**  
> La minimisation est appliquée à tous les niveaux de l'architecture orbitale, du Meta-Kernel qui impose les règles jusqu'aux modules qui les déclarent et les implémentent.

---

## 🧩 4. Minimisation dans les logs & audit

| Exigence CNIL | Implémentation LexOrbital | Module / Pattern |
|---------------|---------------------------|------------------|
| **Logs ne doivent pas contenir de données sensibles ou critiques** | Pattern "AuditTrail light" : seul l'identifiant technique et non la data complète. | `lexorbital-module-audit` |
| **Minimisation dans les traceurs techniques** | Interdiction d'inclure : email, token, contenu, payloads sensibles. | CI + Linter custom |
| **Conservation courte des logs** | Champs `retention` dans manifest RGPD. | Manifest + TTL |
| **Suppression automatique** | Job Meta-Kernel : purge TTL ou lazy cleanup. | Meta-Kernel |

> ⚠️ **Obligation**  
> Les logs ne doivent jamais contenir de données personnelles sensibles. Le module Audit applique automatiquement des filtres pour garantir cette exigence.

---

## 🧩 5. Gestion des fonctionnalités optionnelles (ex: géolocalisation)

| Exigence | Implémentation LexOrbital | Règle technique |
|----------|--------------------------|-----------------|
| **Fonction non essentielle = opt-in** | Composant FrontRing demande consentement explicite ; aucune collecte par défaut. | Pattern "Optional Feature Consent" |
| **Conservation limitée à la durée nécessaire** | TTL automatique très court dans manifest (ex: quelques minutes). | `retention: "5m"` dans manifest |
| **Jamais réutiliser pour d'autres finalités** | CI vérifie unicité de finalité dans le manifest. | Check static RGPD |

> 💡 **Standard LexOrbital**  
> Les fonctionnalités optionnelles nécessitent un consentement explicite et une conservation limitée. Le manifest déclare ces contraintes et la CI les valide.

---

## 🧩 6. Durées de conservation (TTL), documentation, justification

| Type de donnée | Pratique CNIL | Application LexOrbital |
|----------------|---------------|----------------------|
| **Données utilisateur** | Durée liée à la finalité | Champ `retention` obligatoire dans `rgpd-manifest.json`. |
| **Logs** | Limiter conservation | Retention courte par défaut (ex: 30j). |
| **Données optionnelles** | Conservation stricte | TTL très court (strict mode). |
| **Justification** | Documenter les durées | Génération automatique d'un tableau "Registre de conservation" dans docs vivantes. |

> ⚠️ **Obligation RGPD**  
> Chaque donnée collectée doit avoir une durée de conservation définie et justifiée. Le manifest RGPD rend cette information obligatoire et traçable.

---

## 🧩 7. Effacement automatique (purge, anonymisation, pseudonymisation)

| Exigence CNIL | Traduction LexOrbital | Mécanique |
|---------------|----------------------|-----------|
| **Système de purge automatique** | Pattern RGPD "TTL + purge jobs" dans Meta-Kernel. | Cron interne ou job d'infra Docker. |
| **Effacement physique** | Obligation module infra | Script `clean-data` dans `lexorbital-infra`. |
| **Pseudonymisation** | Possible si la donnée reste utile | Helper Meta-Kernel : `pseudonymize(data)`. |
| **Anonymisation** | Si aucune finalité ne reste | Helper `anonymize(data)` + suppression de clés de réconciliation. |
| **Journalisation de l'effacement** | Module audit stocke l'événement `data.deleted`. | `lexorbital-module-audit` |

> 💡 **Standard LexOrbital**  
> L'effacement automatique est géré par des jobs Meta-Kernel basés sur les TTL définis dans les manifests. Tous les effacements sont journalisés dans le module Audit.

---

## 🧩 8. Manifest RGPD et minimisation : règles strictes

> 📘 **Note**  
> Couplé au fichier `rgpd-manifest.json` décrit dans la documentation LexOrbital.

| Section du manifest | Impact minimisation | Validation dans CI |
|---------------------|---------------------|-------------------|
| **dataCategories[]** | Pas de donnée non déclarée | CI interdit champs non listés |
| **purposes[]** | Uniquement finalités explicites | CI vérifie cohérence données/finalité |
| **retention** | Durée définie obligatoirement | Rejet manifest si vide |
| **sensitiveData** | Flag explicite | CI refuse sans justification |
| **securityMeasures** | Préciser anonymisation / pseudonymisation | Doit inclure au moins une technique de minimisation |

> ⚠️ **Obligation**  
> Le manifest RGPD est la source de vérité pour la minimisation. Toute violation des règles déclarées dans le manifest est bloquée par la CI.

---

## 🧩 9. Processus complet de minimisation (pipeline LexOrbital)

| Étape | Action | Automatisation prévue |
|-------|--------|---------------------|
| **1. Conception** | Définir les données minimales | Rédaction manifest → CI check |
| **2. Développement** | Implémenter collecte minimale | BackRing : validation des payloads |
| **3. Documentation** | Générer tableau des données | Docs vivantes → manifests |
| **4. Retention** | Ajouter TTL | Helpers Meta-Kernel |
| **5. Purge** | Effacement automatique | Cron/Job docker |
| **6. Audit** | Journaliser effacements | Module Audit |
| **7. Révision** | Vérification périodique | Script "review-data" semestriel |

> 💡 **Standard LexOrbital**  
> Le processus de minimisation est intégré dans le cycle de vie complet du développement, de la conception à la révision périodique, avec des vérifications automatiques à chaque étape.

---

## 🧩 10. Mini check-list "Fiche 7" pour LexOrbital

| Question Yes/No | Interprétation dans LexOrbital |
|-----------------|-------------------------------|
| **Avons-nous documenté exactement les données collectées ?** | Manifest RGPD rempli + validé. |
| **Une donnée peut-elle être rendue moins précise ?** | Si oui → helper `reducePrecision()`. |
| **Existe-t-il une justification légale / opérationnelle ?** | Champ `purpose` clair. |
| **Les données sensibles sont-elles indispensables ?** | Flag `requiresSensitiveData` sinon refus. |
| **Les logs contiennent-ils des infos sensibles ?** | Audit Trail conforme (no sensitive logs). |
| **Avons-nous défini une durée de conservation ?** | Champ `retention` obligatoire. |
| **La purge automatique est-elle active ?** | Job purge Meta-Kernel. |
| **Un effacement manuel est-il possible ?** | Endpoint `/delete/:id` exposé par chaque module. |

> ✅ **Synthèse**  
> Cette check-list doit être validée pour chaque module avant son intégration dans LexOrbital. La plupart de ces vérifications sont automatisées dans le processus CI/CD.

---

## 📚 Ressources complémentaires

- [CNIL - Minimisation des données](https://www.cnil.fr/fr/minimisation-des-donnees)
- [CNIL - Principe de minimisation](https://www.cnil.fr/fr/le-principe-de-minimisation-des-donnees)
- [CNIL - Durées de conservation](https://www.cnil.fr/fr/durees-de-conservation)
- [Fiche 1 - Identifier les données personnelles](./01-Identifier%20les%20données%20personnelles.md)
- [Fiche 14 - Gérer la durée de conservation des données](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md)
- [Fiche 13 - Préparer l'exercice des droits des personnes](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md)

---

**Navigation** : [← Fiche 6](./06-Sécuriser%20vos%20sites%20web,%20vos%20applications%20et%20vos%20serveurs.md) | [Sommaire](./00_SOMMAIRE.md) | [Fiche 8 →](./08-Gérer%20les%20accès%20et%20les%20droits.md)
