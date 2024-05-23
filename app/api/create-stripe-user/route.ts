// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
//     apiVersion: '2024-04-10',
//     typescript: true,
// });

// export async function POST(req: NextRequest) {
//     try {
//         const { email } = await req.json();

//         if (!email) {
//             return NextResponse.json({ error: 'Email is required' }, { status: 400 });
//         }

//         const customer = await stripe.customers.create({ email });
//         return NextResponse.json({ customer }, { status: 200 });
//     } catch (error) {
//         console.error('Error creating customer:', error);
//         return NextResponse.json({ error: 'Error creating customer' }, { status: 500 });
//     }
// }
