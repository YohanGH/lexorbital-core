# Guide RGPD pour Développeurs - Application Pratique

## Contexte Macro / Organisationnel

> Ces parties sont importantes pour la compréhension globale, mais ne sont pas directement applicables au développement quotidien.

**Contexte organisationnel :**

- Gestion des demandes de droits (accès, suppression, portabilité…)
- Notification de violations en 72h

## Application Directe au Développement

### Cartographier les traitements → Découpage technique et documentation

Faire un registre des traitements avec :

- Quelles données ?
- Pourquoi ?
- Qui y accède ?
- Où c'est stocké ?
- Combien de temps ?
- Transferts hors UE ?

#### Traduction technique pour le développeur

Pour chaque service / module / endpoint, documenter :

- **Entrées :** Quelles données personnelles vous recevez (email, IP, logins, etc.)
- **Finalité :** Pourquoi vous les utilisez (authentification, analytics, sécurité…)
- **Stockage :** Base de données, durée de conservation, éventuelle anonymisation / Base active / Archivage intermédiaire / Suppression / Anonymisation
- **Accès :** Quels services / modules / tiers (ex : SendGrid, Stripe…)

**Bénéfices immédiats :**

- Évite de "perdre la trace" des données dans votre architecture
- Vous oblige à vous poser la question : « ai-je vraiment besoin de cette donnée ? »
- Structure votre Meta-Kernel : chaque module-vaisseau doit déclarer ses traitements

### Prioriser les actions → Backlog technique / tickets

À partir du registre, identifier :

- Ce qui est facile à corriger / améliorer
- Ce qui est risqué (données sensibles, mineurs, profilage, transferts hors UE)
- Traiter en priorité les traitements à risque élevé

### Gérer les risques (PIA) → Réflexe d'analyse avant de coder un traitement sensible

**Questions à se poser systématiquement avant d'implémenter :**

1. **Description du traitement**
   - Exemple : tracking des comportements pour scoring

2. **Nécessité / proportionnalité**
   - Ai-je besoin de cette donnée pour la finalité annoncée ?

3. **Risques**
   - Qu'est-ce qui se passe si fuite ?
   - Qu'est-ce qui se passe si abus interne ?

4. **Mesures**
   - Chiffrement
   - Pseudonymisation
   - Minimisation
   - Restriction d'accès
   - Logs d'accès

> 💡 **Standard LexOrbital** Utiliser l'application PIA pour générer le PIA de chaque traitement sensible de la CNIL [https://pia.cnil.fr/](https://pia.cnil.fr/)

---

### Organiser les processus internes → Endpoints et flux à prévoir dans le code

#### Implications techniques directes

**Mécanismes à prévoir dans votre API / application :**

1. **Droit d'accès**
   - L'utilisateur peut voir ses données
2. **Droit de rectification**
   - L'utilisateur peut modifier ses données
3. **Droit d'effacement** (dans certaines limites)
   - Suppression / anonymisation
4. **Portabilité**
   - Export structuré (JSON, CSV...)

**Mécanismes de sécurité à anticiper :**

- Log des incidents de sécurité
- Mécanisme pour détecter les violations (ex: alert sur activité anormale)

**Réflexe de conception :**
Quand vous concevez un modèle ou une table, posez-vous la question :

> "Comment je fais si on me demande : 'supprime toutes les infos de cette personne' ?"

Si la réponse est : « c'est galère », c'est un signal que votre modèle est à revoir.
