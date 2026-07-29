"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon: LucideIcon;
}

export default function SummaryCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
}: SummaryCardProps) {
  const positive = trend === undefined || trend >= 0;

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-border
        bg-card
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:border-primary/30
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          <Icon className="h-6 w-6" />
        </div>

        {trend !== undefined && (
          <div
            className={`
              flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium
              ${
                positive
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              }
            `}
          >
            {positive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}

            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </h3>

        <p className="mt-2 text-sm font-medium text-foreground">
          {title}
        </p>

        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}