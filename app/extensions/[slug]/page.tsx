import { notFound } from "next/navigation";
import { extensions } from "@/lib/extensions";
import { CheckCircle, Chrome, Shield, Zap, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import SubscribeButton from "@/components/SubscribeButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return extensions.map((ext) => ({
        slug: ext.slug,
    }));
}

export default async function ExtensionPage({ params }: PageProps) {
    const { slug } = await params;
    const extension = extensions.find((ext) => ext.slug === slug);

    if (!extension) {
        notFound();
    }

    return (
        <div className="container animate-fade-in" style={{ padding: 'clamp(40px, 8vw, 60px) 20px' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: 'rgba(15, 23, 42, 0.6)', fontWeight: 600, fontSize: '0.9rem' }}>
                <ArrowLeft size={16} />
                Back to Collection
            </Link>

            <div className="grid grid-cols-2" style={{ gap: 'clamp(32px, 6vw, 60px)', alignItems: 'start' }}>
                {/* Left: Info */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                        <div style={{
                            width: 'clamp(48px, 10vw, 64px)',
                            height: 'clamp(48px, 10vw, 64px)',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <Chrome size={32} color="var(--primary)" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '4px' }}>{extension.name}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                                <Star size={16} fill="var(--primary)" />
                                <span>Premium Chrome Tool</span>
                            </div>
                        </div>
                    </div>

                    <p style={{ fontSize: '1.2rem', color: 'rgba(15, 23, 42, 0.7)', marginBottom: '40px', lineHeight: 1.8 }}>
                        {extension.description}
                    </p>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Key Features</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {extension.features.map((feature, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <CheckCircle size={20} color="var(--primary)" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ background: 'rgba(59, 130, 246, 0.03)', borderColor: 'var(--primary-glow)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <Shield size={20} color="var(--primary)" />
                            <h4 style={{ margin: 0 }}>Privacy & Security Verified</h4>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.6)', margin: 0 }}>
                            This extension has been audited for security and does not sell your browsing data.
                        </p>
                    </div>
                </div>

                {/* Right: Pricing Card */}
                <div style={{ position: 'relative', top: 'auto' }} className="pricing-card-container">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media (min-width: 769px) {
                            .pricing-card-container {
                                position: sticky !important;
                                top: 120px !important;
                            }
                        }
                    `}} />
                    <div className="card" style={{ padding: '40px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(15, 23, 42, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Subscription Plan
                            </span>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '4px', marginTop: '8px' }}>
                                <span style={{ fontSize: '3.5rem', fontWeight: 800 }}>${extension.price}</span>
                                <span style={{ color: 'rgba(15, 23, 42, 0.4)', fontSize: '1.1rem' }}>/mo</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                                <Zap size={16} color="var(--primary)" />
                                <span>Unlimited Usage</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                                <Zap size={16} color="var(--primary)" />
                                <span>All Pro Features Included</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                                <Zap size={16} color="var(--primary)" />
                                <span>Regular Updates & Support</span>
                            </div>
                        </div>

                        <SubscribeButton
                            slug={extension.slug}
                            price={extension.price}
                            isBuilt={extension.isBuilt}
                        />

                        {!extension.isBuilt && (
                            <p style={{ fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.4)', textAlign: 'center', marginTop: '12px' }}>
                                This extension is currently in development. Subscribe to be notified when it launches.
                            </p>
                        )}

                        {extension.isBuilt && (
                            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--card-border)' }}>
                                <a
                                    href={extension.chromeWebStoreLink || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card hover-glow"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '16px',
                                        background: 'rgba(15, 23, 42, 0.02)',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'white',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                    }}>
                                        <Chrome size={24} color="var(--primary)" />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(15, 23, 42, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1, marginBottom: '4px' }}>
                                            Available in the
                                        </div>
                                        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-navy)', lineHeight: 1 }}>
                                            Chrome Web Store
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}

                        <div style={{ marginTop: '24px', textAlign: 'center' }}>
                            <Link href="/bundles" style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>
                                Looking for a better deal? Check our bundles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggestions Section */}
            <div style={{ marginTop: 'clamp(60px, 10vw, 100px)', borderTop: '1px solid var(--card-border)', paddingTop: 'clamp(40px, 8vw, 80px)' }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '40px', textAlign: 'center' }}>You Might Also Like</h2>
                <div className="grid grid-cols-3">
                    {extensions
                        .filter(ext => ext.slug !== slug)
                        .slice(0, 3)
                        .map((ext) => (
                            <Link key={ext.slug} href={`/extensions/${ext.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(15, 23, 42, 0.03)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '16px'
                                }}>
                                    <Chrome size={20} color={ext.isBuilt ? 'var(--primary)' : 'rgba(15, 23, 42, 0.2)'} />
                                </div>

                                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{ext.name}</h3>
                                <p style={{ color: 'rgba(15, 23, 42, 0.6)', fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>
                                    {ext.shortDescription}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>${ext.price}</span>
                                    <div style={{
                                        padding: '2px 10px',
                                        borderRadius: '100px',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        background: ext.isBuilt ? 'rgba(34, 197, 94, 0.1)' : 'rgba(15, 23, 42, 0.03)',
                                        color: ext.isBuilt ? '#16a34a' : 'rgba(15, 23, 42, 0.4)'
                                    }}>
                                        {ext.isBuilt ? 'AVAILABLE' : 'PROMO'}
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}
