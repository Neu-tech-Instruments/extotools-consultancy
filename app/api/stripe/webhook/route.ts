import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;
    const stripe = await getStripe();

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = (await stripe.subscriptions.retrieve(
            session.subscription as string
        )) as any;

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 });
        }

        await prisma.subscription.create({
            data: {
                userId: session.metadata.userId,
                extensionId: session.metadata.slug ? (await prisma.extension.findFirst({ where: { slug: session.metadata.slug } }))?.id : null,
                isBundle: !!session.metadata.bundleId,
                bundleType: session.metadata.bundleId || null,
                stripeSubscriptionId: subscription.id,
                status: subscription.status,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }

    if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.updated") {
        const subscription = event.data.object as any;

        await prisma.subscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                status: subscription.status,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
