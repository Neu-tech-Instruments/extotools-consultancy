"use client";

import { motion } from "framer-motion";

export default function GeometricIcon() {
    return (
        <div style={{ position: 'relative', width: '380px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Vibrant Layered Shapes */}
            <motion.div
                animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: '180px',
                    height: '180px',
                    background: 'var(--primary)',
                    borderRadius: '40px',
                    zIndex: 2,
                    position: 'relative',
                    boxShadow: '20px 20px 0 var(--secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <img
                    src="/tool-icon-20.png"
                    alt=""
                    style={{
                        width: '70%',
                        height: 'auto',
                        filter: 'brightness(0) invert(1)', // Make white for contrast on blue
                        opacity: 0.9
                    }}
                />
            </motion.div>

            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    width: '140px',
                    height: '140px',
                    background: 'var(--accent-1)',
                    borderRadius: '50%',
                    zIndex: 1,
                    opacity: 0.8,
                    mixBlendMode: 'multiply',
                }}
            />

            <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '80px',
                    height: '80px',
                    background: 'var(--accent-2)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    zIndex: 3,
                }}
            />

        </div>
    );
}
