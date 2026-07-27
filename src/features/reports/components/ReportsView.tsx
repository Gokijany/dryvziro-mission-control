"use client";

import { Header } from "@/components/shared/Header";
import { DynamicReportGeneratorCard } from "./DynamicReportGeneratorCard";
import { QuickExportCard } from "./QuickExportCard";
import { RegulatoryAuditsSection } from "./RegulatoryAuditsSection";
import { RecentExportsTable } from "./RecentExportsTable";
import { useReportsData } from "../hooks/useReports";
import { Loader2 } from "lucide-react";

export function ReportsView() {
  const { data, isLoading } = useReportsData();

  if (isLoading || !data) {
    return (
      <div className="flex flex-1 flex-col">
        <Header title="Reports & Compliance" />
        <div className="flex h-96 items-center justify-center text-xs font-semibold text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading Reports & Compliance...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-border/80 px-4 sm:px-6 lg:px-8 py-4">
        <Header title="Reports & Compliance" searchPlaceholder="Search audit logs..." />
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground ml-4 shrink-0">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          LIVE AUDIT SYNC ACTIVE
        </div>
      </div>

      <div className="flex-1 space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Top Split: Dynamic Generator + Quick Export */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <DynamicReportGeneratorCard />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <QuickExportCard />
          </div>
        </div>

        {/* Regulatory Audits & Performance Cards */}
        <RegulatoryAuditsSection audits={data.audits} />

        {/* Recent Exports Table */}
        <RecentExportsTable exportsList={data.recentExports} />

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/40 pt-6 text-[10px] font-medium text-muted-foreground">
          <span>DRYVZIRO COMPLIANCE ENGINE v4.2.1</span>
          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <span className="hover:text-foreground cursor-pointer transition-colors">ENCRYPTION PROTOCOL</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">AUDIT PRIVACY</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">API DOCS</span>
          </div>
        </div>
      </div>
    </div>
  );
}