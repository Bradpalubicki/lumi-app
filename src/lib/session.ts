export function getOrCreateSession(): string {
  if (typeof window === "undefined") return "ssr-session";
  let id = localStorage.getItem("lumi_session_id");
  if (!id) {
    id = "lumi-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    localStorage.setItem("lumi_session_id", id);
  }
  return id;
}

export function getAgeBand(): string {
  if (typeof window === "undefined") return "6-8";
  return localStorage.getItem("lumi_age_band") || "6-8";
}

export function setAgeBand(band: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("lumi_age_band", band);
}
