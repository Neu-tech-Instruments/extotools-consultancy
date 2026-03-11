"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SubscribeButtonProps {
    id?: string;
    slug?: string;
    bundleId?: string;
    selectedExtensions?: string[];
    price: number;
    isBuilt?: boolean;
}

export default function SubscribeButton({ id, slug, bundleId, selectedExtensions, price, isBuilt = true }: SubscribeButtonProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSubscribe = () => {
        if (status !== "authenticated") {
            const currentPath = window.location.pathname;
            router.push(`/login?callbackUrl=${currentPath}`);
            return;
        }

        if (!isBuilt) return;

        // Redirect to the new embedded checkout page
        const productId = id || bundleId;
        if (productId) {
            router.push(`/checkout/${productId}`);
        } else {
            console.error("No product ID provided for checkout");
        }
    };

    if (!isBuilt) {
        return (
            <button className="btn btn-outline" style={{ width: '100%', cursor: 'not-allowed', opacity: 0.6 }} disabled>
                Coming Soon
            </button>
        );
    }

    return (
        <button
            onClick={handleSubscribe}
            className="btn btn-primary"
            style={{ width: '100%' }}
        >
            Subscribe for ${price}/mo
        </button>
    );
}
