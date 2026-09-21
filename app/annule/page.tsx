export default function Annule({
  searchParams,
}: {
  searchParams: { erreur?: string };
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-creme">
          {searchParams.erreur
            ? "Une erreur est survenue."
            : "Paiement annulé."}
        </h1>
        <p className="mt-4 text-neutre leading-relaxed">
          {searchParams.erreur
            ? "Le paiement n'a pas pu être lancé. Réessayez dans un instant."
            : "Aucun montant n'a été débité. Vous pouvez réessayer quand vous voulez."}
        </p>
        
          
        <a href="/"
          className="inline-block mt-6 bg-or text-encre font-semibold px-6 py-3"
        >
          Retour à l&rsquo;accueil
        </a>
      </div>
    </main>
  );
}
