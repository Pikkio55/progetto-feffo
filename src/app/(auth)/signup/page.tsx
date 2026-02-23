import Link from "next/link";
import { Suspense } from "react";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<p className="text-slate-400">Caricamento...</p>}>
        <SignupForm />
      </Suspense>
      <p className="text-sm text-slate-400">
        Hai già un account? <Link className="text-emerald-300 underline" href="/login">Accedi</Link>
      </p>
    </div>
  );
}
