"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SubscribeButtonProps {
    id?: string;
    slug?: string;
    bundleId?: string;
    selectedExtensions?: string[];
    price: number;
    isBuilt?: boolean;
}

export default function SubscribeButton({ id, slug, bundleId, selectedExtensions, price, isBuilt = true }: SubscribeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSubscribe = () => {
        if (status !== "authenticated") {
            const currentPath = window.location.pathname;
            router.push(`/login?callbackUrl=${currentPath}`);
            return;
        }

        if (!isBuilt) return;

        setIsLoading(true);

        // Redirect to the new embedded checkout page
        const productId = id || bundleId;
        if (productId) {
            router.push(`/checkout/${productId}`);
        } else {
            console.error("No product ID provided for checkout");
            setIsLoading(false);
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
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin" size={18} />
                    Redirecting...
                </>
            ) : (
                `Subscribe for $${price}/mo`
            )}
        </button>
    );
}
