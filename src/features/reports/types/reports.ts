export interface RegulatoryAuditItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  date: string;
  imageBg?: string;
}

export interface RecentExportItem {
  id: string;
  filename: string;
  filesize: string;
  filetype: "PDF" | "EXCEL" | "CSV";
  modules: string[];
  format: string;
  generatedBy: string;
  date: string;
}

export interface ReportsData {
  audits: RegulatoryAuditItem[];
  recentExports: RecentExportItem[];
}