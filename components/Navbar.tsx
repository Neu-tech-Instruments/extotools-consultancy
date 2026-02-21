"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { data: session } = useSession();
    const { itemCount, setIsCartOpen } = useCart();

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
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 4vw, 48px)' }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                        <img src="/tool-icon-20.png" alt="ExToTools Logo" style={{ height: 'clamp(32px, 5vw, 44px)', width: 'auto' }} />
                        <span style={{ fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 1.2rem)', letterSpacing: '0.05em' }}>
                            EXTO<span style={{ color: 'var(--primary)' }}>TOOLS</span>
                        </span>
                    </a>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 32px)' }}>
                        <a href="/#collection" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6, cursor: 'pointer' }}>Premium</a>
                        <a href="/bundles" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6, cursor: 'pointer' }}>Bundles</a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 24px)' }}>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="btn-primary"
                        style={{
                            padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            fontSize: '0.8rem',
                            position: 'relative',
                            border: 'none'
                        }}
                    >
                        <ShoppingCart size={18} />
                        <span style={{ display: 'inline' }}>CART</span>
                        {itemCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-6px',
                                background: 'var(--accent-2)',
                                color: 'white',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                fontSize: '0.65rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>
                                {itemCount}
                            </span>
                        )}
                    </button>

                    {session ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <a href="/dashboard" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.7rem', borderWidth: '1px' }}>
                                CONSOLE
                            </a>
                            <button
                                onClick={() => signOut()}
                                style={{ background: 'none', border: 'none', color: 'var(--foreground)', opacity: 0.4, cursor: 'pointer' }}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <a href="/login" style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                            Sign In
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}
