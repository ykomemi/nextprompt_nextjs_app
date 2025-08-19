
import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'

type Prompt = { title:string; body:string; locked:boolean; preview?:string }
type Pack = { slug:string; title:string; description:string; tier:string; prompts: Prompt[] }

export default function PackPage({ params }: { params: { slug: string } }){
  const json = fs.readFileSync(path.join(process.cwd(),'public','packs.json'),'utf-8')
  const packs = JSON.parse(json) as Pack[]
  const pack = packs.find(p => p.slug === params.slug)
  if(!pack) return notFound()

  return (
    <section className="py-8 space-y-2">
      <div className="uppercase tracking-widest text-sm text-gray-400">Pack</div>
      <h2>{pack.title}</h2>
      <div className="small">{pack.description}</div>
      <div className="mt-2"><span className="badge">{pack.tier}</span></div>
      <div className="grid gap-4 mt-4">
        {pack.prompts.map((pr, i)=> (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-2">
              <b>{pr.title}</b>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-200">{pr.locked ? (pr.preview || 'Locked — upgrade to view full text') : pr.body}</pre>
            {pr.locked && <div className="small mt-2">Locked — <a href="/pricing" className="underline">upgrade</a> to view full text.</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
