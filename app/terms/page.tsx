"use client";

import { motion } from "framer-motion";
import { Shield, Scale, FileText, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using ExToTools.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or extensions.",
            icon: <Scale size={24} className="text-primary" />
        },
        {
            title: "2. Software License",
            content: "We grant you a personal, non-exclusive, non-transferable, limited license to use our Chrome extensions for your own personal or internal business purposes, subject to the subscription plan you have purchased.",
            icon: <FileText size={24} className="text-primary" />
        },
        {
            title: "3. User Restrictions",
            content: "You may not: (a) sub-license, sell, rent, lease, or distribute the extensions; (b) reverse engineer, decompile, or disassemble the software; (c) use the extensions for any illegal or unauthorized purpose.",
            icon: <AlertCircle size={24} className="text-primary" />
        },
        {
            title: "4. Subscription & Billing",
            content: "Subscriptions are billed in advance on a monthly or annual basis. You can cancel your subscription at any time through your dashboard. Refunds are subject to our refund policy.",
            icon: <Lock size={24} className="text-primary" />
        },
        {
            title: "5. Intellectual Property",
            content: "All intellectual property rights in the extensions and the website are owned by ExToTools. Your use of the services does not grant you any ownership rights.",
            icon: <Shield size={24} className="text-primary" />
        }
    ];

    return (
        <div className="container animate-fade-in" style={{ padding: 'clamp(40px, 8vw, 80px) 20px' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px', color: 'rgba(15, 23, 42, 0.6)', fontWeight: 600 }}>
                <ArrowLeft size={16} />
                Back to Collection
            </Link>

            <header style={{ marginBottom: '80px' }}>
                <h1 className="font-serif" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', marginBottom: '24px', lineHeight: 1.1 }}>
                    Terms of <span className="text-gradient">Service</span>
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(15, 23, 42, 0.6)', maxWidth: '700px' }}>
                    Last updated: February 21, 2026. Please read these terms carefully before using our software tools.
                </p>
            </header>

            <div className="grid grid-cols-1" style={{ gap: '32px', maxWidth: '900px' }}>
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="card"
                        style={{ padding: '40px' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'rgba(35, 34, 200, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {section.icon}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{section.title}</h2>
                        </div>
                        <p style={{ color: 'rgba(15, 23, 42, 0.7)', lineHeight: 1.8, margin: 0, fontSize: '1.05rem' }}>
                            {section.content}
                        </p>
                    </motion.div>
                ))}
            </div>

            <footer style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--card-border)' }}>
                <p style={{ color: 'rgba(15, 23, 42, 0.5)', fontSize: '0.9rem' }}>
                    If you have any questions regarding these terms, please contact us at <a href="mailto:info@extotools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>info@extotools.com</a>.
                </p>
            </footer>
        </div>
    );
}
