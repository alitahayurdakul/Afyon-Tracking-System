export const URL_PAGES = {
    dashboard: "/",
    statistics: "/istatistikler",
    compare: "/karsilastir",
    activeProcesses: "/aktif-surecler",
    processesHistory: "/gecmis-surecler",
    workflows: "/is-akislari-yonetimi",
    stages: "/asama-yonetimi",
    trains: "/tren-yonetimi",
    wagons: "/vagon-yonetimi",
    users: "/kullanici-yonetimi",
    roles: "/rol-yonetimi",
    subStages: "/alt-asamalar-yonetimi",
    delayReasons: "/gecikme-nedenleri",
    login: "/login",
    forgotPassword: "/forgot-password",
    resetPassword: "/forgot-password/reset",
    materials: "/malzeme-yonetimi",
    projects: "/proje-yonetimi",
    profile: "/profil",
    processTrain: "/tren-surecleri"
}

/**
 * Name of the httpOnly session cookie the backend sets. The access token lives
 * in memory only, so this cookie is the sole auth signal visible server-side.
 */
export const SESSION_COOKIE_NAME = "jwt";

/**
 * Routes reachable without a session. Shared by the proxy (server-side gate)
 * and AuthBootstrap (client-side gate) — the two must never diverge, or a user
 * bounces between them in a redirect loop.
 */
export const PUBLIC_PATHS = [URL_PAGES.login, URL_PAGES.forgotPassword];

/** Expects a locale-stripped pathname (see `stripLocale`). */
export const isPublicPath = (pathname: string): boolean =>
  PUBLIC_PATHS.some(
    (publicPath) =>
      pathname === publicPath || pathname.startsWith(`${publicPath}/`),
  );
