import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

export function FormErrorBanner({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-white p-3 text-[13px] text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
      <span>{children}</span>
    </div>
  );
}

export default FormErrorBanner;