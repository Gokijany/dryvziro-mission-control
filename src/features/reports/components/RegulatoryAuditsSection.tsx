import { ExternalLink } from "lucide-react";
import type { RegulatoryAuditItem } from "../types/reports";

interface Props {
  audits: RegulatoryAuditItem[];
}

export function RegulatoryAuditsSection({ audits }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Regulatory Audits & Performance Cards
        </h2>
        <button type="button" className="text-xs font-bold text-primary hover:underline">
          VIEW ARCHIVE →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {audits.map((audit) => (
          <div
            key={audit.id}
            className="group rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm flex flex-col justify-between"
          >
            {/* Image / Graphic header preview */}
            <div className="relative h-36 w-full bg-background/80 border-b border-border/60 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {audit.badge}
                </span>
                <button
                  type="button"
                  className="rounded-md bg-card/80 p-1.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-sm font-bold text-foreground">{audit.title}</h3>
                <p className="text-xs text-foreground mt-1.5 leading-relaxed">
                  {audit.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[10px] font-medium text-foreground border-t border-border/40 pt-3">
                <span>📅</span>
                <span>{audit.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
