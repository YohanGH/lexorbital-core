# Guide de démarrage rapide – Documentation LexOrbital Pandoc

### Templates Pandoc

- **templates/lexorbital.html** - Template HTML avec design spatial
- **templates/pandoc.css** - Styles CSS (thème bleu/cyan)

### Scripts

- **scripts/generate-docs.sh** - Génération automatique de documentation

## 📖 Générer la documentation

### Tout générer en une commande

```bash
cd /Users/yohangh/Documents/Dev/lexorbital/lexorbital-core
./scripts/generate-docs.sh
```

Cela génère :

- `docs/generated/LexOrbital_Guide.html` - Guide complet HTML
- `docs/generated/LexOrbital_Guide.docx` - Guide complet Word
- `docs/generated/LexOrbital_Guide.pdf` - Guide complet PDF (si LaTeX installé)
- `docs/generated/index.html` - Page d'accueil avec liens vers toutes les fiches

## 📝 Ouvrir et consulter

### Ouvrir la documentation générée

```bash
# macOS
open docs/generated/index.html

# Linux
xdg-open docs/generated/index.html

# Windows
start docs/generated/index.html
```

## ✏️ Éditer la documentation

### Modifier une fiche existante

1. Ouvrez le fichier `docs/NN_titre.md`
2. Éditez le contenu (gardez la structure avec `## 1.`, `## 2.`, etc.)
3. Régénérez : `./scripts/generate-docs.sh`

### Ajouter une nouvelle fiche

1. Créez `docs/10_nouvelle-fiche.md` (numéro suivant)
2. Utilisez le template :

```markdown
# Fiche n°10 : Titre de la fiche {#fiche-10-titre}

> Résumé en 2-3 phrases.

## 1. Objectif de la fiche

## 2. Concepts et décisions clés

## 3. Implications techniques

## 4. Checklist de mise en œuvre

## 5. À retenir

## 6. Liens connexes
```

3. Ajoutez l'entrée dans `docs/README.md` (table des matières)
4. Régénérez : `./scripts/generate-docs.sh`

## 🔗 Intégration CI/CD

Le workflow GitHub Actions est déjà configuré dans `.github/workflows/docs.yml` pour régénérer automatiquement la documentation à chaque push.

## 📚 Ressources

- [Documentation Pandoc](https://pandoc.org/MANUAL.html)
- [Markdown Guide](https://www.markdownguide.org/)
- [Mermaid Diagrams](https://mermaid.js.org/)

---

**Prêt à générer votre documentation ? Lancez simplement :**

```bash
./scripts/generate-docs.sh
```

🛰️ **Bon voyage dans l'espace LexOrbital !**
