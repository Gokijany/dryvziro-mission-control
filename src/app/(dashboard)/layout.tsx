import type { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import SessionManager from "@/components/auth/SessionManager";

import { Sidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/shared/SidebarContext";
import { Footer } from "@/components/shared/Footer";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* Automatically logs out users when the access token expires */}
      <SessionManager />

      <SidebarProvider>
        <div className="flex min-h-screen bg-background">
          <Sidebar systemHealth={98} />

          <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
            {children}
            <Footer />
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}