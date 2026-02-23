import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<p className="text-slate-400">Caricamento...</p>}>
        <LoginForm />
      </Suspense>
      <p className="text-sm text-slate-400">
        Non hai un account? <Link className="text-emerald-300 underline" href="/signup">Registrati</Link>
      </p>
    </div>
  );
}
