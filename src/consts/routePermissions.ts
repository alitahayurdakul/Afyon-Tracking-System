import {
  PERMISSION_ACTION,
  PERMISSION_RESOURCE,
  PermissionAction,
  PermissionResource,
} from "./permissions";
import { URL_PAGES } from "./url";

export interface IRoutePermission {
  path: string;
  resource: PermissionResource;
  action: PermissionAction;
}

export const ROUTE_PERMISSIONS: IRoutePermission[] = [
  {
    path: URL_PAGES.processTrain,
    resource: PERMISSION_RESOURCE.PROCESSTRAIN,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.activeProcesses,
    resource: PERMISSION_RESOURCE.ACTIVEPROCESS,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.processesHistory,
    resource: PERMISSION_RESOURCE.PROCESSHISTORY,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.workflows,
    resource: PERMISSION_RESOURCE.WORKFLOW,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.stages,
    resource: PERMISSION_RESOURCE.STAGE,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.subStages,
    resource: PERMISSION_RESOURCE.SUBSTAGE,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.projects,
    resource: PERMISSION_RESOURCE.PROJECT,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.trains,
    resource: PERMISSION_RESOURCE.TRAIN,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.wagons,
    resource: PERMISSION_RESOURCE.WAGON,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.delayReasons,
    resource: PERMISSION_RESOURCE.DELAYREASON,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.materials,
    resource: PERMISSION_RESOURCE.MATERIAL,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.users,
    resource: PERMISSION_RESOURCE.USER,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.roles,
    resource: PERMISSION_RESOURCE.ROLE,
    action: PERMISSION_ACTION.READ,
  },
  {
    path: URL_PAGES.logs,
    resource: PERMISSION_RESOURCE.USER,
    action: PERMISSION_ACTION.MANAGE,
  },
];

/** Expects a locale-stripped pathname (see `stripLocale`). */
export const getRoutePermission = (
  pathname: string,
): IRoutePermission | undefined =>
  ROUTE_PERMISSIONS.filter(
    (route) => pathname === route.path || pathname.startsWith(`${route.path}/`),
  ).sort((a, b) => b.path.length - a.path.length)[0];
