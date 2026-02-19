import Stripe from "stripe";

export const getStripe = async () => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

    const stripeInstance = new Stripe(stripeSecretKey, {
        apiVersion: "2026-01-28.clover" as any,
        appInfo: {
            name: "ExToTools",
            version: "0.1.0",
        },
    });

    return stripeInstance;
};
