"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowRight, MapPin } from "lucide-react";
import React, { useState } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormState({ name: "", email: "", subject: "", message: "" });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ backgroundColor: 'var(--accent-navy)', color: 'white', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

            {/* Decorative Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '70%',
                height: '70%',
                background: 'radial-gradient(circle, rgba(35,34,200,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(108,208,161,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '80px', paddingBottom: '120px' }}>

                {/* Header Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '64px' }}
                >
                    <span style={{
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        letterSpacing: '0.1em',
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '6px 16px',
                        display: 'inline-block',
                        marginBottom: '24px'
                    }}>
                        SUPPORT & SALES
                    </span>
                    <h1 className="font-serif" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '24px' }}>
                        Let's build <br />something <span style={{ color: 'var(--primary)' }}>great.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.6 }}>
                        Whether you have a question about our enterprise bundles, need technical support, or want to suggest a new extension feature—our team is ready.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2" style={{ gap: '80px', alignItems: 'start' }}>

                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Mail size={24} color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Email Us</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '12px', lineHeight: 1.5 }}>For general inquiries, enterprise pricing, and technical support.</p>
                                    <a href="mailto:hello@extotools.com" style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', transition: 'color 0.2s', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                                        hello@extotools.com
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <MessageSquare size={24} color="var(--secondary)" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Response Time</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                                        We aim to respond to all premium subscriber inquiries within exactly <strong>4 hours</strong> during business days.
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <MapPin size={24} color="var(--accent-1)" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Headquarters</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                                        100 Innovation Drive<br />
                                        Suite 400<br />
                                        San Francisco, CA 94103
                                    </p>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '48px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Form Accent Top Line */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)' }} />

                            <h3 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '32px' }}>Send a Message</h3>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        padding: '32px',
                                        background: 'rgba(108, 208, 161, 0.1)',
                                        border: '1px solid var(--secondary)',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✨</div>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>Message Sent!</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>Thanks for reaching out. A member of our team will get back to you shortly.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formState.name}
                                                onChange={handleChange}
                                                style={{
                                                    background: 'rgba(0,0,0,0.2)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    padding: '16px',
                                                    color: 'white',
                                                    outline: 'none',
                                                    transition: 'border-color 0.2s',
                                                    fontFamily: 'inherit'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formState.email}
                                                onChange={handleChange}
                                                style={{
                                                    background: 'rgba(0,0,0,0.2)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    padding: '16px',
                                                    color: 'white',
                                                    outline: 'none',
                                                    transition: 'border-color 0.2s',
                                                    fontFamily: 'inherit'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="subject" style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formState.subject}
                                            onChange={handleChange}
                                            style={{
                                                background: 'rgba(0,0,0,0.2)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                padding: '16px',
                                                color: 'white',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                                fontFamily: 'inherit'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            required
                                            value={formState.message}
                                            onChange={handleChange}
                                            style={{
                                                background: 'rgba(0,0,0,0.2)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                padding: '16px',
                                                color: 'white',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                                fontFamily: 'inherit',
                                                resize: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-primary"
                                        style={{
                                            marginTop: '16px',
                                            width: '100%',
                                            opacity: isSubmitting ? 0.7 : 1,
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                                        {!isSubmitting && <ArrowRight size={20} />}
                                    </button>

                                </form>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
