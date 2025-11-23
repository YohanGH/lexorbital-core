# Fiche n°16 — Analyser les pratiques en matière de traceurs

> **Version LexOrbital — Gestion des cookies et traceurs conforme CNIL**

**Format** : 100% tableaux — Gestion par Meta-Kernel, Rings, Modules, CMP

**Objectif** : Mettre en place une gestion complète et conforme des traceurs (cookies, localStorage, fingerprinting) dans LexOrbital avec un CMP (Consent Management Platform) intégré.

---

> **📘 Contexte CNIL**  
> Les traceurs (cookies, localStorage, etc.) sont soumis à la directive ePrivacy et au RGPD. Cette fiche détaille l'implémentation LexOrbital pour une gestion conforme des traceurs.

---

## 🧩 1. Types de traceurs concernés (CNIL → LexOrbital)

| Type de traceur (CNIL) | Exemples | Exige consentement ? | Gestion LexOrbital |
|------------------------|----------|:--------------------:|-------------------|
| **Cookies (HTTP)** | session, analytics, publicité | Oui sauf exemptions | Gérés par FrontRing ; classés par finalités dans `traceurs.json` |
| **Local Storage** | préférences UI, cache | Oui (sauf strictement nécessaire) | Namespace isolé : `lexorbital:*` + audit usage |
| **Session Storage** | données éphémères | Non si nécessaires | Nettoyage automatique logout |
| **Fingerprinting** | hash device, canvas, user agent | Toujours soumis à consentement | Interdit dans LexOrbital sauf module explicitement autorisé |
| **Identifiants OS** | IDFA, IDFV, Android ID | Oui | Modules mobiles doivent passer via CMP |
| **Identifiants navigateur** | FLoC, Topics, cohortes | Oui | Désactivation explicite dans FrontRing |
| **Traceurs tiers** | Pixels, tags marketing | Oui | Bloqués par défaut (Tag Manager désactivé tant que consent ≠ "yes") |
| **Mesure d'audience exemptée** | Analytics anonymisés | Possibilité d'exemption | Module analytics `exempted-mode` conforme CNIL |

---

## 🧩 2. Finalités qui nécessitent un consentement préalable

> **📘 Rappel CNIL** : Publicité personnalisée, géolocalisation, personnalisation contenu, etc.

| Finalité | Consentement requis ? | Exemples | Décision LexOrbital |
|----------|:---------------------:|----------|---------------------|
| **Publicité personnalisée** | ✅ Oui | Google Ads, Facebook Pixel | Désactivée par défaut ; dépend du CMP |
| **Mesure publicitaire** (non ciblée) | ✅ Oui | CMP analytics marketing | Bloquée tant que consentement ≠ "yes" |
| **Publicité géolocalisée** | ✅ Oui | Localisation précise | Module Geo nécessite CMP + légale renforcée |
| **Personnalisation du contenu** | ✅ Oui | Recommandations produits | Interdit sans consentement explicite |
| **Partage réseaux sociaux** | ✅ Oui | Bouton Facebook/Twitter | Chargement scripts tiers bloqué sans consent |
| **Mesure d'audience exemptée** | ❌ Non (sous conditions CNIL) | Analytics anonymes | Module déjà conforme ([Fiche 17](./17-Mesurer%20la%20fréquentation.md)) |

---

## 🧩 3. Traceurs exemptés (CNIL) et implémentation LexOrbital

| Traceur exempté | Exempt ? | Conditions CNIL | Implémentation LexOrbital |
|-----------------|:--------:|-----------------|---------------------------|
| **Cookie authentification** | ✅ Oui | Nécessaire au service | Module Auth – cookie `sessionId` 1st-party |
| **Cookie panier** | ✅ Oui | Strictement nécessaire | Modules e-commerce potentiels |
| **Limitation accès contenu payant** | ✅ Oui | Nécessaire service | Module paywall éventuel |
| **Analytics exemptés** | ✅ Oui (si conditions remplies) | Conformité CNIL (page 3–8 auto-évaluation) | Module `lexorbital-analytics` en mode exempté |

---

## 🧩 4. Étape 1 : Lister les traceurs utilisés

