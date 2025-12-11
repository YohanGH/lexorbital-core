# Sources et références

Ce document liste les sources consultées et les références utilisées pour la création et le développement du dépôt LexOrbital Core dans son ensemble.

## Architecture et conception

### Modèles d'architecture

- **Modèles d'architecture modulaire** : Inspiration pour la conception du système modulaire
- **Architecture microservices** : Principes appliqués à l'orchestration des modules
- **Architecture de plugins** : Modèle de conception utilisé pour l'intégration des modules

### Métaphore orbitale

- Concept de "Meta-Kernel" et d'anneaux orbitaux inspiré des systèmes distribués
- Séparation BackRing/FrontRing basée sur les modèles de séparation des préoccupations

## Technologies et frameworks

### Backend (BackRing)

- **Express.js** : Framework Node.js pour API REST
  - Documentation officielle : https://expressjs.com/
- **TypeScript** : Langage de programmation
  - Documentation officielle : https://www.typescriptlang.org/
- **Node.js** : Runtime JavaScript
  - Documentation officielle : https://nodejs.org/

### Frontend (FrontRing)

- **React** : Bibliothèque d'interface utilisateur
  - Documentation officielle : https://react.dev/
- **Vite** : Outil de build et serveur de développement
  - Documentation officielle : https://vitejs.dev/
- **TypeScript** : Langage de programmation

- **Wouter** : Router pour React
  - Documentation officielle : https://github.com/molefrog/wouter#readme

- **React Testing Library** : Bibliothèque de test pour React
  - Documentation officielle : https://testing-library.com/docs/react-testing-library/intro/

### Infrastructure

- **Docker** : Conteneurisation
  - Documentation officielle : https://docs.docker.com/
- **Docker Compose** : Orchestration de conteneurs
  - Documentation officielle : https://docs.docker.com/compose/
- **Ansible** : Automatisation et gestion de configuration informatique
  - Dépôt : https://github.com/ansible/ansible
  - Documentation officielle : https://docs.ansible.com/
  - Utilisé pour l'automatisation de l'infrastructure et le déploiement

## Outils de développement

### Gestion de paquets

- **pnpm** : Gestionnaire de paquets
  - Documentation officielle : https://pnpm.io/

### Linting et formatage

- **ESLint** : Linter JavaScript/TypeScript
  - Documentation officielle : https://eslint.org/
- **Commitlint** : Validation des messages de commit
  - Documentation officielle : https://commitlint.js.org/

### Analyse de code

- **dependency-cruiser** : Valider et visualiser les dépendances
  - Dépôt : https://github.com/sverweij/dependency-cruiser
  - Utilisé pour analyser et gérer les dépendances du projet

### Outils système

- **otool** : Outil d'affichage de fichiers objets (macOS/Unix)
  - Page de manuel : https://www.unix.com/man-page/osx/1/otool/
  - Utilisé pour l'analyse et l'inspection de binaires

### Git et contrôle de version

- **Git** : Système de contrôle de version distribué
  - Documentation officielle : https://git-scm.com
- **Git Subtree** : Intégration de modules
  - Documentation : https://git-scm.com/book/en/v2/Git-Tools-Subtree-Merging
- **git-crypt** : Chiffrement transparent de fichiers dans Git
  - Dépôt : https://github.com/AGWA/git-crypt
  - Utilisé pour sécuriser les fichiers sensibles dans le contrôle de version
- **Git Flow** : Un modèle de branchement Git réussi
  - Article : https://nvie.com/posts/a-successful-git-branching-model/
  - Référence pour les stratégies de branchement et les workflows

## Standards et conventions

### Conventional Commits

- Spécification : https://www.conventionalcommits.org/
- Utilisé pour la standardisation des messages de commit

### Documentation

- **Markdown** : Format de documentation
  - Spécification : https://daringfireball.net/projects/markdown/
