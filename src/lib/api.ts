const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kid-assistant-api-production.up.railway.app";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const headers = (): HeadersInit => ({
  "Content-Type": "application/json",
  ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
});

export async function converse(sessionId: string, text: string, ageBand: string) {
  const res = await fetch(`${API_URL}/api/converse`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ session_id: sessionId, text, age_band: ageBand }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<{ reply: string }>;
}

export async function checkSafetyInput(text: string, ageBand: string) {
  const res = await fetch(`${API_URL}/api/safety/input`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ text, age_band: ageBand }),
  });
  if (!res.ok) return null;
  return res.json() as Promise<{ blocked: boolean; reason?: string; safe_text?: string }>;
}

export async function synthesize(text: string, voice = "nova", speed = 1.0): Promise<Blob> {
  const res = await fetch(`${API_URL}/api/tts/synthesize`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ text, voice, speed }),
  });
  if (!res.ok) throw new Error(`TTS error ${res.status}`);
  return res.blob();
}

export async function sendVoice(
  audioBlob: Blob,
  sessionId: string,
  ageBand: string
): Promise<{ transcript?: string; reply: string; audio_base64?: string; blocked?: boolean; block_reason?: string }> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");
  formData.append("session_id", sessionId);
  formData.append("age_band", ageBand);
  formData.append("voice", "nova");
  formData.append("speed", "1.0");

  const res = await fetch(`${API_URL}/api/voice`, {
    method: "POST",
    body: formData,
    ...(API_KEY ? { headers: { "X-API-Key": API_KEY } } : {}),
  });
  if (!res.ok) throw new Error(`Voice API error ${res.status}`);
  return res.json();
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/health`, { cache: "no-store" });
    const data = await res.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}
