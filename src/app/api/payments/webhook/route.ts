import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  let event: Record<string, unknown>;
  try { event = JSON.parse(body); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const eventType = event.type as string;
  if (eventType === "payment.completed" || eventType === "order.fulfillment.updated") {
    const data = event.data as Record<string, unknown> | undefined;
    const order = data?.object as Record<string, unknown> | undefined;
    const metadata = (order?.metadata as Record<string, string>) || {};
    const buyerReference = metadata.buyer_reference || (order?.reference_id as string) || "";
    if (buyerReference) {
      try {
        const clerk = await clerkClient();
        await clerk.users.updateUserMetadata(buyerReference, {
          publicMetadata: { plan: "family", plan_activated_at: new Date().toISOString() }
        });
      } catch (err) { console.error("Failed to update user metadata:", err); }
    }
  }
  return NextResponse.json({ received: true });
}