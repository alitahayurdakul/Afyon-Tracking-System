import { ILanguagesTypes } from "./generalTypes";

export interface ILanguageItemType {
  code: ILanguagesTypes;
  name: string;
  flag: React.JSX.Element;
}


export type ILanguageItemsTypes = Array<ILanguageItemType>;