- **Pandoc** : Convertisseur de documents universel
  - Documentation officielle : https://pandoc.org/
  - Guide d'installation : https://pandoc.org/installing.html
  - Images Docker : https://github.com/pandoc/dockerfiles
  - Exemples GitHub Actions : https://github.com/pandoc/pandoc-action-example
  - Utilisé pour générer la documentation dans plusieurs formats (PDF, HTML, EPUB)

### Standards et guides de codage

- **Awesome Guidelines** : Liste organisée de conventions et standards de style de codage
  - Dépôt : https://github.com/Kristories/awesome-guidelines
  - Collection complète de guides de style et meilleures pratiques pour divers langages de programmation et frameworks

- **Libs.tech** : Liste de bibliothèques et frameworks open source
  - Dépôt : https://libs.tech
  - Collection complète de bibliothèques et frameworks open source

## Licences et conformité

### Licences open source

- **Licence MIT** : Licence recommandée pour les modules
  - Texte complet : https://opensource.org/licenses/MIT

### Sécurité

- **OWASP** : Projet ouvert sur la sécurité des applications web
  - Site web officiel : https://owasp.org
  - Référence pour les meilleures pratiques et standards de sécurité des applications web
- **CERT-FR** : Équipe d'intervention d'urgence informatique française
  - Alertes de sécurité : https://www.cert.ssi.gouv.fr/alerte/
  - Avis de sécurité : https://www.cert.ssi.gouv.fr/avis/
  - Actualités de sécurité : https://www.cert.ssi.gouv.fr/actualite/
  - Utilisé pour surveiller les menaces et vulnérabilités de sécurité
- **ANSSI** : Agence nationale de la sécurité des systèmes d'information
  - **Guide de cloisonnement système** : Meilleures pratiques pour l'isolation des systèmes
    - PDF : https://cyber.gouv.fr/sites/default/files/2017/12/guide_cloisonnement_systeme_anssi_pg_040_v1.pdf
    - Référence pour l'architecture sécurisée des systèmes et l'isolation
  - **Guide de sélection cryptographique** : Lignes directrices pour le choix de solutions cryptographiques
    - PDF : https://cyber.gouv.fr/sites/default/files/2021/03/anssi-guide-selection_crypto-1.0.pdf
    - Référence pour la sélection d'algorithmes et d'implémentations cryptographiques appropriés
  - **Solutions certifiées** : Répertoire des solutions de sécurité certifiées
    - Page officielle : https://cyber.gouv.fr/decouvrir-les-solutions-certifiees
    - Référence pour la sélection de produits et services de sécurité certifiés
  - **Recommandations sur l'authentification multifacteur et les mots de passe** : Lignes directrices sur l'authentification multifacteur et la sécurité des mots de passe
    - Publication officielle : https://cyber.gouv.fr/publications/recommandations-relatives-lauthentification-multifacteur-et-aux-mots-de-passe
    - Référence pour la mise en œuvre de mécanismes d'authentification robustes
- **Sécurité des mots de passe**
  - **Recommandations CNIL sur les mots de passe** : Meilleures pratiques pour la gestion des mots de passe
    - Page officielle : https://www.cnil.fr/fr/mots-de-passe-recommandations-pour-maitriser-sa-securite
    - Recommandations mises à jour 2022 sur les politiques de mots de passe et l'authentification
    - Référence pour la mise en œuvre de politiques de mots de passe sécurisées
  - **bcrypt** : Bibliothèque de hachage de mots de passe pour JavaScript
    - Site web officiel : https://www.bcrypt.io/languages/javascript
    - Référence pour l'implémentation sécurisée du hachage de mots de passe
  - **KeePass** : Gestionnaire de mots de passe open source
    - Site web officiel : https://keepass.info
    - Référence pour les meilleures pratiques de gestion des mots de passe
- **Journalisation et audit**
  - **Recommandations CNIL sur la journalisation** : Lignes directrices sur les mesures de journalisation
    - Page officielle : https://www.cnil.fr/fr/la-cnil-publie-une-recommandation-relative-aux-mesures-de-journalisation
    - Référence pour la mise en œuvre de la journalisation conforme et des pistes d'audit
