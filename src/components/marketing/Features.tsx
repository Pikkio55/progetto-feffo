import { Bot, CalendarClock, Headset, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Agente vocale personalizzato",
    description: "Scegli la voce ElevenLabs, carica script e FAQ. L'agente si aggiorna automaticamente."
  },
  {
    icon: CalendarClock,
    title: "Agenda integrata",
    description: "Collega Google Calendar o Cal.com: ogni chiamata può fissare appuntamenti reali."
  },
  {
    icon: Headset,
    title: "Twilio ready",
    description: "Supporto per numeri locali, IVR, fallback verso operatori umani e call recording."
  },
  {
    icon: ShieldCheck,
    title: "Compliance europea",
    description: "Logging sicuro su Supabase/Postgres, retention configurabile e audit trail."
  }
];

export function Features() {
  return (
    <section id="features" className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Perché Feffo</p>
        <h2 className="text-3xl font-semibold text-white">Sostituisci il call center con un flusso orchestrato</h2>
        <p className="text-slate-300">
          Configuriamo Twilio + ElevenLabs per gestire appuntamenti, qualificare lead e inoltrare conversazioni calde. Tutto dal tuo pannello SaaS.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <feature.icon className="mb-3 text-emerald-300" />
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
