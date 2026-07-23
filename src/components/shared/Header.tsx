"use client";

import { Search, Cloud, Heart, Bell, Menu } from "lucide-react";
import type { ReactNode } from "react";
import { useSidebar } from "./SidebarContext";

export interface HeaderAction {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface HeaderProfile {
  name: string;
  avatarUrl?: string;
  onClick?: () => void;
}

export interface HeaderProps {
  title: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  /** Optional override for the icon buttons on the right. Defaults to Cloud sync + Favorites + Notifications. */
  actions?: HeaderAction[];
  /**
   * Profile avatar shown at the far right of the header. Defaults to a
   * generic placeholder — pass real user data once auth.store is wired in.
   */
  profile?: HeaderProfile;
}

const defaultActions: HeaderAction[] = [
  { icon: <Cloud className="h-4 w-4" />, label: "Sync status" },
  { icon: <Heart className="h-4 w-4" />, label: "Favorites" },
  { icon: <Bell className="h-4 w-4" />, label: "Notifications" },
];

const defaultProfile: HeaderProfile = { name: "Admin" };

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  return initials.toUpperCase();
}

export function Header({
  title,
  searchPlaceholder = "Search...",
  onSearchChange,
  actions = defaultActions,
  profile = defaultProfile,
}: HeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex flex-col gap-3 border-b border-border bg-background px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
        <h1 className="text-base font-semibold text-foreground sm:text-lg">{title}</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:flex-none">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50 sm:w-64"
          />
        </div>

        <div className="flex items-center gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              onClick={action.onClick}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {action.icon}
            </button>
          ))}

          <button
            type="button"
            onClick={profile.onClick}
            aria-label={`${profile.name} profile`}
            className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-input bg-primary/15 text-[11px] font-semibold text-primary transition-colors hover:border-primary/40"
          >
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{getInitials(profile.name)}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;