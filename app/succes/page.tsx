import Stripe from "stripe";

async function getEmail(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.customer_details?.email ?? null;
  } catch {
    return null;
  }
}

export default async function Succes({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const email = await getEmail(searchParams.session_id);

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-creme">
          Votre abonnement est actif.
        </h1>
        <p className="mt-4 text-neutre leading-relaxed">
          {email
            ? `Un email va arriver dans quelques minutes sur ${email}, avec la suite.`
            : "Un email va arriver dans quelques minutes avec la suite."}
        </p>
        <p className="mt-2 text-sm text-neutre">
          Pensez à vérifier vos courriers indésirables si vous ne le voyez
          pas.
        </p>
      </div>
    </main>
  );
}
