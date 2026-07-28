"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Cloud, Heart, Bell, Menu, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/features/auth/hooks/useAuth";

export interface HeaderAction {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface HeaderProfile {
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface HeaderProps {
  title: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  /** Optional override for the icon buttons on the right. Defaults to Cloud sync + Favorites + Notifications. */
  actions?: HeaderAction[];
  /**
   * Optional override for the displayed name/email/avatar. Defaults to
   * the logged-in user from useAuth(). Logout always works regardless
   * of this override — it's a display-only prop, not an auth override.
   */
  profile?: HeaderProfile;
}

const defaultActions: HeaderAction[] = [
  { icon: <Cloud className="h-4 w-4" />, label: "Sync status" },
  { icon: <Heart className="h-4 w-4" />, label: "Favorites" },
  { icon: <Bell className="h-4 w-4" />, label: "Notifications" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  return initials.toUpperCase() || "?";
}

export function Header({
  title,
  searchPlaceholder = "Search...",
  onSearchChange,
  actions = defaultActions,
  profile,
}: HeaderProps) {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const resolvedProfile: HeaderProfile = profile ?? {
    name: user?.full_name ?? "Account",
    email: user?.email,
  };

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

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
          {/* {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              onClick={action.onClick}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {action.icon}
            </button>
          ))} */}

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              aria-label={`${resolvedProfile.name} profile menu`}
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
              className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-input bg-primary/15 text-[11px] font-semibold text-primary transition-colors hover:border-primary/40"
            >
              {resolvedProfile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolvedProfile.avatarUrl}
                  alt={resolvedProfile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{getInitials(resolvedProfile.name)}</span>
              )}
            </button>

            {isProfileMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg"
              >
                <div className="border-b border-border px-3 py-2.5">
                  <div className="truncate text-[13px] font-medium text-foreground">
                    {resolvedProfile.name}
                  </div>
                  {resolvedProfile.email && (
                    <div className="truncate text-[11px] text-muted-foreground">
                      {resolvedProfile.email}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;