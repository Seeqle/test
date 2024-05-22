// Dans votre fichier api/cart/addToCart.ts

import { NextResponse } from 'next/server';
import prisma from '../../../src/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, price, link, currency, category, univers } = data;

        if (!name || !price || !link || !currency || !category || !univers) {
            return NextResponse.json({ message: 'name, price, link, currency, category, and univers are required' }, { status: 400 });
        }

        const cartItem = await prisma.cart.create({
            data: {
                name,
                price: parseFloat(price),
                link,
                currency,
                category,
                univers,
            },
        });

        return NextResponse.json({ cartItem }, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
