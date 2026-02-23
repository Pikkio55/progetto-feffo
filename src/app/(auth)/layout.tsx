import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-8 px-4 py-16">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Progetto Feffo</p>
          <h1 className="text-3xl font-semibold">Accedi al tuo account</h1>
          <p className="text-slate-400">Gestisci agenti, appuntamenti e chiamate dal tuo pannello SaaS.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
