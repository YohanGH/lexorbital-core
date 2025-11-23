# Fiche n°18 — Se prémunir contre les attaques informatiques

> **Version LexOrbital — Sécurité RGPD by design**

**Objectif** : Protéger les données personnelles contre les attaques informatiques en intégrant des mesures de sécurité dans l'architecture LexOrbital.

---

> **🔒 Contexte RGPD**  
> La sécurité des données est une obligation RGPD (article 32). Cette fiche détaille les mesures techniques LexOrbital pour se prémunir contre les principales attaques informatiques.

---

## 🛰️ Vue synthétique des risques & couches LexOrbital

| Vulnérabilité | Risque principal RGPD | Couches LexOrbital concernées | Modules critiques |
|---------------|------------------------|-------------------------------|-------------------|
| **Manipulation d'URL** | Accès non autorisé à des données | FrontRing, BackRing, Auth, Resource API | Tous modules exposant des ressources (docs, profils…) |
| **Credential stuffing** | Prise de contrôle de comptes | Auth, BackRing, Mailer, Audit | Module Auth, Admin front |
| **Bruteforce / dictionnaire** | Deviner mots de passe | Auth, BackRing, Infra sécurité | Auth, Admin |
| **XSS** | Vol de session, détournement UI | FrontRing, modules front, Analytics | Front modules, commentaires, formulaires libres |
| **SQLi / injections** | Lecture / altération massive de données | BackRing, ORM, DB, Audit | Tous modules Back avec DB |
| **Malwares / ransomwares** | Destruction / chiffrement des données | Infra, sauvegardes, postes dev/ops | CI, stockage, backups |

---

## 🧩 1. Manipulation d'URL (URL tampering, path traversal)

| Dimension | Risque & contexte | Implémentation LexOrbital |
|-----------|-------------------|---------------------------|
| **Nature de l'attaque** | Modification de paramètres, chemins, répertoires pour accéder à des ressources non autorisées (URL incrémentales, `/admin`, `/phpmyadmin`, `.git`, `../`) | Tous endpoints BackRing exposant des IDs ou chemins |
| **Risque RGPD** | Lecture de données d'un autre utilisateur, divulgation de fichiers internes → violation de données | Accès à d'autres comptes, logs, exports, fichiers d'architecture, etc. |
| **Authentification & autorisation** | Toujours vérifier côté BackRing que `userId` ou `role` a bien accès à la ressource demandée, indépendamment de l'URL | Middlewares d'authz dans BackRing : `requireAuth`, `requireOwner`, `requireRole` |
| **Conception des IDs** | Interdiction d'IDs prédictifs (1, 2, 3…) visibles dans l'URL pour les ressources sensibles ; utiliser des UUID / slugs non consécutifs | Dans template module : `type ResourceId = UUIDv4` par défaut |
| **Validation des paramètres** | Valider et typer tous les paramètres d'URL côté serveur (zod/ts-json-schema) ; rejeter les non-conformes | Schéma `validateRouteParams` commun dans Meta-Kernel |
| **Path traversal** | Interdire toute concaténation naïve de chemins ; définir des racines d'accès (chroot logique) ; filtrer `../`, `~`, etc. | Utiliser `path.resolve(BASE_DIR, safeSegment)` + whitelist de répertoires autorisés |
| **Directory browsing** | Désactiver le listing de répertoires, ne jamais servir `.git`, `.env`, backups | Configuration serveur / Docker Nginx + scripts de vérification CI |
| **Messages d'erreur** | Ne pas divulguer le chemin réel ou les détails ; renvoyer réponses génériques (404, 403) | Middleware d'erreur BackRing standardisé |

---

## 🧩 2. Bourrage d'identifiants ("credential stuffing")

| Dimension | Risque & contexte | Implémentation LexOrbital |
|-----------|-------------------|---------------------------|
| **Nature** | Utilisation massive de couples login/mot de passe volés sur d'autres sites | Attaques sur `/auth/login`, API d'auth, endpoints mobiles |
| **Risque RGPD** | Prise de contrôle de comptes, fuite de données personnelles, actions malveillantes au nom des victimes | Violation de données notifiable |
| **Sensibilisation** | Informer clairement de ne pas réutiliser de mots de passe, encourager gestionnaires de mots de passe | Texte standard dans UI d'inscription (+ doc projet) |
| **MFA / double auth** | Option MFA (TOTP, mail, WebAuthn) activable pour comptes sensibles (admin, staff) | Module Auth : `mfa_enabled`, vérification sur login |
| **Limitation robots** | Rate-limiting IP / user-agent, éventuel CAPTCHA sur login après X échecs | Middleware BackRing rate-limit + front CAPTCHA facultatif |
| **Détection connexions suspectes** | Détecter nouvelle IP / device ; notifier par email | Module Mailer + Audit : `event.type="new_device_login"` |
| **Journalisation** | Tracer toutes les tentatives et succès/échecs d'auth | Module Audit avec typage des événements d'authentification |

