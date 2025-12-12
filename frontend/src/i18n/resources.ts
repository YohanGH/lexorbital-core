/**
 * i18n Resources Configuration
 *
 * Centralizes all translation resources with strong typing.
 * Each language has its own namespace structure (common, home, etc.).
 *
 * @module i18n/resources
 */

import common_en from "../locales/en/common.json"
import home_en from "../locales/en/home.json"
import errors_en from "../locales/en/errors.json"
import common_fr from "../locales/fr/common.json"
import home_fr from "../locales/fr/home.json"
import errors_fr from "../locales/fr/errors.json"

export const resources = {
  en: {
    common: common_en,
    home: home_en,
    errors: errors_en,
  },
  fr: {
    common: common_fr,
    home: home_fr,
    errors: errors_fr,
  },
} as const

export const defaultNS = "common"

export type AppLanguages = keyof typeof resources
export type AppNamespaces = keyof (typeof resources)["en"]
