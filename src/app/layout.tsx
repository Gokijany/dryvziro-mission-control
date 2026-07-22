import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Dryvziro Mission Control",
  description: "Vehicle Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}