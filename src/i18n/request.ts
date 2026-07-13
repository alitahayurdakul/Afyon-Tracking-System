import { getRequestConfig } from 'next-intl/server';

import { ILanguagesTypes } from '@/types/generalTypes';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as ILanguagesTypes)) {
    locale = routing.defaultLocale;
  }

  const files = [
    "activeProcessDetail", 
    "activeProcess",
    "layout",
    "stages",
    "subStages",
    "trains",
    "wagons",
    "projects",
    "delayReasons",
    "materials",
    "roles",
    "users",
    "workflows",
    "permissions",
    "processHistory",
    "profile"
  ];
  const messages: Record<string, any> = {};

  for (const file of files) {
    try {
      const mod = await import(`../locales/${locale}/${file}.json`);
      messages[file] = mod.default;
    } catch (e) {
      console.warn(e);
    }
  }

  return {
    locale,
    messages
  };
});