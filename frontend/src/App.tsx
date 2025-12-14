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
import { ErrorBoundary } from "@/core/pages/errors"

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <VersionProvider>
        <Router>
          <Switch>
            <Route path="/:rest*">
              <VersionRouter />
            </Route>
          </Switch>
        </Router>
      </VersionProvider>
    </ErrorBoundary>
  )
}

export default App