- **Attaques d'applications web**
  - **OWASP Top 10** : Top 10 des risques de sécurité les plus critiques des applications web
    - **A03:2021 - Injection** : Prévention des attaques par injection
      - Page officielle : https://owasp.org/Top10/A03_2021-Injection/
      - Référence pour comprendre et prévenir les attaques par injection
    - **Prévention des injections SQL** : Aide-mémoire pour la prévention des injections SQL
      - Aide-mémoire : https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
      - Meilleures pratiques pour prévenir les vulnérabilités d'injection SQL
  - **Path Traversal** : Attaque de traversée de répertoire
    - Article OWASP : https://owasp.org/www-community/attacks/Path_Traversal
    - Référence pour comprendre et prévenir les vulnérabilités de traversée de répertoire
  - **Cross-Site Scripting (XSS)** : Prévention des attaques XSS
    - Article OWASP : https://owasp.org/www-community/attacks/xss/
    - Référence pour comprendre et prévenir les vulnérabilités XSS
  - **Emplacement de ressource prévisible** : Vulnérabilité de sécurité due aux emplacements de ressources prévisibles
    - Projet WebAppSec : http://projects.webappsec.org/w/page/13246953/Predictable%20Resource%20Location
    - Référence pour comprendre les vulnérabilités d'emplacement de ressource prévisible
- **Attaques d'authentification**
  - **Attaque par force brute** : Attaques d'authentification par force brute
    - Article OWASP : https://owasp.org/www-community/attacks/Brute_force_attack
    - Référence pour comprendre et atténuer les attaques par force brute
  - **Credential Stuffing** : Prévention des attaques de credential stuffing
    - Aide-mémoire OWASP : https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.md
    - Meilleures pratiques pour prévenir les attaques de credential stuffing
- **Modèles d'attaque (CAPEC)**
  - **CAPEC-63** : Définition du modèle d'attaque
    - MITRE CAPEC : https://capec.mitre.org/data/definitions/63.html
    - Référence pour comprendre les modèles et méthodologies d'attaque
  - **CAPEC-66** : Définition du modèle d'attaque
    - MITRE CAPEC : https://capec.mitre.org/data/definitions/66.html
    - Référence pour comprendre les modèles et méthodologies d'attaque
- **Menaces de rançongiciels**
  - **Cybermalveillance.gouv.fr** : Sensibilisation et prévention des rançongiciels
    - Fiche réflexe : https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/rancongiciels-ransomwares
    - Référence pour comprendre et prévenir les attaques de rançongiciels
  - **Alerte ANSSI sur les rançongiciels** : Alertes sur les campagnes de rançongiciels
    - Alerte officielle : https://cyber.gouv.fr/actualites/alerte-campagne-de-rancongiciel
    - Référence pour rester informé des menaces actives de rançongiciels
  - **Rapport CERT-FR sur les rançongiciels** : Analyse technique des menaces de rançongiciels
    - Rapport technique : https://www.cert.ssi.gouv.fr/uploads/CERTFR-2020-CTI-001.pdf
    - Référence pour comprendre les vecteurs d'attaque et l'atténuation des rançongiciels
  - **No More Ransom** : Initiative pour aider les victimes de rançongiciels
    - Site web officiel : https://www.nomoreransom.org/fr/index.html
    - Référence pour les outils de décryptage de rançongiciels et le soutien aux victimes
- **Menaces de sécurité**
  - **Typosquatting** : Attaques basées sur les fautes de frappe de noms de domaine
    - Article Wikipedia : https://fr.wikipedia.org/wiki/Typosquattage
    - Référence pour comprendre et atténuer les attaques basées sur les noms de domaine
- Meilleures pratiques de sécurité pour les projets open source
- Lignes directrices sur la divulgation responsable des vulnérabilités

### Confidentialité et protection des données

