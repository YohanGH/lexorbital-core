# Fiche n°3 — Sécuriser son environnement de développement

> **Version LexOrbital — Vue opérationnelle RGPD & SecOps**

**Objectif** : Sécuriser l'environnement de développement pour protéger les données personnelles et prévenir les fuites de sécurité.

---

> **🔒 Contexte RGPD**  
> La sécurité de l'environnement de développement est essentielle pour protéger les données personnelles. Cette fiche détaille les mesures techniques LexOrbital pour sécuriser les outils, serveurs et processus de développement.

---

## 🧩 1. Analyse des risques & organisation de la sécurité

| Domaine                      | Risques identifiés (CNIL)              | Attaques fréquentes                       | Implémentation LexOrbital                                    |
| ---------------------------- | -------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| **Outils SaaS**              | Perte d'accès / compromission / fuites | Compte GitHub piraté, Slack vol de tokens | MFA obligatoire ; gestion droits GitHub ; rotation tokens    |
| **CI/CD**                    | Exécution de code non maîtrisé         | Supply-chain, secret exfiltration         | GitHub Actions avec permissions minimales ; secrets chiffrés |
| **Machines dev**             | Malware, ransomwares, vol de code      | Keyloggers, cheval de Troie, vol SSH      | Politique sécurité poste dev + antivirus + pare-feu          |
| **Serveurs dev/staging**     | Failles non corrigées                  | exploitation CVE                          | Mises à jour auto + images Docker neuves                     |
| **Processus internes**       | Accès non contrôlés                    | Développeur accède à prod                 | RBAC infra + comptes nominatifs                              |
| **Documentation / partages** | Exposition de données sensibles        | Docs internes partagées publiquement      | DLP interne + GitHub private repos                           |

---

## 🧩 2. Sécuriser serveurs & postes de travail

| Élément                              | Risques                        | Recommandations CNIL                   | Implémentation LexOrbital                                |
| ------------------------------------ | ------------------------------ | -------------------------------------- | -------------------------------------------------------- |
| **Serveurs de dev / staging / prod** | Exploitation de vulnérabilités | Mises à jour régulières, durcissement  | Docker images slim ; patch management automatique        |
| **Postes développeurs**              | Vol de code, ransomware        | Antivirus, firewall, comptes non admin | Doc interne "Dev-Security-Playbook" + automatisation MDM |
| **Réseau interne**                   | Mouvement latéral              | Cloisonnement, segmentation            | VLAN Docker networks + pare-feu interne                  |
| **Stockage local**                   | Perte / vol                    | Chiffrement disque                     | Politique obligatoire sur dev machines                   |
| **Environnements multiples**         | Incohérences                   | Standardisation                        | Infra-as-code (Ansible/Terraform)                        |

---

## 🧩 3. Gestion des outils SaaS & cloud collaboratif

| Outil SaaS          | Risques                     | Règles CNIL                            | Implémentation LexOrbital                        |
| ------------------- | --------------------------- | -------------------------------------- | ------------------------------------------------ |
| **GitHub**          | Vol de code / secrets       | MFA obligatoire                        | GitHub: enforce 2FA, secret scanning, CODEOWNERS |
| **Slack / Discord** | Fuite informations internes | Contrôler droits, nettoyer historiques | Channels cloisonnés, bot logs contrôlés          |
| **Trello / Notion** | Fuites de données perso     | Vérifier droits partage public         | Mode privé ; restriction export                  |
| **Cloud CI**        | Secrets exposés             | Réduire privilèges                     | GitHub Actions avec `permissions: read-all`      |

---

## 🧩 4. Gestion des clés SSH

| Problème                            | Risque                  | Recommandations CNIL                     | Implémentation LexOrbital                    |
| ----------------------------------- | ----------------------- | ---------------------------------------- | -------------------------------------------- |
| **Mauvaise protection clé privée**  | Compromission serveurs  | Passphrase obligatoire                   | `ssh-keygen -t ed25519` + passphrase         |
| **Clés trop faibles**               | Attaque bruteforce      | Algorithmes modernes (ED25519, RSA 4096) | Standard LexOrbital : **ED25519 uniquement** |
| **Clés non limitées dans le temps** | Utilisation post-départ | Rotation régulière                       | Durée vie: 6 mois + révocation automatique   |
| **Stockage non sécurisé**           | Extraction par malware  | Ranger dans `~/.ssh/` chiffré            | Politique interne + MDM                      |

