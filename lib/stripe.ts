import Stripe from "stripe";

export const getStripe = async () => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY || "sk_test_placeholder";
    
    console.log("Stripe Key Prefix:", stripeSecretKey.substring(0, 8));

    const stripeInstance = new Stripe(stripeSecretKey, {
        apiVersion: "2024-12-18.acacia" as any, // Updated to a stable version
        appInfo: {
            name: "ExToTools",
            version: "0.1.0",
        },
    });

    return stripeInstance;
};
