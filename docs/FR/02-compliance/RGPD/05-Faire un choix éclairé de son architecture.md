# FICHE N°5 — FAIRE UN CHOIX ÉCLAIRÉ DE SON ARCHITECTURE

**Architecture orbitale RGPD-by-design · Meta-Kernel · Anneaux · Modules**

> 📘 **Contexte RGPD**  
> Le choix de l'architecture est fondamental pour garantir la conformité RGPD dès la conception. LexOrbital intègre les principes RGPD directement dans son architecture orbitale, avec un Meta-Kernel normatif, des anneaux de connexion sécurisés et des modules déclaratifs.

---

## 🧩 1. Parcours des données dans LexOrbital (vision orbitale RGPD)

| Élément | Description dans la Fiche CNIL | Adaptation LexOrbital (Meta-Kernel / Anneaux / Modules) |
|---------|-------------------------------|----------------------------------------------------------|
| **Identification des données** | Identifier les données personnelles collectées | Le `rgpd-manifest.json` de chaque module déclare catégories, finalités, conservation. (cf. Manifests orbitaux) |
| **Schéma des flux** | Représenter et décrire les flux de données | Diagrammes vivants générés à partir des manifests (ZK – Documentation vivante). Le Meta-Kernel impose la structure. |
| **Stockage local / terminal** | Sécurité + suppression immédiate possible par l'utilisateur | FrontRing doit prévoir des mécanismes de purge locale (`localStorage`, caches). Meta-Kernel : helpers `clearLocalData`. |
| **Réseaux contrôlés / internes** | Priorité = sécurité réseau | BackRing : middleware de contrôle (JWT, audit, IP, sessions). Modules = appels internes standards (monolithic-first). |
| **Transit vers un service externe** | Choix entre hébergement local vs prestataire | LexOrbitalInfra déclare les environnements (`docker-compose`). RGPD Manifest → indique localisation + transferts. |
| **Analyse d'impact / registre** | Conseillé selon sensibilité | Le `rgpd-manifest.json` sert à générer automatiquement une fiche de traitement dans la documentation. |

> 💡 **Standard LexOrbital**  
> Le parcours des données est entièrement déclaratif via les manifests RGPD. Le Meta-Kernel génère automatiquement les diagrammes de flux et les fiches de traitement.

---

## 🧩 2. Cycle de vie des données personnelles (LexOrbital + CNIL)

| Étape | Obligations CNIL | Implémentation LexOrbital |
|-------|------------------|--------------------------|
| **Collecte** | Minimisation + base légale | Patterns RGPD intégrés (Meta-Kernel) : type `ConsentRecord`, attributs minimisés. |
| **Stockage** | Sécurité + localisation claire | Infra Docker → volumes chiffrés. Modules déclarent destinataires + localisation dans `rgpd-manifest.json`. |
| **Usage / Traitement** | Transparence + finalités | Modules types (auth, audit…) exposent finalités dans leur manifest. Console orbitale affiche les finalités. |
| **Journalisation** | Traçabilité des opérations sensibles | Module `lexorbital-module-audit` obligatoire → Audit Trail (who/what/when/where/why). |
| **Conservation / Suppression** | Durées limitées + droit à l'oubli | Pattern TTL (helpers Meta-Kernel `withTTL`, `cleanup`). Modules doivent exposer une endpoint de purge. |
| **Export** | Accès & portabilité | Module futur "privacy-dashboard" : API d'export standard + infos manifest. |
| **Suppression** | Droit à l'effacement | Chaque module doit implémenter le handler `deleteData(subjectId)` défini par le contrat Meta-Kernel. |

> ⚠️ **Obligation RGPD**  
> Chaque étape du cycle de vie des données doit être traçable et conforme. LexOrbital intègre ces obligations directement dans son architecture via le Meta-Kernel et les contrats de modules.

---

## 🧩 3. Choix d'hébergement (selon maturité et architecture LexOrbital)

| Critère de choix | Directives CNIL | Recommandation LexOrbital |
|------------------|-----------------|--------------------------|
| **Niveau de sécurité maîtrisé** | Choisir selon compétences internes | MVP : Docker local + serveur personnel OVH / Scaleway. Modules autonomes = conteneurs isolés. |
| **Localisation des données** | Connaître la zone géographique | Le `rgpd-manifest.json` doit déclarer `dataLocation` pour chaque module. Affiché dans console orbitale. |
| **Transferts hors UE** | Encadrement strict | Modules interdits de faire appel à un service externe non déclaré dans manifest. |
| **Données sensibles / santé** | Prestataire certifié | Si module "santé", LexOrbital impose un tag `requiresHDS: true` dans le manifest. |
| **Réversibilité** | Export dans formats standard | Modules fournissent endpoint `/export` + format JSON standardisé. |
| **Sécurité technique** | Chiffrement, mises à jour, habilitations | Géré par LexOrbitalInfra + Meta-Kernel : TLS obligatoire, secrets centralisés, CI obligatoire. |

> 💡 **Standard LexOrbital**  
> Le choix d'hébergement est déclaré dans les manifests et validé automatiquement par le Meta-Kernel. La localisation des données est transparente et contrôlable.

---

## 🧩 4. Analyse par niveau de l'architecture orbitale (LexOrbital)

