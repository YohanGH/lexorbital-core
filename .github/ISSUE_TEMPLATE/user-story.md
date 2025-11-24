---
name: "User Story (LexOrbital)"
about: "Créer une User Story structurée en respectant la méthode orbitale LexOrbital."
title: "[US] : "
labels:
  - user-story
assignees: ""
body:
  - type: markdown
    attributes:
      value: |
        ## 🛰️ User Story – LexOrbital
        Merci de compléter les champs ci-dessous pour créer une User Story claire, concise et maintenable.
  
  - type: textarea
    id: role
    attributes:
      label: "👤 En tant que"
      description: "Qui est l'acteur ?"
      placeholder: "Ex : opérateur de la station, développeur module, service RGPD..."
    validations:
      required: true

  - type: textarea
    id: goal
    attributes:
      label: "🎯 Je veux"
      description: "Décrire l'objectif fonctionnel."
      placeholder: "Ex : consulter la liste des modules-vaisseaux arrimés au BackRing."
    validations:
      required: true

  - type: textarea
    id: purpose
    attributes:
      label: "🧭 Afin de"
      description: "Pourquoi ? Quel est l’impact ?"
      placeholder: "Ex : superviser l'état des modules et détecter les défaillances."
    validations:
      required: true

  - type: textarea
    id: acceptance
    attributes:
      label: "📝 Critères d’acceptation"
      description: "Liste des critères mesurables pour considérer la User Story comme terminée."
      placeholder: |
        - [ ] Le module Auth apparaît dans la liste
        - [ ] Les modules hors-ligne sont signalés
        - [ ] La vue affiche les versions et manifests
    validations:
      required: true

  - type: input
    id: repo
    attributes:
      label: "📦 Repo"
      description: "Quel dépôt est concerné ?"
      placeholder: "Ex : lexorbital-core"
    validations:
      required: true
---
