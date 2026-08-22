/* Theme runtime (DECISIONS #40) — the single source of truth for applying,
   storing, and reading the theme. The <html> data-theme attribute is what
   CSS responds to; localStorage ("theme") is only the persistence layer.
   Dark is always the default: an absent/invalid stored value means dark,
   never prefers-color-scheme. */

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

const THEME_META_COLORS: Record<Theme, string> = {
  dark: "#0B0C0E",
  light: "#F3F0E8",
};

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode etc.) — theme still applies for
    // the session, it just will not persist.
  }
}

/* Applies the attribute the token system responds to and keeps the browser
   chrome (status/address bar) color in step. */
export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_META_COLORS[theme]);
}
