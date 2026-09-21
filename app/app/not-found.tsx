export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-creme">Page introuvable.</h1>
        <p className="mt-4 text-neutre leading-relaxed">
          Ce lien ne correspond à rien. Retournez à l&rsquo;accueil pour
          repartir de zéro.
        </p>
        
          href="/"
          className="inline-block mt-6 bg-or text-encre font-semibold px-6 py-3"
        >
          Retour à l&rsquo;accueil
        </a>
      </div>
    </main>
  );
}
