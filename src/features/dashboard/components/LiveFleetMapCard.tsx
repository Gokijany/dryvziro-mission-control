"use client";

import { useRouter } from "next/navigation";

export function LiveFleetMapCard() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/dashboard/live-map");
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between h-full min-h-80 rounded-xl border border-border/80 bg-card p-5 shadow-sm cursor-pointer overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-4 z-10">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          Live Fleet Map <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
        </h2>
        <span className="text-[10px] font-semibold tracking-wider text-primary group-hover:underline">
          LIVE TRACKING
        </span>
      </div>

      {/* Simulated Map Background */}
      <div className="absolute inset-0 bg-background/80 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <div className="relative h-full w-full opacity-60">
          {/* Simulated node pins */}
          <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--lime)]" />
          <div className="absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--lime)]" />
          <div className="absolute bottom-1/3 left-1/3 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--lime)]" />
          <div className="absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--lime)]" />
        </div>
      </div>

      <div className="mt-auto z-10 pt-8">
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/dashboard/live-map");
          }}
          className="w-full rounded-lg border border-primary/40 bg-card/80 py-2.5 text-center text-[11px] font-semibold tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
        >
          OPEN GLOBAL SATELLITE VIEW
        </button>
      </div>
    </div>
  );
}