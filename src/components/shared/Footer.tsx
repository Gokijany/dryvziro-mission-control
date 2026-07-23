import { Leaf } from "lucide-react";

export interface FooterProps {
  dataNodesActive?: number;
  carbonIndex?: string;
}

export function Footer({ dataNodesActive = 1248, carbonIndex = "PRIME-A1" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Leaf className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span>© {year} Dryvziro Climate Intelligence</span>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <div className="text-[9px] font-semibold tracking-widest text-muted-foreground">
              DATA NODES
            </div>
            <div className="mt-0.5 text-[12px] font-medium text-foreground">
              {dataNodesActive.toLocaleString()} Active
            </div>
          </div>
          <div>
            <div className="text-[9px] font-semibold tracking-widest text-muted-foreground">
              CARBON INDEX
            </div>
            <div className="mt-0.5 text-[12px] font-medium text-primary">{carbonIndex}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;