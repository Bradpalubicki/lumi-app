import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
const SQUARE_ENVIRONMENT = process.env.SQUARE_ENVIRONMENT || "sandbox";

const SQUARE_BASE_URL =
  SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";

const FAMILY_PLAN_MONTHLY = {
  name: "Lumi Family Plan - Monthly",
  amount: 999, // $9.99 in cents
  currency: "USD",
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
    return NextResponse.json(
      { error: "Square not configured. Add SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID to env vars." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { plan = "monthly" } = body;

    const amount = plan === "yearly" ? 7999 : FAMILY_PLAN_MONTHLY.amount; // $79.99/yr or $9.99/mo
    const note = plan === "yearly" ? "Lumi Family Plan - Annual ($79.99/yr)" : "Lumi Family Plan - Monthly ($9.99/mo)";

    // Create a Square payment link
    const response = await fetch(`${SQUARE_BASE_URL}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: `lumi-${userId}-${plan}-${Date.now()}`,
        quick_pay: {
          name: note,
          price_money: { amount, currency: "USD" },
          location_id: SQUARE_LOCATION_ID,
        },
        checkout_options: {
          redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://lumi-app-zeta.vercel.app"}/dashboard?payment=success`,
          ask_for_shipping_address: false,
        },
        pre_populated_data: {
          buyer_reference: userId,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Square error:", error);
      return NextResponse.json({ error: "Payment link creation failed" }, { status: 502 });
    }

    const data = await response.json();
    const checkoutUrl = data.payment_link?.url;

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error("create-subscription error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
