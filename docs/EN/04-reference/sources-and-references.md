# Sources and References

This document lists the sources consulted and references used for the creation and development of the LexOrbital Core repository as a whole.

## Architecture and Design

### Architectural Patterns

- **Modular Architecture Patterns** : Inspiration for the modular system design
- **Microservices Architecture** : Principles applied to module orchestration
- **Plugin Architecture** : Design pattern used for module integration

### Orbital Metaphor

- Concept of "Meta-Kernel" and orbital rings inspired by distributed systems
- BackRing/FrontRing separation based on separation of concerns patterns

## Technologies and Frameworks

### Backend (BackRing)

- **Express.js** : Node.js framework for REST API
  - Official documentation : https://expressjs.com/
- **TypeScript** : Programming language
  - Official documentation : https://www.typescriptlang.org/
- **Node.js** : JavaScript runtime
  - Official documentation : https://nodejs.org/

### Frontend (FrontRing)

- **React** : UI library
  - Official documentation : https://react.dev/
- **Vite** : Build tool and dev server
  - Official documentation : https://vitejs.dev/
- **TypeScript** : Programming language

### Infrastructure

- **Docker** : Containerization
  - Official documentation : https://docs.docker.com/
- **Docker Compose** : Container orchestration
  - Official documentation : https://docs.docker.com/compose/
- **Ansible** : IT automation and configuration management
  - Repository : https://github.com/ansible/ansible
  - Official documentation : https://docs.ansible.com/
  - Used for infrastructure automation and deployment

## Development Tools

### Package Management

- **pnpm** : Package manager
  - Official documentation : https://pnpm.io/

### Linting and Formatting

- **ESLint** : JavaScript/TypeScript linter
  - Official documentation : https://eslint.org/
- **Commitlint** : Commit message validation
  - Official documentation : https://commitlint.js.org/

### Code Analysis

- **dependency-cruiser** : Validate and visualize dependencies
  - Repository : https://github.com/sverweij/dependency-cruiser
  - Used for analyzing and managing project dependencies

### System Tools

- **otool** : Object file displaying tool (macOS/Unix)
  - Manual page : https://www.unix.com/man-page/osx/1/otool/
  - Used for binary analysis and inspection

### Git and Version Control

- **Git** : Distributed version control system
  - Official documentation : https://git-scm.com
- **Git Subtree** : Module integration
  - Documentation : https://git-scm.com/book/en/v2/Git-Tools-Subtree-Merging
- **git-crypt** : Transparent file encryption in Git
  - Repository : https://github.com/AGWA/git-crypt
  - Used for securing sensitive files in version control
- **Git Flow** : A successful Git branching model
  - Article : https://nvie.com/posts/a-successful-git-branching-model/
  - Reference for branching strategies and workflow

## Standards and Conventions

### Conventional Commits

- Specification : https://www.conventionalcommits.org/
- Used for commit message standardization

### Documentation

- **Markdown** : Documentation format
  - Specification : https://daringfireball.net/projects/markdown/
- **Pandoc** : Universal document converter
  - Official documentation : https://pandoc.org/
  - Installation guide : https://pandoc.org/installing.html
  - Docker images : https://github.com/pandoc/dockerfiles
  - GitHub Actions examples : https://github.com/pandoc/pandoc-action-example
  - Used for generating documentation in multiple formats (PDF, HTML, EPUB)

### Coding Standards and Guidelines

- **Awesome Guidelines** : Curated list of coding style conventions and standards
  - Repository : https://github.com/Kristories/awesome-guidelines
  - Comprehensive collection of style guides and best practices for various programming languages and frameworks

## Licenses and Compliance

### Open Source Licenses

- **MIT License** : Recommended license for modules
  - Full text : https://opensource.org/licenses/MIT

### Security

- **OWASP** : Open Web Application Security Project
  - Official website : https://owasp.org
  - Reference for web application security best practices and standards
- **CERT-FR** : French Computer Emergency Response Team
  - Security alerts : https://www.cert.ssi.gouv.fr/alerte/
  - Security advisories : https://www.cert.ssi.gouv.fr/avis/
  - Security news : https://www.cert.ssi.gouv.fr/actualite/
  - Used for monitoring security threats and vulnerabilities
