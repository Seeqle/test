import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: '2024-04-10',
    typescript: true,
});


export const BuyButton = () => {
    return (
        <form>
            <button
                formAction={async () => {
                    "use server";

                    const authSession = await auth()
                    const user = await prisma.user.findUnique({
                        where: {
                            email: authSession?.user?.email ?? "",
                            
                        },
                        select: {
                            stripeCustomerId: true,
                            plan: true,
                        }
                    });

                    if (!user) {
                        throw new Error("User not found");
                    }

                    // if (user.plan === "PRO" || "Entreprise") {
                    //     throw new Error("User already has a PRO or Entreprise plan");
                    // }

                    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

                    const session = await stripe.checkout.sessions.create({
                        customer: stripeCustomerId,
                        mode: "subscription",
                        payment_method_types: ["card", "link"],
                        line_items: [
                            {
                                price:
                                    process.env.NODE_ENV === "development"
                                        ? "price_1OCOVEDU8TjLpENkGCHZfkok"
                                        : "",
                                quantity: 1,
                            },
                        ],
                        success_url: `http://localhost:3000/sucess`,
                        cancel_url: `http://localhost:3000/cancel`,
                    });
                    if (!session.url) {
                        throw new Error("session url is missing")
                    }
                    redirect(session.url);
            }}>
                Buy product
            </button>
        </form>
    );
}