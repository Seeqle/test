
// import { NextResponse } from 'next/server';
// import { hashPassword } from '@/utils/password';
// import { prisma } from '@/src/lib/prisma';

// const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// export async function POST(request: Request) {
//     const data = await request.json();
//     const { name, password, role = "USER" } = data;

//     if (!name || !password) {
//         return NextResponse.json({ message: 'Name and password are required' }, { status: 400 });
//     }


//     try {
//         const hashedPassword = await hashPassword(password);

//         const user = await prisma.user.create({
//             data: {
//                 name,
//                 role,
//                 password: hashedPassword,
//             },
//         });




//         return NextResponse.json({ user }, { status: 201 });
//     } catch (error) {
//         console.error('Error:', error);
//         return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
//     }
// }
