import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const TWILIO_VERIFICATION_TOKEN = process.env.TWILIO_WEBHOOK_TOKEN;

function buildTwiML(message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="Polly.Matthew">${message}</Say>
    <Pause length="1" />
    <Say voice="Polly.Matthew">Grazie, alla prossima.</Say>
  </Response>`;
}

export async function POST(req: NextRequest) {
  if (TWILIO_VERIFICATION_TOKEN) {
    const token = req.nextUrl.searchParams.get("token");
    if (token !== TWILIO_VERIFICATION_TOKEN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  const formData = await req.formData();
  const from = String(formData.get("From") ?? "");
  const to = String(formData.get("To") ?? "");
  const recording = formData.get("RecordingUrl");

  await supabaseAdmin.from("call_logs").insert({
    voice_agent_id: null,
    direction: "inbound",
    caller: from,
    metadata: { to, recording }
  });

  const twiml = buildTwiML("Ciao! Grazie per aver chiamato Progetto Feffo. L'agente AI sta registrando la richiesta e ti invierà subito un appuntamento.");

  return new NextResponse(twiml, {
    status: 200,
    headers: { "Content-Type": "text/xml" }
  });
}