| Niveau | Responsabilité RGPD | Mise en œuvre |
|--------|-------------------|---------------|
| **Meta-Kernel (cœur normatif)** | Lois : minimisation, TTL, audit, consentement, encryption | Types utilitaires (`AuditEvent`, `ConsentRecord`), helpers, conventions API. |
| **Anneaux (FrontRing / BackRing)** | Filtrer / valider les données, journalisation, sécurité | Middlewares : audit, validation schémas RGPD-friendly, chiffrement en transit. |
| **Modules-vaisseaux** | Traiter les données selon finalité déclarée | `module.json` + `rgpd-manifest.json` → source de vérité. Tests d'intégration RGPD. |
| **Infra** | Localisation, réseau, chiffrement, durées de rétention | Docker + volumes chiffrés. Orchestration (LexOrbitalStack). |
| **Console de contrôle** | Transparence + information utilisateur | Vue Conformité : affichage manifest + alerts TTL. |

> 💡 **Architecture LexOrbital**  
> Chaque niveau de l'architecture orbitale a des responsabilités RGPD clairement définies. Le Meta-Kernel impose les règles, les anneaux les appliquent, et les modules les déclarent.

---

## 🧩 5. Check-list CNIL adaptée à une Station LexOrbital

| Question CNIL | Réponse dans LexOrbital |
|---------------|-------------------------|
| **Quelles données collectez-vous ?** | Lisibles dans `rgpd-manifest.json` de chaque module. |
| **Où transitent-elles ?** | Diagrammes générés automatiquement (ZK – Documentation vivante). |
| **Où sont-elles stockées ?** | Déclaré dans `module.json` + infra Docker. |
| **Qui y accède ?** | Module RBAC + logs dans `lexorbital-module-audit`. |
| **Pendant combien de temps ?** | Durées définies dans manifest + pattern TTL appliqué automatiquement. |
| **Comment sont-elles supprimées ?** | API standard `DELETE /data/:subjectId` imposée par Meta-Kernel. |
| **Quels prestataires externes ?** | Déclarés dans manifest + vérification CI via `validate-manifests.ts`. |
| **Quelle base légale ?** | Champs `legalBasis[]` dans `rgpd-manifest.json`. |
| **Comment le droit d'accès est garanti ?** | Console → Vue Conformité + Endpoint `exportData(subjectId)`. |

> ✅ **Synthèse**  
> Toutes les questions de la check-list CNIL trouvent une réponse automatique dans LexOrbital via les manifests déclaratifs et la console orbitale.

---

## 🧩 6. Risques CNIL et contre-mesures intégrées dans LexOrbital

| Risque | Description | Contre-mesures LexOrbital |
|--------|-------------|---------------------------|
| **Collecte excessive** | Trop de champs collectés | Minimisation imposée par schémas de l'anneau Back (validation). |
| **Durées de conservation non maîtrisées** | Absence de TTL | Pattern TTL global + jobs cleanup. |
| **Manque de traçabilité** | Pas de journalisation RGPD | Module Audit obligatoire. |
| **Transferts non encadrés** | Appels externes sans contrôle | Chaque appel externe doit être listé dans manifest. CI bloque si absent. |
| **Prestataire non conforme** | Cloud non adapté | Tag `requiresHDS` pour modules sensibles + matrice de conformité visible dans console. |
| **Suppression impossible** | Données dispersées | Contrat d'effacement standard : chaque module doit exposer un handler de suppression. |
| **Manque de transparence** | Utilisateur non informé | Console orbitale → Vue Conformité lisible automatiquement depuis manifests. |

> ⚠️ **Obligation**  
> Chaque risque identifié par la CNIL est adressé par des contre-mesures intégrées dans l'architecture LexOrbital, garantissant la conformité dès la conception.

---

## 🧩 7. Synthèse opérationnelle pour la documentation LexOrbital

| Élément à intégrer | Objet | Où l'intégrer dans LexOrbital |
|-------------------|------|------------------------------|
| **Schéma global des flux** | Parcours des données (CNIL) | `docs/diagrammes` générés (ZK – Documentation vivante). |
| **Tableau de traitements** | Registre des activités | Généré à partir des `rgpd-manifest.json`. |
| **Matrice d'hébergement** | Choix cloud / local / Docker | Dans `lexorbital-infra` + manifest. |
| **Cycle de vie RGPD** | Conservation / purge / audit | Dans Meta-Kernel + modules types. |
| **Tableau de conformité** | Base légale / finalité / durée | Console orbitale → Vue Conformité. |
| **Check-list de décision** | "Dois-je héberger ou déléguer ?" | Section docs "RGPD by design – patterns techniques". |

> 💡 **Standard LexOrbital**  
> La documentation RGPD est générée automatiquement depuis les manifests et les diagrammes sont maintenus à jour via la documentation vivante (ZK).

---

## 📚 Ressources complémentaires

- [CNIL - Choisir son architecture](https://www.cnil.fr/fr/choisir-son-architecture)
- [CNIL - Parcours des données](https://www.cnil.fr/fr/parcours-des-donnees)
- [CNIL - Cycle de vie des données](https://www.cnil.fr/fr/cycle-de-vie-des-donnees)
- [Fiche 1 - Identifier les données personnelles](./01-Identifier%20les%20données%20personnelles.md)
- [Fiche 2 - Préparer son développement](./02-Préparer%20son%20developpement.md)
- [Fiche 14 - Gérer la durée de conservation des données](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md)
- [Fiche 15 - Prendre en compte les bases légales](./15-Prendre%20en%20compte%20les%20bases%20légales%20dans%20l'implémentation%20technique.md)

---

**Navigation** : [← Fiche 4](./04-Gérer%20son%20code%20source.md) | [Sommaire](./00_SOMMAIRE.md) | [Fiche 6 →](./06-Choisir%20un%20hébergeur.md)
