# Fiche n°2 — Préparer son développement

> **Privacy by Design & Sécurité Agile**

**Objectif** : Intégrer la protection des données dès la conception (privacy by design), dans la méthode de travail et dans le choix des technos.

---

> **📘 Note**  
> Dans une démarche agile, on renforce la sécurité **progressivement** : on traite d'abord les risques les plus critiques lorsque le produit n'a qu'un faible nombre d'utilisateurs, puis on élargit et durcit le périmètre de sécurité à mesure que l'adoption augmente et que l'exposition au risque grandit.  
> 
> C'est l'application directe du principe de l'ANSSI : **évaluer le risque en continu et l'adapter à la maturité du produit**.

---

## 1. Exemple suivi pas à pas : **LexOrbital-core**

Pour illustrer concrètement la démarche, la plateforme **LexOrbital-core** sert de fil conducteur.  
Son rôle, tel que défini dans la carte stellaire orbitale, est d'agir comme **Meta-Kernel** : un noyau légal et technique imposant les conventions, les contrats, les patterns RGPD-by-design et les règles d'orchestration.

Ce noyau constitue aussi la **première brique de sécurité**.  
Dans cette fiche, on retrace comment les besoins de sécurité ont été identifiés, hiérarchisés, puis intégrés progressivement durant le développement.

---

## 2. Des besoins de sécurité aux événements redoutés

Un **événement redouté** est un scénario dont la survenue porte atteinte à la valeur métier ou à la conformité légale du projet.

### 📊 Exemple LexOrbital — Tableau initial

| Événement redouté | Impact métier | Gravité |
|-------------------|---------------|:-------:|
| **Compromission d'un module arrimé** (ex. module Auth) | Atteinte à l'intégrité des comptes, responsabilité légale | 🔴 **Critique** |
| **Corruption d'un manifest** (`module.json` / `rgpd-manifest.json`) | Perte du contrat module-core → station incohérente | 🟠 **Élevée** |
| **Absence d'audit trail** pour actions sensibles | Non-conformité RGPD, perte de traçabilité | 🟠 **Élevée** |
| **Fuite de secrets du Meta-Kernel** | Rupture de sécurité globale | 🔴 **Critique** |

---

## 3. Définition du risque (formulation ANSSI)

Un **risque** décrit la réalisation d'un scénario par lequel :

1. **une source de risque**
2. **exploite une vulnérabilité** d'un composant du produit
3. **provoque un événement redouté**,
4. **générant des impacts** métier, légaux ou opérationnels.

### 💡 Exemples LexOrbital

- **Scénario 1** : Une mauvaise configuration d'un module-vaisseau  
  → **Source** : développeur interne  
  → **Vulnérabilité** : absence de validation JSON Schema  
  → **Événement** : module incompatible  
  → **Impact** : station déployée instable

- **Scénario 2** : Un acteur malveillant externe  
  → **Source** : cybercriminel  
  → **Vulnérabilité** : token JWT mal signé  
  → **Événement** : usurpation  
  → **Impact** : atteinte à la confidentialité

---

## 4. Dette sécuritaire et homologation provisoire

### 4.1 Dette sécuritaire

On parle de **dette sécuritaire** lorsqu'une équipe **diffère** volontairement le traitement de certains risques, souvent parce que :

- le périmètre du produit est encore limité,
- le coût d'implémentation est élevé au début,
- la fonctionnalité doit être livrée rapidement.

> **⚠️ Important**  
> La dette doit être **visibilisée**, suivie, et intégrée dans le backlog.

### 4.2 Homologation provisoire

Une **homologation provisoire** permet d'accepter un certain **risque résiduel** temporaire, proportionné à :

- la maturité du produit,
- le nombre d'utilisateurs,
- la sensibilité des données traitées,
- le contexte de déploiement.

### 4.3 Stratégie d'homologation pour LexOrbital-core

#### 🎯 Jalon 1 — Prototype interne (exposition faible)

- ✅ Risques critiques seulement
- ⚠️ Manifests non encore strictement validés
- 🔒 Secrets en environnement local uniquement

#### 🎯 Jalon 2 — MVP multi-modules

- ✅ Validation JSON Schema obligatoire pour manifests
- ✅ Audit Trail minimal disponible (`LexOrbitalAudit`)
- ✅ Gestion des secrets par Meta-Kernel

#### 🎯 Jalon 3 — Station complète dockerisée

- ✅ Encryption systématique (Pattern Encryption)
- ✅ TTL obligatoires dans les modules sensibles
- ✅ RGPD manifest complet pour chaque module

#### 🎯 Jalon 4 — Déploiement public

