import { FileText, Table, FileSpreadsheet, Download } from "lucide-react";

export function QuickExportCard() {
  const exports = [
    { title: "MRV Protocol PDF", subtitle: "OFFICIAL REGULATORY REPORT", icon: FileText },
    { title: "Raw Analytics Excel", subtitle: "FULL DATA STRUCTURE", icon: FileSpreadsheet },
    { title: "Compliance CSV", subtitle: "FLAT FILE INTEGRATION", icon: Table },
  ];

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <span className="text-[10px] font-bold tracking-widest text-primary">QUICK EXPORT</span>
        <p className="text-xs text-muted-foreground mt-1 mb-4 leading-relaxed">
          Export the current system state to your preferred regulatory format.
        </p>
      </div>

      <div className="space-y-3">
        {exports.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="group flex items-center justify-between rounded-lg border border-border/80 bg-background p-3 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                  <span className="text-[9px] font-semibold tracking-wider text-muted-foreground">{item.subtitle}</span>
                </div>
              </div>
              <button 
                type="button"
                className="rounded-md p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label={`Download ${item.title}`}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}