import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import Link from 'next/link'


import compare from 'bcrypt';
import credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            from: process.env.EMAIL_FROM,
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            }
        }),
        Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }

            },

            async authorize(credentials) {
                console.log(credentials);
                if (!credentials || typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
                    throw new Error('Email and password are required');
                }

                // Récupérer l'utilisateur à partir de l'email fourni
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    throw new Error('No user found with the email');
                }

                if (typeof user.password !== 'string') {
                    throw new Error('User password is invalid');
                }

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordsMatch) {
                    return null;
                }

                return user;
            }
        })
        
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET_KEY,
 

});



