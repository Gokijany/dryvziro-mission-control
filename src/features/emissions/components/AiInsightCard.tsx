import { Wind, ArrowRight } from "lucide-react";

export function AiInsightCard() {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-5 shadow-sm flex flex-col justify-between flex-1">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
          <Wind className="h-4 w-4" /> AI INSIGHT
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          &ldquo;Optimizing Route #42-B during peak humidity levels could reduce local particulate matter (PM2.5) by <span className="text-foreground font-medium">14.5%</span> next week.&rdquo;
        </p>
      </div>
      <button className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
        DEPLOY OPTIMIZATION <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}