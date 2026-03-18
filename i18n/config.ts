/**
 * Internationalization Configuration
 * 
 * Defines supported locales and default locale for the application.
 */

export const locales = ['en', 'ar', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  ar: '🇪🇬',
  ru: '🇷🇺',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

