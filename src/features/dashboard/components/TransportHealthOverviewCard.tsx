export function TransportHealthOverviewCard() {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Transport Health Overview</h2>
          <span className="text-[10px] text-muted-foreground tracking-wider uppercase">NETWORK PERFORMANCE VS CLIMATE IMPACT (24H)</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-semibold tracking-wider">
          <span className="flex items-center gap-1.5 text-foreground"><span className="h-2 w-2 rounded-full bg-primary" /> EFFICIENCY</span>
          <span className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2 w-2 rounded-full bg-muted-foreground/40" /> EMISSIONS</span>
        </div>
      </div>

      <div className="relative h-64 w-full flex items-end">
        {/* Custom Bar/Area Graph Mock matching screenshot */}
        <div className="absolute inset-0 flex items-end justify-between gap-1 px-2">
          {[40, 50, 70, 85, 95, 95, 90, 88, 92, 95, 95, 95].map((val, i) => (
            <div key={i} className="w-full bg-primary/90 rounded-t-sm transition-all" style={{ height: `${val}%` }} />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between text-[10px] font-medium text-muted-foreground border-t border-border/40 pt-2">
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>00:00</span>
        <span>06:00</span>
      </div>
    </div>
  );
}