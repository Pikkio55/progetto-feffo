# Progetto Feffo

SaaS per agenti vocali 24/7 basati su Twilio + ElevenLabs + Supabase.

## Setup locale

```bash
pnpm install
pnpm dev
```

`.env.local` deve contenere:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=
DATABASE_URL=
TWILIO_WEBHOOK_TOKEN=
```

## Supabase

1. Esegui `supabase/schema.sql` per creare tabelle (profiles, voice_agents, appointments, call_logs, early_access) + policy RLS.
2. Le registrazioni landing finiscono in `public.early_access`.
3. Il signup inserisce automaticamente record in `profiles`.

## Twilio / ElevenLabs

- Webhook voce: `https://<dominio>/api/twilio/voice?token=...`
- Token opzionale per validare l'origine (`TWILIO_WEBHOOK_TOKEN`).
- L'endpoint salva le chiamate su Supabase; ElevenLabs verrà collegato nello step successivo.

## Struttura principali

- `src/app/page.tsx` – landing marketing.
- `src/app/(auth)/login` e `src/app/(auth)/signup` – flusso Supabase Auth.
- `src/app/dashboard/page.tsx` – dashboard utente (agenti, appuntamenti, log).
- `src/components/dashboard/VoiceAgentForm.tsx` – form per collegare Twilio/ElevenLabs.
- `src/app/api/twilio/voice/route.ts` – webhook inbound.
- `middleware.ts` – protezione delle rotte /dashboard.

## Deploy

- Collegato a Vercel (`progetto-feffo.vercel.app`).
- Variabili d'ambiente replicate su Vercel (URL/anon/service role/DATABASE_URL/TWILIO_WEBHOOK_TOKEN).

## Prossimi Step

- Collegare ElevenLabs (TTS in streaming) dentro l'endpoint Twilio.
- Scheduling appuntamenti + integrazione calendar (Google/Cal.com).
- Logica di routing outbound (chiamate automatiche, reminder SMS/email).
- Billing piani (Stripe) + limite su numero di agenti.
```
