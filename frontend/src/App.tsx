/**
 * Main App component
 *
 * Sets up the Wouter router with all application routes.
 * Uses Switch for exclusive routing and ErrorBoundary for error handling.
 *
 * Note: i18n is configured and available throughout the app.
 * Use `useTranslation("namespace")` in child components to access translations.
 * Example: `const { t } = useTranslation("common"); t("app.title")`
 *
 * @module App
 */

import type { JSX } from "react"
import { Router, Switch, Route, Redirect } from "wouter"

import {
  ErrorBoundary,
  NotFound,
  VersionsList,
  VersionedPageRoute,
  About,
  Contact,
  Glossary,
  Sitemap,
  References,
  TermsOfUse,
  Accessibility,
  EcoConception,
  Ethics,
  Disclosure,
  Security,
  CookieManagement,
  TrustCenter,
  Explanatory,
} from "@/pages"
import { ROUTES, defaultRouterConfig } from "@/lib/router"
import { Layout } from "@/components/Layout"
import { RedirectToLatest } from "@/components/RedirectToLatest"

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Router {...defaultRouterConfig}>
        <Layout>
          <Switch>
            {/* Root redirects to latest version */}
            <Route path={ROUTES.HOME}>
              <RedirectToLatest />
            </Route>

            {/* Versions list page */}
            <Route path="/versions" component={VersionsList} />

            {/* llm.txt redirect - served directly by server, redirect for compatibility */}
            <Route path="/llm-txt">
              <Redirect to="/llm.txt" />
            </Route>

            {/* Versioned routes: /v/:versionId/* */}
            <Route path="/v/:versionId/*" component={VersionedPageRoute} />

            {/* Non-versioned pages - direct routes */}
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/glossary" component={Glossary} />
            <Route path="/sitemap" component={Sitemap} />
            <Route path="/references" component={References} />
            <Route path="/explanatory" component={Explanatory} />

            {/* Legal pages */}
            <Route path="/legal/terms-of-use" component={TermsOfUse} />
            <Route path="/legal/accessibility" component={Accessibility} />
            <Route path="/legal/eco-conception" component={EcoConception} />
            <Route path="/legal/ethics" component={Ethics} />
            <Route path="/legal/disclosure" component={Disclosure} />
            <Route path="/legal/security" component={Security} />
            <Route
              path="/legal/cookie-management"
              component={CookieManagement}
            />

            {/* Compliance pages */}
            <Route path="/trust-center" component={TrustCenter} />

            {/* Legacy routes - redirect to latest version equivalent */}
            {/* These can be kept for backward compatibility or removed */}
            <Route path={ROUTES.MODULES}>
              <RedirectToLatest />
            </Route>

            {/* 404 fallback - must be last */}
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App
