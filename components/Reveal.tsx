"use client";

import { motion } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    color?: string;
}

export default function Reveal({ children, color = "var(--primary)" }: RevealProps) {
    return (
        <div style={{ position: 'relative', overflow: 'hidden', width: 'fit-content' }}>
            <motion.div
                initial={{ x: 0 }}
                whileInView={{ x: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: color,
                    zIndex: 10,
                }}
            />
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
