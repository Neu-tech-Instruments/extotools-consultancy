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
        description: extension.description
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
                description: bundle.description
            };
        }
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-architect grid-dots animate-fade-in" style={{ padding: '80px 0' }}>
            {/* Geometric background accents */}
            <div style={{ position: 'fixed', top: '10%', right: '5%', fontSize: '12rem', opacity: 0.03, fontFamily: 'Instrument Serif', pointerEvents: 'none', userSelect: 'none' }}>EXTO</div>
            
            <div className="container" style={{ maxWidth: '1100px' }}>
                <Link href={product.slug === 'bundles' ? '/bundles' : `/extensions/${product.slug}`} className="animated-underline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '48px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <ArrowLeft size={16} />
                    Back to {product.name}
                </Link>

                <div className="grid grid-cols-2" style={{ gap: '80px', alignItems: 'start' }}>
                    {/* Left Column: Order Summary */}
                    <div>
                        <div style={{ marginBottom: '40px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6 }}>Secured Checkout</span>
                            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', margin: '12px 0 24px' }}>Complete <br/><span className="text-gradient">Purchase</span></h1>
                            <p style={{ fontSize: '1.1rem', color: 'rgba(15, 23, 42, 0.6)', lineHeight: 1.6 }}>
                                You are about to unlock full access to <strong>{product.name}</strong>. Enjoy premium features and dedicated support.
                            </p>
                        </div>

                        <div className="card" style={{ padding: '32px', background: 'white', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Zap size={20} color="var(--primary)" />
                                Order Details
                            </h3>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)', marginBottom: '16px' }}>
                                <span style={{ color: 'rgba(15, 23, 42, 0.5)' }}>Product</span>
                                <span style={{ fontWeight: 700 }}>{product.name}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--card-border)', marginBottom: '16px' }}>
                                <span style={{ color: 'rgba(15, 23, 42, 0.5)' }}>Billing Cycle</span>
                                <span style={{ fontWeight: 700 }}>Monthly</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '8px' }}>
                                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Due</span>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>${product.price}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'rgba(15, 23, 42, 0.4)', marginTop: '4px' }}>billed monthly</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ padding: '10px', background: 'var(--primary-glow)', borderRadius: '8px', color: 'var(--primary)' }}>
                                    <Lock size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Bank-Level Security</div>
                                    <p style={{ fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.5)' }}>Your payment details are encrypted and processed by Stripe.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ padding: '10px', background: 'rgba(108, 208, 161, 0.1)', borderRadius: '8px', color: '#16a34a' }}>
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Instant Access</div>
                                    <p style={{ fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.5)' }}>Tools are activated immediately after successful payment.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Widget */}
                    <div style={{ position: 'sticky', top: '40px' }}>
                        <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.08)' }}>
                            <div style={{ background: 'var(--accent-navy)', padding: '24px 32px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <CreditCard size={20} color="var(--secondary)" />
                                    <span style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem' }}>Secure Payment</span>
                                </div>
                                <img src="/dark.svg" alt="ExToTools" style={{ height: '18px', opacity: 0.8 }} />
                            </div>
                            <div style={{ padding: '32px' }}>
                                <Checkout productId={product.id} />
                            </div>
                            <div style={{ padding: '16px 32px', borderTop: '1px solid var(--card-border)', background: 'rgba(15, 23, 42, 0.02)', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.75rem', color: 'rgba(15, 23, 42, 0.4)', margin: 0 }}>
                                    By completing your purchase, you agree to our <Link href="/terms" className="animated-underline">Terms</Link> and <Link href="/privacy" className="animated-underline">Privacy Policy</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
