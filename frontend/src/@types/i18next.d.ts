/**
 * TypeScript augmentation for i18next
 *
 * Extends i18next's CustomTypeOptions to provide type-safe translation keys
 * based on our resources structure. This enables autocomplete and compile-time
 * checking for translation keys.
 *
 * @module @types/i18next
 */

import "i18next"
import { resources, defaultNS } from "../i18n/resources"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)["en"]
  }
}