---

## 🧩 3. Attaques par force brute / dictionnaire

| Dimension | Risque & contexte | Implémentation LexOrbital |
|-----------|-------------------|---------------------------|
| **Nature** | Essai de toutes les combinaisons ou des mots de passe les plus courants | Sur login, reset password, endpoints protégés par token |
| **Politique de mots de passe** | Forcer mots de passe robustes, refuser passwords trop fréquents (listes noires) | Module Auth : règles ANSSI (longueur, diversité) et blacklist tronquée des mots les plus fréquents |
| **Limitation des tentatives** | Bloquer compte ou IP après X tentatives sur une période ; backoff exponentiel | Stock in DB ou cache (Redis) par IP / login + règles |
| **MFA** | Pour données sensibles, exiger 2nd facteur | Cf. credential stuffing |
| **Notifications** | Mail en cas de connexion depuis nouvel appareil + possibilité d'alerter sur tentatives excessives | Mailer + Audit |
| **Transparence** | Afficher date/heure de dernière connexion | Champ `lastLoginAt` dans profil, affiché en UI |
| **Tests** | Tests automatiques sur la résistance au bruteforce (simulation de X tentatives) | Scénarios de tests dans [Fiche 11](./11-Tester%20vos%20applications.md) (Tests) reliés à Auth |

---

## 🧩 4. Injection de code indirecte (XSS)

| Dimension | Risque & contexte | Implémentation LexOrbital |
|-----------|-------------------|---------------------------|
| **Nature** | Insertion de scripts malveillants dans pages de confiance (champs de texte, URL, params GET, etc.) | Formulaires front, commentaires, champs libres, logs affichés |
| **Risque RGPD** | Vol de cookies d'auth, redirection vers phishing, keylogging, exfiltration de données → violation | Fuite de sessions, prise de contrôle de comptes |
| **Mises à jour** | Maintenir à jour dépendances, libs front/back, framework | CI : npm audit, dependabot, politique de mises à jour |
| **Audits de sécurité** | Pentests réguliers, scanners XSS sur cluster | Intégration OWASP ZAP / outils similaires en pipeline optionnel |
| **Neutralisation HTML** | Encodage / échappement des caractères `< > / " ' &` sur toutes les données affichées | Helpers utilitaires `escapeHtml`, `sanitizeRichText` partagés |
| **Validation des entrées** | Schémas stricts ; whitelist de formats (URL, email, etc.) | Utilisation systématique de zod / Joi côté BackRing |
| **Upload fichiers** | Vérifier type MIME, extension, stocker dans répertoire non exécutable | Stockage dans bucket ou dir statique sans exécution |
| **Détection scripts** | Scanner logs et requêtes pour présence de scripts | Jobs d'analyses périodiques + alertes |
| **CSP (Content Security Policy)** | Ajouter des CSP restrictives (`script-src`, `img-src`) | Config Nginx ou headers dans FrontRing |

---

## 🧩 5. Injection SQL (SQLi) & autres injections

| Dimension | Risque & contexte | Implémentation LexOrbital |
|-----------|-------------------|---------------------------|
| **Nature SQLi** | Injection de code SQL via formulaires, URL, headers, etc. | Toutes requêtes DB dans modules Back |
| **Autres injections** | LDAP, shell, NoSQL, etc. | Toutes intégrations externes / subprocess |
| **Risque RGPD** | Lecture, modification ou suppression de masses de données, élévation de privilèges | Compromission totale des données |
| **Requêtes préparées** | Utiliser exclusivement des prepared statements ou ORM safe | TypeORM/Prisma/Knex avec paramètres typés |
| **Échappement** | Éviter concaténation de chaînes pour SQL ; si nécessaire, utiliser fonctions d'échappement | Interdiction dans linters (`no-raw-sql-string`) |
| **Validation des entrées** | Ne jamais laisser une valeur non typée atteindre la couche DB | Validation zod → mapping strict des types |
| **Droits DB minimaux** | Principe du moindre privilège : un service n'a que SELECT si besoin, pas DROP/ALTER | Comptes DB par service/module avec rôles limités |
| **Gestion erreurs** | Masquer détails techniques dans messages d'erreur (pas de message SQL brut) | Middleware d'erreur BackRing générique |
| **Tests** | Tests de non-régression SQLi (payloads connus OWASP) | Suite de tests de sécurité intégrée dans [Fiche 11](./11-Tester%20vos%20applications.md) |

---

## 🧩 6. Programmes malveillants & rançongiciels

> **📘 Note**  
> Ici, beaucoup de mesures sont organisationnelles / infra, mais LexOrbital peut imposer un cadre technique.