- **ANSSI** : French National Agency for the Security of Information Systems
  - **System Compartmentalization Guide** : Best practices for system isolation
    - PDF : https://cyber.gouv.fr/sites/default/files/2017/12/guide_cloisonnement_systeme_anssi_pg_040_v1.pdf
    - Reference for secure system architecture and isolation
  - **Cryptography Selection Guide** : Guidelines for choosing cryptographic solutions
    - PDF : https://cyber.gouv.fr/sites/default/files/2021/03/anssi-guide-selection_crypto-1.0.pdf
    - Reference for selecting appropriate cryptographic algorithms and implementations
  - **Certified Solutions** : Directory of certified security solutions
    - Official page : https://cyber.gouv.fr/decouvrir-les-solutions-certifiees
    - Reference for selecting certified security products and services
  - **Multifactor Authentication and Password Recommendations** : Guidelines on MFA and password security
    - Official publication : https://cyber.gouv.fr/publications/recommandations-relatives-lauthentification-multifacteur-et-aux-mots-de-passe
    - Reference for implementing strong authentication mechanisms
- **Password Security**
  - **CNIL Password Recommendations** : Best practices for password management
    - Official page : https://www.cnil.fr/fr/mots-de-passe-recommandations-pour-maitriser-sa-securite
    - Updated 2022 recommendations on password policies and authentication
    - Reference for implementing secure password policies
  - **bcrypt** : Password hashing library for JavaScript
    - Official website : https://www.bcrypt.io/languages/javascript
    - Reference for secure password hashing implementation
  - **KeePass** : Open source password manager
    - Official website : https://keepass.info
    - Reference for password management best practices
- **Logging and Audit**
  - **CNIL Logging Recommendations** : Guidelines on logging measures
    - Official page : https://www.cnil.fr/fr/la-cnil-publie-une-recommandation-relative-aux-mesures-de-journalisation
    - Reference for implementing compliant logging and audit trails
- **Web Application Attacks**
  - **OWASP Top 10** : Top 10 most critical web application security risks
    - **A03:2021 - Injection** : Injection attack prevention
      - Official page : https://owasp.org/Top10/A03_2021-Injection/
      - Reference for understanding and preventing injection attacks
    - **SQL Injection Prevention** : Cheat sheet for SQL injection prevention
      - Cheat sheet : https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
      - Best practices for preventing SQL injection vulnerabilities
  - **Path Traversal** : Directory traversal attack
    - OWASP article : https://owasp.org/www-community/attacks/Path_Traversal
    - Reference for understanding and preventing directory traversal vulnerabilities
  - **Cross-Site Scripting (XSS)** : XSS attack prevention
    - OWASP article : https://owasp.org/www-community/attacks/xss/
    - Reference for understanding and preventing XSS vulnerabilities
  - **Predictable Resource Location** : Security vulnerability from predictable resource locations
    - WebAppSec project : http://projects.webappsec.org/w/page/13246953/Predictable%20Resource%20Location
    - Reference for understanding predictable resource location vulnerabilities
- **Authentication Attacks**
  - **Brute Force Attack** : Brute force authentication attacks
    - OWASP article : https://owasp.org/www-community/attacks/Brute_force_attack
    - Reference for understanding and mitigating brute force attacks
  - **Credential Stuffing** : Prevention of credential stuffing attacks
    - OWASP cheat sheet : https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.md
    - Best practices for preventing credential stuffing attacks
- **Attack Patterns (CAPEC)**
  - **CAPEC-63** : Attack pattern definition
    - MITRE CAPEC : https://capec.mitre.org/data/definitions/63.html
    - Reference for understanding attack patterns and methodologies
  - **CAPEC-66** : Attack pattern definition
    - MITRE CAPEC : https://capec.mitre.org/data/definitions/66.html
    - Reference for understanding attack patterns and methodologies
