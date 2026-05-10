export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-md mx-auto">
      <p className="eyebrow text-text-muted mb-2">Semana 16 · Abr 2026</p>
      <h1 className="text-4xl font-bold leading-tight">
        Buen día, <span className="em-italic font-normal">— a jugar.</span>
      </h1>

      <div className="mt-8 p-4 bg-paper rounded-lg border border-border">
        <p className="eyebrow text-emerald mb-2">Tu próximo partido</p>
        <p className="tabular text-3xl font-bold">09:00</p>
        <p className="eyebrow text-text-muted mt-2">60 min · Mañana</p>
      </div>
    </main>
  )
}
