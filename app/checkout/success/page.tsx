"use client";

import { useEffect, useState, Suspense } from "react";
import { ArrowRight, Chrome, Layout, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(!!sessionId);
    const [details, setDetails] = useState<{
        productName: string;
        amount: number;
        interval: string;
        currency: string;
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
                currency: "usd"
            });
            setLoading(false);
        }
    }, [sessionId]);

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <main className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '120px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {/* Header Section */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr auto', 
                        gap: '48px', 
                        alignItems: 'flex-end', 
                        marginBottom: '80px' 
                    }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span style={{ 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.3em', 
                                fontSize: '10px', 
                                fontWeight: 700, 
                                color: 'var(--primary)', 
                                marginBottom: '16px', 
                                display: 'block' 
                            }}>
                                Transaction Confirmed
                            </span>
                            <h1 className="font-serif" style={{ fontSize: 'min(80px, 12vw)', marginBottom: '24px', lineHeight: 0.9 }}>
                                Payment <br />
                                <span className="text-gradient">Successful.</span>
                            </h1>
                            
                            {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(11, 10, 9, 0.4)' }}>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>Retrieving subscription details...</span>
                                </div>
                            ) : details ? (
                                <p style={{ fontSize: '1.25rem', color: 'rgba(11, 10, 9, 0.6)', maxWidth: '500px', lineHeight: 1.6 }}>
                                    You have successfully subscribed to <strong style={{ color: 'var(--foreground)' }}>{details.productName}</strong> for <strong style={{ color: 'var(--primary)' }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: details.currency }).format(details.amount)}/{details.interval}</strong>.
                                    <br />
                                    <span style={{ fontSize: '1rem', marginTop: '12px', display: 'block', opacity: 0.7 }}>Your professional tools are now activated and ready for use.</span>
                                </p>
                            ) : (
                                <p style={{ fontSize: '1.25rem', color: 'rgba(11, 10, 9, 0.4)', maxWidth: '400px', lineHeight: 1.6 }}>
                                    Your account is now upgraded. Your professional tools are ready for activation.
                                </p>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="desktop-only"
                        >
                            <div className="oversized-number">01</div>
                        </motion.div>
                    </div>

                    {/* Action Cards / Next Steps */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '32px', 
                        marginBottom: '80px' 
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="card"
                            style={{ cursor: 'default' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start' }}>
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
                                    marginBottom: '24px' 
                                }}>
                                    <Chrome size={24} />
                                </div>
                                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Sync Extensions</h3>
                                <p style={{ color: 'rgba(15, 23, 42, 0.5)', marginBottom: '32px', flexGrow: 1 }}>
                                    Open your Chrome extensions and log in with this account email to instantly activate your premium features.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
                                    Step 01 <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="card"
                            style={{ cursor: 'default' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start' }}>
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
                                    marginBottom: '24px' 
                                }}>
                                    <Layout size={24} />
                                </div>
                                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>View Dashboard</h3>
                                <p style={{ color: 'rgba(15, 23, 42, 0.5)', marginBottom: '32px', flexGrow: 1 }}>
                                    Manage your subscriptions, view usage limits, and explore other professional tools in your dashboard.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
                                    Step 02 <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            paddingTop: '48px', 
                            borderTop: '1px solid var(--architect-line)', 
                            gap: '32px' 
                        }}
                    >
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                                Dashboard &nbsp; <ChevronRight size={18} />
                            </Link>
                            <Link href="/#collection" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                                More Tools
                            </Link>
                        </div>
                        <div className="vertical-text desktop-only" style={{ opacity: 0.2 }}>
                            EST. 2024 / EXTOTOOLS
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
