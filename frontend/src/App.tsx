/**
 * Main App component
 *
 * Sets up ErrorBoundary, VersionProvider, and routing.
 * All routing logic is delegated to VersionRouter which handles:
 * - Version detection (from path, query params, or context)
 * - Displaying VersionHistoryPage if no version is detected
 * - Loading and rendering the appropriate versioned App
 *
 * Note: i18n is configured and available throughout the app.
 * Use `useTranslation("namespace")` in child components to access translations.
 *
 * @module App
 */

import type { JSX } from "react"
import { Router, Switch, Route } from "wouter"

import { VersionProvider } from "@/version-manager/VersionContext"
import { VersionRouter } from "@/version-manager/VersionRouter"
import { ErrorBoundary, NotFound } from "@/core/pages/errors"

import { VersionHistoryPage } from "./core/pages/versioning/VersionHistoryPage"

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <VersionProvider>
        <Router>
          <Switch>
            {/* Version history page */}
            <Route path="/">
              <VersionHistoryPage />
            </Route>
            {/* Versioned app routes */}
            <Route path="/:rest*">
              <VersionRouter />
            </Route>

            {/* Fallback 404 pour les routes de version non trouvées */}
            <Route>
              <div className="p-8 text-center">
                <h2 className="mb-4 text-2xl font-bold">Version non trouvée</h2>
                <p className="mb-4">
                  La version demandée n'existe pas ou la route est incorrecte.
                </p>
                <a
                  href="/version-demo"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Retour au sélecteur de version
                </a>
              </div>
            </Route>

            {/* Fallback 404 pour les routes de version non trouvées */}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </VersionProvider>
    </ErrorBoundary>
  )
}

export default App
