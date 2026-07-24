export function VehicleDetailTabPlaceholder({ tabLabel }: { tabLabel: string }) {
  return (
    <div className="flex min-h-50 items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
      <p className="text-[13px] text-muted-foreground">
        The <span className="font-medium text-foreground">{tabLabel}</span> tab is coming soon.
      </p>
    </div>
  );
}

export default VehicleDetailTabPlaceholder;