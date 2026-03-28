import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
    const session = await auth();

    // Not logged in — send to login, then come back here
    if (!session?.user?.email) {
        redirect("/login?callbackUrl=/billing");
    }

    let portalUrl = "/dashboard";

    try {
        const stripe = (await getStripe()) as any;

        // Look up Stripe customer by the logged-in user's email
        const customers = await stripe.customers.list({
            email: session.user.email,
            limit: 1,
        });

        let customerId = customers.data[0]?.id;

        // If no Stripe customer exists yet, create one
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: session.user.email,
                name: session.user.name || undefined,
            });
            customerId = customer.id;
        }

        // Generate a fresh, authenticated Stripe Customer Portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "https://extotools.com"}/dashboard`,
        });

        portalUrl = portalSession.url;
    } catch (error) {
        console.error("[BILLING_PAGE_ERROR]", error);
        // On any error fall back to dashboard
        portalUrl = "/dashboard";
    }

    // Hard redirect to Stripe (or fallback)
    redirect(portalUrl);
}
