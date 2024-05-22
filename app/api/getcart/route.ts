// pages/api/getProducts.ts

import { NextResponse } from 'next/server';
import prisma from '../../../src/lib/prisma';

export async function GET(req: Request) {

    try {
        const cartProduct = await prisma.cart.findMany();
        console.log(cartProduct)
        return NextResponse.json(cartProduct, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
