// Constantes globales pour l'application Heracles
// Conserver les clés et formats réutilisables dans l'ensemble du client.

/**
 * Récupère une variable d'environnement de manière tolérante à l'environnement d'exécution.
 * Cherche dans globalThis, process.env et import.meta.env si disponibles.
 */
const readEnv = (key: string): string | undefined => {
  try {
    const g = globalThis as any;
    if (g?.__ENV && typeof g.__ENV[key] !== 'undefined') return g.__ENV[key];
    if (g?.process?.env && typeof g.process.env[key] !== 'undefined') return g.process.env[key];
    if (g?.importMeta?.env && typeof g.importMeta.env[key] !== 'undefined') return g.importMeta.env[key];
    if (g?.importMeta?.env && typeof (g.importMeta.env as any)[key] !== 'undefined') return (g.importMeta.env as any)[key];
    // Common Vite/CRA keys
    if (g?.process?.env?.VITE_APP_VERSION) return g.process.env.VITE_APP_VERSION;
    return undefined;
  } catch {
    return undefined;
  }
};

// Nom de l'application
export const APP_NAME = 'Heracles';

// Version de l'application (si disponible via env)
export const APP_VERSION = readEnv('VITE_APP_VERSION') ?? readEnv('REACT_APP_VERSION') ?? readEnv('npm_package_version') ?? '0.0.0';

// URL de base de l'API (fallback vers /api relative)
export const API_BASE_URL =
  readEnv('VITE_API_BASE_URL') ??
  readEnv('REACT_APP_API_URL') ??
  (typeof location !== 'undefined' ? `${location.origin}/api` : 'http://localhost:3000/api');

export const API_KEY = '9757b040-0f25-4114-b4c9-74481206caca';

// Timeout par défaut pour les requêtes HTTP (ms)
export const DEFAULT_TIMEOUT_MS = 30_000;

// Pagination par défaut
export const DEFAULT_PAGE_SIZE = 20;

// Clés utilisées dans le localStorage/sessionStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'heracles.auth.token',
  THEME: 'heracles.theme',
  LOCALE: 'heracles.locale',
  LAST_SYNC: 'heracles.lastSync',
} as const;

// En-têtes et formats d'authentification
export const AUTH = {
  TOKEN_HEADER: 'Authorization',
  BEARER_PREFIX: 'Bearer ',
  REFRESH_IN_PROGRESS: 'heracles.auth.refreshInProgress',
} as const;

// Routes client standardisées
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  SETTINGS: '/settings',
  NOT_FOUND: '/404',
} as const;

// Expressions régulières et formats communs
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;

// Formats de date/heure (utiliser avec date-fns / luxon / dayjs selon le projet)
export const DATE_FORMATS = {
  ISO: "yyyy-MM-dd'T'HH:mm:ssXXX",
  SHORT_DATE: 'yyyy-MM-dd',
  HUMAN_READABLE: 'dd MMM yyyy',
} as const;

// Langues supportées côté client
export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;

// Flags de fonctionnalités (peuvent être écrasés par la configuration serveur)
export const FEATURE_FLAGS: Record<string, boolean> = {
  newDashboard: false,
  betaUsersOnly: false,
};

// Regroupe toutes les constantes pour import par défaut si besoin
const CONSTANTS = {
  APP_NAME,
  APP_VERSION,
  API_BASE_URL,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_PAGE_SIZE,
  STORAGE_KEYS,
  AUTH,
  ROUTES,
  REGEX,
  DATE_FORMATS,
  SUPPORTED_LANGUAGES,
  FEATURE_FLAGS,
};

export default CONSTANTS;