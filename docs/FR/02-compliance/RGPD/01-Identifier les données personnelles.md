# Fiche n°1 — Identifier les données à caractère personnel

> **Version LexOrbital — Vue opérationnelle RGPD-by-design**

**Format** : 100% tableaux — Classification automatique des données personnelles

**Objectif** : Identifier et classifier toutes les données personnelles traitées dans LexOrbital pour garantir la conformité RGPD.

---

> **📘 Contexte RGPD**  
> La première étape de la conformité RGPD est d'**identifier** toutes les données personnelles traitées. Cette fiche détaille comment LexOrbital automatise cette identification.

---

## 🧩 1. Définition des données personnelles (selon RGPD) — Adapté LexOrbital

| Élément | Définition RGPD | Interprétation dans LexOrbital |
|---------|-----------------|-------------------------------|
| **Donnée personnelle** | Toute information identifiant ou rendant identifiable une personne physique | Toute donnée liée à un `userId`, `sessionId`, IP, ou interaction stockée dans un module |
| **Traitement** | Toute opération : collecte, enregistrement, modification, communication… | API BackRing, FrontRing states, logs, modules DB |
| **Finalité** | Objectif spécifique, légitime, déterminé | Définie dans `rgpd-manifest.json` par module |

---

## 🧩 2. Exemples de données personnelles — Vue LexOrbital

| Catégorie | Exemples CNIL | Où cela apparaît dans LexOrbital |
|-----------|---------------|--------------------------------|
| **Identité directe** | nom, prénom, date de naissance | Module Auth, formulaires profil |
| **Identité numérique** | email, pseudo, identifiants | Auth, Modules front/back |
| **Identifiants techniques** | IP, User-Agent, cookie ID | Analytics, BackRing logs |
| **Données comportementales** | pages visitées, clics, contenus vus | Module Analytics |
| **Contenus fournis** | commentaires, uploads | Modules front divers |
| **Images / sons** | photos, enregistrements | Modules média futurs |
| **Identifiants administratifs** | NIR, ID carte, immatriculation | ⚠️ **Interdits sauf projet spécifique** |
| **Croisement indirect** | femme + adresse + date naissance + association | Toute DB permettant « ré-identification indirecte » |

---

## 🧩 3. Données sensibles (article 9 RGPD) — Gestion dans LexOrbital

> **🚫 Politique LexOrbital**  
> LexOrbital refuse **par défaut** tout module traitant des données sensibles, sauf opt-in explicite dans le Meta-Kernel, base légale validée, exception art. 9 identifiée.

| Type données sensibles | Définition | Autorisation dans LexOrbital |
|------------------------|------------|:---------------------------:|
| **Santé** | Données médicales | ❌ Interdit par défaut |
| **Orientation sexuelle** | Vie intime | ❌ Interdit |
| **Opinions politiques** | Engagements publics | ❌ Interdit |
| **Religion / convictions** | Croyances | ❌ Interdit |
| **Syndicats** | Appartenance | ❌ Interdit |
| **Biométriques** | empreintes, rétine | ❌ Interdit sans module spécifique |
| **Origine raciale/ethnique** | Catégories prohibées | ❌ Interdit |
| **Données génétiques** | ADN | ❌ Interdit |

---

## 🧩 4. Pseudonymisation vs Anonymisation (RGPD → LexOrbital)

| Concept | Définition RGPD | Ce que cela signifie techniquement dans LexOrbital |
|---------|-----------------|---------------------------------------------------|
| **Pseudonymisation** | Remplacer identifiants directs par ID non identifiants, mais réversible | Hash, UUID, ID interne ; toujours considéré comme "donnée personnelle" |
| **Anonymisation** | Rendre impossible l'identification, de façon irréversible | Agrégations, suppression clés d'identification, suppression liens, génération de nouveaux jeux de données |
| **Produit final** | Données non personnelles (si anonymisation réussie) | Module Analytics → agrégats anonymisés ; exports stats uniquement anonymes |

