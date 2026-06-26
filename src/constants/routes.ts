export const APP_ROUTES = {
  ROOT: `/`,
  DASHBOARD: `/dashboard`,
} as const;

export const AUTH_ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  UPDATE_PASSWORD: '/update-password',
  CONFIRM_EMAIL: '/confirm-email',
} as const;

export const DASHBOARD_ROUTES = {
  MY_ROADMAPS: `${APP_ROUTES.DASHBOARD}/my-roadmaps`,
  MY_STATISTICS: `${APP_ROUTES.DASHBOARD}/my-statistics`,
  BOOKMARKS: `${APP_ROUTES.DASHBOARD}/bookmarks`,
  IN_PROCESS: `${APP_ROUTES.DASHBOARD}/in-process`,
  SETTINGS: `${APP_ROUTES.DASHBOARD}/settings`,
  VIEW: (id: string) => `${APP_ROUTES.DASHBOARD}/view/${id}`,
} as const;

export const AUTH_PROTECTED_ROUTES = [
  AUTH_ROUTES.SIGN_UP,
  AUTH_ROUTES.SIGN_IN,
  AUTH_ROUTES.RESET_PASSWORD,
] as const;

export const APP_PROTECTED_ROUTES = [APP_ROUTES.DASHBOARD] as const;
