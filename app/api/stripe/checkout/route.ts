import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bundles } from "@/lib/extensions";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { cartItems } = await req.json();

        if (!cartItems || cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }

        const stripe = (await getStripe()) as any;

        // SECURE: Fetch prices from the server instead of trusting client input
        const line_items = await Promise.all(cartItems.map(async (item: any) => {
            let realPrice = 0;
            let realName = "";

            if (item.type === 'bundle') {
                const bundle = bundles.find(b => b.id === item.id);
                if (bundle) {
                    realPrice = bundle.price;
                    realName = bundle.name;
                }
            } else {
                const extension = await prisma.extension.findUnique({
                    where: { id: item.id }
                });
                if (extension) {
                    realPrice = extension.price;
                    realName = extension.name;
                }
            }

            if (!realName) {
                throw new Error(`Product ${item.id} not found`);
            }

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: realName,
                    },
                    unit_amount: Math.round(realPrice * 100),
                    recurring: {
                        interval: 'month',
                    },
                },
                quantity: 1,
            };
        }));

        // Note: The metadata here only stores the first item's info for the webhook 
        // to handle, reflecting current single-subscription schema limitations.
        const firstItem = cartItems[0];
        const isBundle = firstItem.type === 'bundle';

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: session.user.email ?? undefined,
            line_items,
            adaptive_pricing: {
                enabled: true,
            },
            locale: 'en',
            success_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/?canceled=true`,
            metadata: {
                userId: session.user.id,
                productId: firstItem.id,
                bundleId: isBundle ? firstItem.id : "",
                slug: !isBundle ? firstItem.slug : ""
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: any) {
        console.error("[STRIPE_ERROR]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
