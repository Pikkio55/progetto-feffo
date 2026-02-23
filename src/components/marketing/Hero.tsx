"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Invio in corso...");
    const { error } = await supabase.from("early_access").insert({ email });
    if (error) setStatus("Errore: " + error.message);
    else {
      setStatus("Ricevuto! Ti inviamo l'accesso a breve.");
      setEmail("");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 px-4 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300">
            <PhoneCall size={14} /> Voice Agents 24/7
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Il tuo centralino AI che riceve <span className="text-emerald-300">appuntamenti 24/7</span>
          </h1>
          <p className="text-lg text-slate-200">
            Progetto Feffo trasforma Twilio + ElevenLabs in un agente telefonico sempre attivo: accoglie i clienti, risponde alle domande e agenda gli appuntamenti direttamente sul tuo calendario.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#pricing"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-emerald-200"
            >
              Prova gratuita
              <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white/90 hover:border-emerald-300"
            >
              Ascolta una demo
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleJoin}
          className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-slate-900/40 p-6"
        >
          <p className="text-sm uppercase tracking-wide text-slate-400">Early access</p>
          <h3 className="text-xl font-semibold text-white">Prenota il tuo posto nella beta privata</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@azienda.com"
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white focus:border-emerald-300 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-400/90 py-3 font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            Registrami
          </button>
          {status && <p className="text-xs text-slate-300">{status}</p>}
          <p className="text-xs text-slate-500">
            Nessuno spam. Ti scriviamo appena il tuo agente è pronto, configurato con Twilio e ElevenLabs.
          </p>
        </form>
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle,rgba(16,185,129,0.15),transparent_60%)]" />
    </section>
  );
}
