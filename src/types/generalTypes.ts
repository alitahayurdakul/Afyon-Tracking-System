import { routing } from "@/i18n/routing";

export type ILanguagesTypes = "tr" | "en" | "de" | "ru";

type AllPaths = keyof typeof routing.pathnames;

export type IPagesType = Exclude<AllPaths, `${string}[${string}`>;