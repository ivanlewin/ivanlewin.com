import type { Ni18nOptions } from 'ni18n';

export type locales = 'en' | 'es'

export const ni18nConfig: Ni18nOptions = {
  supportedLngs: ['en', 'es'],
  ns: ['translation'],
};