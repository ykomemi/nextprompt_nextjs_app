
import Link from 'next/link'

export default function Pricing(){
  return (
    <section className="py-8">
      <h2 className="mb-4">Simple pricing</h2>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card">
          <div className="uppercase tracking-widest text-sm text-gray-400">Free</div>
          <div className="text-4xl font-extrabold">$0</div>
          <ul className="list-disc pl-5 my-3 text-gray-300 space-y-1">
            <li>2 free packs</li>
            <li>Preview locked prompts</li>
            <li>Newsletter & updates</li>
          </ul>
          <Link className="btn rounded-xl" href="/packs">Start free</Link>
        </div>
        <div className="card" style={{outline:'2px solid var(--brand)'}}>
          <div className="uppercase tracking-widest text-sm text-gray-400">Pro</div>
          <div className="text-4xl font-extrabold">$10<span className="text-sm text-gray-300">/mo</span></div>
          <ul className="list-disc pl-5 my-3 text-gray-300 space-y-1">
            <li>Unlimited packs</li>
            <li>New packs weekly</li>
            <li>Early access & support</li>
          </ul>
          <form action="/api/checkout" method="post">
            <button className="btn rounded-xl" type="submit">Get Pro</button>
          </form>
        </div>
      </div>
    </section>
  )
}
