import { NextResponse } from 'next/server';
import prisma from '../../../src/lib/prisma';


export async function POST(request: Request) {
    const data = await request.json();
    const { name, description, price, link, currency, category, univers } = data;

    if (!name || !description || !price ||!link || !currency || !category || !univers) {
        return NextResponse.json({ message: 'name or description or price or currency or category or univers are required' }, { status: 400 });
    }

    try {

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price), 
                link,
                currency,
                category,
                univers,
            },
        });


        return NextResponse.json({ product }, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
