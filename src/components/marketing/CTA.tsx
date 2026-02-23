import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="rounded-3xl border border-white/10 bg-emerald-500/10 p-10 text-center">
      <h3 className="text-3xl font-semibold text-white">Pronto a lanciare il tuo agente vocale?</h3>
      <p className="mt-3 text-lg text-emerald-100">
        Configuriamo Twilio + ElevenLabs + Supabase in 48 ore. Nessun costo di setup se non sei soddisfatto.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link
          href="mailto:ciao@feffo.ai"
          className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-emerald-200"
        >
          Parla con noi
          <ArrowRight size={18} className="ml-2" />
        </Link>
        <Link
          href="#demo"
          className="inline-flex items-center rounded-full border border-white px-6 py-3 font-semibold text-white"
        >
          Guarda un flusso completo
        </Link>
      </div>
    </section>
  );
}
