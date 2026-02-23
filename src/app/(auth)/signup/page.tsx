import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <SignupForm />
      <p className="text-sm text-slate-400">
        Hai già un account? <Link className="text-emerald-300 underline" href="/login">Accedi</Link>
      </p>
    </div>
  );
}
