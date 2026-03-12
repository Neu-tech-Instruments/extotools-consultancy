import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return new NextResponse("Missing session_id", { status: 400 });
        }

        const stripe = await getStripe();
        
        // Fetch the session with line items expanded to see what they bought
        const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items", "line_items.data.price.product"],
        });

        const lineItem = checkoutSession.line_items?.data[0];
        const price = lineItem?.price;
        const amount = (price?.unit_amount || 0) / 100;
        const interval = price?.recurring?.interval || "month";
        const productName = (price?.product as any)?.name || lineItem?.description || "Subscription";

        return NextResponse.json({
            productName,
            amount,
            interval,
            currency: price?.currency || "usd",
        });

    } catch (error) {
        console.error("[STRIPE_SESSION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
