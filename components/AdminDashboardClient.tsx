"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Activity, Package, CreditCard, TrendingUp, X, Search, RefreshCw, Download, User, Wifi, ShieldCheck, UserCheck, UserX, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import UserListModal from "./UserListModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminData {
    totalUsers: number;
    totalActiveSubscriptions: number;
    activeBundles: number;
    activeSingles: number;
    churnCount: number;
    mrr: number;
    bundleMrr: number;
    singlesMrr: number;
    extensionPopularity: { name: string; slug: string; count: number }[];
    recentUsers: any[];
}

interface SubscriberData {
    id: string;
    isBundle: boolean;
    bundleType: string | null;
    status: string;
    currentPeriodEnd: string;
    user: { id: string; name: string | null; email: string | null; image: string | null };
    extension: { name: string; slug: string } | null;
}

// ─── Status Pill ──────────────────────────────────────────────────────────────

function StatusPill({ hasBundle, hasPaid }: { hasBundle: boolean; hasPaid: boolean }) {
    if (hasBundle) return <span style={{ background: 'rgba(139,92,246,0.1)', color: 'rgb(109,40,217)', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.03em' }}>BUNDLE</span>;
    if (hasPaid) return <span style={{ background: 'rgba(34,197,94,0.1)', color: 'rgb(22,163,74)', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.03em' }}>PAID</span>;
    return <span style={{ background: 'rgba(15,23,42,0.05)', color: 'rgba(15,23,42,0.35)', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.03em' }}>FREE</span>;
}

// ─── Subscriber Modal ─────────────────────────────────────────────────────────

function SubscriberModal({ filter, title, onClose }: { filter: "bundles" | "singles"; title: string; onClose: () => void }) {
    const [subs, setSubs] = useState<SubscriberData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        fetch(`/api/admin/subscriptions?filter=${filter}`)
            .then(r => r.json())
            .then(data => { setSubs(Array.isArray(data) ? data : []); setIsLoading(false); })
            .catch(() => setIsLoading(false));
    }, [filter]);

    const modalContent = (
        <AnimatePresence>
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} />
                <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                    style={{ width: '100%', maxWidth: '560px', background: 'white', borderRadius: 0, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '78vh', border: '1px solid rgba(15,23,42,0.1)' }}>
                    <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(15,23,42,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{title}</h2>
                            <p style={{ fontSize: '0.8rem', color: 'rgba(15,23,42,0.45)', margin: '3px 0 0 0' }}>{subs.length} active subscribers</p>
                        </div>
                        <button onClick={onClose} style={{ padding: '8px', background: 'rgba(15,23,42,0.05)', border: 'none', cursor: 'pointer', display: 'flex' }}><X size={18} /></button>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {isLoading ? (
                            <div style={{ padding: '48px', textAlign: 'center', opacity: 0.4 }}>Loading...</div>
                        ) : subs.length === 0 ? (
                            <div style={{ padding: '48px', textAlign: 'center', opacity: 0.4 }}>No subscribers found.</div>
                        ) : subs.map((sub, i) => (
                            <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 28px', borderBottom: i < subs.length - 1 ? '1px solid rgba(15,23,42,0.05)' : 'none' }}>
                                {sub.user.image ? <img src={sub.user.image} style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0 }} alt="" /> : <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(15,23,42,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><User size={16} color="rgba(15,23,42,0.25)" /></div>}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{sub.user.name || "Unknown"}</div>
                                    <div style={{ fontSize: '0.76rem', color: 'rgba(15,23,42,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub.user.email}</div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(15,23,42,0.5)', fontWeight: 600 }}>{sub.isBundle ? `Bundle (${sub.bundleType || 'all'})` : sub.extension?.name || '—'}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(15,23,42,0.3)', marginTop: '2px' }}>Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(modalContent, document.body);
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboardClient({ initialData }: { initialData: AdminData }) {
    const [data, setData] = useState<AdminData>(initialData);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userSearch, setUserSearch] = useState("");
    const [modal, setModal] = useState<null | "users" | "bundles" | "singles">(null);

    // Grant / revoke state (per user)
    const [grantLoading, setGrantLoading] = useState<string | null>(null);

    const refresh = useCallback(async (silent = false) => {
        if (!silent) setIsRefreshing(true);
        try {
            const res = await fetch("/api/admin/stats");
            if (res.ok) setData(await res.json());
        } finally {
            if (!silent) setIsRefreshing(false);
        }
    }, []);

    // Auto-refresh in the background every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            refresh(true);
        }, 30000);
        return () => clearInterval(interval);
    }, [refresh]);

    const exportCSV = () => {
        const rows = [
            ["Name", "Email", "Status", "Subscribed To"],
            ...data.recentUsers.map(u => {
                const hasBundle = u.subscriptions?.some((s: any) => s.isBundle);
                const toolNames = u.subscriptions?.filter((s: any) => !s.isBundle && s.extension?.name).map((s: any) => s.extension.name).join(" | ");
                return [u.name || "Unknown", u.email || "", hasBundle ? "BUNDLE" : u.subscriptions?.length ? "PAID" : "FREE", hasBundle ? "All extensions" : toolNames || "—"];
            })
        ];
        const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `extotools-users-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click(); URL.revokeObjectURL(url);
    };

    const handleAccess = async (userId: string, action: "grant" | "revoke") => {
        setGrantLoading(userId);
        try {
            await fetch("/api/admin/subscriptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action })
            });
            await refresh(true);
        } finally {
            setGrantLoading(null);
        }
    };

    const filteredUsers = data.recentUsers.filter(u => {
        if (!userSearch) return true;
        const q = userSearch.toLowerCase();
        return u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    });

    const statCards = [
        { label: "Total Users", value: data.totalUsers, icon: <Users size={18} color="var(--primary)" />, clickable: true, onClick: () => setModal("users"), color: undefined },
        { label: "Active Subs", value: data.totalActiveSubscriptions, icon: <Activity size={18} color="var(--primary)" />, clickable: true, onClick: () => setModal("singles"), color: undefined },
        { label: "Active Bundles", value: data.activeBundles, icon: <Package size={18} color="var(--primary)" />, clickable: true, onClick: () => setModal("bundles"), color: undefined },
        { label: "Churn", value: data.churnCount, icon: <XCircle size={18} color="#EF4444" />, clickable: false, color: undefined },
        { label: "Est. MRR", value: `$${data.mrr.toFixed(0)}`, icon: <TrendingUp size={18} color="#16a34a" />, clickable: false, color: "#16a34a" },
        { label: "Singles MRR", value: `$${data.singlesMrr.toFixed(0)}`, icon: <CreditCard size={18} color="var(--primary)" />, clickable: false, color: undefined },
        { label: "Bundle MRR", value: `$${data.bundleMrr.toFixed(0)}`, icon: <Package size={18} color="rgb(109,40,217)" />, clickable: false, color: "rgb(109,40,217)" },
    ];

    return (
        <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '6px' }}>Admin Console</h1>
                    <p style={{ color: 'rgba(15,23,42,0.5)' }}>Platform overview & user management</p>
                </div>
                <button
                    onClick={() => refresh(false)}
                    disabled={isRefreshing}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'rgba(15,23,42,0.05)', border: '1px solid rgba(15,23,42,0.1)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', opacity: isRefreshing ? 0.6 : 1 }}
                >
                    <RefreshCw size={15} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
                    {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                {statCards.map((card, i) => (
                    <div key={i} className="card"
                        onClick={card.clickable ? card.onClick : undefined}
                        style={{ display: 'flex', flexDirection: 'column', gap: '12px', cursor: card.clickable ? 'pointer' : 'default', transition: 'all 0.2s ease' }}
                        onMouseEnter={e => { if (card.clickable) { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                        onMouseLeave={e => { if (card.clickable) { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; } }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'rgba(15,23,42,0.5)' }}>{card.label}</span>
                            {card.icon}
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: card.color }}>{card.value}</span>
                    </div>
                ))}
            </div>

            {/* Extension Popularity */}
            {data.extensionPopularity.length > 0 && (
                <div className="card" style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', fontWeight: 700 }}>Extension Popularity</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {data.extensionPopularity.map((ext, i) => {
                            const max = data.extensionPopularity[0]?.count || 1;
                            const pct = Math.round((ext.count / max) * 100);
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '160px', fontSize: '0.85rem', fontWeight: 600, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ext.name}</div>
                                    <div style={{ flex: 1, background: 'rgba(15,23,42,0.05)', height: '8px', position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--primary)', transition: 'width 0.6s ease' }} />
                                    </div>
                                    <div style={{ width: '40px', textAlign: 'right', fontSize: '0.82rem', fontWeight: 700, color: 'rgba(15,23,42,0.5)' }}>{ext.count}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Recent Signups (now searchable + with access controls) */}
            <div className="card" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>All Users</h2>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {/* Search */}
                        <div style={{ position: 'relative' }}>
                            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15,23,42,0.3)' }} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={userSearch}
                                onChange={e => setUserSearch(e.target.value)}
                                style={{ padding: '8px 10px 8px 30px', border: '1px solid rgba(15,23,42,0.1)', background: 'rgba(15,23,42,0.02)', outline: 'none', fontSize: '0.82rem', width: '180px' }}
                            />
                        </div>
                        {/* CSV Export */}
                        <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'rgba(15,23,42,0.05)', border: '1px solid rgba(15,23,42,0.1)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                            <Download size={14} /> Export CSV
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--architect-line)', color: 'rgba(15,23,42,0.45)', fontSize: '0.8rem' }}>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Name</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Email</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Status</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Subscribed To</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700, textAlign: 'right' }}>Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => {
                                const hasBundle = user.subscriptions?.some((s: any) => s.isBundle);
                                const hasPaid = user.subscriptions?.length > 0;
                                const hasManualGrant = user.subscriptions?.some((s: any) => s.stripeSubscriptionId?.startsWith("manual-admin-grant"));
                                const toolNames = user.subscriptions?.filter((s: any) => !s.isBundle && s.extension?.name).map((s: any) => s.extension.name).join(', ');
                                return (
                                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(15,23,42,0.05)' }}>
                                        <td style={{ padding: '13px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {user.image ? <img src={user.image} alt="" style={{ width: '26px', height: '26px', borderRadius: '50%' }} /> : <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(15,23,42,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={13} color="rgba(15,23,42,0.2)" /></div>}
                                            <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{user.name || "Unknown"}</span>
                                        </td>
                                        <td style={{ padding: '13px 12px', color: 'rgba(15,23,42,0.55)', fontSize: '0.85rem' }}>{user.email}</td>
                                        <td style={{ padding: '13px 12px' }}>
                                            <StatusPill hasBundle={hasBundle} hasPaid={hasPaid} />
                                            {hasManualGrant && <span style={{ marginLeft: '6px', fontSize: '0.65rem', color: 'rgba(15,23,42,0.35)', fontStyle: 'italic' }}>manual</span>}
                                        </td>
                                        <td style={{ padding: '13px 12px', fontSize: '0.82rem', color: 'rgba(15,23,42,0.55)' }}>
                                            {hasBundle ? <span style={{ fontStyle: 'italic' }}>All extensions</span> : toolNames || <span style={{ color: 'rgba(15,23,42,0.2)' }}>—</span>}
                                        </td>
                                        <td style={{ padding: '13px 12px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => handleAccess(user.id, "grant")}
                                                    disabled={grantLoading === user.id || hasManualGrant}
                                                    title="Grant full access"
                                                    style={{ padding: '5px 10px', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(34,197,94,0.08)', color: 'rgb(22,163,74)', border: 'none', cursor: (grantLoading === user.id || hasManualGrant) ? 'not-allowed' : 'pointer', opacity: (grantLoading === user.id || hasManualGrant) ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '4px' }}
                                                >
                                                    <UserCheck size={12} /> Grant
                                                </button>
                                                <button
                                                    onClick={() => handleAccess(user.id, "revoke")}
                                                    disabled={grantLoading === user.id || !hasManualGrant}
                                                    title="Revoke manual access"
                                                    style={{ padding: '5px 10px', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(239,68,68,0.07)', color: '#EF4444', border: 'none', cursor: (grantLoading === user.id || !hasManualGrant) ? 'not-allowed' : 'pointer', opacity: (grantLoading === user.id || !hasManualGrant) ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '4px' }}
                                                >
                                                    <UserX size={12} /> Revoke
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredUsers.length === 0 && (
                                <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'rgba(15,23,42,0.3)' }}>No users found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {modal === "users" && <UserListModal isOpen onClose={() => setModal(null)} />}
            {modal === "bundles" && <SubscriberModal filter="bundles" title="Bundle Subscribers" onClose={() => setModal(null)} />}
            {modal === "singles" && <SubscriberModal filter="singles" title="Single Extension Subscribers" onClose={() => setModal(null)} />}

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </>
    );
}
