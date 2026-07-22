import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";
import { Header } from "@/components/shared/Header";

export type ComingSoonStage = "planned" | "in-development" | "launch";

export interface ComingSoonPageProps {
  pageName: string;
  /** e.g. "MOD-05" — shown as a small technical readout above the heading */
  moduleCode?: string;
  /** One line describing what this module will actually do */
  description: string;
  stage?: ComingSoonStage;
  backHref?: string;
  backLabel?: string;
}

const STAGES: { id: ComingSoonStage; label: string }[] = [
  { id: "planned", label: "Planned" },
  { id: "in-development", label: "In Development" },
  { id: "launch", label: "Launch" },
];

function deriveModuleCode(pageName: string): string {
  const sum = pageName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `MOD-${String((sum % 89) + 10).padStart(2, "0")}`;
}

export function ComingSoonPage({
  pageName,
  moduleCode,
  description,
  stage = "in-development",
  backHref = "/vehicles",
  backLabel = "Back to Vehicle Directory",
}: ComingSoonPageProps) {
  const code = moduleCode ?? deriveModuleCode(pageName);
  const stageIndex = STAGES.findIndex((s) => s.id === stage);

  return (
    <div className="flex flex-1 flex-col">
      <Header title={pageName} />

      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-xl border border-border bg-card px-6 py-10 text-center sm:px-10">
          {/* Signature: pulsing signal rings, like a device establishing connection */}
          <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center">
            <span className="radar-ring absolute inset-0 rounded-full border border-primary/60" />
            <span
              className="radar-ring absolute inset-0 rounded-full border border-primary/60"
              style={{ animationDelay: "0.9s" }}
            />
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
              <Radio className="h-4.5 w-4.5 text-primary" strokeWidth={1.75} />
            </span>
          </div>

          <div className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground">
            {code} · STANDBY
          </div>
          <h2 className="mt-2 text-xl font-semibold text-foreground">{pageName}</h2>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            This module hasn&apos;t been provisioned yet. {description}
          </p>

          {/* Stage tracker — a real build sequence, not decoration */}
          <div className="mx-auto mt-7 flex max-w-[280px] items-center">
            {STAGES.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center last:flex-initial">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      i < stageIndex
                        ? "bg-success"
                        : i === stageIndex
                          ? "bg-primary"
                          : "bg-muted"
                    } ${i === stageIndex ? "ring-4 ring-primary/20" : ""}`}
                  />
                  <span
                    className={`text-[9px] font-medium tracking-wide ${
                      i <= stageIndex ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <span
                    className={`mx-1.5 mb-4 h-px flex-1 ${
                      i < stageIndex ? "bg-success" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Link
            href={backHref}
            className="mt-8 inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonPage;