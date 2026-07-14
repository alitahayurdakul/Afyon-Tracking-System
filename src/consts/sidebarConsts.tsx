import {
  faBoxesStacked,
  faCircleExclamation,
  faDiagramProject,
  // faFilter,
  faFolderTree,
  // faHouse,
  faLayerGroup,
  faPerson,
  // faScaleBalanced,
  faSitemap,
  faTrailer,
  faTrain,
  faUsers,
  faUsersGear,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

import { ISidebarItemsTypes } from "@/types/sidebarTypes";

import { URL_PAGES } from "./url";

export const SIDEBAR_ITEMS: ISidebarItemsTypes = [
  // {
  //   default: "Dashboard",
  //   key: "dashboard",
  //   icon: faHouse,
  //   url: "/",
  //   subItems: [
  //     {
  //       default: "İstatistikler",
  //       key: "statistics",
  //       icon: faFilter,
  //       url: URL_PAGES.statistics,
  //     },
  //     {
  //       default: "Karşılaştır",
  //       key: "compare",
  //       icon: faScaleBalanced,
  //       url: "/karsilastir",
  //     },
  //   ],
  // },
  {
    default: "Aktif Süreçler",
    key: "activeProcesses",
    icon: faDiagramProject,
    url: URL_PAGES.activeProcesses,
  },
  {
    default: "Geçmiş Süreçler",
    key: "processesHistory",
    icon: faDiagramProject,
    url: URL_PAGES.processesHistory,
  },
  // {
  //   default: "Geçmiş Süreçler",
  //   icon: faClockRotateLeft,
  //   url: URL_PAGES.workflowHistory,
  // },
  {
    default: "İş Akışları",
    key: "workflows",
    icon: faDiagramProject,
    url: URL_PAGES.workflows,
  },
  {
    default: "Aşamalar",
    key: "stages",
    icon: faLayerGroup,
    url: URL_PAGES.stages,
  },
  {
    default: "Alt Aşamalar",
    key: "subStages",
    icon: faSitemap,
    url: URL_PAGES.subStages,
  },
  {
    default: "Projeler",
    key: "projects",
    icon: faFolderTree,
    url: URL_PAGES.projects,
  },
  {
    default: "Trenler",
    key: "trains",
    icon: faTrain,
    url: URL_PAGES.trains,
  },
  {
    default: "Vagonlar",
    key: "wagons",
    icon: faTrailer,
    url: URL_PAGES.wagons,
  },
  {
    default: "Gecikme Sebepleri",
    key: "delayReasons",
    icon: faCircleExclamation,
    url: URL_PAGES.delayReasons,
  },
  {
    default: "Malzeme Listesi",
    key: "materials",
    icon: faBoxesStacked,
    url: URL_PAGES.materials,
  },
   {
    default: "Profilim",
    key: "profile",
    icon: faPerson,
    url: URL_PAGES.profile,
  },
  {
    default: "Kullanıcı Yönetimi",
    key: "userManagement",
    icon: faUsersGear,
    subItems: [
      {
        default: "Kullanıcılar",
        key: "users",
        icon: faUsers,
        url: URL_PAGES.users,
      },
      {
        default: "Roller",
        key: "roles",
        icon: faUserShield,
        url: URL_PAGES.roles,
      },
    ],
  },
];
