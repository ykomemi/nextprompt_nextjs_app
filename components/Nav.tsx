
'use client'
import Link from 'next/link'
export default function Nav(){
  return (
    <nav className="container py-5 flex items-center justify-between">
      <Link href="/" className="font-extrabold">NextPrompt<span style={{color:'var(--brand)'}}>.tech</span></Link>
      <div className="flex items-center gap-4 text-gray-300">
        <Link href="/packs">Packs</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/account" className="btn-secondary rounded-xl px-3 py-2">Account</Link>
      </div>
    </nav>
  )
}
