"use client";

export type VehicleDetailTab =
  | "overview"
  | "trips"
  | "emissions"
  | "fuel"
  | "maintenance"
  | "sensor"
  | "documents";

const TABS: { id: VehicleDetailTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "trips", label: "Trips" },
  { id: "emissions", label: "Emissions" },
  { id: "fuel", label: "Fuel" },
  { id: "maintenance", label: "Maintenance" },
  { id: "sensor", label: "Sensor" },
  { id: "documents", label: "Documents" },
];

interface VehicleDetailTabsProps {
  activeTab: VehicleDetailTab;
  onChange: (tab: VehicleDetailTab) => void;
}

export function VehicleDetailTabs({ activeTab, onChange }: VehicleDetailTabsProps) {
  return (
    <div className="overflow-x-auto border-b border-border">
      <div className="flex min-w-max items-center gap-6 px-1">
        {TABS.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`whitespace-nowrap border-b-2 pb-3 pt-1 text-[12px] font-semibold tracking-wide transition-colors ${
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VehicleDetailTabs;