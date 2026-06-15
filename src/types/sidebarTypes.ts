import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ISidebarItemTypes{
    name: string;
    icon: IconDefinition;
    url?: string;
    subItems?: Array<ISidebarItemTypes>;
}

export type ISidebarItemsTypes = Array<ISidebarItemTypes>;