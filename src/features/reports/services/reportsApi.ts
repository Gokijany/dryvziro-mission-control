import type { ReportsData } from "../types/reports";

export const reportsApi = {
  getReportsData: async (): Promise<ReportsData> => {
    return {
      audits: [
        {
          id: "audit-1",
          badge: "2023 FISCAL",
          title: "Annual Carbon Accountability",
          description: "Complete breakdown of scope 1 and 2 emissions for the global fle...",
          date: "Dec 31, 2023",
        },
        {
          id: "audit-2",
          badge: "Q4 AUDIT",
          title: "Fleet Efficiency Audit",
          description: "Detailed comparative analysis between combustion and electric...",
          date: "Jan 15, 2024",
        },
        {
          id: "audit-3",
          badge: "INTERNAL AI",
          title: "Climate Impact Projection",
          description: "AI-driven foresight report estimating carbon tax savings for...",
          date: "Feb 02, 2024",
        },
      ],
      recentExports: [
        {
          id: "exp-1",
          filename: "EMISSIONS_Q4_FINAL_V2.pdf",
          filesize: "24.8 MB • Clean Copy",
          filetype: "PDF",
          modules: ["EMISSIONS", "ROUTES"],
          format: "PDF / MRV",
          generatedBy: "Alex Thompson\n(Head Admin)",
          date: "Today,\n09:42 AM",
        },
        {
          id: "exp-2",
          filename: "MAINTENANCE_LOG_JAN24.xlsx",
          filesize: "1.2 MB • raw_data",
          filetype: "EXCEL",
          modules: ["MAINTENANCE"],
          format: "Excel",
          generatedBy: "System Automation",
          date: "Yesterday,\n11:15 PM",
        },
        {
          id: "exp-3",
          filename: "FUEL_USAGE_TRENDS_MOBILE.csv",
          filesize: "450 KB • Optimized",
          filetype: "CSV",
          modules: ["FUEL", "EFFICIENCY"],
          format: "CSV",
          generatedBy: "Dryvziro AI Bot",
          date: "Feb 22,\n2024",
        },
      ],
    };
  },
};