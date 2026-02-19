"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Sun, Moon, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SlideCart from "./SlideCart";

export default function Navbar() {
    const { data: session } = useSession();
    const { itemCount, setIsCartOpen } = useCart();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsDarkMode(theme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <motion.nav
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
                height: 'var(--nav-height)',
                borderBottom: '1px solid var(--architect-line)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0 40px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                            <img src="/tool-icon-20.png" alt="ExToTools Logo" style={{ height: '44px', width: 'auto' }} />
                            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.05em' }}>
                                EXTO<span style={{ color: 'var(--primary)' }}>TOOLS</span>
                            </span>
                        </Link>
                    </motion.div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <Link href="/extensions/extension-one" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6 }}>Solutions</Link>
                        <Link href="/bundles" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--foreground)', opacity: 0.6 }}>Library</Link>
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
                            <Link href="/dashboard" className="btn btn-outline" style={{ padding: '12px 28px', fontSize: '0.8rem', borderWidth: '1px' }}>
                                CONSOLE
                            </Link>
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

        </motion.nav>
    );
}
