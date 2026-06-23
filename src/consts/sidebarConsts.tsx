import {
  faBoxesStacked,
  faCircleExclamation,
  faClockRotateLeft,
  faDiagramProject,
  faFilter,
  faFolderTree,
  faHouse,
  faLayerGroup,
  faScaleBalanced,
  faSitemap,
  faTrain,
  faUsers,
  faUsersGear,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

import { ISidebarItemsTypes } from "@/types/sidebarTypes";

import { URL_PAGES } from "./url";

export const SIDEBAR_ITEMS: ISidebarItemsTypes = [
  {
    name: "Dashboard",
    icon: faHouse,
    url: "/",
    subItems: [
      {
        name: "İstatistikler",
        icon: faFilter,
        url: URL_PAGES.statistics,
      },
      {
        name: "Karşılaştır",
        icon: faScaleBalanced,
        url: "/karsilastir",
      },
    ],
  },
  {
    name: "Aktif Süreçler",
    icon: faDiagramProject,
    url: URL_PAGES.activeProcesses,
  },
  // {
  //   name: "Geçmiş Süreçler",
  //   icon: faClockRotateLeft,
  //   url: URL_PAGES.workflowHistory,
  // },
  {
    name: "İş Akışları",
    icon: faDiagramProject,
    url: URL_PAGES.workflows,
  },
  {
    name: "Aşamalar",
    icon: faLayerGroup,
    url: URL_PAGES.stages,
  },
  {
    name: "Alt Aşamalar",
    icon: faSitemap,
    url: URL_PAGES.subStages,
  },
  {
    name: "Projeler",
    icon: faFolderTree,
    url: URL_PAGES.projects,
  },
  {
    name: "Trenler",
    icon: faTrain,
    url: URL_PAGES.trains,
  },
  {
    name: "Gecikme Sebepleri",
    icon: faCircleExclamation,
    url: URL_PAGES.delayReasons,
  },
  {
    name: "Malzeme Listesi",
    icon: faBoxesStacked,
    url: URL_PAGES.materials,
  },
  {
    name: "Kullanıcı Yönetimi",
    icon: faUsersGear,
    subItems: [
      {
        name: "Kullanıcılar",
        icon: faUsers,
        url: URL_PAGES.users,
      },
      {
        name: "Roller",
        icon: faUserShield,
        url: URL_PAGES.roles,
      },
    ],
  },
];
