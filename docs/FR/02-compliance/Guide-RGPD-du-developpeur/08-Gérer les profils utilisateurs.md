# FICHE N°8 — GÉRER LES PROFILS UTILISATEURS

**Gestion des accès · RBAC · Profils et permissions**

> 📘 **Contexte RGPD**  
> La gestion des profils utilisateurs et des accès est essentielle pour garantir la sécurité des données personnelles et le respect du principe de minimisation des accès. LexOrbital intègre un système RBAC (Role-Based Access Control) déclaratif et des mécanismes de gestion fine des permissions.

---

## 🧩 1. Principes généraux de gestion des utilisateurs

| Exigence CNIL                                            | Traduction LexOrbital                                                                                   | Mécanismes intégrés                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Identifiants uniques pour chaque individu**            | L'identifiant = UUID généré par `lexorbital-module-auth`. Jamais d'identifiant réutilisé entre projets. | `userId` unique, généré serveur, jamais l'e-mail comme ID primaire. |
| **Authentification obligatoire avant accès aux données** | BackRing protège toute route contenant des données personnelles.                                        | Middleware "requireAuth" obligatoire pour modules back.             |
| **Politiques de gestion d'accès différenciées**          | RBAC (Role-Based Access Control) via `lexorbital-module-rbac`.                                          | Rôles : USER, ADMIN, AUDITOR, etc.                                  |
| **Regrouper droit + rôle dans un système global**        | Meta-Kernel définit le schéma des rôles et permissions.                                                 | Module RBAC + manifest de permissions par module.                   |

> ⚠️ **Obligation RGPD**  
> Chaque utilisateur doit avoir un identifiant unique et l'accès aux données personnelles doit être protégé par authentification. Le système RBAC garantit une gestion fine des permissions.

---

## 🧩 2. Authentification & identifiants uniques

| Sujet                                       | Adaptation LexOrbital                                       | Exemple                         |
| ------------------------------------------- | ----------------------------------------------------------- | ------------------------------- |
| **Identifiant strictement unique**          | Utilisation d'un UUID v4 + stockage en base                 | `id: "b3c7e...-..."`            |
| **Identifiant ≠ e-mail**                    | L'e-mail est un attribut modifiable, jamais une clé logique | `email = champ secondaire`      |
| **Politique de mot de passe conforme CNIL** | Validation front/back + hash Argon2/bcrypt                  | Helpers de sécurité Meta-Kernel |
| **Multi-factor (optionnel)**                | Module futur `lexorbital-module-mfa`                        | TOTP, WebAuthn                  |

> 💡 **Standard LexOrbital**  
> L'identifiant utilisateur est toujours un UUID généré côté serveur. L'e-mail ne peut jamais servir d'identifiant primaire car il est modifiable et peut être réutilisé.

---

## 🧩 3. Gestion des droits (RBAC) et principe de moindre privilège

| Exigence                                                         | Mise en œuvre LexOrbital                            | Composants impliqués                     |
| ---------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------- |
| **Accès strictement nécessaire**                                 | RBAC : permissions par rôle, paramétrées par module | `lexorbital-module-rbac`                 |
| **Profils utilisateurs globaux**                                 | Module RBAC gère groupes + permissions              | BackRing intègre les contrôles           |
| **Gestion fine des opérations : lecture, écriture, suppression** | Le manifest du module définit ses "capabilities"    | `module.json` (permissions déclaratives) |
| **Principe de moindre privilège**                                | Rôle minimal par défaut (USER)                      | Meta-Kernel impose la règle              |

> ⚠️ **Obligation**  
> Le principe de moindre privilège est appliqué par défaut dans LexOrbital. Chaque utilisateur commence avec le rôle USER et les permissions sont accordées explicitement selon les besoins.

---

## 🧩 4. Journalisation de la gestion des comptes (AuditTrail)

| Exigence CNIL                                     | Réponse LexOrbital                                                         | Module                               |
| ------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------ |
| **Journaliser activités et anomalies**            | Module audit recueille : login, logout, changement de rôle, accès sensible | `lexorbital-module-audit`            |
| **Logs non sensibles**                            | Aucune donnée perso (email, IP exacte) dans les events sensibles           | Filtre automatique dans module audit |
| **Durée de conservation ≤ 6 mois**                | Champ `retention: "180d"` dans manifest RGPD du module audit               | TTL automatique                      |
| **Utilisation des logs uniquement pour sécurité** | Contrat de finalité inscrit dans `rgpd-manifest.json`                      | Documentation vivante                |

> ⚠️ **Obligation RGPD**  
> Les logs d'accès ne doivent pas contenir de données personnelles sensibles. La durée de conservation est limitée à 6 mois maximum et doit être déclarée dans le manifest RGPD.

---

## 🧩 5. Audits, revue des droits et robustesse

| Point                                  | Mise en œuvre                               | Fréquence / outil          |
| -------------------------------------- | ------------------------------------------- | -------------------------- |
| **Audit de code pour profils / accès** | CI + revues manuelles                       | À chaque release de module |
| **Tests d'intrusion**                  | Environnement LexOrbitalStack préproduction | Périodique                 |
| **Revue régulière des droits**         | Script Meta-Kernel : `review-permissions`   | Mensuel / trimestriel      |
| **Synchronisation LDAP (optionnel)**   | Adaptateur dans module RBAC                 | LDAP / OpenLDAP            |

> 💡 **Standard LexOrbital**  
> Les audits de sécurité et les revues de permissions sont intégrés dans le processus de développement et d'exploitation. Des scripts automatisés facilitent ces vérifications périodiques.

---

## 🧩 6. Mouvement des utilisateurs (onboarding, offboarding)

