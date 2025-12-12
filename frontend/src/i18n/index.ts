/**
 * i18next Configuration
 *
 * Initializes i18next with react-i18next integration and static resources.
 * Uses embedded resources (no HTTP backend for now).
 *
 * @module i18n
 */

import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import { resources, defaultNS } from "./resources"

i18n.use(initReactI18next).init({
  resources,
  lng: "fr", // Default language
  fallbackLng: "en",
  defaultNS,
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

export default i18n
