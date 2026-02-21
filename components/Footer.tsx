"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer style={{
            position: 'relative',
            color: 'white',
            overflow: 'hidden'
        }}>
            <motion.div style={{
                position: 'absolute',
                top: '-70px',
                left: 0,
                width: '100%',
                height: 'calc(100% + 140px)',
                backgroundImage: 'url(/footer.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'right bottom', /* Use bottom anchor to prevent gaps at the base */
                zIndex: -1
            }}
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <div style={{
                padding: '64px 0 32px 0',
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 100%)', // Vignette for legibility depending on the image
                position: 'relative',
                zIndex: 1
            }}>
                <div className="container">
                    <div className="grid grid-cols-3" style={{ marginBottom: '48px', maxWidth: '65%', gap: '40px' }}>
                        <div>
                            <Link href="/" style={{ display: 'block', marginBottom: '16px', transition: 'opacity 0.2s ease' }} className="hover-opacity">
                                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.15em', color: 'white', lineHeight: 1 }}>EXTOTOOLS</span>
                            </Link>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                Premium Chrome extensions to supercharge your browsing and productivity.
                            </p>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: '16px', marginTop: '4px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>Products</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
                                <li><a href="/#collection">All Extensions</a></li>
                                <li><a href="/bundles">Bundle Packs</a></li>
                                <li><a href="/roadmap">Roadmap</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: '16px', marginTop: '4px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>Support</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
                                <li><a href="/contact">Contact Us</a></li>
                                <li><a href="/terms">Terms of Service</a></li>
                                <li><a href="/privacy">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '32px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.9rem'
                    }}>
                        {/* Gradient Divider Line with Mask for Diver */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2) 30%, rgba(255,255,255,0.2) 60%, transparent 80%)',
                            /* This mask hides the line entirely on the right 25% of the screen where the diver is */
                            WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 65%, transparent 80%)',
                            maskImage: 'linear-gradient(90deg, black 0%, black 65%, transparent 80%)'
                        }} />
                        <p>© {new Date().getFullYear()} ExToTools. All rights reserved.</p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for power users.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
