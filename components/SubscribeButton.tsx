"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SubscribeButtonProps {
    slug?: string;
    bundleId?: string;
    selectedExtensions?: string[];
    price: number;
    isBuilt?: boolean;
}

export default function SubscribeButton({ slug, bundleId, selectedExtensions, price, isBuilt = true }: SubscribeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSubscribe = async () => {
        if (status !== "authenticated") {
            router.push("/login");
            return;
        }

        if (!isBuilt) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, bundleId, selectedExtensions }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Subscription error:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
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
            style={{ width: '100%' }}
            disabled={isLoading}
        >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : `Subscribe for $${price}/mo`}
        </button>
    );
}
