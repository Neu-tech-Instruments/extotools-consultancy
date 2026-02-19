"use client";

import { motion } from "framer-motion";

export default function AbstractComposition() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '300px', height: '300px' }}>

                {/* Lavender Semicircle (Top) */}
                <motion.div
                    initial={{ opacity: 0, y: -20, rotate: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '240px',
                        height: '120px',
                        background: 'var(--accent-1)', // Lavender
                        borderTopLeftRadius: '120px',
                        borderTopRightRadius: '120px',
                        zIndex: 1,
                    }}
                />

                {/* Coral Circle (Middle Left) */}
                <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        top: '110px',
                        left: '20px',
                        width: '120px',
                        height: '120px',
                        background: 'var(--accent-2)', // Coral
                        borderRadius: '50%',
                        zIndex: 2,
                    }}
                />

                {/* Mint Green Quadrant (Middle Right) - Outlined */}
                <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        top: '110px',
                        right: '20px',
                        width: '120px',
                        height: '120px',
                        border: '2px solid var(--secondary)', // Mint Green
                        borderBottomRightRadius: '120px',
                        zIndex: 1,
                    }}
                />

                {/* Background Architectural Circles (Subtle) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    border: '1px solid var(--architect-line)',
                    borderRadius: '50%',
                    opacity: 0.1,
                    zIndex: 0,
                }} />
            </div>
        </div>
    );
}
