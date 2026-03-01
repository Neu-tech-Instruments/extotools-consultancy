"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";

export default function BillingButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleBilling = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/stripe/portal", {
                method: "POST"
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Failed to access billing portal.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button onClick={handleBilling} disabled={isLoading} className="btn btn-outline" style={{ gap: '8px' }}>
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
            Billing
        </button>
    );
}
