"use client";

import { motion } from "framer-motion";
import { extensions } from "@/lib/extensions";
import { CheckCircle2, Circle, Clock, ArrowRight, Chrome, Zap, Star } from "lucide-react";
import Link from "next/link";

export default function RoadmapPage() {
    const liveExtensions = extensions.filter(ext => ext.isBuilt);
    const inDevExtensions = extensions.filter(ext => !ext.isBuilt);

    // Theoretical future extensions for the "Planned" column
    const plannedExtensions = [
        { name: "Ultimate SEO Analyzer", desc: "Real-time SEO scoring for any webpage." },
        { name: "Focus Mode Pro", desc: "Block distractions and sync deep-work sessions." },
        { name: "Crypto DevSuite", desc: "Integrated tools for Web3 and Smart Contract debugging." }
    ];

    return (
        <div className="container animate-fade-in" style={{ padding: 'clamp(40px, 8vw, 80px) 20px' }}>
            <header style={{ textAlign: 'center', marginBottom: '80px' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'rgba(15, 23, 42, 0.6)', fontWeight: 600 }}>
                    <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                    Back to Collection
                </Link>
                <h1 className="font-serif" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '24px' }}>
                    Evolutionary <span className="text-gradient">Roadmap</span>
                </h1>
                <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'rgba(15, 23, 42, 0.6)', maxWidth: '700px', margin: '0 auto' }}>
                    Tracking the growth of our premium toolkit. From experimental concepts to industry-standard Chrome extensions.
                </p>
            </header>

            <div className="grid grid-cols-3" style={{ gap: '32px', alignItems: 'start' }}>

                {/* Column 1: Live */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ width: '12px', height: '12px', background: '#16a34a', borderRadius: '50%' }} />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live & Active</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {liveExtensions.map((ext, i) => (
                            <motion.div
                                key={ext.slug}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card"
                                style={{ padding: '24px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <CheckCircle2 size={18} color="#16a34a" />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{ext.name}</h3>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.6)', marginBottom: '16px' }}>{ext.shortDescription}</p>
                                <Link href={`/extensions/${ext.slug}`} style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    VIEW TOOL <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Column 2: In Development */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%' }} />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>In Development</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {inDevExtensions.map((ext, i) => (
                            <motion.div
                                key={ext.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="card"
                                style={{ padding: '24px', borderStyle: 'dashed' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <Clock size={18} color="var(--primary)" />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{ext.name}</h3>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.6)', marginBottom: '16px' }}>{ext.shortDescription}</p>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', background: 'rgba(35, 34, 200, 0.05)', padding: '4px 10px', display: 'inline-block', borderRadius: '100px' }}>
                                    ETA: Q2 2026
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Column 3: Planned */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ width: '12px', height: '12px', background: 'rgba(15, 23, 42, 0.2)', borderRadius: '50%' }} />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(15, 23, 42, 0.4)' }}>Planned</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {plannedExtensions.map((ext, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.6 }}
                                className="card"
                                style={{ padding: '24px', opacity: 0.6, background: 'rgba(15, 23, 42, 0.01)' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <Circle size={18} color="rgba(15, 23, 42, 0.2)" />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'rgba(15, 23, 42, 0.6)' }}>{ext.name}</h3>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.4)' }}>{ext.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            {/* CTA Section */}
            <section style={{ marginTop: '120px', textAlign: 'center' }}>
                <div className="card" style={{ background: 'var(--accent-navy)', color: 'white', padding: '80px 40px', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '24px' }}>Have a tool idea?</h2>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '600px', margin: '0 auto 40px' }}>
                            We build requested features for our Enterprise and Pro Bundle subscribers first. Let us know what you need.
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            PROPOSE A FEATURE <Zap size={18} fill="white" style={{ marginLeft: '8px' }} />
                        </Link>
                    </div>
                    {/* Decorative background circle */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(35, 34, 200, 0.15) 0%, transparent 70%)',
                        zIndex: 0
                    }} />
                </div>
            </section>
        </div>
    );
}
