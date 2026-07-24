import { Sparkles, ArrowUpRight } from "lucide-react";

interface ReliabilityInsightsCardProps {
  message: string;
  reportHref: string;
}

export function ReliabilityInsightsCard({ message, reportHref }: ReliabilityInsightsCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
          RELIABILITY INSIGHTS
        </div>
        <Sparkles className="h-4 w-4 text-primary" />
      </div>

      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-foreground">{message}</p>

      <a
        href={reportHref}
        className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-primary hover:underline"
      >
        VIEW PREDICTION REPORT
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

export default ReliabilityInsightsCard;