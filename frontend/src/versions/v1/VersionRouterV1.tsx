/**
 * Version 1.0.0 Router Component
 *
 * This is the routing entry point for version 1.0.0.
 * Uses dynamic route mapping based on routeMapping.ts to avoid hardcoding routes.
 */

import type { JSX } from "react"
import { Switch, Route, Redirect } from "wouter"

import { ErrorBoundary, NotFound } from "@/versions/v1/pages"
import { Layout } from "@/versions/v1/hoc/Layout"
import {
  getComponentForRoute,
  getAllRouteSlugs,
  isRedirectRoute,
  getRedirectTarget,
} from "@/versions/v1/lib/pageMapping"
import { Home } from "@/versions/v1/pages"

function VersionRouterV1(): JSX.Element {
  return (
    <ErrorBoundary>
      <Layout>
        <Switch>
          {/* Root shows home page directly */}
          <Route path="/" component={Home} />

          {/* Dynamically generate routes from pageMapping */}
          {getAllRouteSlugs().map(slug => {
            // Handle redirects
            if (isRedirectRoute(slug)) {
              const redirectTo = getRedirectTarget(slug)
              if (!redirectTo) return null
              return (
                <Route key={slug} path={`/${slug}`}>
                  <Redirect to={redirectTo} />
                </Route>
              )
            }

            // Regular component routes
            const Component = getComponentForRoute(slug)
            if (!Component) return null

            return (
              <Route key={slug} path={`/${slug}`} component={Component} />
            )
          })}

          {/* 404 fallback - must be last */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ErrorBoundary>
  )
}

export default VersionRouterV1
