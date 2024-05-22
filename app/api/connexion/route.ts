// import { NextResponse } from 'next/server';
// import { prisma } from '../../../src/lib/prisma';
// import { verifyPassword } from '@/utils/password';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = process.env.SECRET_KEY || 'test';

// export async function POST(request: Request) {
//     const { name, password } = await request.json();

//     if (!name || !password) {
//         return new NextResponse(JSON.stringify({ message: 'Name and password are required' }), { status: 400 });
//     }

//     try {
//         const user = await prisma.user.findUnique({
//             where: { name },
//         });

//         if (!user) {
//             return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
//         }
//         if (!user.password) {
//             return new NextResponse(JSON.stringify({ message: 'Password not set for user' }), { status: 400 });
//         }
        
//         const isPasswordValid = await verifyPassword(password, user.password);


//         if (!isPasswordValid) {
//             return new NextResponse(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
//         }

//         const token = jwt.sign({ userId: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1h' });

//         return new NextResponse(JSON.stringify({ token }), { status: 200 });
//     } catch (error) {
//         console.error('Error:', error);
//         return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
//     }
// }
