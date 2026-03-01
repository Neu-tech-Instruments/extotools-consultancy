import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const stripe = (await getStripe()) as any;

        // Fetch customer by email
        const customers = await stripe.customers.list({
            email: session.user.email,
            limit: 1
        });

        let customerId = customers.data[0]?.id;

        if (!customerId) {
            // Alternatively, create a customer if one does not exist
            const customer = await stripe.customers.create({
                email: session.user.email,
                name: session.user.name || undefined
            });
            customerId = customer.id;
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard`,
        });

        return NextResponse.json({ url: portalSession.url });
    } catch (error) {
        console.error("[STRIPE_PORTAL_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
