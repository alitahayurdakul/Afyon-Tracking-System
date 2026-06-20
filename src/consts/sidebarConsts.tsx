import { ISidebarItemsTypes } from "@/types/sidebarTypes";
import {
  faHouse,
  faDiagramProject,
  faLayerGroup,
  faTrain,
  faFilter,
  faScaleBalanced,
  faClockRotateLeft,
  faCircleExclamation,
  faUsersGear,
  faUsers,
  faUserShield,
  faBoxesStacked,
  faSitemap,
  faFolderTree,
} from "@fortawesome/free-solid-svg-icons";
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
        url: "/istatistikler",
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
  {
    name: "Geçmiş Süreçler",
    icon: faClockRotateLeft,
    url: URL_PAGES.workflowHistory,
  },
  {
    name: "İş Akışları",
    icon: faDiagramProject,
    url: "/workflows",
  },
  {
    name: "Aşamalar",
    icon: faLayerGroup,
    url: "/asamalar",
  },
  {
    name: "Alt Aşamalar",
    icon: faSitemap,
    url: "/alt-asamalar",
  },
  {
    name: "Projeler",
    icon: faFolderTree,
    url: "/projeler",
  },
  {
    name: "Trenler",
    icon: faTrain,
    url: "/trenler",
  },
  {
    name: "Gecikme Sebepleri",
    icon: faCircleExclamation,
    url: "/reasons",
  },
  {
    name: "Malzeme Listesi",
    icon: faBoxesStacked,
    url: "/malzeme-listesi",
  },
  {
    name: "Kullanıcı Yönetimi",
    icon: faUsersGear,
    subItems: [
      {
        name: "Kullanıcılar",
        icon: faUsers,
        url: "/users",
      },
      {
        name: "Roller",
        icon: faUserShield,
        url: "/roles",
      },
    ],
  },
];
