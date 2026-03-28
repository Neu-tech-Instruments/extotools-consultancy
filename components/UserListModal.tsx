"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, User, Calendar, ShieldCheck, Wifi, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface UserData {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    createdAt: string;
    detectedExtensions: string[];   // slugs the user has opened via the Chrome extension
    subscriptions: { id: string }[];
    activeExtensionNames: string | null;  // paid single-extension names
    hasBundle: boolean;
}

interface UserListModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserListModal({ isOpen, onClose }: UserListModalProps) {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen]);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.error || `Error ${res.status}: Failed to load users`);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
            setError("Network error: Failed to fetch user data.");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredUsers = users.filter((u) => {
        const query = search.toLowerCase();
        return (
            (u.name?.toLowerCase().includes(query) || false) ||
            (u.email?.toLowerCase().includes(query) || false)
        );
    });

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        zIndex: 9999, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        padding: '24px'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            background: 'rgba(15, 23, 42, 0.4)', 
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)'
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 20 }}
                        style={{
                            width: '100%',
                            maxWidth: '640px',
                            background: 'white',
                            borderRadius: '0px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '82vh',
                            border: '1px solid rgba(15, 23, 42, 0.1)'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(15, 23, 42, 0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Registered Users</h2>
                                <p style={{ fontSize: '0.875rem', color: 'rgba(15, 23, 42, 0.5)', margin: '4px 0 0 0' }}>{users.length} total platform members</p>
                            </div>
                            <button 
                                onClick={onClose}
                                style={{ 
                                    padding: '8px', 
                                    borderRadius: '0px', 
                                    background: 'rgba(15, 23, 42, 0.05)', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    color: 'rgba(15, 23, 42, 0.5)',
                                    display: 'flex',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search */}
                        <div style={{ padding: '16px 32px', borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.3)' }} />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or email..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 48px',
                                        borderRadius: '0px',
                                        border: '1px solid rgba(15, 23, 42, 0.1)',
                                        background: 'rgba(15, 23, 42, 0.02)',
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                        </div>

                        {/* User List */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {isLoading ? (
                                <div style={{ padding: '48px', textAlign: 'center', opacity: 0.5 }}>
                                    Loading users...
                                </div>
                            ) : error ? (
                                <div style={{ padding: '48px', textAlign: 'center', color: '#EF4444' }}>
                                    <div style={{ marginBottom: '12px', fontSize: '1.5rem' }}>⚠️</div>
                                    {error}
                                </div>
                            ) : filteredUsers.length === 0 ? (
                                <div style={{ padding: '48px', textAlign: 'center', opacity: 0.5 }}>No users found matching "{search}"</div>
                            ) : (
                                <div>
                                    {filteredUsers.map((user, i) => (
                                        <div 
                                            key={user.id} 
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '16px', 
                                                padding: '14px 32px',
                                                borderBottom: i < filteredUsers.length - 1 ? '1px solid rgba(15, 23, 42, 0.05)' : 'none',
                                                transition: 'background 0.15s ease'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.02)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            {/* Avatar */}
                                            {user.image ? (
                                                <img src={user.image} alt={user.name || ""} style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }} />
                                            ) : (
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(15, 23, 42, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <User size={18} color="rgba(15, 23, 42, 0.25)" />
                                                </div>
                                            )}

                                            {/* Name + email */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name || "Unknown"}</div>
                                                <div style={{ fontSize: '0.78rem', color: 'rgba(15, 23, 42, 0.4)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
                                                {/* Extension they're logged into */}
                                                {user.detectedExtensions.length > 0 && (
                                                    <div style={{ marginTop: '4px', fontSize: '0.72rem', color: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                                                        <Wifi size={10} />
                                                        <span>Using:</span>
                                                        {user.detectedExtensions.map((slug, j) => (
                                                            <span key={j} style={{ background: 'rgba(15, 23, 42, 0.05)', padding: '1px 5px', fontWeight: 600 }}>{slug}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status pill */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                                                {user.hasBundle ? (
                                                    <span style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'rgb(109, 40, 217)', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.03em' }}>BUNDLE</span>
                                                ) : user.activeExtensionNames ? (
                                                    <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(22, 163, 74)', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.03em' }}>PAID</span>
                                                ) : (
                                                    <span style={{ background: 'rgba(15, 23, 42, 0.05)', color: 'rgba(15, 23, 42, 0.35)', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.03em' }}>FREE</span>
                                                )}
                                                {/* What they're paying for */}
                                                {user.activeExtensionNames && !user.hasBundle && (
                                                    <div style={{ fontSize: '0.7rem', color: 'rgba(15, 23, 42, 0.35)', textAlign: 'right' }}>{user.activeExtensionNames}</div>
                                                )}
                                                {/* Date */}
                                                <div style={{ fontSize: '0.7rem', color: 'rgba(15, 23, 42, 0.25)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                    <Calendar size={10} />
                                                    {user.createdAt && !user.createdAt.startsWith('2024-01-01')
                                                        ? new Date(user.createdAt).toLocaleDateString()
                                                        : 'Early member'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(modalContent, document.body);
}
