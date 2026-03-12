"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { data: session, status } = useSession();
    const { itemCount, setIsCartOpen, isCartOpen } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => {
        if (!isMenuOpen) setIsCartOpen(false);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOpenCart = () => {
        setIsMenuOpen(false);
        setIsCartOpen(true);
    };

    return (
        <nav className="glass" style={{
            height: 'var(--nav-height)',
            borderBottom: '1px solid var(--architect-line)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                {/* Left Section */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '40px' }}>
                    <button
                        className="mobile-only"
                        onClick={toggleMenu}
                        style={{ border: 'none', background: 'none', color: 'var(--foreground)', cursor: 'pointer', padding: '4px', marginLeft: '-4px' }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Logo */}
                    <a href="/" className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--foreground)', cursor: 'pointer' }}>
                        <img src="/tool-icon-20.png" alt="ExToTools Logo" style={{ height: '32px', width: 'auto' }} />
                        <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.05em' }}>
                            EXTO<span style={{ color: 'var(--primary)' }}>TOOLS</span>
                        </span>
                    </a>

                    <div className="desktop-only" style={{ alignItems: 'center', gap: 'clamp(12px, 3vw, 32px)' }}>
                        <a href="/#collection" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6, cursor: 'pointer' }}>Premium</a>
                        <a href="/bundles" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6, cursor: 'pointer' }}>Bundles</a>
                    </div>
                </div>

                {/* Center Section (Mobile Logo Only) */}
                <div className="mobile-only" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '0 0 auto' }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--foreground)', cursor: 'pointer' }}>
                        <img src="/tool-icon-20.png" alt="ExToTools Logo" style={{ height: 'clamp(28px, 4vw, 44px)', width: 'auto' }} />
                        <span style={{ fontWeight: 800, fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', letterSpacing: '0.05em' }}>
                            EXTO<span style={{ color: 'var(--primary)' }}>TOOLS</span>
                        </span>
                    </a>
                </div>

                {/* Right Section (Actions) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'clamp(8px, 1.5vw, 20px)', flex: 1 }}>
                    <button
                        onClick={handleOpenCart}
                        className="btn-primary"
                        style={{
                            padding: '8px clamp(10px, 2vw, 16px)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            fontSize: '0.7rem',
                            position: 'relative',
                            border: 'none',
                            borderRadius: '2px'
                        }}
                    >
                        <ShoppingCart size={14} />
                        <span className="desktop-only">CART</span>
                        {itemCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-6px',
                                background: 'var(--accent-2)',
                                color: 'white',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                fontSize: '0.6rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>
                                {itemCount}
                            </span>
                        )}
                    </button>

                    {status === "loading" ? (
                        <div className="desktop-only" style={{ width: '48px', height: '14px', opacity: 0 }}></div>
                    ) : session ? (
                        <div style={{ position: 'relative' }}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    position: 'relative',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: 'rgba(15, 23, 42, 0.05)',
                                    border: '1px solid var(--card-border)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <User size={16} opacity={0.6} />
                                    )}
                                </div>
                                {/* Pro Badge Dot - Positioned outside the overflow-hidden container */}
                                {session.user?.email && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        right: '0px',
                                        width: '12px',
                                        height: '12px',
                                        background: 'var(--primary)',
                                        border: '2px solid white',
                                        borderRadius: '50%',
                                        zIndex: 2
                                    }} title="Pro Member" />
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="glass" style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 12px)',
                                    right: 0,
                                    width: '220px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid var(--architect-line)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    padding: '8px 0',
                                    zIndex: 10000,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(15, 23, 42, 0.05)', marginBottom: '4px' }}>
                                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)' }}>
                                            {(session.user as any)?.firstName || session.user?.name || 'User'}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(15, 23, 42, 0.4)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {session.user?.email}
                                        </p>
                                    </div>
                                    
                                    <a href="/dashboard" style={{
                                        padding: '10px 16px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        color: 'rgba(15, 23, 42, 0.7)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        transition: 'all 0.2s ease'
                                    }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.03)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <img src="/tool-icon-20.png" style={{ width: '14px', height: '14px', opacity: 0.6 }} />
                                        Dashboard
                                    </a>
                                    
                                    <a href="/settings" style={{
                                        padding: '10px 16px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        color: 'rgba(15, 23, 42, 0.7)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        transition: 'all 0.2s ease'
                                    }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.03)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <User size={14} opacity={0.6} />
                                        Settings
                                    </a>

                                    <div style={{ margin: '4px 0', borderTop: '1px solid rgba(15, 23, 42, 0.05)' }} />
                                    
                                    <button 
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        style={{
                                            padding: '10px 16px',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#dc2626',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            width: '100%',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(220, 38, 38, 0.03)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href="/login" className="desktop-only" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                            Sign In
                        </a>
                    )}
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}>
                <a href="/#collection" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 800, textDecoration: 'none', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>The Collection</a>
                <a href="/bundles" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 800, textDecoration: 'none', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bundles</a>
                <hr style={{ border: 'none', borderTop: '1px solid var(--architect-line)' }} />
                {session && (
                    <>
                        <a href="/dashboard" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', color: 'var(--foreground)' }}>My Dashboard</a>
                        {session.user?.email === 'extotools@gmail.com' && (
                            <a href="/admin" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', color: 'var(--primary)' }}>Admin Panel</a>
                        )}
                        <button
                            onClick={() => { setIsMenuOpen(false); }}
                            style={{ background: 'none', border: 'none', color: 'var(--foreground)', opacity: 0.6, cursor: 'pointer', textAlign: 'left', fontSize: '1.1rem', fontWeight: 700, padding: 0 }}
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