- **Conformité RGPD (GDPR)** : Règlement général sur la protection des données
  - **Guide RGPD du développeur (CNIL)** : Guide de référence pour la conformité RGPD dans le développement
    - Dépôt : https://github.com/YohanGH/Guide-RGPD-du-developpeur
    - Site web officiel CNIL : https://cnil.fr/developpeur
    - Licence : GPLv3 et Licence Ouverte 2.0 (compatible avec CC-BY 4.0 FR)
    - Contient 18 fiches thématiques couvrant les meilleures pratiques de confidentialité et de protection des données
    - Utilisé comme référence pour les principes de privacy-by-design et les meilleures pratiques de protection des données
  - **Outil PIA CNIL** : Logiciel d'analyse d'impact sur la protection des données
    - Page officielle : https://www.cnil.fr/fr/outil-pia-telechargez-et-installez-le-logiciel-de-la-cnil
    - Outil open source pour réaliser des analyses d'impact sur la protection des données (DPIA/AIPD)
    - Disponible en 20 langues, facilite la conformité RGPD
  - **Cadre juridique CNIL** : Textes et règlements officiels CNIL
    - Legifrance : https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000033929210/
    - Site web officiel CNIL : https://cnil.fr/
  - **Lignes directrices EDPB** : Lignes directrices du Comité européen de la protection des données
    - Lignes directrices 4/2019 sur l'article 25 - Protection des données dès la conception et par défaut
      - URL : https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2019/guidelines-42019-article-25-data-protection_en
      - Référence pour la mise en œuvre des principes de protection des données dès la conception et par défaut
  - **Transfert de données hors UE** : Outils et conseils CNIL
    - Page officielle : https://www.cnil.fr/fr/les-outils-de-la-conformite/transferer-des-donnees-hors-de-lue
    - Conseils sur le transfert de données personnelles en dehors de l'Union européenne
  - **Exodus Privacy** : Plateforme d'analyse de la confidentialité pour les applications mobiles
    - Site web officiel : https://exodus-privacy.eu.org/fr/
    - Plateforme open source pour analyser la confidentialité dans les applications mobiles
    - Référence pour comprendre les pratiques de confidentialité et le suivi des applications mobiles
  - **Design System CNIL** : Lignes directrices de conception d'expérience utilisateur pour la confidentialité
    - Site web officiel : https://design.cnil.fr
    - **Exercice des droits** : Modèles UX pour les droits des personnes concernées
      - Concept de design : https://design.cnil.fr/concepts/exercice-des-droits/
      - Référence pour la mise en œuvre d'interfaces conviviales pour les droits des personnes concernées
    - **Information** : Modèles UX pour l'information sur la confidentialité
      - Concept de design : https://design.cnil.fr/concepts/information/
      - Référence pour concevoir des informations de confidentialité claires et accessibles
    - Référence pour les modèles d'expérience utilisateur de protection des données dès la conception

## Références légales et réglementaires

- **Lexology** : Analyses et perspectives juridiques
  - Article sur la protection des données : https://www.lexology.com/library/detail.aspx?g=453778d7-ccb7-424a-838f-d65155d55044
  - Référence pour les perspectives juridiques sur la protection des données et les règlements sur la confidentialité

## Inspiration et philosophie

### Principes de conception

- **Minimalisme** : Architecture minimale et essentielle
- **Modularité** : Système composé de modules autonomes et remplaçables
- **Sécurité** : Priorité à la sécurité et à la conformité
- **Élégance** : Code propre et maintenable

### Concepts clés

- **Vaisseaux** : Modules conçus comme des vaisseaux autonomes
- **Système orbital** : Architecture basée sur un système orbital
- **Core guidé par la loi** : Cœur guidé par des contrats et des règles

## Notes

Cette liste est non exhaustive et sera mise à jour au fur et à mesure du développement du projet. Les sources mentionnées ont servi de références pour la conception, l'implémentation et la documentation du système LexOrbital Core.
