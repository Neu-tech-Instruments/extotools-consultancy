"use client";

import { useEffect, useState, Suspense } from "react";
import { ArrowRight, Chrome, Layout, ChevronRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<{
        productName: string;
        amount: number;
        interval: string;
        currency: string;
        images: string[];
    } | null>(null);

    useEffect(() => {
        if (sessionId) {
            setLoading(true);
            fetch(`/api/stripe/session?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    setDetails(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching session:", err);
                    setLoading(false);
                });
        } else {
            // Demo Mode for previewing design without a real session
            setDetails({
                productName: "Full Professional Bundle",
                amount: 1.99,
                interval: "month",
                currency: "usd",
                images: ["/tool-icon-20.png", "/tool-icon-20.png", "/tool-icon-20.png"]
            });
            setLoading(false);
        }
    }, [sessionId]);

    return (
        <div style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
            {/* Background Accent */}
            <div style={{ 
                position: 'absolute', 
                top: '-10%', 
                right: '-5%', 
                width: '60%', 
                height: '70%', 
                background: 'radial-gradient(circle, rgba(35, 34, 200, 0.03) 0%, rgba(255,255,255,0) 70%)', 
                zIndex: 0 
            }} />

            <main className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '100px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    
                    {/* Main Section */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '80px', 
                        alignItems: 'center', 
                        marginBottom: '100px' 
                    }} className="success-grid">
                        <style dangerouslySetInnerHTML={{ __html: `
                            @media (max-width: 860px) {
                                .success-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                                .image-container { order: -1; }
                            }
                        `}} />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                                <div style={{ width: '32px', height: '1px', background: 'var(--primary)' }} />
                                <span style={{ 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.4em', 
                                    fontSize: '11px', 
                                    fontWeight: 800, 
                                    color: 'var(--primary)'
                                }}>
                                    Confirmed
                                </span>
                            </div>

                            <h1 className="font-serif" style={{ fontSize: 'min(72px, 10vw)', marginBottom: '32px', lineHeight: 1.1, color: '#111' }}>
                                Payment <br />
                                <span className="text-gradient">Successful.</span>
                            </h1>
                            
                            {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(0,0,0,0.4)', fontSize: '1.1rem' }}>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Retrieving your subscription...</span>
                                </div>
                            ) : details ? (
                                <div style={{ marginBottom: '40px' }}>
                                    <p style={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, marginBottom: '24px' }}>
                                        Successfully subscribed to <strong style={{ color: '#000', fontWeight: 700 }}>{details.productName}</strong> at <strong style={{ color: 'var(--primary)' }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: details.currency }).format(details.amount)}/{details.interval}</strong>.
                                    </p>
                                    <div style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '8px', 
                                        background: 'rgba(34, 197, 94, 0.08)', 
                                        color: '#15803d', 
                                        padding: '8px 16px', 
                                        borderRadius: '100px', 
                                        fontSize: '0.9rem', 
                                        fontWeight: 600 
                                    }}>
                                        <Sparkles size={16} /> Subscription Active
                                    </div>
                                </div>
                            ) : (
                                <p style={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.4)', lineHeight: 1.6, marginBottom: '40px' }}>
                                    Your account is now upgraded and your professional tools are ready.
                                </p>
                            )}

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <Link href="/dashboard" className="btn btn-primary" style={{ padding: '16px 32px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                                    Go to Dashboard <ArrowRight size={18} />
                                </Link>
                                <Link href="/" className="btn btn-outline" style={{ padding: '16px 32px', borderRadius: '4px' }}>
                                    Home
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="image-container"
                            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
                        >
                            <div style={{ 
                                width: '100%', 
                                maxWidth: '400px', 
                                aspectRatio: '1/1', 
                                background: '#F9FAFB', 
                                borderRadius: '24px', 
                                border: '1px solid rgba(0,0,0,0.05)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: '40px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
                            }}>
                                {loading ? (
                                    <div className="animate-pulse" style={{ width: '80%', height: '80%', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }} />
                                ) : details?.images && details.images.length > 0 ? (
                                    <div style={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: details.images.length > 1 ? '1fr 1fr' : '1fr', 
                                        gap: '24px', 
                                        width: '100%',
                                        padding: '20px'
                                    }}>
                                        {details.images.slice(0, 4).map((img, i) => (
                                            <motion.img 
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + (i * 0.1) }}
                                                src={img} 
                                                alt="Extension Icon" 
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    maxHeight: '120px',
                                                    objectFit: 'contain',
                                                    filter: 'drop-shadow(0 15px 30px rgba(35, 34, 200, 0.2))'
                                                }} 
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(0,0,0,0.2)' }}>
                                        <Sparkles size={80} strokeWidth={1} />
                                        <span style={{ marginTop: '20px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px' }}>Premium Account</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                                style={{ 
                                    position: 'absolute', 
                                    bottom: '-20px', 
                                    right: '20px', 
                                    background: '#111', 
                                    color: '#fff', 
                                    padding: '12px 24px', 
                                    borderRadius: '8px', 
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <Sparkles size={16} color="var(--primary)" /> Premium Active
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Step Cards / Next Steps */}
                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '80px' }}>
                        <div style={{ marginBottom: '48px' }}>
                            <h2 className="font-serif" style={{ fontSize: '2rem', color: '#111' }}>How to activate.</h2>
                        </div>

                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                            gap: '40px' 
                        }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="card"
                                style={{ 
                                    background: 'var(--architect-bg)', 
                                    padding: '40px', 
                                    borderRadius: '0', 
                                    border: '1px solid var(--architect-line)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '56px',
                                    height: '56px',
                                    minWidth: '56px',
                                    minHeight: '56px',
                                    aspectRatio: '1/1',
                                    flexShrink: 0,
                                    borderRadius: '50%', 
                                    background: 'rgba(35, 34, 200, 0.1)', 
                                    color: 'var(--primary)', 
                                    marginBottom: '32px' 
                                }}>
                                    <Chrome size={24} />
                                </div>
                                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#111' }}>Sync Extensions</h3>
                                <p style={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1 }}>
                                    Open your Chrome extensions and log in with this account email to instantly activate your premium features.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)' }}>
                                    Step 01 <ArrowRight size={14} />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="card"
                                style={{ 
                                    background: 'var(--architect-bg)', 
                                    padding: '40px', 
                                    borderRadius: '0', 
                                    border: '1px solid var(--architect-line)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '56px',
                                    height: '56px',
                                    minWidth: '56px',
                                    minHeight: '56px',
                                    aspectRatio: '1/1',
                                    flexShrink: 0,
                                    borderRadius: '50%', 
                                    background: 'rgba(35, 34, 200, 0.1)', 
                                    color: 'var(--primary)', 
                                    marginBottom: '32px' 
                                }}>
                                    <Layout size={24} />
                                </div>
                                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#111' }}>View Dashboard</h3>
                                <p style={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1 }}>
                                    Manage your subscriptions, view usage limits, and explore other professional tools in your dashboard.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)' }}>
                                    Step 02 <ArrowRight size={14} />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Footer Accent */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        style={{ 
                            marginTop: '100px', 
                            paddingTop: '40px', 
                            borderTop: '1px solid rgba(0,0,0,0.04)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}
                    >
                        <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.5em', color: 'rgba(0,0,0,0.2)', textTransform: 'uppercase' }}>
                            ExToTools / Professional Workspace 2024
                        </div>
                        <div style={{ fontSize: '9px', color: 'rgba(0,0,0,0.1)', letterSpacing: '0.1em' }}>
                            BUILD V2.1.0-PREMIUM
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default function SuccessPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Suspense fallback={null}>
            <SuccessContent />
        </Suspense>
    );
}
