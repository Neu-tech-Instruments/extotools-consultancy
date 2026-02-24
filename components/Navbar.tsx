"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { data: session, status } = useSession();
    const { itemCount, setIsCartOpen, isCartOpen } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                            <a href="/dashboard" className="desktop-only" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: 'rgba(15, 23, 42, 0.05)',
                                border: '1px solid var(--card-border)',
                                color: 'var(--foreground)',
                                overflow: 'hidden',
                                textDecoration: 'none'
                            }}>
                                {session.user?.image ? (
                                    <img src={session.user.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <User size={14} opacity={0.6} />
                                )}
                            </a>
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
