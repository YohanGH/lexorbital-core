# FICHE N°6 — SÉCURISER VOS SITES WEB, VOS APPLICATIONS ET VOS SERVEURS

**Sécurité réseau · Authentification · Infrastructure · Bases de données**

> 📘 **Contexte RGPD**  
> La sécurisation des sites web, applications et serveurs est fondamentale pour garantir la protection des données personnelles. LexOrbital intègre les recommandations CNIL et ANSSI directement dans son architecture, avec des configurations sécurisées par défaut et des processus automatisés de vérification.

---

## 🧩 1. Sécuriser les communications (TLS, ports, exposition réseau)

| Exigence CNIL / ANSSI                                         | Traduction LexOrbital – Où ça vit ?                                              | Implémentation concrète dans l'écosystème                                                                                                                   |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TLS 1.2 / 1.3 partout (HTTPS)**                             | Repo `lexorbital-infra` + Meta-Kernel (config globale sécurité).                 | Fichier de config nginx/caddy/traefik versionné dans `infra/` + script de vérif dans CI (`check-tls-config`).                                               |
| **TLS obligatoire sur tout le site / API**                    | BackRing (entrée HTTP) + FrontRing (console) sous un reverse proxy HTTPS unique. | Aucun service HTTP exposé directement : tout passe par gateway HTTPS (port 443). Redirection forcée 80 → 443.                                               |
| **Limiter les ports de communication**                        | `lexorbital-infra` + manifest des modules (`module.json`).                       | Chaque module déclare son port interne, mais seuls 80/443 sont publiés en externe via compose / firewall ; les autres ports sont internes au réseau Docker. |
| **Recommandations ANSSI TLS**                                 | Doc LexOrbital section "Sécurité réseau by design".                              | Ajouter une check-list "TLS" dans la doc + lien vers profils Mozilla/ANSSI ; script CI qui scanne la conf (lint basique des ciphers).                       |
| **Tests des suites crypto + désactiver RC4, MD4, MD5, SHA1…** | `lexorbital-infra` + pipeline `lexorbital-ci`.                                   | Job CI "tls-scan" (nmap/sslyze) exécuté sur l'environnement de préproduction ; rapport visible dans console "Vue Conformité/Sécurité".                      |

> ⚠️ **Obligation**  
> TLS 1.2 minimum est obligatoire pour toutes les communications. Aucun service HTTP non chiffré ne doit être exposé. Les configurations TLS sont vérifiées automatiquement dans la CI.

---

## 🧩 2. Sécuriser les authentifications (mots de passe, hash, cookies, CSRF)

| Exigence                                                  | Composant LexOrbital cible                                | Décision / Pattern concret                                                                                                                                                   |
| --------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Politique de mots de passe (CNIL)**                     | `lexorbital-module-auth` + Meta-Kernel (types & helpers). | Implémenter une validation côté BackRing (et éventuellement FrontRing) : longueur > 12, classes de caractères, blocage de fréquence / bruteforce (rate limiting).            |
| **Vérification de la force des MDP**                      | FrontRing (UI) + back.                                    | Composant React "PasswordStrengthMeter" dans un module front (ex `lexorbital-module-auth-ui`) + validation miroir côté back.                                                 |
| **Ne jamais stocker les mots de passe en clair**          | `lexorbital-module-auth` (back).                          | Pattern obligatoire dans le template de module: utilisation d'Argon2 ou bcrypt via helper du Meta-Kernel (`hashPassword`, `verifyPassword`).                                 |
| **Algorithmes de hash adaptés (Argon2, bcrypt, scrypt…)** | Meta-Kernel (lib de sécurité commune)                     | Une lib TS centrale `@lexorbital/security` fournie par le core et utilisée par tous les modules auth-like ; interdiction (lint) d'utiliser directement SHA-256 pour les MDP. |
| **Gestion des clés / sels / tailles minimales**           | Meta-Kernel + Infra                                       | Secrets stockés dans un gestionnaire (env + vault) ; clé minimale 128 bits ; procédure écrite dans doc LexOrbital "Gestion des secrets & clés".                              |
| **Cookies d'auth : Secure, HttpOnly, SameSite**           | FrontRing + BackRing (auth middleware)                    | Middleware standard "session-cookie" dans BackRing : Secure, HttpOnly, SameSite=Strict par défaut + HSTS sur le reverse-proxy.                                               |
| **Protection CSRF**                                       | FrontRing (formulaires) + BackRing (middleware CSRF)      | Token CSRF synchronisé ou double-submit cookie sur toutes les routes sensibles ; config par défaut dans template back-module.                                                |
| **Sous-domaine dédié aux tokens**                         | Infra + DNS                                               | Stratégie : `auth.lexorbital.local` pour le cookie d'auth ; domaine du cookie restreint à ce sous-domaine pour limiter fuite vers d'autres appli.                            |

