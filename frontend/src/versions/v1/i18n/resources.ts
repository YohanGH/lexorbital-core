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
import info_en from "../locales/en/info.json"
import legal_en from "../locales/en/legal.json"
import reference_en from "../locales/en/reference.json"
import trustCenter_en from "../locales/en/trustCenter.json"
import common_fr from "../locales/fr/common.json"
import home_fr from "../locales/fr/home.json"
import errors_fr from "../locales/fr/errors.json"
import info_fr from "../locales/fr/info.json"
import legal_fr from "../locales/fr/legal.json"
import reference_fr from "../locales/fr/reference.json"
import trustCenter_fr from "../locales/fr/trustCenter.json"

export const resources = {
  en: {
    common: common_en,
    home: home_en,
    errors: errors_en,
    info: info_en,
    legal: legal_en,
    reference: reference_en,
    trustCenter: trustCenter_en,
  },
  fr: {
    common: common_fr,
    home: home_fr,
    errors: errors_fr,
    info: info_fr,
    legal: legal_fr,
    reference: reference_fr,
    trustCenter: trustCenter_fr,
  },
} as const

export const defaultNS = "common"

export type AppLanguages = keyof typeof resources
export type AppNamespaces = keyof (typeof resources)["en"]
