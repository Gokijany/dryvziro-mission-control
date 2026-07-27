import type { ReactNode } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/shared/SidebarContext";
import { Footer } from "@/components/shared/Footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar systemHealth={98} />

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {children}
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
}