> ⚠️ **Obligation critique**  
> Les mots de passe doivent être hashés avec des algorithmes robustes (Argon2 ou bcrypt minimum). L'utilisation de SHA-256 ou MD5 pour les mots de passe est strictement interdite et détectée par le linter.

---

## 🧩 3. Limiter la divulgation d'information sur les comptes (anti-enumeration)

| Recommandation CNIL                                        | Où dans LexOrbital ?                                   | Concret dans les modules                                                                                                                                                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Messages d'erreur génériques à l'authentification**      | `lexorbital-module-auth` (API login) + FrontRing (UI). | Retourner systématiquement un message du type "Ce couple identifiant/mot de passe est inconnu" quelle que soit la cause.                                                                                                  |
| **Pas de confirmation d'existence de compte en reset MDP** | Endpoint `POST /auth/password-reset` du module auth.   | Toujours répondre "Si un compte existe pour cette adresse, un e-mail de réinitialisation a été envoyé." même si le compte n'existe pas.                                                                                   |
| **Validation de l'adresse mail comme première étape**      | Flux de création de compte (UI auth)                   | 1. L'utilisateur saisit un email. 2. Le système envoie soit un lien d'activation, soit un lien de reset, sans indiquer lequel. 3. Message générique : "Un e-mail de validation ou de réinitialisation vous a été envoyé." |
| **Pas de fuite dans les temps de réponse**                 | BackRing + module auth                                 | Optionnel : uniformiser le temps de réponse (ajout de jitter) pour limiter les déductions sur l'existence ou non d'un compte.                                                                                             |

> 💡 **Standard LexOrbital**  
> La protection contre l'énumération de comptes est intégrée par défaut dans tous les endpoints d'authentification. Aucun message d'erreur ne doit révéler l'existence ou non d'un compte.

---

## 🧩 4. Sécuriser les comptes admin et interfaces d'administration

| Exigence                                                         | Implémentation LexOrbital                      | Composant / Pattern                                                                                                                    |
| ---------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Politique spécifique pour les admins**                         | Module `lexorbital-module-rbac` + module auth. | Rôle ADMIN distinct, mots de passe + robustes, MFA recommandé. Forcer le reset de MDP à la révocation d'un admin.                      |
| **Limiter l'accès aux interfaces d'admin**                       | FrontRing + BackRing (routes).                 | Routes d'admin servies sur un sous-domaine / chemin dédié (`/admin`) + contrôle strict des rôles + IP allowlist possible dans l'infra. |
| **Comptes de moindres privilèges pour les opérations courantes** | RBAC obligatoire sur les modules canoniques.   | Toute action sensible (configuration, export, purge) nécessite un rôle dédié (ex CONFIG_MANAGER, DPO) et est auditée.                  |
| **Accès admin depuis Internet via VPN, authent forte**           | `lexorbital-infra`                             | Interfaces d'admin back (ex: DB, monitoring) non exposées; accès via VPN + certificats client ; éventuellement bastion SSH.            |
| **Rotation des mots de passe admin (départ / suspicion)**        | Processus d'exploitation documenté             | Check-list opérationnelle "Offboarding admin" dans doc LexOrbital : rotation des secrets, des MDP admin, des clés d'API.               |

> ⚠️ **Obligation**  
> Les comptes administrateurs doivent être protégés par des mesures renforcées : MFA recommandé, accès restreint, rotation régulière des secrets. Toutes les actions admin sont auditées.

---

## 🧩 5. Sécuriser les infrastructures (sauvegardes, patchs, vulnérabilités, ports)

| Exigence                                                | Adaptation LexOrbital                                | Pratiques envisagées                                                                                                                                              |
| ------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sauvegardes chiffrées et testées**                    | `lexorbital-infra` + modules BDD                     | Docker volumes sauvegardés par jobs (ex: `backup-postgres`), archives chiffrées (gpg / KMS), test de restauration régulier sur un environnement de préproduction. |
| **Limiter le nombre de composants**                     | Architecture orbitale simple (core + modules types). | Choix raisonné de peu de briques : Node/TS, Postgres, reverse-proxy, MQ éventuel. Éviter la multiplication de stacks exotiques.                                   |
| **Installer les mises à jour critiques rapidement**     | `lexorbital-infra`                                   | Politique : images Docker versionnées, base d'images revue régulièrement ; script `check-updates` + job CI pour détecter images obsolètes.                        |
| **Veille vulnérabilités (CERT-FR, etc.)**               | Documentation + tooling CI                           | Ajouter dans doc : liste de flux RSS / mailing à suivre (CERT-FR, Node, Postgres). CI : `npm audit`, `docker scan` réguliers.                                     |
| **Utiliser des outils de détection de vulnérabilités**  | Environnement de préproduction LexOrbitalStack.      | Outils comme OpenVAS / nmap intégrés dans un pipeline de sécurité sur l'instance de démo (non prod) du stack `lexorbital-stack`.                                  |
| **Restreindre ports de diagnostic / config à distance** | `lexorbital-infra`                                   | Audit régulier avec netstat / ss / nmap ; règles de firewall dockers / host pour limiter SSH, DB, etc. à certains segments / IP.                                  |
| **Protéger les BDD exposées sur Internet**              | Modules BDD + infra réseau                           | Idéalement : DB jamais exposée directement ; sinon filtrage IP + comptes nominatifs + MFA sur console d'admin DB.                                                 |

