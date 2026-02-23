"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabaseBrowser";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const supabase = supabaseBrowserClient();

  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { email, password, full_name, company_name } = form;
    const { error: signUpError, data } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name,
        company_name
      });
      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    setSuccess("Account creato! Ti stiamo portando alla dashboard...");
    setLoading(false);
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(["full_name", "company_name", "email", "password"] as const).map((key) => (
        <div key={key} className="space-y-2">
          <label className="text-sm text-slate-300">
            {key === "full_name"
              ? "Nome e cognome"
              : key === "company_name"
              ? "Azienda"
              : key === "email"
              ? "Email"
              : "Password"}
          </label>
          <input
            type={key === "password" ? "password" : key === "email" ? "email" : "text"}
            required
            value={form[key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-emerald-300 focus:outline-none"
          />
        </div>
      ))}
      {error && <p className="text-sm text-rose-400">{error}</p>}
      {success && <p className="text-sm text-emerald-300">{success}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-emerald-400/90 py-3 font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:opacity-60"
      >
        {loading ? "Creazione in corso..." : "Crea account"}
      </button>
    </form>
  );
}
