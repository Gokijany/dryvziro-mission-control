import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#08120B] text-white">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        {/* ================= LEFT PANEL ================= */}
        <section className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#08120B] via-[#102414] to-[#0D1B10] px-10 py-12 xl:px-16 2xl:px-24">
          <div>
            <h1 className="text-3xl font-bold text-[#B4E920] xl:text-4xl">
              Dryvziro
            </h1>

            <p className="mt-2 text-sm text-gray-400 xl:text-base">
              Mission Control Platform
            </p>
          </div>

          <div className="max-w-xl">
            <h2 className="text-4xl font-bold leading-tight xl:text-5xl 2xl:text-6xl">
              AI-Powered Fleet Intelligence
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-400 xl:text-lg xl:leading-8">
              Monitor vehicles, optimize operations, predict maintenance,
              and manage your fleet through one intelligent platform.
            </p>

            <div className="mt-10 space-y-5">
              <Feature text="Real-time Fleet Tracking" />
              <Feature text="Predictive Maintenance" />
              <Feature text="Fuel Analytics" />
              <Feature text="AI Insights" />
            </div>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 Dryvziro Mission Control
          </div>
        </section>

        {/* ================= RIGHT PANEL ================= */}
        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 md:px-10 lg:px-12 xl:px-16">
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-6
              shadow-2xl
              backdrop-blur-xl
              sm:p-8
              lg:max-w-lg
            "
          >
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 w-2.5 rounded-full bg-[#B4E920]" />

      <span className="text-sm text-gray-300 xl:text-base">
        {text}
      </span>
    </div>
  );
}