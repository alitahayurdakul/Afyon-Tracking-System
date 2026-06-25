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
    key: "dashboard",
    icon: faHouse,
    url: "/",
    subItems: [
      {
        name: "İstatistikler",
        key: "statistics",
        icon: faFilter,
        url: URL_PAGES.statistics,
      },
      {
        name: "Karşılaştır",
        key: "compare",
        icon: faScaleBalanced,
        url: "/karsilastir",
      },
    ],
  },
  {
    name: "Aktif Süreçler",
    key: "activeProcesses",
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
    key: "workflows",
    icon: faDiagramProject,
    url: URL_PAGES.workflows,
  },
  {
    name: "Aşamalar",
    key: "stages",
    icon: faLayerGroup,
    url: URL_PAGES.stages,
  },
  {
    name: "Alt Aşamalar",
    key: "subStages",
    icon: faSitemap,
    url: URL_PAGES.subStages,
  },
  {
    name: "Projeler",
    key: "projects",
    icon: faFolderTree,
    url: URL_PAGES.projects,
  },
  {
    name: "Trenler",
    key: "trains",
    icon: faTrain,
    url: URL_PAGES.trains,
  },
  {
    name: "Gecikme Sebepleri",
    key: "delayReasons",
    icon: faCircleExclamation,
    url: URL_PAGES.delayReasons,
  },
  {
    name: "Malzeme Listesi",
    key: "materials",
    icon: faBoxesStacked,
    url: URL_PAGES.materials,
  },
  {
    name: "Kullanıcı Yönetimi",
    key: "userManagement",
    icon: faUsersGear,
    subItems: [
      {
        name: "Kullanıcılar",
        key: "users",
        icon: faUsers,
        url: URL_PAGES.users,
      },
      {
        name: "Roller",
        key: "roles",
        icon: faUserShield,
        url: URL_PAGES.roles,
      },
    ],
  },
];
