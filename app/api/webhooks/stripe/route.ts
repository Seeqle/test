import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
    const body = await req.json() as Stripe.Event;

    switch (body.type) {
        case "checkout.session.completed": {
            const session = body.data.object as Stripe.Checkout.Session;
            const stripeCustomerId = session.customer
            const user = await findUserFromCustomerId(stripeCustomerId);
            if (!user?.email) {
                break;
            }

            await prisma.user.update({
                where: {
                    email: user?.email,
                },
                data: {
                    plan: "PRO",
                },
            })
            console.log("Checkout session completed", session);
            break;
        }
        case "invoice.paid": {
            const invoice = body.data.object as Stripe.Invoice;
            const stripeCustomerId = invoice.customer
            const user = await findUserFromCustomerId(stripeCustomerId);
            if (!user?.email) {
                break;
            }

            await prisma.user.update({
                where: {
                    email: user?.email,
                },
                data: {
                    plan: "PRO",
                },
            })
            break;
        }
        case "invoice.payment_failed": {
            const invoice = body.data.object as Stripe.Invoice;
            const stripeCustomerId = invoice.customer
            const user = await findUserFromCustomerId(stripeCustomerId);
            if (!user?.email) {
                break;
            }

            await prisma.user.update({
                where: {
                    email: user?.email,
                },
                data: {
                    plan: "STARTER",
                },
            })
        }
        case "customer.subscription.deleted": {
            const subscription = body.data.object as Stripe.Subscription;
            const invoice = body.data.object as Stripe.Invoice;
            const stripeCustomerId = subscription.customer
            const user = await findUserFromCustomerId(stripeCustomerId);
            if (!user?.email) {
                break;
            }

            await prisma.user.update({
                where: {
                    email: user?.email,
                },
                data: {
                    plan: "STARTER",
                },
            })
            break;
        }
        default: {
            console.log("Unhandled event type", body.type);

        }
    }

    return NextResponse.json({
        ok:true,
    })
};


export const findUserFromCustomerId = async (stripeCustomerId: unknown) => {

    if (typeof stripeCustomerId !== "string") {
        return null;
    }
    return prisma.user.findFirst({
        where: {
            stripeCustomerId,
        }
    })
}