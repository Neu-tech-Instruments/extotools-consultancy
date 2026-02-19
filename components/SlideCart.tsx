"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Chrome } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { extensions } from "@/lib/extensions";
import { useState } from "react";
import Link from "next/link";

export default function SlideCart() {
    const { cart, removeFromCart, addToCart, totalPrice, itemCount, isCartOpen, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(15, 23, 42, 0.4)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 1000,
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '480px',
                            background: '#FFFFFF', // Explict hex white
                            zIndex: 1001,
                            boxShadow: '-20px 0 60px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '40px 0',
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', padding: '0 40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <ShoppingBag size={24} color="var(--primary)" />
                                <h2 className="font-serif" style={{ fontSize: '2rem' }}>Selection ({itemCount})</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '0', padding: '0 40px' }}>
                            {cart.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.3, minHeight: '200px' }}>
                                        <ShoppingBag size={64} strokeWidth={1} style={{ marginBottom: '24px' }} />
                                        <p className="font-serif" style={{ fontSize: '1.5rem' }}>Your selection is empty.</p>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '48px' }}>
                                        <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '24px', opacity: 0.8 }}>Recommended Extensions</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {extensions.slice(0, 3).map((ext) => (
                                                <div
                                                    key={ext.slug}
                                                    style={{
                                                        padding: '20px',
                                                        background: 'var(--surface)',
                                                        border: '1px solid var(--card-border)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px'
                                                    }}
                                                >
                                                    <div style={{ width: '40px', height: '40px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                                        <Chrome size={20} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{ext.name}</h4>
                                                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>${ext.price}/mo</span>
                                                    </div>
                                                    <button
                                                        onClick={() => addToCart({ id: ext.slug, type: 'extension', name: ext.name, price: ext.price, quantity: 1 })}
                                                        style={{
                                                            background: 'none',
                                                            border: '1px solid var(--primary)',
                                                            color: 'var(--primary)',
                                                            padding: '8px 12px',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 800,
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        ADD
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                padding: '24px',
                                                background: 'var(--surface)',
                                                border: '1px solid var(--card-border)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
                                                    {item.type}
                                                </span>
                                                <h4 className="font-serif" style={{ fontSize: '1.25rem', marginTop: '4px' }}>{item.name}</h4>
                                                <span style={{ fontWeight: 800, color: 'var(--primary)', marginTop: '8px', display: 'block' }}>
                                                    ${item.price}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3, padding: '8px' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div style={{ paddingTop: '40px', borderTop: '1px solid var(--card-border)', padding: '40px 40px 0 40px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.6 }}>Subtotal</span>
                                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>${totalPrice}</span>
                                </div>

                                <button
                                    disabled
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', opacity: 0.5, cursor: 'not-allowed' }}
                                >
                                    COMMERCE COMING SOON
                                    <ArrowRight size={20} />
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.8rem', opacity: 0.4 }}>
                                    Taxes and discounts calculated at checkout.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
