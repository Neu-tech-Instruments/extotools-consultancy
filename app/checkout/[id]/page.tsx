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
        <div className="min-h-screen animate-fade-in" style={{ display: 'flex', flexDirection: 'column', background: 'white' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                nav, footer { display: none !important; }
                main { padding-top: 0 !important; }
                @media (max-width: 960px) {
                    .checkout-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .checkout-left {
                        padding: 60px 40px !important;
                        border-right: none !important;
                        border-bottom: 1px solid rgba(0,0,0,0.05);
                    }
                    .checkout-right {
                        padding: 60px 40px !important;
                    }
                }
            `}} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="checkout-grid">
                {/* Left Side: Summary */}
                <div className="checkout-left" style={{ background: '#F6F9FC', padding: '100px 80px', borderRight: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ maxWidth: '420px', width: '100%' }}>
                        <Link href={product.slug === 'bundles' ? '/bundles' : `/extensions/${product.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(0,0,0,0.4)', fontSize: '0.9rem', marginBottom: '60px', fontWeight: 500 }}>
                            <ArrowLeft size={16} />
                            <span>Back to {product.name}</span>
                        </Link>

                        <div style={{ marginBottom: '48px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <img src="/dark.svg" alt="ExToTools" style={{ height: '24px' }} />
                                <span style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>• Pay ExToTools</span>
                            </div>
                            <div style={{ fontSize: '4.5rem', fontWeight: 700, margin: '8px 0', color: '#1A1F36', letterSpacing: '-0.02em' }}>
                                ${product.price}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '40px' }}>
                            <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                {product.image ? (
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <Zap size={32} color="var(--primary)" />
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '1.2rem', color: '#1A1F36' }}>{product.name}</div>
                                <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.95rem' }}>Monthly Subscription</div>
                            </div>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1A1F36' }}>${product.price}</div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>
                                <span>Subtotal</span>
                                <span>${product.price}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1A1F36', fontWeight: 700, fontSize: '1.2rem', marginTop: '8px' }}>
                                <span>Total due today</span>
                                <span>${product.price}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '80px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.3)', fontWeight: 500 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                Powered by <strong style={{ color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>stripe</strong>
                            </div>
                            <div style={{ width: '1px', height: '12px', background: 'currentColor' }}></div>
                            <Link href="/terms" className="hover-glow">Terms</Link>
                            <Link href="/privacy" className="hover-glow">Privacy</Link>
                        </div>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="checkout-right" style={{ padding: '100px 80px', display: 'flex' }}>
                    <div style={{ maxWidth: '420px', width: '100%' }}>
                        <div style={{ marginBottom: '32px' }}>
                             <Checkout productId={product.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
