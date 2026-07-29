import { Header } from "@/components/shared/Header";
import AnalyticsDashboard from "@/features/analytics/components/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Analytics" />

      <div className="flex-1 p-4 sm:p-6">
        <AnalyticsDashboard />
      </div>
    </div>
  );
}