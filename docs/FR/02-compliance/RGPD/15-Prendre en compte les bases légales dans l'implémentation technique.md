# Fiche n°15 — Prendre en compte les bases légales dans l'implémentation technique

> **Version LexOrbital — Vue opérationnelle RGPD by design**

**Format** : 100% tableaux — Bases légales intégrées dans l'architecture

**Objectif** : Intégrer les bases légales RGPD directement dans l'implémentation technique des modules LexOrbital pour garantir la conformité by design.

---

> **📘 Contexte RGPD**  
> Chaque traitement de données personnelles doit avoir une **base légale** claire. Cette fiche détaille comment LexOrbital intègre les bases légales dans son architecture technique.

---

## 🧩 1. Bases légales du RGPD : résumé + impact technique

| Base légale | Définition CNIL | Impacts techniques obligatoires dans LexOrbital |
|-------------|-----------------|------------------------------------------------|
| **Contrat** | Nécessaire à exécution ou préparation du contrat | Données "strictement nécessaires" uniquement ; Aucun consentement requis ; Vérifier minimisation ; Logique `contractRequiredFields` dans modules Auth / Paiement |
| **Consentement** | Acceptation libre, éclairée, univoque | Gestion via CMP FrontRing ; Preuve de consentement (`consentEvents` module Audit) ; Possibilité de retrait immédiat ; Blocage des modules concernés sans consentement |
| **Intérêt légitime** | Intérêt poursuivi non disproportionné | Vérifier balance bénéfices / risques ; Documenter l'intérêt dans manifest ; Implémenter droit d'opposition ; Modules doivent gérer `user.optOut` |
| **Obligation légale** | Imposée par la loi | Pas de suppression tant que loi impose conservation ; Durées légales → TTL forcé ; Logs soumis à obligations légales (ex : finance) |
| **Mission d'intérêt public** | Exécution d'une mission public | Modules réservés à administrations ; Interdiction d'utiliser intérêt légitime/consentement pour la même finalité |
| **Intérêts vitaux** | Urgence médicale / humanitaire | Rare ; Priorité sur autres droits ; Stockage sécurisé renforcé ; Modules spécifiques uniquement |

---

## 🧩 2. Bascules techniques obligatoires selon la base légale

| Base légale | Consentement nécessaire ? | Peut-on refuser ? | Doit-on tracer ? | Doit-on minimiser ? | Implémentation LexOrbital |
|-------------|:-----------------------:|:-----------------:|:----------------:|:-------------------:|---------------------------|
| **Contrat** | ❌ | ❌ si données strictement nécessaires | ✅ | ✅ strictement | Modules Auth/Account exigent données minimales ; contrôle schéma strict (zod/ts) |
| **Consentement** | ✅ | ✅ à tout moment | ✅ (preuve nécessaire) | ✅ | CMP FrontRing + Audit `consent.given` / `withdrawn` |
| **Intérêt légitime** | ❌ | ✅ droit opposition | ✅ | ✅ | BackRing filtre traitement si `user.optOut = true` |
| **Obligation légale** | ❌ | ❌ sauf cas exceptionnels | ✅ | Variable selon texte | TTL fixé par obligation ; interdiction suppression manuelle |
| **Intérêt public** | ❌ | ✅ partiellement | ✅ | ✅ | Module doit identifier missions ; logique read-only en limitation |
| **Intérêts vitaux** | ❌ | ❌ (urgence) | ✅ | ✅ | Modules spécialisés ; sécurité renforcée |

---

## 🧩 3. Droits des personnes selon la base légale (repris et adapté du tableau CNIL)

| Base légale | Accès | Rectification | Effacement | Limitation | Portabilité | Opposition (ou retrait) |
|-------------|:-----:|:-------------:|:----------:|:----------:|:-----------:|:------------------------:|
| **Consentement** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ retrait consentement |
| **Contrat** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Intérêt légitime** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Obligation légale** | ✅ | ✅ | ✅** | ✅ | ❌ | ❌ |
| **Intérêt public** | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Intérêts vitaux** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |

> **📘 Note**  
> ** Effacement uniquement dans cas spécifiques CNIL pour l'obligation légale.

---

## 🧩 4. Comment intégrer les bases légales dans les modules LexOrbital

| Élément | Exigence | Implémentation LexOrbital |
|---------|----------|---------------------------|
| **Déclaration base légale** | Obligatoire pour chaque finalité | Dans `rgpd-manifest.json` du module |
| **Documentation** | Doit être lisible et accessible | Docs vivantes → générées via Meta-Kernel |
| **Unique base légale par finalité** | Interdiction "d'empiler" les bases légales | Schéma manifest impose `oneOf` parmi 6 bases |
| **Finalités multiples** | Chaque finalité doit avoir sa base légale | JSON Schema multi-finalité |
| **Cas sensibles** | Nécessité d'un article 9 (données santé, etc.) | Modules refusés par défaut sauf flag spécifique |
| **Impact technique** | Interface et API doivent respecter base légale | Filtrage BackRing ; CMP pour consentement |

---

## 🧩 5. Schéma proposé pour `rgpd-manifest.json` (LexOrbital)

| Champ | Description | Exemple |
|-------|-------------|---------|
| **`purposes[]`** | Finalités déclarées | `"authentication"`, `"analytics"`, `"contract_delivery"` |
| **`legalBasis[purpose]`** | Base légale unique pour la finalité | `"contract"`, `"consent"`, `"legitimate_interest"` |
| **`legitimateInterestJustification`** | (si applicable) justification claire | `"fraud prevention"` |
| **`requiresConsent`** | Booléen auto-calculé | `true` si `legalBasis = consent` |
| **`rightsMatrix`** | Généré automatiquement | voir tableau CNIL ci-dessus |
| **`retention`** | Dépend aussi de la base légale | durée conforme à [fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) |

