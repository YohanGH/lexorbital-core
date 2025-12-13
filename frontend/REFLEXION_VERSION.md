Architecture de versioning pour un site laboratoire React

Je vous propose une solution robuste qui gère les versions de votre site tout en permettant la navigation temporelle.

Architecture proposée

1. Structure des dossiers

```
src/
├── versions/
│   ├── v1.0.0/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── config/
│   ├── v2.0.0/
│   ├── current/ -> (lien symbolique ou copie de la dernière version)
│   └── manifest.json
├── core/ (code partagé entre versions)
├── version-manager/ (système de versioning)
└── App.js (routeur principal)
```

2. Système de configuration par version

```json
// src/versions/manifest.json
{
  "versions": [
    {
      "id": "v1.0.0",
      "date": "2023-01-15",
      "description": "Version initiale avec système de grille CSS",
      "dependencies": {
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      },
      "entryPoint": "./v1.0.0/App.jsx",
      "compatibility": {
        "dataFormat": "v1",
        "api": "v1"
      }
    },
    {
      "id": "v2.0.0",
      "date": "2023-06-20",
      "description": "Refonte avec Tailwind et React 19",
      "dependencies": {
        "react": "^19.0.0",
        "react-dom": "^19.0.0"
      },
      "entryPoint": "./v2.0.0/App.jsx",
      "compatibility": {
        "dataFormat": "v2",
        "api": "v2"
      }
    }
  ],
  "current": "v2.0.0"
}
```

3. Composant VersionManager

```jsx
// src/version-manager/VersionContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import manifest from '../versions/manifest.json';

const VersionContext = createContext();

export const VersionProvider = ({ children }) => {
  const [currentVersion, setCurrentVersion] = useState(manifest.current);
  const [versionHistory, setVersionHistory] = useState([manifest.current]);

  const switchVersion = useCallback((versionId) => {
    // Sauvegarder l'état actuel avant de changer
    const versionData = manifest.versions.find(v => v.id === versionId);
    
    if (versionData) {
      // Gérer la compatibilité
      if (!checkCompatibility(currentVersion, versionId)) {
        console.warn(`Compatibilité limitée entre ${currentVersion} et ${versionId}`);
      }
      
      setCurrentVersion(versionId);
      setVersionHistory(prev => [...prev, versionId]);
      
      // Sauvegarder dans l'URL pour le partage
      window.history.pushState({ version: versionId }, '', `?version=${versionId}`);
    }
  }, [currentVersion]);

  const checkCompatibility = (fromVersion, toVersion) => {
    // Logique de vérification de compatibilité
    const from = manifest.versions.find(v => v.id === fromVersion);
    const to = manifest.versions.find(v => v.id === toVersion);
    
    return from.compatibility.dataFormat === to.compatibility.dataFormat;
  };

  const getVersionComponent = useCallback(async (versionId) => {
    try {
      // Chargement dynamique de la version
      const version = manifest.versions.find(v => v.id === versionId);
      const module = await import(`../versions/${versionId}/App.jsx`);
      return module.default;
    } catch (error) {
      console.error(`Erreur de chargement de la version ${versionId}:`, error);
      return null;
    }
  }, []);

  return (
    <VersionContext.Provider value={{
      currentVersion,
      versionHistory,
      switchVersion,
      getVersionComponent,
      manifest
    }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => useContext(VersionContext);
```

4. Routeur intelligent avec Wouter

```jsx
// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { VersionProvider, useVersion } from './version-manager/VersionContext';
import VersionSwitcher from './components/VersionSwitcher';
import CompatibilityLayer from './version-manager/CompatibilityLayer';

// Composants partagés (toujours disponibles)
import LoadingSpinner from './core/components/LoadingSpinner';

const VersionRouter = () => {
  const { currentVersion, getVersionComponent } = useVersion();
  const [location] = useLocation();
  const [VersionApp, setVersionApp] = React.useState(null);

  React.useEffect(() => {
    const loadVersion = async () => {
      const AppComponent = await getVersionComponent(currentVersion);
      setVersionApp(() => AppComponent);
    };
    loadVersion();
  }, [currentVersion, getVersionComponent]);

  return (
    <div className="versioned-app">
      <VersionSwitcher />
      <CompatibilityLayer from={currentVersion} to={location}>
        <Suspense fallback={<LoadingSpinner />}>
          {VersionApp ? <VersionApp /> : <div>Chargement de la version...</div>}
        </Suspense>
      </CompatibilityLayer>
    </div>
  );
};

function App() {
  return (
    <VersionProvider>
      <Switch>
        <Route path="/version-history" component={VersionHistoryPage} />
        <Route path="/:rest*">
          <VersionRouter />
        </Route>
      </Switch>
    </VersionProvider>
  );
}

export default App;
```