| Processus                        | Automatisation LexOrbital                                     | Documentation                          |
| -------------------------------- | ------------------------------------------------------------- | -------------------------------------- |
| **Inscription (front)**          | Flux module auth + validation e-mail                          | UI module auth-ui                      |
| **Suppression d'un utilisateur** | Cascade via endpoints back standardisés (`DELETE /users/:id`) | Meta-Kernel impose API                 |
| **Désactivation temporaire**     | Flag `disabled: true` dans DB + journaux audit                | `lexorbital-module-auth`               |
| **Offboarding collaborateur**    | Rotation de secrets, retrait RBAC, logs                       | Doc interne "mouvement collaborateurs" |
| **Documentation des procédures** | Pages générées via docs vivantes                              | `docs/security/user-management.md`     |

> 💡 **Standard LexOrbital**  
> Les processus d'onboarding et d'offboarding sont standardisés et documentés. Le Meta-Kernel impose des endpoints API standardisés pour garantir la cohérence entre modules.

---

## 🧩 7. Encadrement des rôles et comptes critiques (root, admin, superuser)

| Exigence CNIL                                         | Adaptation LexOrbital                     | Mécanique                                |
| ----------------------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Limiter au strict nécessaire les comptes suprêmes** | Un seul rôle "SUPERADMIN" créé par défaut | Jamais utilisé pour opérations courantes |
| **Politique mot de passe élevé pour root/admin**      | MFA obligatoire + >16 caractères          | Stockage via gestionnaire sécurisé       |
| **Aucune action quotidienne avec root**               | Rôle "ADMIN" dédié pour maintenance       | BackRing bloque opérations root          |
| **Comptes génériques interdits**                      | Interdits via lint + CI                   | CI échoue si "shared-account" détecté    |

> ⚠️ **Obligation critique**  
> Les comptes administrateurs doivent être strictement limités et protégés. Les comptes génériques sont interdits et détectés automatiquement par la CI. Le rôle SUPERADMIN ne doit jamais être utilisé pour les opérations quotidiennes.

---

## 🧩 8. Gestionnaires de mots de passe & sécurité organisationnelle

| Exigence                                   | Mise en œuvre                        | Où ?                      |
| ------------------------------------------ | ------------------------------------ | ------------------------- |
| **Utilisation d'un gestionnaire sécurisé** | KeePass ou Vault recommandé          | Équipe ops / admin        |
| **Test robustesse des MDP**                | Intégré à module auth (front + back) | `checkPasswordStrength()` |
| **Pas de stockage navigateur**             | Recommandation dans le guide interne | Doc sécurité interne      |

> 💡 **Standard LexOrbital**  
> La gestion des mots de passe suit les recommandations CNIL. Les gestionnaires de mots de passe sécurisés sont recommandés pour les équipes d'exploitation et d'administration.

---

## 🧩 9. Flux complet de gestion utilisateur dans LexOrbital

| Étape                              | Action                             | Concerné                |
| ---------------------------------- | ---------------------------------- | ----------------------- |
| **1. Création**                    | inscription, email validation      | FrontRing + Module Auth |
| **2. Authentification**            | login + MFA (optionnel)            | Module Auth             |
| **3. Attribution rôle**            | via RBAC                           | Module RBAC             |
| **4. Utilisation des modules**     | vérification RBAC à chaque requête | BackRing                |
| **5. Journalisation actions**      | audit trail                        | Module Audit            |
| **6. Revue des permissions**       | script périodique                  | Meta-Kernel             |
| **7. Désactivation / suppression** | Offboarding + purge TTL            | Modules Auth + Infra    |
| **8. Logs nettoyés**               | TTL 6 mois                         | Module Audit            |

> 💡 **Standard LexOrbital**  
> Le cycle de vie complet d'un utilisateur est géré de manière standardisée, de la création à la suppression, avec traçabilité complète via le module Audit.

---

## 🧩 10. Mini check-list "Fiche 8" pour LexOrbital

| Question                                                                           | Oui/Non |
| ---------------------------------------------------------------------------------- | ------- |
| **Chaque utilisateur possède-t-il un identifiant unique non dérivé d'un e-mail ?** |         |
| **L'accès à toute donnée perso est-il authentifié ?**                              |         |
| **Des rôles et permissions existent-ils dès la conception (RBAC) ?**               |         |
| **Les logs d'accès stockent-ils zéro donnée sensible ?**                           |         |
| **La durée de conservation des logs est-elle ≤ 6 mois ?**                          |         |
| **Un processus documenté d'onboarding/offboarding existe-t-il ?**                  |         |
| **Les comptes root/admin sont-ils limités, MFA activé ?**                          |         |
| **Les comptes génériques sont-ils interdits ?**                                    |         |
| **Une revue des droits est-elle planifiée périodiquement ?**                       |         |

> ✅ **Synthèse**  
> Cette check-list doit être validée pour chaque projet LexOrbital avant sa mise en production. La plupart de ces vérifications sont automatisées dans le processus CI/CD et les scripts Meta-Kernel.

---

## 📚 Ressources complémentaires

- [CNIL - Gestion des accès et des droits](https://www.cnil.fr/fr/gestion-des-acces-et-des-droits)
- [CNIL - Authentification et identifiants](https://www.cnil.fr/fr/authentification-et-identifiants)
- [Fiche 6 - Sécuriser vos sites web](./06-Sécuriser%20vos%20sites%20web,%20vos%20applications%20et%20vos%20serveurs.md)
- [Fiche 13 - Préparer l'exercice des droits des personnes](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md)

---

**Navigation** : [← Fiche 7](./07-Minimiser%20les%20données%20collectées.md) | [Sommaire](./00_SOMMAIRE.md) | [Fiche 9 →](./09-Maîtriser%20vos%20bibliothèques%20et%20vos%20SDK.md)
