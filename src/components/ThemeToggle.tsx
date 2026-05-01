import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";

export const ThemeToggle = () => {
  const { theme, toggle } = useThemeStore();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full hover:bg-secondary"
    >
      {theme === "light"
        ? <Moon className="h-[1.2rem] w-[1.2rem]" />
        : <Sun className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
};
