import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Checkout from "@/components/Checkout";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { bundles } from "@/lib/extensions";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
        redirect(`/login?callbackUrl=/checkout/${id}`);
    }

    // 1. Try finding as Extension
    const extension = await prisma.extension.findUnique({
        where: { id }
    });

    let product = extension ? {
        id: extension.id,
        name: extension.name,
        slug: extension.slug,
        price: extension.price
    } : null;

    // 2. Try finding as Bundle
    if (!product) {
        const bundle = bundles.find(b => b.id === id);
        if (bundle) {
            product = {
                id: bundle.id,
                name: bundle.name,
                slug: 'bundles', // fallback route
                price: bundle.price
            };
        }
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="container animate-fade-in" style={{ padding: '60px 20px', maxWidth: '800px' }}>
            <Link href={product.slug === 'bundles' ? '/bundles' : `/extensions/${product.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: 'rgba(15, 23, 42, 0.6)', fontWeight: 600 }}>
                <ArrowLeft size={16} />
                Back to {product.name}
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '40px', alignItems: 'start' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Complete your purchase</h1>
                    <p style={{ color: 'rgba(15, 23, 42, 0.6)', marginBottom: '32px' }}>
                        You are subscribing to <strong>{product.name}</strong> for <strong>${product.price}/mo</strong>.
                    </p>

                    <div className="card" style={{ background: 'rgba(15, 23, 42, 0.02)', borderStyle: 'dashed' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <ShieldCheck size={20} color="var(--primary)" />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Secure Checkout</h3>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.5)', margin: 0 }}>
                            Payment processing is encrypted and handled securely by Stripe. We never store your card details.
                        </p>
                    </div>
                </div>

                <div>
                    <Checkout productId={product.id} />
                </div>
            </div>
        </div>
    );
}
