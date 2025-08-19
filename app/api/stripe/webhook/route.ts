
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs' // ensure raw body
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest){
  const sig = req.headers.get('stripe-signature') || ''
  const rawBody = await req.text()
  let event
  try{
    // @ts-expect-error api version type
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  }catch(e:any){
    return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 })
  }

  // TODO: on checkout.session.completed -> mark user as pro in Supabase
  // const session = event.data.object as any

  return NextResponse.json({ received: true })
}
