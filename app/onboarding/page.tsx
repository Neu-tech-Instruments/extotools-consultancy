"use client";

import { motion } from "framer-motion";
import { User, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: ""
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const countries = [
        "United States", "United Kingdom", "Canada", "Australia", "Germany",
        "France", "Spain", "Italy", "Brazil", "Mexico", "India", "Japan",
        "Netherlands", "Sweden", "Other"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/user/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 100px)',
            padding: '40px 20px'
        }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: 'clamp(32px, 5vw, 56px)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'rgba(10, 180, 255, 0.05)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <ShieldCheck size={32} color="var(--primary)" />
                    </div>
                    <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                        Complete <span className="text-gradient">Profile</span>
                    </h1>
                    <p style={{ color: 'rgba(15, 23, 42, 0.6)', lineHeight: 1.6 }}>
                        Just a few more details to secure your account and personalize your experience.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(15, 23, 42, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>First Name</label>
                            <input
                                required
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                placeholder="John"
                                style={{
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    background: 'rgba(15, 23, 42, 0.03)',
                                    border: '1px solid var(--card-border)',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(15, 23, 42, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Name</label>
                            <input
                                required
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Doe"
                                style={{
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    background: 'rgba(15, 23, 42, 0.03)',
                                    border: '1px solid var(--card-border)',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(15, 23, 42, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Country</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                required
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    background: 'rgba(15, 23, 42, 0.03)',
                                    border: '1px solid var(--card-border)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    appearance: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="" disabled>Select your country</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            <Globe size={18} style={{
                                position: 'absolute',
                                right: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'rgba(15, 23, 42, 0.3)',
                                pointerEvents: 'none'
                            }} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', height: '56px', marginTop: '16px', fontWeight: 700 }}
                    >
                        {loading ? "Saving..." : "Start Exploring"}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.4)', lineHeight: 1.6 }}>
                    Your data is stored securely and used only to verify your premium tool access.
                </p>
            </div>
        </div>
    );
}
