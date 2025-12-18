src/
├── components/
│ ├── atoms/ # Éléments de base
│ │ ├── Typography/
│ │ │ ├── Title/
│ │ │ │ ├── Title.tsx
│ │ │ │ ├── Title.test.tsx
│ │ │ │ ├── Title.stories.tsx
│ │ │ │ └── index.ts
│ │ │ ├── Paragraph/
│ │ │ ├── Label/
│ │ │ ├── Quote/
│ │ │ ├── Blockquote/
│ │ │ └── ...
│ │ ├── Layout/
│ │ │ ├── Container/
│ │ │ ├── Section/
│ │ │ ├── Grid/
│ │ │ └── ...
│ │ └── UI/
│ │ ├── Button/
│ │ ├── Link/
│ │ └── ...
│ ├── molecules/ # Combinaisons d'atomes
│ │ ├── FeatureCard/
│ │ ├── Testimonial/
│ │ └── ...
│ └── organisms/ # Sections complexes
│ ├── Header/
│ ├── Footer/
│ └── ...
├── styles/
│ ├── tokens/
│ │ ├── colors.ts
│ │ ├── typography.ts
│ │ ├── spacing.ts
│ │ └── breakpoints.ts
│ └── global.css
└── utils/
├── accessibility/
│ ├── aria.ts
│ ├── focus.ts
│ └── sr-only.ts
└── validation/
└── props-validator.ts