- ✅ Tests de sécurité automatisés
- ✅ Politique de logs consolidée
- ✅ Conformité RGPD vérifiée par process interne

---

## 5. Structuration des mesures de sécurité dans LexOrbital

### 5.1 Atelier d'analyse

- Cartographier les composants orbitaux (Meta-Kernel, anneaux, modules)
- Identifier les dépendances critiques
- Décrire les flux internes (cf. carte orbitale)

### 5.2 Cadre réglementaire & normatif

- **RGPD** (patterns intégrés dans Meta-Kernel)
- **ANSSI** — Sécurité numérique Agile
- **OWASP ASVS** pour les modules BackRing
- **OWASP Top 10** (contrôles transverses)

### 5.3 Principes d'hygiène informatique

- Durcissement bas-niveau (chiffrement, secrets)
- Principes de moindre privilège
- Minimisation des données
- Audit continu des événements sensibles

---

## 6. Prioriser les scénarios intentionnels

Dans une architecture orbitale distribuée, les **scénarios intentionnels** sont prioritaires : acteurs motivés, ciblés, pouvant exploiter un module mal arrimé ou un anneau vulnérable.

### 🔍 Questions utiles pour identifier ces scénarios

- Cette partie prenante contrôle-t-elle un maillon critique ?
- Suis-je dépendant d'un service ou d'une BDD externe qu'elle opère ?
- Quels seraient les effets d'une compromission ciblée sur un module pivot (auth, audit…) ?

---

## 7. Canevas d'analyse de risque (LexOrbital)

### 7.1 Sources de risque (adaptées à l'écosystème)

| Source de risque | Description |
|------------------|-------------|
| **Idéologie, agitation, propagande** | Motivations politiques ou idéologiques |
| **Jeu, défi, exploitation opportuniste** | Exploitation de vulnérabilités par curiosité |
| **Prépositionnement stratégique** | Préparation d'attaques futures |
| **Espionnage, renseignement, intelligence économique** | Vol d'informations sensibles |
| **Neutralisation, sabotage, destruction** | Attaques visant à perturber le service |
| **Fraude, intérêt lucratif** | Motivations financières |
| **Malveillance, vengeance** | Actions de représailles |
| **Erreur humaine** | Fortement présente dans les manifests |

### 7.2 Identifier les composants vulnérables

#### Infrastructure physique
- Serveurs
- Conteneurs

#### Organisation
- Dépôts Git
- CI/CD
- Secrets partagés

#### Système numérique
- **Meta-Kernel**
- **BackRing / FrontRing**
- **Modules plug'n'play**
- **Manifests orbitaux**

### 7.3 Risque résiduel

Après traitement, certains risques demeurent ; ils doivent être **explicitement acceptés**, suivis, et re-évalués à chaque jalon d'homologation.

> **⚠️ Point de vigilance**  
> Le risque résiduel doit être documenté et révisé régulièrement.

---

## 8. Tableaux d'analyse à compléter

### 8.1 Sources de risque → Modes opératoires → Vraisemblances

| Source | Mode opératoire | Vraisemblance |
|--------|-----------------|---------------|
|        |                 |               |
|        |                 |               |

### 8.2 Événements redoutés → Impacts métier → Gravité

| Événement | Impact | Gravité |
|-----------|--------|---------|
|           |        |         |

### 8.3 Risques résiduels majeurs → Mesures à prendre

| Risque résiduel | Mesures compensatoires |
|-----------------|------------------------|
|                 |                        |

---

## 9. Analyse d'Impact sur la Protection des Données (AIPD)

### 9.1 Vérification préalable : LexOrbital nécessite-t-il une AIPD ?

Avant même de rédiger l'AIPD, la CNIL demande de vérifier si elle est obligatoire.

#### ✦ Analyse selon les critères CNIL

> **📘 Source** : Infographie CNIL "DOIS-JE FAIRE UNE AIPD ?"

Les **9 critères CNIL** sont :

1. Évaluation / scoring
2. Décision automatisée avec effet légal
3. Surveillance systématique
4. Données sensibles ou hautement personnelles
5. Collecte à large échelle
6. Croisement de données
7. Personnes vulnérables
8. Usage innovant ou nouvelle technologie
9. Exclusion du bénéfice d'un droit / contrat

> **✅ Conclusion**  
> **LexOrbital, en tant qu'architecture**, ne remplit pas ces critères.  
> En revanche, **certains modules** (auth, audit, analytics, géolocalisation, etc.) **peuvent, eux, remplir 1 à 3 critères**.

#### ✦ Vérification liste "AIPD Non Requise"