> **💡 Exemple de manifest**  
> ```json
> {
>   "purposes": ["authentication", "analytics"],
>   "legalBasis": {
>     "authentication": "contract",
>     "analytics": "legitimate_interest"
>   },
>   "legitimateInterestJustification": {
>     "analytics": "fraud prevention"
>   },
>   "requiresConsent": {
>     "authentication": false,
>     "analytics": false
>   }
> }
> ```

---

## 🧩 6. Scénarios LexOrbital concrets

### 6.1 Authentification (Module Auth)

| Finalité | Base légale | Justification | Impact technique |
|----------|-------------|---------------|------------------|
| **Création de compte** | Contrat | Nécessaire au service | Stocker email, hash, TTL compte |
| **Connexion / sessions** | Contrat | Préparer/exécuter contrat | Cookie sess. exempté |
| **Journalisation sécurité** | Intérêt légitime | Sécurité du système | TTL 6-12 mois ([fiche 14](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md)) |

### 6.2 Analytics exempté (Module Analytics)

| Finalité | Base légale | Justification | Impact technique |
|----------|-------------|---------------|------------------|
| **Mesure d'audience** | Intérêt légitime + exemption art. 82 | Non intrusif | Anonymisation + TTL 25 mois |
| **Personnalisation contenu** | Consentement obligatoire | Intrusif | CMP + opt-in |

### 6.3 Notifications / Emails (Module Mailer)

| Finalité | Base légale | Impact |
|----------|-------------|--------|
| **Email transactionnel** | Contrat | Pas de consentement requis |
| **Newsletter** | Consentement | Gestion unsubscribe obligatoire |

### 6.4 Audit (Module Audit)

| Finalité | Base légale | Impact |
|----------|-------------|--------|
| **Sécurité / preuve** | Obligation légale ou intérêt légitime | Conservation 6–24 mois |

### 6.5 RBAC / Permissions

| Finalité | Base légale | Impact |
|----------|-------------|--------|
| **Gestion permissions** | Contrat (service fourni) | Logs sécurité → intérêt légitime |

---

## 🧩 7. Points d'attention techniques (RGPD-by-design)

| Risque | Base légale concernée | Mesures LexOrbital |
|--------|------------------------|-------------------|
| **Mauvaise base légale choisie** | Toutes | Validation CI via `validate-manifests` |
| **Finalité mal définie** | Consentement, intérêt légitime | Filtrage des finalités via schéma strict |
| **Preuve de consentement** | Consentement | Audit `event.type="consent.given"` |
| **Dérive fonctionnelle** | Intérêt légitime | Obligatoire : justification + test d'opposition |
| **Durées incorrectes** | Obligation légale | TTL métadonnées fixées dans module |

---

## 🧩 8. Intégration dans CI (automatisée)

| Contrôle | Description | CI LexOrbital |
|----------|-------------|---------------|
| **Validation base légale** | Vérifie que chaque finalité a sa base | `validate-legal-basis.ts` |
| **Détection d'usage illégal** | Profilage sans consentement, etc. | `lint-rgpd-rules` |
| **Vérification droits associés** | Compare avec matrice CNIL | `rgpd-rights-checker` |
| **Documentation générée** | Pages publiques / internes | Génération Markdown via Meta-Kernel |

---

## 🧩 9. Modèle d'analyse interne (Meta-Kernel)

| Question | Objet | Valeur attendue |
|----------|-------|-----------------|
| **Le traitement a-t-il une finalité unique ?** | Minimisation | ✅ Oui |
| **La base légale choisie est-elle correcte ?** | Conformité | ✅ Oui |
| **A-t-elle des implications techniques ?** | CMP, TTL, effacement | ✅ OUI documentées |
| **Les droits associés sont-ils implémentés ?** | UI + API | ✅ Oui |
| **La documentation est-elle mise à jour ?** | Docs vivantes | ✅ Oui |
| **Le module est-il audit-compatible ?** | Logging | ✅ Oui |

> **✅ Checklist de conformité**  
> Chaque module doit répondre **Oui** à toutes ces questions avant d'être intégré dans LexOrbital.

---

## 📋 Checklist de conformité bases légales

Avant de créer un module, vérifier :

- [ ] Chaque finalité a une base légale déclarée dans `rgpd-manifest.json`
- [ ] La base légale est unique par finalité (pas d'empilement)
- [ ] Les droits associés sont implémentés (voir tableau section 3)
- [ ] Le consentement est géré via CMP si nécessaire
- [ ] Le droit d'opposition est implémenté pour intérêt légitime
- [ ] Les TTL sont conformes à la base légale
- [ ] La documentation est générée automatiquement
- [ ] Les tests de conformité passent en CI

---

## 📚 Ressources complémentaires

- [CNIL — Bases légales](https://www.cnil.fr/fr/les-bases-legales)
- [CNIL — Guide du développeur](https://www.cnil.fr/developpeur)
- [Exercice des droits](./13-Préparer%20l'exercice%20des%20droits%20des%20personnes.md) — Droits selon base légale
- [Consentement](./16_Consentement.md) — Gestion du consentement
- [Durée de conservation](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md) — TTL selon base légale

---

<div align="center">

**[⬅️ Précédent](./14-Gérer%20la%20durée%20de%20conservation%20des%20données.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./16-Analyser%20les%20traceurs.md)**

</div>

