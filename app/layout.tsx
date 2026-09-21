import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panier Perdu — Récupérez vos paniers abandonnés",
  description:
    "70% des paniers de votre boutique sont abandonnés. Panier Perdu relance vos clients à votre place, en deux emails, pour 29€/mois.",
  openGraph: {
    title: "Panier Perdu — Récupérez vos paniers abandonnés",
    description:
      "Deux relances écrites, un code promo optionnel, un compteur du CA récupéré. 29€/mois, sans engagement.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