> **💡 Distinction importante**  
> La **pseudonymisation** reste une donnée personnelle (réversible).  
> L'**anonymisation** crée des données non personnelles (irréversible).

---

## 🧩 5. Critères d'anonymisation (G29 → LexOrbital)

| Critère | Définition | Implémentation dans LexOrbital |
|---------|------------|-------------------------------|
| **Individualisation** | Impossible d'isoler un individu | Agrégation par période dans Analytics |
| **Corrélation** | Impossible de relier 2 enregistrements d'une même personne | ID temporisés, rotation d'identifiants, suppression IP |
| **Inférence** | Impossible de déduire information supplémentaire | Ajout bruit / arrondis statistiques (`roundToNearest10`) |

> **📘 Source** : Groupe de travail Article 29 (G29) — critères d'anonymisation

---

## 🧩 6. Techniques d'anonymisation utilisées dans LexOrbital

| Technique | Description | Usage concret |
|-----------|-------------|---------------|
| **Masquage** | Remplacement partiel (ex : `j***@gmail.com`) | Export partiel user |
| **Pseudonymisation hashing** | Hash cryptographique avec sel | Logging, Analytics internals |
| **Agrégation** | Regrouper en ensembles > 10 | Analytics : agrégats |
| **Perturbation / bruit** | Ajouter aléatoire contrôlé | Analytics statistiques |
| **Suppression des attributs** | Retirer directement | Export anonymisé |
| **K-anonymity / L-diversity** | Groupes homogènes | Déployable si datasets critiques |

---

## 🧩 7. Définition des "finalités" dans LexOrbital

| Finalité | Exemple | Où définir dans LexOrbital |
|----------|---------|----------------------------|
| **Authentification** | Création de compte, login | Module Auth → manifest |
| **Communication** | Emails, notifications | Module Mailer |
| **Mesure d'audience** | Analytics exemptés | Module Analytics |
| **Sécurité** | Audit, logs | Module Audit |
| **Personnalisation** | Recommandations | Modules optionnels (consentement requis) |
| **Administration technique** | Gestion infra, CI | Rings, Meta-Kernel |

---

## 🧩 8. Identifier les données personnelles dans un module

> **📘 Note**  
> Chaque module doit remplir ce tableau dans son `rgpd-manifest.json`.

| Élément | Exemple | Analyse LexOrbital |
|---------|---------|-------------------|
| **Données collectées** | email, IP, actions | Déclarer toutes les données |
| **Finalités** | `"auth"`, `"analytics"` | Une finalité = une base légale |
| **Données indirectes** | usage, navigation | Toujours personnelles si rattachées analyse comportementale |
| **Données de logs** | erreurs, requêtes | Si IP → personnel |
| **Durée conservation** | 6 mois, 13 mois | Lié à [Fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) |
| **Sensibilité** | sensible ? critique ? | Interdit si art. 9 sauf module validé |

---

## 🧩 9. Risques de mauvaise identification des données personnelles

| Risque | Conséquence RGPD | Mesures LexOrbital |
|--------|------------------|-------------------|
| **Penser qu'une donnée n'est "pas personnelle"** | Violations, Fuite, Sanctions | Audit automatique `detect-personal-data` |
| **Croire qu'un dataset est "anonyme"** | Exploitation dangereuse | Processus d'anonymisation obligatoire et documenté |
| **Mauvaise finalité** | Traitement illicite | Finalités strictes par module |
| **Centres de données dispersés** | fuite | Centralisation via BackRing |

---

## 🧩 10. Intégration dans Meta-Kernel (RGPD-by-design)

| Fonction Meta-Kernel | Rôle |
|----------------------|------|
| **Validation des manifests** | Empêche tout module d'être chargé sans déclaration des données personnelles |
| **Classification automatique** | Détection des données personnelles via patterns |
| **Génération documentation** | Fiches automatiques "traitements & données" |
| **Détection sensitive** | Bloque modules collectant données sensibles |
| **Outils anonymisation** | Fonctions communes disponibles pour modules |

---

## 🧩 11. Classification automatique des données dans LexOrbital

