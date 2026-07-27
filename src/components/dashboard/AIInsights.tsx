"use client";

import {
  Sparkles,
  Lightbulb,
} from "lucide-react";

const insights = [
  "Fuel consumption increased by 7% compared to yesterday.",
  "Vehicle DV-318 is likely to require maintenance within 5 days.",
  "Recommended route optimization could reduce emissions by approximately 12%.",
];

export default function AIInsights() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <div className="mb-5 flex items-center gap-3">
        <Sparkles className="text-primary" />

        <div>
          <h2 className="font-semibold">
            Climate AI Insights
          </h2>

          <p className="text-sm text-muted-foreground">
            AI-generated operational recommendations
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((tip, index) => (
          <div
            key={index}
            className="flex gap-3 rounded-xl bg-background p-4"
          >
            <Lightbulb
              className="mt-1 text-primary"
              size={18}
            />

            <p className="text-sm leading-relaxed">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}