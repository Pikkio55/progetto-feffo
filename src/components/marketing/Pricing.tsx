const tiers = [
  {
    name: "Starter",
    price: "€149/m",
    highlights: [
      "1 numero Twilio incluso",
      "Fino a 500 chiamate/mese",
      "1 voce ElevenLabs",
      "Agenda Google/Outlook"
    ]
  },
  {
    name: "Growth",
    price: "€349/m",
    highlights: [
      "3 numeri + IVR multi-lingua",
      "Lead routing + CRM webhook",
      "Follow-up SMS/email",
      "Report settimanali"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    highlights: [
      "SLA 24/7, multi-sede",
      "Studio voce dedicato",
      "Compliance/GDPR checklist",
      "Supporto onboarding"
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Piani</p>
        <h2 className="text-3xl font-semibold text-white">Parti in poche ore, scala quanto vuoi</h2>
        <p className="text-slate-300">Ogni piano include onboarding guidato su Twilio & ElevenLabs e accesso al nostro team.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{tier.name}</p>
            <p className="mt-3 text-4xl font-semibold text-white">{tier.price}</p>
            <ul className="mt-6 space-y-2 text-slate-300">
              {tier.highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-full bg-white/90 py-3 font-semibold text-slate-900 hover:bg-emerald-200">
              Prenota setup
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
