import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY manquante côté serveur." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);
  const origin = req.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Panier Perdu — Abonnement mensuel",
              description: "Relances de paniers abandonnés, illimitées.",
            },
            unit_amount: 2900,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/annule`,
    });

    if (!session.url) {
      throw new Error("Stripe n'a pas renvoyé d'URL de paiement.");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Erreur création session Stripe:", err);
    return NextResponse.redirect(`${origin}/annule?erreur=1`, 303);
  }
}
