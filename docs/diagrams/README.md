# 🎨 Diagrams and Visual Resources

> **Collection of diagrams, schematics, and illustrations for understanding the LexOrbital architecture.**

---

## 📁 Structure

```
diagrams/
├── architecture/      # Architecture diagrams
├── flows/             # Workflow diagrams
└── concepts/          # Concept illustrations
```

---

## 🗂️ Available Diagrams

### Architecture

| Diagram              | Description                     | Format  | File                                |
| -------------------- | ------------------------------- | ------- | ----------------------------------- |
| **Orbital Station**  | Overview of the orbital station | Mermaid | `architecture/orbital-station.mmd`  |
| **Meta-Kernel**      | Meta-Kernel structure           | Mermaid | `architecture/meta-kernel.mmd`      |
| **Rings & Modules**  | Rings and module connections    | Mermaid | `architecture/rings-modules.mmd`    |
| **Module Lifecycle** | Module lifecycle stages         | Mermaid | `architecture/module-lifecycle.mmd` |

### Flows

| Diagram                 | Description                | Format  | File                            |
| ----------------------- | -------------------------- | ------- | ------------------------------- |
| **Module Registration** | Module onboarding workflow | Mermaid | `flows/module-registration.mmd` |
| **User Authentication** | Login flow                 | Mermaid | `flows/user-auth-flow.mmd`      |
| **GDPR Data Request**   | User data request workflow | Mermaid | `flows/rgpd-data-request.mmd`   |
| **Git Subtree Update**  | Updating via git subtree   | Mermaid | `flows/git-subtree-update.mmd`  |

### Concepts

| Diagram               | Description                    | Format | File                             |
| --------------------- | ------------------------------ | ------ | -------------------------------- |
| **Orbital Metaphor**  | Orbital station metaphor       | Image  | `concepts/orbital-metaphor.png`  |
| **Module Vessel**     | Module-as-vessel concept       | Image  | `concepts/module-vessel.png`     |
| **Docking Mechanism** | Docking mechanism illustration | Image  | `concepts/docking-mechanism.png` |

---

## 🖼️ Previews

### Orbital Station (Overview)

```mermaid
graph TB
    subgraph "Meta-Kernel"
        MK[Global Configuration<br/>GDPR Rules<br/>Conventions<br/>Security]
    end

    subgraph "FrontRing"
        FR[Routing<br/>State<br/>UI Slots<br/>Hooks]
    end

    subgraph "BackRing"
        BR[API Contracts<br/>ORM<br/>Middlewares<br/>Events]
    end

    subgraph "Frontend Modules"
        FM1[UI Kit]
        FM2[Dashboard]
        FM3[Forms]
    end

    subgraph "Backend Modules"
        BM1[Auth]
        BM2[Audit]
        BM3[Mailer]
    end

    MK --> FR
    MK --> BR
    FR -.-> FM1
    FR -.-> FM2
    FR -.-> FM3
    BR -.-> BM1
    BR -.-> BM2
    BR -.-> BM3

    style MK fill:#1a1a2e,stroke:#16213e,color:#eee
    style FR fill:#0f3460,stroke:#16213e,color:#eee
    style BR fill:#0f3460,stroke:#16213e,color:#eee
    style FM1 fill:#533483,stroke:#16213e,color:#eee
    style FM2 fill:#533483,stroke:#16213e,color:#eee
    style FM3 fill:#533483,stroke:#16213e,color:#eee
    style BM1 fill:#533483,stroke:#16213e,color:#eee
    style BM2 fill:#533483,stroke:#16213e,color:#eee
    style BM3 fill:#533483,stroke:#16213e,color:#eee
```

### Module Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Created: git clone template
    Created --> Configured: Edit manifest
    Configured --> Developed: Write code
    Developed --> Tested: Run tests
    Tested --> Documented: Write docs
    Documented --> Published: git push
    Published --> Integrated: git subtree add
    Integrated --> Running: docker-compose up
    Running --> Updated: git subtree pull
    Updated --> Running
    Running --> Deprecated: Mark deprecated
    Deprecated --> [*]
```

### User Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant FrontRing
    participant BackRing
    participant AuthModule
    participant Database

    User->>FrontRing: POST /login
    FrontRing->>BackRing: Forward request
    BackRing->>AuthModule: Validate credentials
    AuthModule->>Database: Query user
    Database-->>AuthModule: User data
    AuthModule-->>BackRing: JWT token
    BackRing-->>FrontRing: Token + user info
    FrontRing-->>User: Redirect to dashboard

    Note over AuthModule,Database: Password hashed with bcrypt
    Note over BackRing,FrontRing: Token stored in httpOnly cookie
```

---

## 🛠️ Tools in Use

### Mermaid

- Technical diagrams (architecture, flows, sequences).

- **Docs:** https://mermaid.js.org/

---

### Excalidraw

- Conceptual illustrations.

- **Link:** https://excalidraw.com/

- **Export:** PNG or SVG

---

### PlantUML

- Complex UML diagrams.

- **Docs:** https://plantuml.com/

---

## 📝 Conventions

### File naming

- **Kebab-case:** `module-lifecycle.mmd`
- **Descriptive:** name reflects content
- **Proper extension:** `.mmd` (Mermaid), `.png`, `.svg`, `.puml` (PlantUML)

### Colors

- LexOrbital palette (inspired by orbital/spatial themes):

| Element         | Color       | Hex       |
| --------------- | ----------- | --------- |
| **Meta-Kernel** | Deep navy   | `#1a1a2e` |
| **Rings**       | Medium blue | `#0f3460` |
| **Modules**     | Purple      | `#533483` |
| **Connections** | Cyan        | `#16c79a` |
| **Alerts**      | Orange      | `#e94560` |

### Style

- **Minimalist:** avoid visual clutter
- **Functional:** the diagram should inform, not decorate
- **Consistent:** reuse shapes for the same concepts
- **Accessible:** ensure strong contrast and legible text

---

## 🤝 Contribute

### Add a new diagram

1. Create the file in the appropriate folder (`architecture/`, `flows/`, `concepts/`)
2. Follow the naming conventions
3. Add an entry to this README
4. Validate rendering (Mermaid Live Editor, etc.)
5. Commit with: `docs: add diagram [name]`

### Update a diagram

1. Modify the source file
2. Regenerate exports if needed
3. Update last modified date
4. Commit with: `docs: update diagram [name]`

---

## 📚 Resources

- [Mermaid Live Editor](https://mermaid.live/)
- [Excalidraw](https://excalidraw.com/)
- [PlantUML Online](http://www.plantuml.com/plantuml/uml/)
- [C4 Model](https://c4model.com/) — architecture diagrams
- [Structurizr](https://structurizr.com/) — software architecture diagrams

---

<div align="center">

**[⬆️ Back to Docs](../README.md)**

</div>