| Opération | Description CNIL | Implémentation LexOrbital |
|-----------|------------------|---------------------------|
| **Inventaire** | Tous traceurs, toutes technologies | Commande Meta-Kernel : `scan-traceurs` |
| **Classification** | Classer par catégories CNIL | Fichier généré `traceurs-report.json` |
| **Documentation** | Identifier origines (1st-party / 3rd-party) | Table `traceurs_source` dans docs vivantes |

---

## 🧩 5. Étape 2 : Lister les tiers

| Exigence CNIL | Implantation LexOrbital |
|---------------|------------------------|
| **Identifier tous les tiers** déposant des traceurs | Dashboard FrontRing : section "Traceurs & Tiers" |
| **Publier la liste dans CMP** | CMP intégré au FrontRing |
| **Documenter finalité + durée + base légale** | Fichier `third-parties.json` généré automatiquement |

---

## 🧩 6. Étape 3 : Blocage des scripts avant consentement

> **⚠️ Obligation CNIL**  
> Aucun script déposant des traceurs ne doit s'exécuter avant le consentement.

| Exigence CNIL | Implémentation LexOrbital |
|---------------|---------------------------|
| **Bloquer scripts dépositaires** | Loader CMP dans `<head>` avant tout script |
| **Empêcher lecture/écriture avant consentement** | Intercepteur `cookie.set` et `localStorage.setItem` tant que `consent=false` |
| **Tag Manager** | Mode "no-consent" + règles d'activation par finalité |
| **Tests** | Script CI : `test-no-consent.js` (vérifie aucun cookie marketing) |

---

## 🧩 7. Étape 4 : Interface de collecte du consentement (CMP)