5. Système de compatibilité et adaptation

```jsx
// src/version-manager/CompatibilityLayer.jsx
import React from 'react';
import DataAdapter from './DataAdapter';
import StyleAdapter from './StyleAdapter';
import ComponentAdapter from './ComponentAdapter';

const CompatibilityLayer = ({ from, to, children }) => {
  const adapters = {
    'v1->v2': {
      data: (data) => DataAdapter.v1ToV2(data),
      styles: (styles) => StyleAdapter.convertStyles(styles, 'v1', 'v2'),
      components: (component) => ComponentAdapter.wrapLegacyComponent(component)
    },
    // Ajouter d'autres mappings de compatibilité
  };

  const getAdapterKey = (fromVersion, toVersion) => {
    return `${fromVersion}->${toVersion}`;
  };

  const adapterKey = getAdapterKey(from, to);
  const adapter = adapters[adapterKey];

  if (!adapter) {
    return children;
  }

  return React.Children.map(children, child => {
    // Appliquer les adaptateurs au besoin
    return React.cloneElement(child, {
      adapter,
      versionFrom: from,
      versionTo: to
    });
  });
};

export default CompatibilityLayer;
```

6. Data Adapter pour les formats différents

```js
// src/version-manager/DataAdapter.js
const DataAdapter = {
  v1ToV2: (v1Data) => {
    // Transformation des données de la v1 vers la v2
    return {
      ...v1Data,
      // Conversion des champs modifiés
      metadata: {
        ...v1Data.metadata,
        createdAt: new Date(v1Data.metadata.created).toISOString(),
        // Adaptation d'autres champs
      }
    };
  },
  
  v2ToV1: (v2Data) => {
    // Transformation inverse si nécessaire
    return {
      ...v2Data,
      metadata: {
        ...v2Data.metadata,
        created: new Date(v2Data.metadata.createdAt).getTime()
      }
    };
  }
};

export default DataAdapter;
```

7. Composant VersionSwitcher

```
// src/components/VersionSwitcher.jsx
import React, { useState } from 'react';
import { useVersion } from '../version-manager/VersionContext';
import './VersionSwitcher.css';

const VersionSwitcher = () => {
  const { manifest, switchVersion, currentVersion, versionHistory } = useVersion();
  const [isOpen, setIsOpen] = useState(false);

  const handleVersionSelect = (versionId) => {
    if (versionId !== currentVersion) {
      switchVersion(versionId);
    }
    setIsOpen(false);
  };

  const renderVersionItem = (version) => {
    const isCurrent = version.id === currentVersion;
    const isInHistory = versionHistory.includes(version.id);
    
    return (
      <div
        key={version.id}
        className={`version-item ${isCurrent ? 'current' : ''} ${isInHistory ? 'visited' : ''}`}
        onClick={() => handleVersionSelect(version.id)}
      >
        <span className="version-id">{version.id}</span>
        <span className="version-date">{version.date}</span>
        <span className="version-desc">{version.description}</span>
        {isCurrent && <span className="current-badge">Actuel</span>}
      </div>
    );
  };

  return (
    <div className="version-switcher">
      <button 
        className="version-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Version: {currentVersion} ▼
      </button>
      
      {isOpen && (
        <div className="version-dropdown">
          <div className="version-list">
            {manifest.versions.map(renderVersionItem)}
          </div>
          <div className="version-history">
            <h4>Historique de navigation</h4>
            {versionHistory.map((vId, index) => (
              <button
                key={`${vId}-${index}`}
                onClick={() => handleVersionSelect(vId)}
                className="history-item"
              >
                {vId} - Étape {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionSwitcher;
```

8. Script de migration/d'archivage

