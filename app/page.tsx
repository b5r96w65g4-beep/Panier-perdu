export default function Landing() {
  return (
    <main className="min-h-screen pb-28 md:pb-0">
      {/* En-tête */}
      <header className="px-5 pt-6 md:px-10 md:pt-10">
        <span className="text-sm font-semibold tracking-tight text-creme">
          Panier Perdu
        </span>
      </header>

      {/* Hero */}
      <section className="px-5 pt-10 md:px-10 md:pt-16 md:max-w-2xl">
        <h1 className="text-3xl leading-tight font-bold text-creme md:text-5xl">
          Vous perdez de l&rsquo;argent sur des commandes déjà remplies.
        </h1>

        <div className="mt-8 flex items-baseline gap-3">
          <span className="text-6xl font-bold text-or md:text-7xl">70%</span>
          <span className="text-sm text-neutre leading-snug max-w-[12rem]">
            des paniers d&rsquo;une boutique en ligne sont abandonnés avant
            paiement
          </span>
        </div>

        <p className="mt-8 text-base leading-relaxed text-creme/90 md:text-lg">
          Panier Perdu relance vos clients à votre place, avec deux emails
          écrits pour donner envie de finir leur commande. Pas de logiciel à
          apprendre, pas de configuration compliquée.
        </p>
      </section>

      {/* Bénéfices */}
      <section className="px-5 pt-10 md:px-10 md:max-w-2xl">
        <ul className="space-y-5">
          <li className="border-l-2 border-or pl-4">
            <p className="font-semibold text-creme">
              Deux relances écrites et personnalisées
            </p>
            <p className="text-sm text-neutre mt-1">
              Espacées dans le temps, avec le nom du client et le contenu de
              son panier.
            </p>
          </li>
          <li className="border-l-2 border-or pl-4">
            <p className="font-semibold text-creme">
              Un code de réduction, seulement si besoin
            </p>
            <p className="text-sm text-neutre mt-1">
              Ajouté à la seconde relance pour convaincre les indécis.
            </p>
          </li>
          <li className="border-l-2 border-or pl-4">
            <p className="font-semibold text-creme">
              Un compteur du chiffre d&rsquo;affaires récupéré
            </p>
            <p className="text-sm text-neutre mt-1">
              En euros, pour voir exactement ce que Panier Perdu vous
              rapporte.
            </p>
          </li>
        </ul>
      </section>

      {/* Prix + CTA (bloc normal, visible aussi sur desktop) */}
      <section className="px-5 pt-12 pb-8 md:px-10 md:max-w-2xl">
        <div className="rounded-none border border-encreClaire bg-encreClaire/40 p-6">
          <p className="text-2xl font-bold text-creme">29€ / mois</p>
          <p className="text-sm text-neutre mt-1">
            Relances illimitées. Sans engagement.
          </p>
          <form action="/api/checkout" method="POST" className="mt-5">
            <button
              type="submit"
              className="w-full bg-or text-encre font-semibold py-4 text-base hover:bg-orFonce transition-colors"
            >
              Récupérer mes paniers
            </button>
          </form>
          <p className="text-xs text-neutre mt-3 text-center">
            Paiement sécurisé par Stripe
          </p>
        </div>
      </section>

      <footer className="px-5 pb-10 md:px-10">
        <p className="text-xs text-neutre">
          Panier Perdu — contact : bonjour@panierperdu.fr
        </p>
      </footer>

      {/* Barre d'action fixée en bas, accessible au pouce (mobile uniquement) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden border-t border-encreClaire bg-encre px-5 py-3">
        <form action="/api/checkout" method="POST">
          <button
            type="submit"
            className="w-full bg-or text-encre font-semibold py-4 text-base active:bg-orFonce transition-colors"
          >
            Récupérer mes paniers — 29€/mois
          </button>
        </form>
      </div>
    </main>
  );
}