> **📘 Source** : CNIL "liste AIPD-non-requise" pages 1–5

→ Aucun cas de la plateforme n'entre dans ces exemptions (RH < 250 employés, comités d'entreprise, avocats, notaires, traitement électoral, etc.).

#### ✦ Vérification liste "AIPD Requise"

> **📘 Source** : CNIL "liste AIPD-requise" pages 1–4

Les cas concernés : santé, biométrie, profiling RH, alertes professionnelles, géolocalisation large échelle, entrepôts de données de santé…

> **✅ Conclusion**  
> LexOrbital n'entre **directement** dans aucun cas.  
> Mais **certains futurs modules pourraient y entrer** (ex : géolocalisation, scoring ML, surveillance DLP, etc.).

#### 📋 Conclusion AIPD

> **💡 Synthèse**  
> 👉 **Une AIPD "générique" au niveau de LexOrbital n'est pas obligatoire.**  
> 👉 **Une AIPD par module** _peut devenir obligatoire selon ses finalités_.  
> 👉 Il faut donc mettre en place une **méthode d'AIPD modulaire**, alignée sur les manifests RGPD.

---

### 9.2 🌘 Étape 1 : Définir le traitement analysé (Méthode CNIL)

> **📘 Source** : Infographie PIA méthodologie page unique

#### 9.2.1 Description du périmètre

| Élément | Description |
|---------|-------------|
| **Nom du traitement** | "Traitements opérés par la plateforme LexOrbital et ses modules plug'n'play" |
| **Responsable de traitement** | Variable selon projet utilisant LexOrbital (LexOrbital est un _framework_, pas un RT) |
| **Sous-traitant éventuel** | Hébergement / CI / monitoring |

#### 9.2.2 Structuration orbitale du traitement

Aligné avec les notes internes :

| Composant | Rôle dans le traitement |
|-----------|-------------------------|
| **Meta-Kernel** | • Gestion des manifests<br>• Application des normes RGPD by design<br>• Journalisation technique |
| **BackRing** | • Exécution des traitements métiers des modules<br>• Validation des schémas, application TTL, audit |
| **FrontRing** | • Collecte minimale<br>• Affichage / consentement / UI légale |
| **Modules-vaisseaux** | • Traitements autonomes<br>• Déclarés via `rgpd-manifest.json` (finalité / base légale / durée / destinataires) |

---

### 9.3 🌘 Étape 2 : Apprécier les risques vie privée (Méthode CNIL)

> **📘 Source** : PIA CNIL — schéma "Apprécier les risques vie privée"

La CNIL distingue :

- **Sources de risques**
- **Vraisemblance**
- **Gravité**
- **Impacts potentiels sur droits et libertés**

#### 9.3.1 Sources de risques pertinentes dans LexOrbital

D'après l'infographie CNIL :

| Source de risque | Exemple LexOrbital |
|------------------|-------------------|
| **Accès non autorisé aux données** | BackRing mal protégé |
| **Modification ou altération non désirée** | Module corrompu, mise à jour incorrecte |
| **Disparition de données** | Module sans TTL cohérent ou perte lors de detach |
| **Croisement de données non prévu** | Modules interconnectés sans contrôle |
| **Collecte excessive** | Module mal écrit → non respect de minimisation |
| **Transferts non maîtrisés** | Module Infra, service externe |

#### 9.3.2 Typologie des données (exemples de modules LexOrbital)

- **Identité** (auth)
- **Logs & audit** (module audit)
- **Configuration utilisateur** (front modules)
- **Éventuelles données sensibles** selon modules (ex : santé → module tiers)

#### 9.3.3 Risques pour les personnes

- Atteinte à la **confidentialité**
- Atteinte à l'**intégrité**
- Atteinte à la **disponibilité**
- **Profilage injustifié** (si module ML ajouté)
- **Ré-identification** (si agrégation insuffisante)

---

### 9.4 🌘 Étape 3 : Traiter les risques (Méthode CNIL)

> **📘 Source** : Schéma CNIL "Traiter les risques"

Ici, on introduit les **patterns RGPD by design** (document interne).

#### 9.4.1 Mesures techniques LexOrbital (Meta-Kernel)

##### ✦ Minimisation automatique

- Validation stricte des schémas en entrée
- Modules obligés d'indiquer leurs catégories de données (`rgpd-manifest.json`)

##### ✦ TTL par design ("Pattern TTL")

- Champs `expiresAt` imposé
- Cleanup automatique

##### ✦ Journalisation ("Pattern Audit Trail")

- Module `LexOrbitalAudit` obligatoire pour actions sensibles
- Événements normalisés : qui / quoi / quand / où / pourquoi