```
// scripts/archive-version.js
const fs = require('fs-extra');
const path = require('path');

const archiveVersion = (versionId, sourceDir = 'src', targetDir = 'src/versions') => {
  const versionPath = path.join(targetDir, versionId);
  
  // Créer la structure de version
  fs.ensureDirSync(versionPath);
  
  // Copier les fichiers nécessaires
  const filesToArchive = [
    'components',
    'pages',
    'styles',
    'hooks',
    'utils'
  ];
  
  filesToArchive.forEach(dir => {
    const source = path.join(sourceDir, dir);
    const target = path.join(versionPath, dir);
    
    if (fs.existsSync(source)) {
      fs.copySync(source, target);
    }
  });
  
  // Créer le fichier de configuration de la version
  const manifest = {
    version: versionId,
    date: new Date().toISOString(),
    reactVersion: require('../package.json').dependencies.react,
    dependencies: require('../package.json').dependencies
  };
  
  fs.writeFileSync(
    path.join(versionPath, 'version.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log(`Version ${versionId} archivée avec succès`);
};

module.exports = archiveVersion;
```

9. Page d'historique des versions

```
// src/pages/VersionHistory.jsx
import React from 'react';
import { useVersion } from '../version-manager/VersionContext';
import { Timeline, TimelineItem } from '../components/Timeline';

const VersionHistoryPage = () => {
  const { manifest, versionHistory } = useVersion();
  
  return (
    <div className="version-history-page">
      <h1>Évolution du site laboratoire</h1>
      <p className="subtitle">
        Explorez l'historique des versions et les réflexions derrière chaque changement
      </p>
      
      <Timeline>
        {manifest.versions.map((version, index) => {
          const isCurrent = version.id === manifest.current;
          const isVisited = versionHistory.includes(version.id);
          
          return (
            <TimelineItem
              key={version.id}
              date={version.date}
              title={`Version ${version.id}`}
              description={version.description}
              isCurrent={isCurrent}
              isVisited={isVisited}
              onSelect={() => window.location.href = `/?version=${version.id}`}
            >
              <div className="version-details">
                <h4>Changements majeurs:</h4>
                <ul>
                  {version.changes?.map((change, i) => (
                    <li key={i}>{change}</li>
                  ))}
                </ul>
                
                <h4>Technologies:</h4>
                <div className="tech-stack">
                  {Object.entries(version.dependencies || {}).map(([dep, version]) => (
                    <span key={dep} className="tech-badge">
                      {dep}: {version}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="explore-btn"
                  onClick={() => window.location.href = `/?version=${version.id}`}
                >
                  Explorer cette version
                </button>
              </div>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
};

export default VersionHistoryPage;
```

Stratégies pour gérer les breaking changes

1. Interface de compatibilité

```js
// src/version-manager/ComponentProxy.jsx
const ComponentProxy = ({ componentName, version, props }) => {
  const Component = React.lazy(() => 
    import(`../versions/${version}/components/${componentName}`)
    .catch(() => 
      import(`../core/components/fallbacks/${componentName}`)
    )
  );
  
  return (
    <ErrorBoundary fallback={<FallbackComponent name={componentName} />}>
      <Suspense fallback={<div>Chargement...</div>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
```

2. Système de migration automatique

```js
// src/version-manager/MigrationService.js
class MigrationService {
  static async migrateData(data, fromVersion, toVersion) {
    const migrations = this.getMigrationPath(fromVersion, toVersion);
    
    let migratedData = data;
    for (const migration of migrations) {
      migratedData = await migration.execute(migratedData);
    }
    
    return migratedData;
  }
  
  static getMigrationPath(from, to) {
    // Déterminer le chemin de migration à travers les versions
    const versionOrder = ['v1.0.0', 'v1.5.0', 'v2.0.0', 'v2.5.0', 'v3.0.0'];
    const fromIndex = versionOrder.indexOf(from);
    const toIndex = versionOrder.indexOf(to);
    
    if (fromIndex < toIndex) {
      // Migration progressive vers l'avant
      return versionOrder
        .slice(fromIndex + 1, toIndex + 1)
        .map(v => require(`./migrations/${v}`));
    } else {
      // Rollback vers une version antérieure
      return versionOrder
        .slice(toIndex, fromIndex)
        .reverse()
        .map(v => require(`./migrations/downgrade-${v}`));
    }
  }
}
```

ACTUELLEMENT L"ENSEMBLE DU SITE DANS SONT ETAT EST LA V1.0.0.