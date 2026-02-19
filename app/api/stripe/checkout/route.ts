import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { extensions, bundles } from "@/lib/extensions";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { cartItems } = await req.json();

        if (!cartItems || cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }

        const stripe = (await getStripe()) as any;

        const line_items = cartItems.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
                recurring: {
                    interval: 'month',
                },
            },
            quantity: item.quantity || 1,
        }));

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: session.user.email ?? undefined,
            line_items,
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXTAUTH_URL}/?canceled=true`,
            metadata: {
                userId: session.user.id,
                items: JSON.stringify(cartItems.map((i: any) => i.id))
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
