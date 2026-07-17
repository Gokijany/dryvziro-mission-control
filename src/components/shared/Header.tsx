"use client";

import { Search, Cloud, Heart } from "lucide-react";
import type { ReactNode } from "react";

export interface HeaderAction {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface HeaderProps {
  title: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  /** Optional override for the icon buttons on the right. Defaults to Cloud sync + Favorites. */
  actions?: HeaderAction[];
}

const defaultActions: HeaderAction[] = [
  { icon: <Cloud className="h-4 w-4" />, label: "Sync status" },
  { icon: <Heart className="h-4 w-4" />, label: "Favorites" },
];

export function Header({
  title,
  searchPlaceholder = "Search...",
  onSearchChange,
  actions = defaultActions,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-64 rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50"
          />
        </div>

        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            aria-label={action.label}
            onClick={action.onClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            {action.icon}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Header;