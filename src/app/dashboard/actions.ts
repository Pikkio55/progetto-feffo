"use server";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

type AgentFormState = { error?: string; success?: boolean };

export async function createVoiceAgentAction(_prevState: AgentFormState, formData: FormData): Promise<AgentFormState> {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Non sei autenticato." };
  }

  const availabilityRaw = formData.get("availability")?.toString() ?? "";
  let availability = [] as string[];
  if (availabilityRaw.trim().length > 0) {
    availability = availabilityRaw
      .split("\n")
      .map((slot) => slot.trim())
      .filter(Boolean);
  }

  const payload = {
    profile_id: user.id,
    display_name: formData.get("display_name")?.toString() ?? "",
    twilio_phone_number: formData.get("twilio_phone_number")?.toString() ?? "",
    twilio_account_sid: formData.get("twilio_account_sid")?.toString() ?? "",
    twilio_auth_token: formData.get("twilio_auth_token")?.toString() ?? "",
    elevenlabs_agent_id: formData.get("elevenlabs_agent_id")?.toString() ?? "",
    timezone: formData.get("timezone")?.toString() ?? "UTC",
    availability
  };

  const { error } = await supabase.from("voice_agents").insert(payload);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
