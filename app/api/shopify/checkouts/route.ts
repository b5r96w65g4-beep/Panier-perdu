import { NextResponse } from "next/server";

// --- Étape 1 : échanger Client ID + Client Secret contre un token d'accès ---
// Ce token n'est valable que ~24h, donc on le garde en mémoire et on le
// redemande automatiquement quand il expire. C'est la méthode "Client
// Credentials Grant" de Shopify — elle ne fonctionne que pour une boutique
// qui appartient au même compte/organisation que l'app (notre boutique de
// test ce soir). Pour connecter les boutiques de futurs clients, il faudra
// une étape supplémentaire (un vrai parcours de connexion "OAuth").

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(shop: string): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "SHOPIFY_CLIENT_ID ou SHOPIFY_CLIENT_SECRET manquant côté serveur."
    );
  }

  const response = await fetch(
    `https://${shop}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Échec de l'authentification Shopify (${response.status}): ${detail}`
    );
  }

  const data = await response.json();

  const expiresInMs = (data.expires_in ?? 86400) * 1000;
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + expiresInMs - 60_000,
  };

  return cachedToken.value;
}

const ABANDONED_CHECKOUTS_QUERY = `
  query AbandonedCheckouts($first: Int!) {
    abandonedCheckouts(first: $first, sortKey: UPDATED_AT, reverse: true) {
      edges {
        node {
          id
          abandonedCheckoutUrl
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          customer {
            firstName
            email
          }
          updatedAt
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const shop = process.env.SHOPIFY_SHOP;

  if (!shop) {
    return NextResponse.json(
      { error: "SHOPIFY_SHOP manquant côté serveur." },
      { status: 500 }
    );
  }

  try {
    const token = await getAccessToken(shop);

    const graphqlResponse = await fetch(
      `https://${shop}/admin/api/2026-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({
          query: ABANDONED_CHECKOUTS_QUERY,
          variables: { first: 20 },
        }),
      }
    );

    if (!graphqlResponse.ok) {
      const detail = await graphqlResponse.text();
      throw new Error(
        `Erreur API Shopify (${graphqlResponse.status}): ${detail}`
      );
    }

    const data = await graphqlResponse.json();

    if (data.errors) {
      throw new Error(
        `Erreur GraphQL Shopify: ${JSON.stringify(data.errors)}`
      );
    }

    const checkouts =
      data.data?.abandonedCheckouts?.edges?.map((edge: any) => edge.node) ??
      [];

    return NextResponse.json({ checkouts });
  } catch (err) {
    console.error("Erreur lecture paniers abandonnés Shopify:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Erreur inconnue côté serveur.",
      },
      { status: 500 }
    );
  }
}
