
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest){
  const price = process.env.NEXT_PUBLIC_PRICE_ID
  if(!price) return NextResponse.json({error:'Missing price id'}, { status: 400 })

  const session = await stripe.checkout.sessions.create({git 
    mode: 'subscription',
    line_items: [{ price, quantity: 1 }],
    success_url: `${req.headers.get('origin')}/success`,
    cancel_url: `${req.headers.get('origin')}/pricing`,
  })
  return NextResponse.redirect(session.url!, { status: 303 })
}
