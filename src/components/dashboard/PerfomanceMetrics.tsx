"use client";

const metrics = [
  {
    title: "Fleet Utilization",
    value: 91,
    color: "#05A653",
  },
  {
    title: "Trip Completion",
    value: 98,
    color: "#05A653",
  },
  {
    title: "Fuel Efficiency",
    value: 86,
    color: "#3B82F6",
  },
  {
    title: "Driver Safety",
    value: 94,
    color: "#F59E0B",
  },
];

export default function PerformanceMetrics() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">
          Performance Metrics
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Fleet operational performance indicators.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-xl border border-border bg-background p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">
                {metric.title}
              </span>

              <span className="text-lg font-bold">
                {metric.value}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${metric.value}%`,
                  background: metric.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}