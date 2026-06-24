import { DEFlag, ENFlag, TRFlag } from "@/assets/icons/Flags";
import { ILanguageItemsTypes } from "@/types/layoutTypes";

export const LANGUAGES: ILanguageItemsTypes = [
  { code: "tr", name: "Türkçe", flag: <TRFlag /> },
  { code: "en", name: "English", flag: <ENFlag /> },
  { code: "de", name: "Deutsch", flag: <DEFlag /> },
];