| Élément | Exigence CNIL | Implémentation LexOrbital |
|---------|---------------|---------------------------|
| **Liste des finalités** | Doit apparaître au 1er niveau | CMP LexOrbital – section "Finalités" |
| **Liste des tiers** | Accessible dès le 1er niveau | CMP affiche `thirdParties[]` |
| **Acceptation ou refus aussi simple** | 2 boutons équivalents | Boutons "Tout accepter" / "Tout refuser" |
| **Second niveau** | Finalités détaillées | Cases à cocher par finalité |
| **Explications claires** | Langage simple | Texte généré via `cmp-descriptions.json` |
| **Design conforme CNIL** | UX accessible | Modèles inspirés de [design.cnil.fr](https://design.cnil.fr) |

---

## 🧩 8. Étape 5 : Retrait du consentement

> **📘 Obligation CNIL**  
> Le retrait du consentement doit être aussi simple que son acceptation.

| Exigence CNIL | Implémentation LexOrbital |
|---------------|---------------------------|
| **Icône/lien présent sur toutes les pages** | Icône cookie fixe dans footer du FrontRing |
| **Retrait aussi simple que l'acceptation** | Même interface CMP affichée |
| **Effet immédiat** | Scripts tiers désactivés + cookies supprimés |
| **Journalisation** | Audit : `event.type = "consent_revoked"` |

---

## 🧩 9. Étape 6 : Tester et documenter régulièrement

| Exigence CNIL | Implémentation LexOrbital |
|---------------|---------------------------|
| **Vérification régulière** | Script `scan-traceurs` en CI |
| **Aucune pose cookie hors consentement** | Tests automatisés + audit visuel |
| **Documentation** | Rapport généré : `traceurs_compliance_report.md` |
| **Correction** | Blocage automatique si traceur non déclaré |

---

## 🧩 10. Politique interne LexOrbital pour traceurs (Meta-Kernel)

| Règle | Description | Application |
|-------|-------------|-------------|
| **Interdiction cross-domain** | Aucun identifiant unique commun | Module Analytics conforme CNIL |
| **Cookies 1st-party uniquement** | Pas de cookies tiers sauf CMP | Désactivation auto |
| **Namespace LexOrbital dédié** | `lexo:*` | Rend inventaire simple |
| **Désactivation fingerprinting** | Interdit par défaut | Seuls modules mobiles autorisés avec consent |
| **Séparation finalités** | Un traceur = une finalité | Déclaré dans `traceurs.json` |
| **Durées stockées** | Cookie lifetime documentée | CMP affiche durée exacte |

---

## 🧩 11. Finalités utilisées dans LexOrbital (présentes / futures)

| Finalité | Consentement ? | Modules concernés |
|----------|:--------------:|------------------|
| **Authentification** | ❌ Non (exempté) | Auth |
| **Panier / paywall** | ❌ Non | E-commerce futur |
| **Analytics exempté** | ❌ Non | Analytics |
| **Analytics marketing** | ✅ Oui | Modules marketing tiers |
| **Publicité** | ✅ Oui | Aucun par défaut |
| **Personnalisation contenu** | ✅ Oui | Recommandations futures |
| **Réseaux sociaux** | ✅ Oui | Aucun par défaut |
| **Géolocalisation** | ✅ Oui | Module Geo futur |

---

## 🧩 12. Conformité RGPD des traceurs (base légale)

| Traceur | Base légale | Consentement nécessaire ? | Application LexOrbital |
|---------|-------------|:------------------------:|------------------------|
| **Auth session** | Exécution contrat | ❌ Non | Cookie session signé |
| **Analytics exempté** | Intérêt légitime + exemption art. 82 | ❌ Non | Mode exempté validé |
| **Analytics marketing** | Consentement | ✅ Oui | CMP obligatoire |
| **Réseaux sociaux** | Consentement | ✅ Oui | Scripts bloqués |
| **Fingerprinting** | Consentement | ✅ Oui | Désactivé par défaut |
| **Cookies panier** | Contrat | ❌ Non | Modules e-commerce |

---

## 🧩 13. Risques → Mesures techniques (RGPD & ePrivacy)

| Risque | Mesure CNIL | Implémentation LexOrbital |
|--------|-------------|---------------------------|
| **Traceur oublié** | Inventaire régulier | Script `scan-traceurs` |
| **Script tiers actif sans consent** | Blocage précoce | CMP + interceptors |
| **Données trop intrusives** | Minimisation | Analytics exempté réduit headers |
| **Retrait impossible** | CMP accessible | Icône persistante |
| **Mauvaise information** | Interface claire | Design CNIL + niveaux 1/2 |
| **Finalité mal comprise** | Formulation intelligible | `cmp-descriptions.json` |

---

## 🧩 14. Intégration CMP dans LexOrbital

| Module / Couche | Rôle |
|-----------------|------|
| **FrontRing** | CMP, interface finalités, actions user |
| **BackRing** | Vérifie consentement avant exécution modules marketing |
| **Meta-Kernel** | Règles de conformité traceurs, génération docs |
| **Modules** | Déclarent leurs traceurs dans `traceurs.manifest.json` |

---

## 🧩 15. Modèle de fichier `traceurs.manifest.json` (par module)

Chaque module doit déclarer ses traceurs dans un fichier `traceurs.manifest.json` :

```json
{
  "module": "lexorbital-module-analytics",
  "traceurs": [
    {
      "name": "anon_id",
      "type": "cookie",
      "finality": "analytics_exempted",
      "consentRequired": false,
      "duration": "13 months",
      "thirdParty": false
    }
  ]
}
```

> **💡 Exemple complet**  
> Ce manifest permet au Meta-Kernel de :
> - Générer automatiquement la liste des traceurs dans le CMP
> - Vérifier la conformité lors du scan
> - Documenter les finalités et durées

---

## 📋 Checklist de conformité traceurs

Avant de déployer un module avec traceurs, vérifier :

- [ ] Tous les traceurs déclarés dans `traceurs.manifest.json`
- [ ] CMP configuré et fonctionnel
- [ ] Scripts tiers bloqués avant consentement
- [ ] Tests de non-consentement passés
- [ ] Liste des tiers publiée dans le CMP
- [ ] Retrait du consentement possible et fonctionnel
- [ ] Scan régulier des traceurs en CI
- [ ] Documentation générée automatiquement

---

## 📚 Ressources complémentaires

- [CNIL — Cookies et traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs)
- [CNIL — Design System](https://design.cnil.fr)
- [Mesurer la fréquentation](./17-Mesurer%20la%20fréquentation.md) — Module Analytics exempté
- [Consentement](./16_Consentement.md) — Gestion du consentement

---

<div align="center">

**[⬅️ Précédent](./15_Bases-legales.md)** | **[⬆️ Sommaire RGPD](./00_SOMMAIRE.md)** | **[Suivant →](./17-Mesurer%20la%20fréquentation.md)**

</div>