- **Ransomware Threats**
  - **Cybermalveillance.gouv.fr** : Ransomware awareness and prevention
    - Reflex sheet : https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/rancongiciels-ransomwares
    - Reference for understanding and preventing ransomware attacks
  - **ANSSI Ransomware Alert** : Ransomware campaign alerts
    - Official alert : https://cyber.gouv.fr/actualites/alerte-campagne-de-rancongiciel
    - Reference for staying informed about active ransomware threats
  - **CERT-FR Ransomware Report** : Technical analysis of ransomware threats
    - Technical report : https://www.cert.ssi.gouv.fr/uploads/CERTFR-2020-CTI-001.pdf
    - Reference for understanding ransomware attack vectors and mitigation
  - **No More Ransom** : Initiative to help ransomware victims
    - Official website : https://www.nomoreransom.org/fr/index.html
    - Reference for ransomware decryption tools and victim support
- **Security Threats**
  - **Typosquatting** : Domain name typo-based attacks
    - Wikipedia article : https://fr.wikipedia.org/wiki/Typosquattage
    - Reference for understanding and mitigating domain name-based attacks
- Security best practices for open source projects
- Responsible vulnerability disclosure guidelines

### Privacy and Data Protection

- **RGPD (GDPR) Compliance** : General Data Protection Regulation
  - **Guide RGPD du développeur (CNIL)** : Reference guide for GDPR compliance in development
    - Repository : https://github.com/YohanGH/Guide-RGPD-du-developpeur
    - Official CNIL website : https://cnil.fr/developpeur
    - License : GPLv3 and Licence Ouverte 2.0 (compatible with CC-BY 4.0 FR)
    - Contains 18 thematic sheets covering privacy and data protection best practices
    - Used as reference for privacy-by-design principles and data protection best practices
  - **CNIL PIA Tool** : Privacy Impact Assessment software
    - Official page : https://www.cnil.fr/fr/outil-pia-telechargez-et-installez-le-logiciel-de-la-cnil
    - Open source tool for conducting Data Protection Impact Assessments (DPIA/AIPD)
    - Available in 20 languages, facilitates GDPR compliance
  - **CNIL Legal Framework** : Official CNIL texts and regulations
    - Legifrance : https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000033929210/
    - Official CNIL website : https://cnil.fr/
  - **EDPB Guidelines** : European Data Protection Board guidelines
    - Guidelines 4/2019 on Article 25 - Data Protection by Design and by Default
      - URL : https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2019/guidelines-42019-article-25-data-protection_en
      - Reference for implementing privacy-by-design and privacy-by-default principles
  - **Data Transfer Outside EU** : CNIL tools and guidance
    - Official page : https://www.cnil.fr/fr/les-outils-de-la-conformite/transferer-des-donnees-hors-de-lue
    - Guidance on transferring personal data outside the European Union
  - **Exodus Privacy** : Privacy analysis platform for mobile applications
    - Official website : https://exodus-privacy.eu.org/fr/
    - Open source platform for analyzing privacy in mobile apps
    - Reference for understanding mobile app privacy practices and tracking
  - **CNIL Design System** : User experience design guidelines for privacy
    - Official website : https://design.cnil.fr
    - **Exercise of Rights** : UX patterns for data subject rights
      - Design concept : https://design.cnil.fr/concepts/exercice-des-droits/
      - Reference for implementing user-friendly data subject rights interfaces
    - **Information** : UX patterns for privacy information
      - Design concept : https://design.cnil.fr/concepts/information/
      - Reference for designing clear and accessible privacy information
    - Reference for privacy-by-design user experience patterns

## Legal and Regulatory References

- **Lexology** : Legal analysis and insights
  - Article on data protection : https://www.lexology.com/library/detail.aspx?g=453778d7-ccb7-424a-838f-d65155d55044
  - Reference for legal perspectives on data protection and privacy regulations

## Inspiration and Philosophy

### Design Principles

- **Minimalism** : Minimal and essential architecture
- **Modularity** : System composed of autonomous and replaceable modules
- **Security** : Priority on security and compliance
- **Elegance** : Clean and maintainable code

### Key Concepts

- **Vessels** : Modules designed as autonomous vessels
- **Orbital System** : Architecture based on an orbital system
- **Law-Driven Core** : Core guided by contracts and rules

## Notes

This list is non-exhaustive and will be updated as the project develops. The sources mentioned have served as references for the design, implementation, and documentation of the LexOrbital Core system.
