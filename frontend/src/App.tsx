/**
 * Main App component
 *
 * Sets up the Wouter router with all application routes.
 * Uses Switch for exclusive routing and ErrorBoundary for error handling.
 *
 * @module App
 */

import type { JSX } from "react"
import { Router, Switch, Route } from "wouter"

import {
  ErrorBoundary,
  Home,
  NotFound,
  Modules,
  Legal,
  Explanatory,
} from "@/pages"
import { ROUTES, defaultRouterConfig } from "@/lib/router"

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Router {...defaultRouterConfig}>
        <Switch>
          {/* Home route */}
          <Route path={ROUTES.HOME} component={Home} />

          {/* Modules route */}
          <Route path={ROUTES.MODULES} component={Modules} />

          {/* Legal routes */}
          <Route path={ROUTES.LEGAL.ROOT} component={Legal} />
          <Route path={ROUTES.LEGAL.MENTIONS} component={Legal} />
          <Route path={ROUTES.LEGAL.RGPD} component={Legal} />
          <Route path={ROUTES.LEGAL.COOKIES} component={Legal} />

          {/* Explanatory routes */}
          <Route path={ROUTES.EXPLANATORY.ROOT} component={Explanatory} />
          <Route
            path={ROUTES.EXPLANATORY.ARCHITECTURE}
            component={Explanatory}
          />
          <Route path={ROUTES.EXPLANATORY.COMPLIANCE} component={Explanatory} />

          {/* 404 fallback - must be last */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ErrorBoundary>
  )
}

export default App
