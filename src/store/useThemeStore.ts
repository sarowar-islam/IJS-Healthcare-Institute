import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggle: () => {
        const next = get().theme === "light" ? "dark" : "light";
        applyTheme(next);
        set({ theme: next });
      },
      set: (t) => { applyTheme(t); set({ theme: t }); },
    }),
    {
      name: "ijs-theme",
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? "light");
      },
    }
  )
);

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", t === "dark");
}

// Ensure light mode applied on first load (before persist rehydrates)
if (typeof document !== "undefined") {
  document.documentElement.classList.remove("dark");
}
