# Gestion de la documentation

> La documentation de LexOrbital est **vivante et générée automatiquement** à partir du code, des manifestes et des événements réels du système. Zéro doc obsolète, zéro diagramme manuel à maintenir.

## 1. Objectif de la fiche

Présenter les principes et outils de documentation automatique de LexOrbital, avec focus sur les diagrammes vivants (architecture, flux de données, dépendances) et la génération de guides conformité RGPD.

## 2. Concepts et décisions clés

### 2.1. Documentation traditionnelle vs documentation vivante

#### Problèmes de la doc traditionnelle

- 📉 **Obsolescence rapide** : la doc est à jour le jour de sa rédaction, puis diverge du code
- 🤷 **Responsabilité floue** : personne n'aime maintenir la doc
- 🔍 **Recherche difficile** : PDF/Word non indexés, pas de liens hypertextes
- 🎨 **Diagrammes manuels** : Visio/Draw.io désynchronisés du code

#### Principes de la doc vivante LexOrbital

> La documentation de LexOrbital est **vivante et générée automatiquement** à partir du code, des manifestes et des événements réels du système. Zéro doc obsolète, zéro diagramme manuel à maintenir.

### 2.2. Sources de vérité

- Dependency-cruiser

- Pandoc

## 3. Implications techniques

### 3.1. Pipeline de génération (CI/CD)

> La documentation LexOrbital est **générée**, pas écrite manuellement

### 3.3. Registre RGPD automatique

→ Sortie : fichier JSON utilisable pour audit CNIL ou export PDF.
