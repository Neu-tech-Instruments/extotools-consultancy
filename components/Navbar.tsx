"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { data: session } = useSession();
    const { itemCount, setIsCartOpen } = useCart();

    return (
        <nav style={{
            height: 'var(--nav-height)',
            borderBottom: '1px solid var(--architect-line)',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0 40px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                        <img src="/tool-icon-20.png" alt="ExToTools Logo" style={{ height: '44px', width: 'auto' }} />
                        <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.05em' }}>
                            EXTO<span style={{ color: 'var(--primary)' }}>TOOLS</span>
                        </span>
                    </a>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <a href="/#collection" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6, cursor: 'pointer' }}>Premium</a>
                        <a href="/bundles" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6, cursor: 'pointer' }}>Bundles</a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            position: 'relative'
                        }}
                    >
                        <ShoppingCart size={20} />
                        CART
                        {itemCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: 'var(--accent-2)',
                                color: 'white',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                fontSize: '0.7rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>
                                {itemCount}
                            </span>
                        )}
                    </button>

                    {session && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <a href="/dashboard" className="btn btn-outline" style={{ padding: '12px 28px', fontSize: '0.8rem', borderWidth: '1px' }}>
                                CONSOLE
                            </a>
                            <button
                                onClick={() => signOut()}
                                style={{ background: 'none', border: 'none', color: 'var(--foreground)', opacity: 0.4, cursor: 'pointer' }}
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
