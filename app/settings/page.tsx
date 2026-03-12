"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Globe, Save, LogOut, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: ""
    });

    const countries = [
        "United States", "United Kingdom", "Canada", "Australia", "Germany",
        "France", "Spain", "Italy", "Brazil", "Mexico", "India", "Japan",
        "Netherlands", "Sweden", "Other"
    ];

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        if (session?.user) {
            const user = session.user as any;
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                country: user.country || ""
            });
        }
    }, [session, status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSaved(false);

        try {
            const res = await fetch("/api/user/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSaved(true);
                await update(); // Refresh session data
                setTimeout(() => setSaved(false), 3000);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save changes.");
            }
        } catch (err) {
            console.error("Error saving profile:", err);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    if (status === "loading") {
        return (
            <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)' }}>
                <p style={{ opacity: 0.5 }}>Loading...</p>
            </div>
        );
    }

    if (!session?.user) return null;

    const inputStyle: React.CSSProperties = {
        padding: '14px 16px',
        borderRadius: '8px',
        background: 'rgba(15, 23, 42, 0.03)',
        border: '1px solid var(--card-border)',
        fontSize: '1rem',
        outline: 'none',
        width: '100%',
        transition: 'border-color 0.2s ease'
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '0.8rem',
        fontWeight: 700,
        color: 'rgba(15, 23, 42, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em'
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '60px 0', maxWidth: '720px' }}>
            {/* Header */}
            <div style={{ marginBottom: '48px' }}>
                <Link href="/dashboard" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    marginBottom: '24px'
                }}>
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
                <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Settings</h1>
                <p style={{ color: 'rgba(15, 23, 42, 0.5)', fontSize: '0.95rem' }}>
                    Manage your account and profile information.
                </p>
            </div>

            {/* Profile Section */}
            <div className="card" style={{ padding: 'clamp(24px, 4vw, 40px)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--card-border)' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(15, 23, 42, 0.05)',
                        border: '2px solid var(--card-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        flexShrink: 0
                    }}>
                        {session.user.image ? (
                            <img src={session.user.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <User size={28} opacity={0.4} />
                        )}
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{session.user.name || "User"}</h3>
                        <p style={{ margin: '4px 0 0', color: 'rgba(15, 23, 42, 0.5)', fontSize: '0.9rem' }}>{session.user.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={labelStyle}>First Name</label>
                            <input
                                required
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                placeholder="John"
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={labelStyle}>Last Name</label>
                            <input
                                required
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Doe"
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="email"
                            value={session.user.email || ""}
                            disabled
                            style={{
                                ...inputStyle,
                                opacity: 0.5,
                                cursor: 'not-allowed'
                            }}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'rgba(15, 23, 42, 0.35)', margin: 0 }}>
                            Email is managed by your Google account and cannot be changed here.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={labelStyle}>Country</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                required
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                style={{
                                    ...inputStyle,
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

                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#dc2626',
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}>
                            {error}
                        </div>
                    )}

                    {saved && (
                        <div style={{
                            padding: '12px 16px',
                            background: 'rgba(34, 197, 94, 0.08)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '8px',
                            color: '#16a34a',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Check size={16} />
                            Changes saved successfully.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', height: '50px', fontWeight: 700, gap: '8px' }}
                    >
                        <Save size={18} />
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>

            {/* Support Section */}
            <div className="card" style={{ padding: 'clamp(24px, 4vw, 40px)', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'rgba(15, 23, 42, 0.8)' }}>Support & Resources</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.5)', marginBottom: '20px' }}>
                    Need help? Our documentation and support team are here for you.
                </p>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <a href="#" style={{ 
                        color: 'var(--primary)', 
                        textDecoration: 'none', 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        Documentation →
                    </a>
                    <a href="#" style={{ 
                        color: 'var(--primary)', 
                        textDecoration: 'none', 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        Contact Support →
                    </a>
                    <a href="#" style={{ 
                        color: 'rgba(15, 23, 42, 0.4)', 
                        textDecoration: 'none', 
                        fontSize: '0.9rem', 
                        fontWeight: 500,
                        marginLeft: 'auto'
                    }}>
                        Give Feedback
                    </a>
                </div>
            </div>

            {/* Sign Out Section */}
            <div className="card" style={{ padding: 'clamp(24px, 4vw, 40px)', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'rgba(15, 23, 42, 0.8)' }}>Sign Out</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.5)', marginBottom: '20px' }}>
                    Sign out of your ExToTools account on this device.
                </p>
                <button
                    onClick={handleSignOut}
                    style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px', 
                        color: 'rgba(15, 23, 42, 0.6)', 
                        borderColor: 'var(--card-border)',
                        background: 'transparent',
                        border: '1px solid var(--card-border)',
                        padding: '12px 24px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        borderRadius: '0'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.03)';
                        e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(15, 23, 42, 0.6)';
                    }}
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>

            {/* Danger Zone */}
            <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(15, 23, 42, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px' }}>
                    <div style={{ maxWidth: '400px' }}>
                        <h3 style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: 'rgba(15, 23, 42, 0.3)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.1em',
                            marginBottom: '12px'
                        }}>
                            Account Management
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.4)', lineHeight: 1.5 }}>
                            Permanently remove your account and all associated data. This action is irreversible and will immediately cancel any active subscriptions.
                        </p>
                    </div>
                    <button
                        onClick={async () => {
                            if (window.confirm("ARE YOU ABSOLUTELY SURE? This will permanently delete your account and all active subscriptions. This cannot be undone.")) {
                                try {
                                    const res = await fetch("/api/user/delete", { method: "DELETE" });
                                    if (res.ok) {
                                        await signOut({ callbackUrl: "/" });
                                    } else {
                                        alert("Failed to delete account. Please contact support.");
                                    }
                                } catch (err) {
                                    console.error("Delete account error:", err);
                                    alert("An error occurred.");
                                }
                            }
                        }}
                        style={{ 
                            background: 'transparent', 
                            color: 'rgba(15, 23, 42, 0.3)', 
                            border: '1px solid rgba(15, 23, 42, 0.1)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '8px 16px',
                            borderRadius: '0',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = '#dc2626';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.02)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = 'rgba(15, 23, 42, 0.3)';
                            e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
