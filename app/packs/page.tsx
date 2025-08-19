
import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'

type Pack = { slug:string; title:string; description:string; tier:string }

export default function Packs(){
  const json = fs.readFileSync(path.join(process.cwd(),'public','packs.json'),'utf-8')
  const packs = JSON.parse(json) as Pack[]
  return (
    <section className="py-8">
      <h2 className="mb-4">Prompt Packs</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {packs.map(p=> (
          <Link key={p.slug} href={`/pack/${p.slug}`} className="card block">
            <div className="text-xl font-semibold">{p.title}</div>
            <div className="small mt-1">{p.description}</div>
            <div className="mt-3"><span className="badge">{p.tier}</span></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
