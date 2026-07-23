interface HealthScoreBarProps {
  score: number;
}

function getScoreColorClass(score: number): string {
  if (score >= 80) return "bg-success";
  if (score >= 50) return "bg-warning";
  return "bg-destructive";
}

export function HealthScoreBar({ score }: HealthScoreBarProps) {
  const clamped = Math.min(100, Math.max(0, score));

  return (
    <div className="flex items-center gap-2.5">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${getScoreColorClass(clamped)}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-[13px] font-medium text-foreground">{clamped}</span>
    </div>
  );
}

export default HealthScoreBar;