
import Link from 'next/link'
export default function Home(){
  return (
    <section className="grid md:grid-cols-2 gap-8 py-10">
      <div>
        <div className="uppercase tracking-widest text-sm text-gray-400 mb-2">Ship faster</div>
        <h1 className="mb-3">Build apps faster with <span className="bg-clip-text text-transparent" style={{backgroundImage:'linear-gradient(90deg,var(--brand),var(--brand2))'}}>AI‑ready Prompt Packs</span></h1>
        <p className="text-gray-300 mb-5">Pre‑sequenced prompts for Lovable, Cursor & more. Copy, paste, and ship your MVP in minutes — no prompt engineering required.</p>
        <div className="flex gap-3">
          <Link className="btn rounded-xl" href="/packs">Browse Packs</Link>
          <Link className="btn-secondary rounded-xl px-5 py-3" href="/pricing">Get Pro</Link>
        </div>
      </div>
      <div className="card">
        <div className="uppercase tracking-widest text-sm text-gray-400 mb-2">How it works</div>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Pick a Pack → CRM, Booking, Dashboard, E‑commerce…</li>
          <li>Copy the prompts in order (scaffold → features → integrations)</li>
          <li>Paste into your AI coding tool and ship</li>
        </ol>
        <div className="mt-3 flex gap-2">
          <span className="badge">Try 2 packs free</span>
          <span className="badge">New packs weekly</span>
        </div>
      </div>
    </section>
  )
}
