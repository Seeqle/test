import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

import Stripe  from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2024-04-10",
}
);


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
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
        }),
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


    ],
    session: {
        strategy: "jwt",
    },
    events: {
        signIn: async ( message ) => {
            const userId = message.user.id;
            const email = message.user.email;
            const name = message.user.name;


            if (!userId || !email) {
                console.error('Email is required to create a Stripe customer');
                return;
            }
            
            // autres méthode
            // const customer = await stripe.customers.create({
            //     email,
            //     name: name ?? undefined,
            // });
            // await prisma.user.update({
            //     where: { id: userId },
            //     data: { stripeCustomerId: customer.id }
            // });

            try {
                const existingUser = await prisma.user.findUnique({ where: { email: email} });
                if (!existingUser?.stripeCustomerId) {
                    const customer = await stripe.customers.create({
                        email,
                        name: name ?? undefined,
                     });
                    await prisma.user.update({
                        where: { id: userId },
                        data: { stripeCustomerId: customer.id }
                    });
                }
            } catch (error) {
                console.error('Error creating Stripe customer:', error);
            }
        }
    },
    secret: process.env.SECRET_KEY,

});