| Dimension | Risque & contexte | Implémentation LexOrbital |
|-----------|-------------------|---------------------------|
| **Nature** | Malware, ransomware chiffrant données ou exfiltrant des infos | Atteinte aux serveurs, aux postes dev/ops, au CI, aux backups |
| **Mise à jour** | OS, libs, antivirus, pare-feux | Recommandations dans `infra/SECURITY.md` + images Docker à jour |
| **Sauvegardes** | Backups réguliers, avec au moins une copie hors réseau | Module ou doc `backup-policy` (sauvegardes chiffrées, offline) |
| **Tests de restauration** | Vérifier régulièrement qu'on peut restaurer proprement | Process documenté dans LexOrbital-infra |
| **Sensibilisation** | Ne pas ouvrir PJ douteuses, ne pas installer logiciels piratés | Checklists & guides dans docs LexOrbital |
| **Comptes admin** | Pas d'usage quotidien de comptes admin, séparation des rôles | Mise en place de RBAC aussi côté infra / CI |
| **Cloisonnement réseau** | VLAN, segmentation, limitation des accès latéraux | Défini dans la doc réseau / Docker network policies |
| **Proxy web** | Bloquer sites connus comme malveillants | Politique proxy dans infra |
| **CI & supply chain** | Protéger pipelines (GitHub Actions, GitLab, etc.), vérifier intégrité dépendances | Signatures, pinning des versions, restrictions de permissions CI |

---

## 🧩 7. Synthèse LexOrbital — Tableau "Mesure ↔ Faille ↔ Couches"

| Mesure LexOrbital | Manipulation URL | Credential Stuffing / Bruteforce | XSS | SQLi | Malware / Ransomware |
|-------------------|:----------------:|:--------------------------------:|:---:|:---:|:--------------------:|
| **Middlewares Auth/Authz BackRing** | ✅ | ✅ | (indirect) | (indirect) | ❌ |
| **IDs non prédictifs (UUID)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Validation stricte des entrées (zod)** | ✅ | ✅ (login, reset) | ✅ | ✅ | ❌ |
| **Rate limiting / CAPTCHA** | ❌ | ✅ | (partiel) | ✅ | ❌ |
| **MFA** | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Escaping HTML & CSP** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Prepared statements / ORM** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Droits DB minimaux** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Audit / logs de sécurité** | ✅ | ✅ | ✅ (tentatives XSS) | ✅ | ✅ |
| **Backups + tests** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Mise à jour libs & OS** | ✅ | ✅ | ✅ | ✅ | ✅ |

> **💡 Légende**  
> ✅ = Protection efficace | ❌ = Non applicable | (indirect/partiel) = Protection indirecte ou partielle

---

## 📋 Checklist de sécurité par type d'attaque

### Manipulation d'URL

- [ ] Middlewares d'autorisation sur tous les endpoints
- [ ] IDs non prédictifs (UUID) pour ressources sensibles
- [ ] Validation stricte des paramètres d'URL
- [ ] Protection contre path traversal
- [ ] Directory browsing désactivé
- [ ] Messages d'erreur génériques

### Credential Stuffing / Bruteforce

- [ ] MFA activable pour comptes sensibles
- [ ] Rate limiting sur endpoints d'authentification
- [ ] CAPTCHA après X échecs
- [ ] Détection de connexions suspectes
- [ ] Journalisation des tentatives d'auth
- [ ] Politique de mots de passe robuste (ANSSI)

### XSS

- [ ] Échappement HTML systématique
- [ ] CSP (Content Security Policy) configurée
- [ ] Validation stricte des entrées utilisateur
- [ ] Upload de fichiers sécurisé
- [ ] Mises à jour régulières des dépendances
- [ ] Audits de sécurité périodiques

### SQLi / Injections

- [ ] Requêtes préparées ou ORM uniquement
- [ ] Validation stricte avant accès DB
- [ ] Droits DB minimaux (moindre privilège)
- [ ] Tests de non-régression SQLi
- [ ] Messages d'erreur génériques

### Malware / Ransomware

- [ ] Sauvegardes régulières et chiffrées
- [ ] Tests de restauration périodiques
- [ ] Mises à jour OS et libs
- [ ] Cloisonnement réseau
- [ ] Protection CI/CD (supply chain)
- [ ] RBAC côté infra

---

## 📚 Ressources complémentaires

- [CNIL — Sécurité des données](https://www.cnil.fr/fr/securite-des-donnees)
- [ANSSI — Recommandations sécurité](https://cyber.gouv.fr/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Tester vos applications](./11-Tester%20vos%20applications.md) — Tests de sécurité

---

<div align="center">

**[⬅️ Précédent](./17-Mesurer%20la%20fréquentation.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)**

</div>
