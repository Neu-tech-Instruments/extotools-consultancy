"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function BackgroundGrid() {
    const { scrollY } = useScroll();

    // Perspective and parallax values
    const gridY = useTransform(scrollY, [0, 1000], [0, -100]);
    const blob1Y = useTransform(scrollY, [0, 1000], [0, -200]);
    const blob2Y = useTransform(scrollY, [0, 1000], [0, -150]);

    // Mouse follow for additional depth
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 40, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 40, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set((clientX - window.innerWidth / 2) / 30);
            mouseY.set((clientY - window.innerHeight / 2) / 30);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="bg-architect" style={{ overflow: 'hidden' }}>
            {/* Base Background Color Layer */}
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'var(--background)',
                zIndex: -3,
            }} />

            {/* Note: Background video has been moved to section-specific containers in page.tsx */}

            {/* Architectural Grid Layer */}
            <motion.div
                className="bg-architect grid-dots"
                style={{ y: gridY, x: springX, opacity: 0.2 }}
            />

            {/* Architectural Vertical Lines */}
            <div className="vertical-line" style={{ left: '15%', opacity: 0.5 }} />
            <div className="vertical-line" style={{ right: '15%', opacity: 0.5 }} />

            {/* Vibrant Blobs */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: '600px',
                    height: '600px',
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    filter: 'blur(150px)',
                    opacity: 0.05,
                    y: blob1Y,
                    x: springX,
                }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '700px',
                    height: '700px',
                    background: 'var(--secondary)',
                    borderRadius: '50%',
                    filter: 'blur(180px)',
                    opacity: 0.04,
                    y: blob2Y,
                    x: springY,
                }}
            />

            {/* Floating Architectural Shapes */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '45%',
                    width: '800px',
                    height: '800px',
                    border: '1px solid var(--architect-line)',
                    borderRadius: '50%',
                    opacity: 0.2,
                }}
            />
        </div>
    );
}
