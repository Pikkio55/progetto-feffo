import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { VoiceAgentForm } from "@/components/dashboard/VoiceAgentForm";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: voiceAgents }, { data: appointments }, { data: callLogs }] = await Promise.all([
    supabase.from("profiles").select("full_name, company_name").eq("id", user.id).maybeSingle(),
    supabase
      .from("voice_agents")
      .select("id, display_name, twilio_phone_number, elevenlabs_agent_id, timezone, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("appointments")
      .select("id, customer_name, customer_phone, scheduled_for, status")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("call_logs")
      .select("id, caller, direction, created_at, metadata")
      .order("created_at", { ascending: false })
      .limit(6)
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Benvenuto</p>
          <h1 className="text-4xl font-semibold">
            {profile?.full_name || "Operatore"}, gestisci i tuoi agenti vocali sempre attivi
          </h1>
          <p className="text-slate-400">Conta utenti: {voiceAgents?.length ?? 0} agenti configurati · {appointments?.length ?? 0} appuntamenti recenti.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="text-2xl font-semibold">Crea un nuovo agente</h2>
            <p className="text-sm text-slate-400">Collega Twilio, ElevenLabs e definisci prompt/turni in pochi minuti.</p>
            <div className="mt-6">
              <VoiceAgentForm />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 space-y-4">
            <h2 className="text-2xl font-semibold">I tuoi agenti</h2>
            {voiceAgents && voiceAgents.length > 0 ? (
              <ul className="space-y-3">
                {voiceAgents.map((agent) => (
                  <li key={agent.id} className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                    <p className="text-lg font-semibold">{agent.display_name}</p>
                    <p className="text-sm text-slate-400">Telefono: {agent.twilio_phone_number || "—"}</p>
                    <p className="text-sm text-slate-400">ElevenLabs: {agent.elevenlabs_agent_id || "—"}</p>
                    <p className="text-xs text-slate-500">Timezone: {agent.timezone}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">Nessun agente configurato. Creane uno per iniziare a ricevere chiamate.</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="text-xl font-semibold">Appuntamenti recenti</h2>
            <div className="mt-4 space-y-3">
              {appointments && appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt.id} className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                    <p className="font-semibold">{appt.customer_name || "Lead"}</p>
                    <p className="text-sm text-slate-400">{appt.customer_phone || "—"}</p>
                    <p className="text-xs text-slate-500">
                      {appt.status} · {appt.scheduled_for ? new Date(appt.scheduled_for).toLocaleString("it-IT") : "da pianificare"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">Nessun appuntamento registrato.</p>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="text-xl font-semibold">Log chiamate</h2>
            <div className="mt-4 space-y-3">
              {callLogs && callLogs.length > 0 ? (
                callLogs.map((call) => (
                  <div key={call.id} className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                    <p className="font-semibold">{call.direction === "inbound" ? "Inbound" : "Outbound"}</p>
                    <p className="text-sm text-slate-400">Caller: {call.caller || "—"}</p>
                    <p className="text-xs text-slate-500">{new Date(call.created_at).toLocaleString("it-IT")}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">Nessuna chiamata registrata.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
