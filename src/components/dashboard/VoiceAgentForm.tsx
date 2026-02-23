"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createVoiceAgentAction } from "@/app/dashboard/actions";

type AgentFormState = { error?: string; success?: boolean };

const initialState: AgentFormState = { error: undefined, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-2xl bg-emerald-400/90 py-3 font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:opacity-60"
    >
      {pending ? "Salvataggio..." : "Crea agente"}
    </button>
  );
}

export function VoiceAgentForm() {
  const [state, formAction] = useFormState(createVoiceAgentAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Nome agente</label>
        <input name="display_name" required className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Numero Twilio</label>
        <input name="twilio_phone_number" placeholder="+39..." className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Account SID</label>
          <input name="twilio_account_sid" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Auth Token</label>
          <input name="twilio_auth_token" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">ElevenLabs Agent ID</label>
          <input name="elevenlabs_agent_id" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Timezone</label>
          <input name="timezone" defaultValue="Europe/Rome" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Disponibilità (uno slot per riga)</label>
        <textarea name="availability" rows={3} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Lun-Ven 09:00-18:00"></textarea>
      </div>
      {state.error && <p className="text-sm text-rose-400">{state.error}</p>}
      {state.success && !state.error && <p className="text-sm text-emerald-300">Agente creato!</p>}
      <SubmitButton />
    </form>
  );
}
