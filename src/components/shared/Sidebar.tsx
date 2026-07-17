"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  LayoutGrid,
  Truck,
  Route as RouteIcon,
  Users,
  Map,
  Wind,
  Fuel,
  Wrench,
  Sparkles,
  BarChart3,
  FileText,
  Bell,
  Settings,
  UserCircle2,
  Leaf,
} from "lucide-react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

// Central place to add/remove/reorder nav entries for the whole app.
const MAIN_NAV: NavItem[] = [
  { label: "Mission Control", href: "/", icon: LayoutGrid },
  { label: "Vehicles", href: "/vehicles", icon: Truck },
  { label: "Trips", href: "/trips", icon: RouteIcon },
  { label: "Drivers", href: "/drivers", icon: Users },
  { label: "Routes", href: "/routes", icon: Map },
  { label: "Emissions", href: "/emissions", icon: Wind },
  { label: "Fuel", href: "/fuel", icon: Fuel },
  { label: "Maintenance", href: "/maintenance", icon: Wrench },
  { label: "Climate AI", href: "/climate-ai", icon: Sparkles },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Reports", href: "/reports", icon: FileText },
];

const BOTTOM_NAV: NavItem[] = [
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Administrator", href: "/administrator", icon: UserCircle2 },
];

export interface SidebarProps {
  /** 0-100. Drives the System Health bar at the bottom of the main nav. */
  systemHealth?: number;
}

export function Sidebar({ systemHealth = 100 }: SidebarProps) {
  const pathname = usePathname();

  const renderLink = (item: NavItem) => {
    const active = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
          active
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-foreground/85"
        }`}
      >
        <Icon className="h-[17px] w-[17px] shrink-0" strokeWidth={2} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-3 py-5">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2.5 px-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary">
          <Leaf className="h-[18px] w-[18px] text-sidebar-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-semibold text-primary">Dryvziro</div>
          <div className="text-[9px] font-medium tracking-[0.14em] text-sidebar-foreground/35">
            CLIMATE INTELLIGENCE
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto">
        {MAIN_NAV.map(renderLink)}
      </nav>

      {/* System health */}
      <div className="my-4 border-t border-sidebar-border px-2 pt-4">
        <div className="mb-1.5 flex items-center justify-between text-[9px] font-semibold tracking-[0.12em] text-sidebar-foreground/35">
          <span>SYSTEM HEALTH</span>
          <span className="text-primary">{systemHealth}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-sidebar-foreground/10">
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${Math.min(100, Math.max(0, systemHealth))}%` }}
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="space-y-0.5 border-t border-sidebar-border pt-3">
        {BOTTOM_NAV.map(renderLink)}
      </div>
    </aside>
  );
}

export default Sidebar;