> **💡 Standard LexOrbital**  
> Toutes les clés SSH doivent être générées avec **ED25519** et protégées par une passphrase.

---

## 🧩 5. Authentification & contrôle d'accès

| Domaine                | Risques                   | Règles CNIL                    | Mise en œuvre LexOrbital              |
| ---------------------- | ------------------------- | ------------------------------ | ------------------------------------- |
| **Accès serveurs**     | Accès non autorisé        | Auth forte (MFA)               | MFA obligatoire sur tous serveurs     |
| **Accès CI/CD**        | Tokens volés              | Jetons jetables, durée limitée | Short-lived tokens + rotation auto    |
| **Comptes génériques** | Absence traçabilité       | Interdits                      | Un utilisateur = un compte nominatif  |
| **Webhooks**           | Jetons TAG ou API exposés | Durée vie limitée              | GitHub: secrets rotation + expiration |

---

## 🧩 6. Mise à jour & gestion des correctifs (patch management)

| Risque                       | Impact                 | Mesure CNIL              | Intégration LexOrbital                                 |
| ---------------------------- | ---------------------- | ------------------------ | ------------------------------------------------------ |
| **Logiciels non mis à jour** | Exploit CVE            | Automatiser mises à jour | Docker base images à jour ; dépendances via dependabot |
| **Dépendances vulnérables**  | Supply chain           | Suivi alertes CERT-FR    | Script `audit-deps` dans CI                            |
| **Serveurs obsolètes**       | Surface attaque élevée | Veille sécurité          | Fichier `SECURITY.md` + routine hebdo                  |

---

## 🧩 7. Journalisation & traçabilité

| Domaine                   | Risque                  | CNIL                       | Implémentation LexOrbital             |
| ------------------------- | ----------------------- | -------------------------- | ------------------------------------- |
| **Accès serveurs**        | Intrusion               | Tracer accès               | Module Audit : `server_access` events |
| **Actions CI**            | Exécution non autorisée | Logs + analyse automatique | CI logs conservés 1–3 mois            |
| **Actions dev**           | Absence de traces       | Compte nominatif           | Audit interne sur repository          |
| **Webhooks / API tokens** | Non-révocation          | Jetons individuels         | Logs dans Audit + rotation            |

---

## 🧩 8. Analyse automatique des journaux

| Objectif                 | CNIL                | Implémentation LexOrbital                                                                          |
| ------------------------ | ------------------- | -------------------------------------------------------------------------------------------------- |
| **Détection anomalies**  | Recommandé          | Script `analyze-logs` dans Meta-Kernel                                                             |
| **Alertes automatisées** | Détection précoce   | Webhooks Discord/Slack sécurisés                                                                   |
| **Corrélation**          | Identifier attaques | Audit corrélé (IP, user, event)                                                                    |
| **Conservation**         | Logs fiables        | TTL suivant [Fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) (6–12 mois) |

---

## 🧩 9. Sécurisation des pipelines CI/CD

| Problème                   | Risque                          | Règles CNIL                 | Implémentation LexOrbital               |
| -------------------------- | ------------------------------- | --------------------------- | --------------------------------------- |
| **CI avec accès illimité** | Compromission totale            | Restreindre permissions     | GitHub Actions : permissions minimales  |
| **Secrets exposés**        | Fuite de données                | Chiffrer secrets            | GitHub encrypted secrets + OIDC         |
| **Scripts non contrôlés**  | Supply-chain                    | Revue de code des pipelines | PR obligatoire sur workflows            |
| **Tokens permanents**      | Utilisation après compromission | Durée de vie limitée        | Rotation automatique + ephemeral tokens |

> **⚠️ Obligation CNIL**  
> Les pipelines CI/CD doivent avoir des **permissions minimales** et utiliser des **secrets chiffrés**.

---

## 🧩 10. Infrastructure as Code (IaC)

| Domaine                        | Risque                | Mesure CNIL    | Action LexOrbital               |
| ------------------------------ | --------------------- | -------------- | ------------------------------- |
| **Configs dispersées**         | Incohérences sécurité | Homogénéité    | Terraform/Ansible dans `infra/` |
| **Configuration manuelle**     | Erreurs humaines      | Automatisation | CI qui vérifie drifts           |
| **Mauvaises pratiques réseau** | Exposition services   | Cloisonnement  | Templates VPC/VLAN              |

---

## 🧩 11. Politique sécurité développeurs (DevSecOps)

