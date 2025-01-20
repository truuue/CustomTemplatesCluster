import Cookies from "js-cookie";

export const COOKIE_KEYS = {
  LOGIN_TOAST: "login_toast_shown",
  COOKIE_CONSENT: "cookie_consent",
  COOKIE_ANALYTICS: "cookie_analytics",
} as const;

export type CookieConsent = {
  essential: boolean;
  analytics: boolean;
};

export const cookies = {
  // Cookies essentiels (toujours acceptés)
  setLoginToast: () => {
    Cookies.set(COOKIE_KEYS.LOGIN_TOAST, "true", { expires: 1 });
  },

  hasShownLoginToast: () => {
    return Cookies.get(COOKIE_KEYS.LOGIN_TOAST) === "true";
  },

  removeLoginToast: () => {
    Cookies.remove(COOKIE_KEYS.LOGIN_TOAST);
  },

  // Gestion du consentement
  setCookieConsent: (consent: CookieConsent) => {
    // Les cookies essentiels sont toujours acceptés
    Cookies.set(COOKIE_KEYS.COOKIE_CONSENT, JSON.stringify(consent), {
      expires: 365,
    });

    // Si les cookies analytics sont refusés, on les supprime
    if (!consent.analytics) {
      Cookies.remove(COOKIE_KEYS.COOKIE_ANALYTICS);
    }
  },

  getCookieConsent: (): CookieConsent | null => {
    const consent = Cookies.get(COOKIE_KEYS.COOKIE_CONSENT);
    return consent ? JSON.parse(consent) : null;
  },

  // Cookies analytics
  setAnalyticsCookie: (value: string) => {
    const consent = cookies.getCookieConsent();
    if (consent?.analytics) {
      Cookies.set(COOKIE_KEYS.COOKIE_ANALYTICS, value, { expires: 365 });
    }
  },
};
