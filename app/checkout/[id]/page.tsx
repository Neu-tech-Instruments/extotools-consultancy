import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Checkout from "@/components/Checkout";
import { ArrowLeft, ShieldCheck, Zap, Lock, CreditCard } from "lucide-react";
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
        price: extension.price,
        description: extension.description,
        image: extension.image
    } : null;

    // 2. Try finding as Bundle
    if (!product) {
        const bundle = bundles.find(b => b.id === id);
        if (bundle) {
            product = {
                id: bundle.id,
                name: bundle.name,
                slug: 'bundles',
                price: bundle.price,
                description: bundle.description,
                image: null
            };
        }
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="checkout-grid">
                <style dangerouslySetInnerHTML={{ __html: `
                    @media (max-width: 960px) {
                        .checkout-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .checkout-left {
                            padding: 40px 20px !important;
                            border-right: none !important;
                            border-bottom: 1px solid rgba(0,0,0,0.05);
                        }
                        .checkout-right {
                            padding: 40px 20px !important;
                        }
                    }
                `}} />

                {/* Left Side: Summary */}
                <div className="checkout-left" style={{ background: '#F6F9FC', padding: '80px 60px', borderRight: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ maxWidth: '420px', width: '100%', margin: '0 0 0 auto' }}>
                        <Link href={product.slug === 'bundles' ? '/bundles' : `/extensions/${product.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(0,0,0,0.4)', fontSize: '0.9rem', marginBottom: '32px' }}>
                            <ArrowLeft size={16} />
                            <img src="/dark.svg" alt="ExToTools" style={{ height: '24px', marginLeft: '8px' }} />
                        </Link>

                        <div style={{ marginBottom: '32px' }}>
                            <span style={{ fontSize: '1.2rem', color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>Pay ExToTools</span>
                            <div style={{ fontSize: '3.5rem', fontWeight: 700, margin: '8px 0 32px', color: '#1A1F36' }}>
                                ${product.price}.00
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', overflow: 'hidden' }}>
                                {product.image ? (
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <Zap size={32} color="var(--primary)" />
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1A1F36' }}>{product.name}</div>
                                <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.9rem' }}>Qty 1</div>
                            </div>
                            <div style={{ fontWeight: 600, color: '#1A1F36' }}>${product.price}.00</div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.5)', fontSize: '0.95rem' }}>
                                <span>Subtotal</span>
                                <span>${product.price}.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1A1F36', fontWeight: 700, fontSize: '1.1rem', marginTop: '8px' }}>
                                <span>Total due</span>
                                <span>${product.price}.00</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '60px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'rgba(0,0,0,0.3)' }}>
                            <span>Powered by <strong style={{ color: 'rgba(0,0,0,0.5)' }}>stripe</strong></span>
                            <span style={{ borderLeft: '1px solid currentColor', paddingLeft: '12px' }}>Terms</span>
                            <span>Privacy</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="checkout-right" style={{ padding: '80px 60px' }}>
                    <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto 0 0' }}>
                        <div style={{ marginBottom: '32px' }}>
                             <Checkout productId={product.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
