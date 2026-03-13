"use client";

import { motion } from "framer-motion";
import { RefreshCcw, XCircle, Clock, CreditCard, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function RefundPage() {
    const sections = [
        {
            title: "7-Day Satisfaction Guarantee",
            content: "We want you to be completely satisfied with ExToTools. If for any reason our extensions do not meet your expectations, we offer a full refund within the first 7 days of your initial purchase.",
            icon: <RefreshCcw size={24} className="text-primary" />
        },
        {
            title: "Cancellation Policy",
            content: "You can cancel your subscription at any time directly through your dashboard. Upon cancellation, you will continue to have access to premium features until the end of your current billing period.",
            icon: <XCircle size={24} className="text-primary" />
        },
        {
            title: "Fulfillment & Access",
            content: "Access to all premium features is granted immediately upon successful payment verification. There are no shipping or handling fees for our digital extension services.",
            icon: <Clock size={24} className="text-primary" />
        },
        {
            title: "Processing Refunds",
            content: "Once approved, refunds are processed back to your original payment method. Please note that it may take 5-10 business days for the credit to appear on your statement.",
            icon: <CreditCard size={24} className="text-primary" />
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
                    Refund <span className="text-gradient">& Cancellation</span>
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(15, 23, 42, 0.6)', maxWidth: '700px' }}>
                    Our commitment to transparency and fairness. Here is everything you need to know about our refund process.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px', maxWidth: '1000px' }}>
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
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{section.title}</h2>
                        </div>
                        <p style={{ color: 'rgba(15, 23, 42, 0.7)', lineHeight: 1.8, margin: 0, fontSize: '1.05rem' }}>
                            {section.content}
                        </p>
                    </motion.div>
                ))}
            </div>

            <footer style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(15, 23, 42, 0.5)' }}>
                    <Mail size={18} />
                    <span style={{ fontSize: '0.95rem' }}>
                        Need a refund? Contact our support team at <a href="mailto:info@extotools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>info@extotools.com</a>
                    </span>
                </div>
                <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.4)' }}>
                    Business Address: ExToTools, [Your Street Address], [Your City], [Your Country]
                </p>
            </footer>
        </div>
    );
}