> 💡 **Standard LexOrbital**  
> La sécurité de l'infrastructure est garantie par des sauvegardes régulières, une veille active des vulnérabilités, et une politique stricte de mises à jour. Les ports sont limités au strict nécessaire.

---

## 🧩 6. Sécuriser les bases de données & cloisonner les environnements

| Point de contrôle                                        | Cible LexOrbital                  | Pattern / Règle                                                                                                                                               |
| -------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Comptes nominatifs & comptes applicatifs dédiés**      | Modules back + BDD                | Chaque app possède un compte DB dédié avec droits minimaux, séparé des comptes humains d'admin DB.                                                            |
| **Révocation des privilèges d'administration**           | RBAC + DB                         | Rôles DB différenciés (`db_admin`, `db_app`), les comptes d'applications n'ont jamais de droits DDL (modif de schéma).                                        |
| **Protection contre injections SQL / scripts**           | Modules back (auth, mailer, etc.) | ORM ou query builder sécurisé ; validation d'entrée; désactivation du HTML non filtré (XSS). Pattern "Data Access Boundary" dans les patterns RGPD by design. |
| **Chiffrement sur disques & BDD**                        | Infra + DB config                 | Activer chiffrement au repos (disk encryption) + chiffrement de certaines colonnes sensibles (ex. numéros, tokens).                                           |
| **Cloisonnement des environnements (dev / test / prod)** | LexOrbitalStack & infra           | Environnements séparés : bases différentes, credentials distincts, réseau isolé. Jamais de données perso réelles en dev.                                      |
| **Principe de moindre privilège sur chaque sous-partie** | Meta-Kernel + infra               | Définir dans la doc un modèle de "zones" (front, back, DB, monitoring) avec privilèges minimaux par zone.                                                     |

> ⚠️ **Obligation**  
> Les bases de données doivent être protégées contre les injections SQL, chiffrées au repos, et isolées par environnement. Aucune donnée personnelle réelle ne doit être utilisée en développement.

---

## 🧩 7. Mini check-list "Fiche 6" pour LexOrbital

| Domaine                | Question Yes/No pour un projet LexOrbital                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| **Communications**     | Tout est-il servi en HTTPS (TLS 1.2/1.3) via un reverse-proxy unique ?                               |
| **Ports**              | Seuls 80/443 sont-ils accessibles depuis Internet ?                                                  |
| **Authentification**   | Les MDP sont-ils validés selon la recommandation CNIL + hashés via une lib robuste (Argon2/bcrypt) ? |
| **Cookies / Sessions** | Les cookies de session sont-ils Secure, HttpOnly, SameSite et HSTS activé ?                          |
| **Enumeration**        | Aucun endpoint (login, reset, signup) ne révèle-t-il l'existence ou non d'un compte ?                |
| **Admin**              | Les interfaces admin sont-elles protégées (RBAC, VPN, MFA, IP filtering) ?                           |
| **Sauvegardes**        | Des backups chiffrés existent-ils, testés régulièrement ?                                            |
| **Mises à jour**       | Une politique de mises à jour et de veille vulnérabilités est-elle écrite et appliquée ?             |
| **BDD**                | Les comptes DB sont-ils nominatifs et/ou applicatifs dédiés, avec privilèges minimum ?               |
| **Cloisonnement**      | Les environnements dev/test/prod sont-ils isolés, sans données réelles en dev ?                      |

> ✅ **Synthèse**  
> Cette check-list doit être validée avant chaque déploiement en production. LexOrbital intègre des vérifications automatiques pour la plupart de ces points dans le processus CI/CD.

---

## 📚 Ressources complémentaires

- [CNIL - Sécurité des données](https://www.cnil.fr/fr/securite-des-donnees)
- [ANSSI - Recommandations de sécurité](https://www.ssi.gouv.fr/)
- [ANSSI - Guide d'hygiène informatique](https://www.ssi.gouv.fr/guide/guide-dhygiene-informatique/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Fiche 3 - Sécuriser son environnement de développement](./03-Sécuriser%20son%20environnement%20de%20développement.md)
- [Fiche 4 - Gérer son code source](./04-Gérer%20son%20code%20source.md)
- [Fiche 18 - Se prémunir contre les attaques informatiques](./18-Se%20prémunir%20contre%20les%20attaques%20informatiques.md)

---

**Navigation** : [← Fiche 5](./05-Faire%20un%20choix%20éclairé%20de%20son%20architecture.md) | [Sommaire](./00_SOMMAIRE.md) | [Fiche 7 →](./07-Choisir%20un%20hébergeur.md)
