import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Checkout from "@/components/Checkout";
import Price from "@/components/Price";
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
        features: JSON.parse(extension.features || "[]") as string[],
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
                features: ["Access to premium extensions", "Priority support", "Early access to new tools"],
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
                @media (max-width: 960px) {
                    .checkout-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .checkout-left {
                        padding: 60px 24px !important;
                        border-right: none !important;
                        border-bottom: 1px solid rgba(0,0,0,0.05);
                    }
                    .checkout-right {
                        padding: 40px 24px !important;
                    }
                }
            `}} />

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '100vh' }} className="checkout-grid">
                {/* Left Side: Summary */}
                <div className="checkout-left" style={{ background: '#F8FAFC', padding: '100px 60px', borderRight: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ maxWidth: '440px', width: '100%' }}>
                        <Link href={product.slug === 'bundles' ? '/bundles' : `/extensions/${product.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(0,0,0,0.2)', fontSize: '0.8rem', marginBottom: '32px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }} className="hover-glow">
                            <ArrowLeft size={14} />
                            <span>Back</span>
                        </Link>

                        <div style={{ marginBottom: '48px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <img src="/tool-icon-20.png" alt="ExToTools Logo" style={{ height: '24px', width: 'auto' }} />
                                <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em', color: '#1A1F36' }}>
                                    EXTO<span style={{ color: 'var(--primary)' }}>TOOLS</span>
                                </span>
                                <span style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.4)', fontWeight: 600, marginLeft: '4px' }}>• SECURE CHECKOUT</span>
                            </div>
                            <h2 style={{ fontSize: '1.2rem', color: 'rgba(0,0,0,0.5)', fontWeight: 500, marginBottom: '8px' }}>Subscribe to {product.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#1A1F36', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                    <Price amount={product.price} />
                                </div>
                                <div style={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>/ month</div>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginTop: '8px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Lock size={13} strokeWidth={2} />
                                Secure payment through Stripe
                            </div>
                        </div>

                        {/* Product Detail Card */}
                        <div style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '0', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <Zap size={28} color="var(--primary)" />
                                    )}
                                </div>
                                <div style={{ paddingTop: '4px' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1A1F36', marginBottom: '4px' }}>{product.name}</div>
                                    <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                        {product.description || "Premium tool designed for professionals."}
                                    </p>
                                </div>
                            </div>

                            {/* Keypoints */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(255,255,255,0.5)', padding: '24px', borderRadius: '0', border: '1px solid rgba(0,0,0,0.03)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>What's included</div>
                                {product.features.slice(0, 3).map((feature, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#1A1F36' }}>
                                        <div style={{ color: '#22c55e', display: 'flex' }}><ShieldCheck size={18} /></div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>
                                <span>Monthly Subscription</span>
                                <span><Price amount={product.price} /></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1A1F36', fontWeight: 700, fontSize: '1.2rem', marginTop: '8px' }}>
                                <span>Total due today</span>
                                <span><Price amount={product.price} /></span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.4)', textAlign: 'right', marginTop: '-8px' }}>
                                Recurring billing every month. Cancel anytime.
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '60px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.3)', fontWeight: 500 }}>
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
                <div className="checkout-right" style={{ padding: '100px 80px', display: 'flex', background: 'white' }}>
                    <div style={{ maxWidth: '440px', width: '100%' }}>
                        <div style={{ marginBottom: '32px' }}>
                             <Checkout productId={product.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