> **📘 Note**  
> Ce tableau est utilisé par un scan interne ("linter RGPD") pour détecter des données personnelles.

| Type détecté | Exemple de champ / payload | Classification |
|--------------|----------------------------|----------------|
| **Identifiant direct** | `email`, `username` | Donnée personnelle |
| **Identifiant technique** | `ip`, `ua`, `cookieId` | Donnée personnelle |
| **Identifiant dérivé** | `hashedUserId` | Donnée personnelle (pseudonyme) |
| **Donnée sensible** | `health`, `religion` | Interdit |
| **Donnée comportementale** | `pageView`, `click` | Donnée personnelle |
| **Agrégat** | `dailyUserCount` | Anonyme (si règles respectées) |

---

## 🧩 12. Quand les données NE sont plus des données personnelles

| Situation | Condition | Impact LexOrbital |
|-----------|-----------|-------------------|
| **Anonymisation effective** | Individualisation impossible + corrélation impossible + inférence impossible | Dataset utilisable pour stats sans RGPD |
| **Agrégat suffisamment large** | K-anonymity > 10 | OK pour Analytics |
| **Suppression toutes clés de liaison** | Pas de `userId`, pas d'IP, pas d'horodatage trop précis | Dataset anonyme |

---

## 🧩 13. Décision : données personnelles ou non ?

| Exemple | Donnée personnelle ? | Justification |
|---------|:---------------------:|---------------|
| **Adresse IP** | ✅ Oui | Identifiant de terminal |
| **UUID v4 d'un user** | ✅ Oui | Pseudonyme |
| **email hashé** | ✅ Oui | Ré-identifiable |
| **données Analytics agrégées** | ❌ Non | Anonymisées |
| **logs avec userId** | ✅ Oui | identifiant |
| **log d'erreur sans contexte** | ❌ Non | pas de lien à une personne |

---

## 🧩 14. Workflow LexOrbital pour identifier les données personnelles

| Étape | Description | Outil LexOrbital |
|-------|-------------|------------------|
| **1** | Scanner code | `detect-personal-data` |
| **2** | Classifier | Meta-Kernel classification rules |
| **3** | Associer finalité | Module manifest |
| **4** | Associer base légale | [Fiche 15](./15-Prendre%20en%20compte%20les%20bases%20légales%20dans%20l'implémentation%20technique.md) |
| **5** | Vérifier sensibilité | Scan `sensitive-blocker` |
| **6** | Vérifier conservation | [Fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) |
| **7** | Valider l'anonymisation | `validate-anonymization` |
| **8** | Générer documentation | `generate-rgpd-docs` |

> **💡 Automatisation**  
> Ce workflow est **automatisé** dans le Meta-Kernel et s'exécute lors de l'intégration d'un module.

---

## 📋 Checklist d'identification des données personnelles

Pour chaque module, vérifier :

- [ ] Toutes les données collectées sont déclarées dans `rgpd-manifest.json`
- [ ] Les données sensibles (art. 9) sont identifiées et interdites par défaut
- [ ] Les finalités sont clairement définies
- [ ] La distinction pseudonymisation/anonymisation est documentée
- [ ] Le workflow d'identification automatique est exécuté
- [ ] La classification automatique détecte toutes les données personnelles
- [ ] La documentation est générée automatiquement

---

## 📚 Ressources complémentaires

- [CNIL — Qu'est-ce qu'une donnée personnelle ?](https://www.cnil.fr/fr/definition/donnee-personnelle)
- [CNIL — Données sensibles](https://www.cnil.fr/fr/definition/donnee-sensible)
- [CNIL — Anonymisation](https://www.cnil.fr/fr/lanonymisation-des-donnees)
- [Bases légales](./15-Prendre%20en%20compte%20les%20bases%20légales%20dans%20l'implémentation%20technique.md) — Associer une base légale
- [Durée de conservation](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) — TTL des données

---

<div align="center">

**[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant : Préparer son développement →](./02-Préparer%20son%20developpement.md)**

</div>
