/**
 * Application entry point
 *
 * Initializes React and renders the root App component.
 * React.StrictMode is enabled for development best practices.
 */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@/core/i18n"
import App from "@/App"
import "@/core/styles/index.css"

const rootElement = document.getElementById("root")

if (rootElement === null) {
  throw new Error("Root element not found")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
