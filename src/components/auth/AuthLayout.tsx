import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#08120B] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Branding Panel */}
        <section className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-[#08120B] via-[#102414] to-[#0D1B10]">
          <div>
            <h1 className="text-4xl font-bold text-[#B4E920]">
              Dryvziro
            </h1>

            <p className="mt-2 text-gray-400">
              Mission Control Platform
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold leading-tight">
              AI-Powered Fleet Intelligence
            </h2>

            <p className="mt-6 max-w-lg text-lg text-gray-400 leading-8">
              Monitor vehicles, optimize operations, predict maintenance,
              and manage your fleet through one intelligent platform.
            </p>

            <div className="mt-10 space-y-4">
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

        {/* Right Authentication Panel */}
        <section className="flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
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
      <div className="h-2 w-2 rounded-full bg-[#B4E920]" />
      <span className="text-gray-300">{text}</span>
    </div>
  );
}