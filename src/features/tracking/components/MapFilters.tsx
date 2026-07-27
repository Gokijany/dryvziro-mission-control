import { Calendar, MapPin, Users, ChevronDown, X } from "lucide-react";

function FilterButton({ icon: Icon, label }: { icon: typeof Calendar; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0b100c]/90 px-3 py-2 text-[12px] font-medium text-white/70 backdrop-blur-sm transition-colors hover:text-white"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

export function MapFilters() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <FilterButton icon={Calendar} label="May 24, 2024" />
        <FilterButton icon={MapPin} label="Greater London" />
        <FilterButton icon={Users} label="All Operators" />
      </div>

      {/* Active filter chip example - wire to real filter state once filters are functional */}
      <div className="flex items-center gap-1.5 self-start rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5 text-[11px] font-medium text-primary">
        Fuel: EV/Hybrid
        <button type="button" aria-label="Clear filter" className="hover:text-primary-foreground">
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default MapFilters;