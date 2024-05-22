
import { NextResponse } from 'next/server';
import { hashPassword } from '@/utils/password';
import { prisma } from '@/src/lib/prisma';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export async function POST(request: Request) {
    const data = await request.json();
    const { name, email, password } = data;

    if (!name || !email || !password) {
        return NextResponse.json({ message: 'email and password are required' }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (exist) {
        return new NextResponse('User already exists', { status: 400 })
    }



    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json({ user }, { status: 201 });

}