| Risque                              | Bonne pratique CNIL | Mise en œuvre LexOrbital          |
| ----------------------------------- | ------------------- | --------------------------------- |
| **Développeur admin**               | Limiter privilèges  | RBAC interne (admin, dev, viewer) |
| **Téléchargement outils dangereux** | Filtrage sites      | Proxy + règles internes           |
| **Mot de passe faible**             | Politique robuste   | MFA + password manager            |
| **Stockage local code**             | Perte ou vol        | Git chiffré + disques chiffrés    |

---

## 🧩 12. Conformité & documentation

| Domaine                       | CNIL                 | Implémentation LexOrbital                    |
| ----------------------------- | -------------------- | -------------------------------------------- |
| **Documentation des mesures** | Rédiger doc homogène | `SECURITY_GUIDE.md` généré automatiquement   |
| **Plan d'action**             | Définir responsable  | Meta-Kernel : `security.owner` dans manifest |
| **Procédures reproductibles** | Gestion via outils   | Terraform / Ansible                          |
| **Veille sécurité**           | Consulter CERT-FR    | RSS intégré dans dashboard DevOps            |

---

## 🧩 13. Synthèse LexOrbital — Mesures essentielles (Vue finale)

| Mesure                            | FrontRing | BackRing | Meta-Kernel | Modules | Infra |
| --------------------------------- | :-------: | :------: | :---------: | :-----: | :---: |
| **MFA obligatoire**               |    ✅     |    ✅    |     ✅      | (auth)  |  ✅   |
| **Rotation clés SSH**             |    ❌     |    ✅    |     ✅      |   ❌    |  ✅   |
| **Logs & Audit**                  |    ✅     |    ✅    |     ✅      |   ✅    |  ✅   |
| **CI avec permissions minimales** |    N/A    |   N/A    |     ✅      |   ✅    |  ✅   |
| **Secrets chiffrés**              |    ✅     |    ✅    |     ✅      |   ✅    |  ✅   |
| **Mises à jour automatisées**     |    ✅     |    ✅    |     ✅      |   ❌    |  ✅   |
| **Standardisation IaC**           |    N/A    |   N/A    |     ✅      |   ❌    |  ✅   |
| **Détection anomalie logs**       |    ✅     |    ✅    |     ✅      |   ✅    |  ✅   |

> **💡 Légende**  
> ✅ = Mesure appliquée | ❌ = Non applicable | N/A = Non applicable à cette couche | (auth) = Via module Auth

---

## 📋 Checklist de sécurité environnement de développement

### Outils SaaS

- [ ] MFA activé sur tous les comptes GitHub
- [ ] Secret scanning activé sur GitHub
- [ ] CODEOWNERS configuré pour reviews obligatoires
- [ ] Tokens avec rotation automatique
- [ ] Channels Slack/Discord avec droits contrôlés

### Serveurs & Postes

- [ ] Images Docker à jour (slim)
- [ ] Patch management automatique
- [ ] Chiffrement disque activé sur machines dev
- [ ] Antivirus et pare-feu configurés
- [ ] Comptes non-admin pour développeurs

### CI/CD

- [ ] Permissions minimales sur GitHub Actions
- [ ] Secrets chiffrés (GitHub Secrets + OIDC)
- [ ] PR obligatoire sur workflows
- [ ] Tokens à durée de vie limitée
- [ ] Logs CI conservés et analysés

### Clés SSH

- [ ] Clés ED25519 uniquement
- [ ] Passphrase obligatoire
- [ ] Rotation tous les 6 mois
- [ ] Stockage sécurisé (`~/.ssh/` chiffré)

### Journalisation

- [ ] Tous les accès serveurs tracés
- [ ] Actions CI loggées
- [ ] Comptes nominatifs uniquement
- [ ] Analyse automatique des logs
- [ ] Alertes configurées

---

## 📚 Ressources complémentaires

- [CNIL — Sécurité des données](https://www.cnil.fr/fr/securite-des-donnees)
- [ANSSI — Recommandations sécurité](https://cyber.gouv.fr/)
- [CERT-FR — Alertes sécurité](https://www.cert.ssi.gouv.fr/)
- [GitHub Security](https://docs.github.com/en/code-security)
- [Tester vos applications](./11-Tester%20vos%20applications.md) — Tests de sécurité
- [NIST Special Publication 7966](https://nvlpubs.nist.gov/nistpubs/ir/2015/NIST.IR.7966.pdf)

---

<div align="center">

**[⬅️ Précédent](./02-Préparer%20son%20developpement.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./04_Gerer-code-source.md)**

</div>