##### ✦ Sécurité technique

- Chiffrement TLS en transit
- Chiffrement des secrets (Meta-Kernel)
- Rotation et gestion des clés
- Isolation des modules / anneaux

##### ✦ Contrôle des accès (RBAC / Auth)

- Module Auth central
- Claims minimisés
- Permissions explicites (pattern Data Access Boundary)

##### ✦ Compatibilité RGPD dans les manifests

- Déclaration obligatoire :
  - finalités
  - base légale
  - durée de conservation
  - destinataires
  - niveau de sensibilité des données

#### 9.4.2 Mesures organisationnelles (pour tout projet utilisant LexOrbital)

- Tenue du registre des traitements
- Politique de mots de passe & sécurité
- Limitation des sous-traitants
- Revue annuelle des modules installés
- Audit des manifests

---

### 9.5 🌘 Étape 4 : Décision finale CNIL — Risque résiduel

Selon la CNIL :

> **📘 Citation CNIL**  
> "Si les risques résiduels restent élevés malgré les mesures, l'autorité de contrôle doit être consultée"  
> (PIA CNIL — schéma "Traiter les risques")

#### Dans LexOrbital

Grâce aux patterns du Meta-Kernel, les risques résiduels sont **très fortement réduits**.

Les seuls cas où une **consultation CNIL** serait nécessaire :

- Module de santé (santé → AIPD obligatoire)
- Géolocalisation large échelle (liste CNIL AIPD requise)
- Biométrie
- Scoring RH
- Traitement social ou médico-social (voir liste page 4)

---

### 9.6 🌌 Étape 5 : Proposition — AIPD modulaire (modèle LexOrbital)

Au lieu de faire **une AIPD globale**, LexOrbital propose :

#### ✦ AIPD-Kernel

- Concerne les règles, patterns, mesures techniques du Meta-Kernel
- Démonstration que l'infrastructure logicielle → _réduit les risques structurels_

#### ✦ AIPD-Module (optionnelle / obligatoire selon cas)

Chaque `rgpd-manifest.json` devient une **brique AIPD** décrivant :

- Finalité
- Données traitées
- Base légale
- Durée
- Destinataires
- Risques spécifiques
- Mesures techniques appliquées

> **💡 Innovation LexOrbital**  
> LexOrbital peut même générer **automatiquement un dossier AIPD PDF** par module (docs vivantes).

---

## 10. Choix technologiques

### 10.1 Architecture et fonctionnalités

- **Intégrez la protection de la vie privée, y compris les exigences de sécurité des données, dès la conception de l'application ou du service**.
  - Voir fiche [Fiche n°5 : Faire un choix éclairé de son architecture]()
  - Voir fiche [Fiche n°6 : Sécuriser vos sites web, vos applications et vos serveurs]()

- **Gardez la maîtrise de votre système**. Démarrer d'un système simple, correctement conçu et sécurisé.

- **Ne vous reposez pas sur une seule ligne de défense**.

### 10.2 Outils et pratiques

#### Utilisez des normes de programmation prenant en compte la sécurité

- Listes de bonnes pratiques pour votre langage de programmation
- Pour le développement d'application web, des guides de bonnes pratiques spécifiques existent, tels que ceux publiés par [l'OWASP](https://www.owasp.org/index.php/Main_Page)

#### Le choix des technologies utilisées est crucial

- En fonction du domaine d'application ou de la fonctionnalité développée, un langage ou une technologie peut être plus approprié qu'une autre
- Les langages et technologies éprouvés sont plus sûrs. Ils ont fait, en général, l'objet d'audits afin de corriger les vulnérabilités les plus connues. Il faut cependant faire attention à utiliser les dernières versions de chacune des briques technologiques que vous utiliserez
- Il faut à tout prix éviter de coder sa solution définitive dans un langage tout juste appris et pas encore maîtrisé. Dans le cas contraire, vous vous exposez à un risque accru de faille de sécurité du fait du manque d'expérience

#### Mettez en place un environnement de développement sécurisé et permettant le versionnage du code

- Voir fiche [Fiche n°3 : Sécuriser son environnement de développement]()

---

## 📚 Ressources complémentaires

- [ANSSI — Sécurité numérique Agile](https://cyber.gouv.fr/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [CNIL — Guide du développeur](https://www.cnil.fr/developpeur)
- [CNIL — Outil PIA](https://www.cnil.fr/fr/outil-pia-telechargez-et-installez-le-logiciel-de-la-cnil)

---

<div align="center">

**[⬅️ Précédent](./01_guide-rgpd-lexorbital.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./03_fiche-consentement.md)**

</div>
