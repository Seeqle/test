import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import  { Stripe } from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: '2024-04-10',
    typescript: true,
});



export const AccountSettingsButton = () => {
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


                    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

                    const session = await stripe.billingPortal.sessions.create({
                        customer: user.stripeCustomerId ?? "",
                        return_url: `http://localhost:3000/account/billing`,
                    })
                    if (!session.url) {
                        throw new Error("session url is missing")
                    }
                    redirect(session.url);
                }}>
                Account Settings
            </button>
        </form>
    );
}