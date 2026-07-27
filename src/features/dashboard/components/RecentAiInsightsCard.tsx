import { MoreHorizontal, TrendingUp, Sparkles, Activity } from "lucide-react";
import type { AiInsightItem } from "../types/dashboard";

interface Props {
  insights: AiInsightItem[];
}

export function RecentAiInsightsCard({ insights }: Props) {
  const getIcon = (category: string) => {
    if (category.includes("EMISSIONS")) return TrendingUp;
    if (category.includes("OPTIMIZATION")) return Sparkles;
    return Activity;
  };

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Recent AI Insights
        </h2>
        <MoreHorizontal className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </div>

      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = getIcon(item.category);
          return (
            <div key={item.id} className="rounded-lg border border-border/50 bg-background/50 p-4 shadow-sm flex items-start gap-3">
              <div className="rounded-md bg-primary/10 p-2 text-primary mt-0.5">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-primary">{item.category}</span>
                  <span className="text-[10px] font-medium text-muted-foreground">{item.timestamp}</span>
                </div>
                <p className="text-xs text-foreground mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}