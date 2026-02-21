"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Globe, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    const sections = [
        {
            title: "Data Collection",
            content: "We collect only the minimum amount of data necessary to provide our services. This includes basic account information and technical data required for our Chrome extensions to function correctly.",
            icon: <Eye size={24} className="text-secondary" />
        },
        {
            title: "Data Usage",
            content: "Your data is used solely to provide and improve our tools. We do not sell your personal information to third parties or use it for advertising purposes.",
            icon: <Globe size={24} className="text-secondary" />
        },
        {
            title: "Security",
            content: "All data transmissions are conducted over secure HTTPS connections. Sensitive information is encrypted at rest using industry-standard protocols.",
            icon: <Lock size={24} className="text-secondary" />
        },
        {
            title: "User Rights",
            content: "You have the right to access, export, or delete your personal data at any time. You can manage these preferences through your account dashboard.",
            icon: <Shield size={24} className="text-secondary" />
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
                    Privacy <span className="text-gradient">Policy</span>
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(15, 23, 42, 0.6)', maxWidth: '700px' }}>
                    Your privacy is our priority. This policy outlines how we handle your data with transparency and security.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px', marginBottom: '80px' }}>
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
                                background: 'rgba(10, 180, 255, 0.05)',
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

            <section className="card" style={{ padding: '40px', background: 'rgba(35, 34, 200, 0.02)', borderStyle: 'dashed' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Chrome Web Store Compliance</h2>
                <div style={{ lineHeight: 1.8, color: 'rgba(15, 23, 42, 0.8)', fontSize: '1.1rem' }}>
                    <p style={{ marginBottom: '16px' }}>
                        Our use of information received from Google APIs will adhere to the <strong>Chrome Web Store User Data Policy</strong>, including the Limited Use requirements.
                    </p>
                    <p>
                        We do not allow any third-party advertising platforms, data brokers, or information resellers to access your data. Transfers of data are limited to providing or improving the single purpose of our extensions.
                    </p>
                </div>
            </section>

            <footer style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(15, 23, 42, 0.5)' }}>
                    <Mail size={18} />
                    <span style={{ fontSize: '0.95rem' }}>
                        Questions about your privacy? Reach out at <a href="mailto:info@extotools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>info@extotools.com</a>
                    </span>
                </div>
            </footer>
        </div>
    );
}
