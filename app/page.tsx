"use client";

import Link from "next/link";
import { extensions, bundles } from "@/lib/extensions";
import { ArrowRight, Chrome, Zap, Plus, Layers } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import GeometricIcon from "@/components/GeometricIcon";
import Reveal from "@/components/Reveal";
import AbstractComposition from "@/components/AbstractComposition";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export default function Home() {
  const { addToCart } = useCart();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      [videoRef, videoRef2].forEach(ref => {
        if (ref.current) {
          // Play the video when scrolling starts
          if (ref.current.paused) {
            ref.current.play().catch(e => console.error("Video play failed:", e));
          }
        }
      });

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to pause after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        [videoRef, videoRef2].forEach(ref => {
          if (ref.current && !ref.current.paused) {
            ref.current.pause();
          }
        });
      }, 150); // Small delay for smoothness
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Hero Section */}
      <section style={{ padding: '160px 0 100px 0', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.08, // Subtle hint of motion
          filter: 'brightness(1.1)'
        }}>
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/banner vid.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Decorative Vertical Text */}
        <div style={{ position: 'absolute', left: '40px', top: '200px' }} className="vertical-text">
          System // Architecture // 2026
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '60px' }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', background: 'var(--primary)', color: 'white', padding: '4px 12px' }}>
                    01
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    Global Initiative
                  </span>
                </div>
              </motion.div>

              <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(4rem, 12vw, 7rem)', marginBottom: '48px', color: 'var(--accent-navy)' }}>
                Powering <br />
                <span style={{ color: 'var(--primary)' }}>Digital</span> <span className="font-serif">Flow.</span>
              </motion.h1>

              <motion.p variants={itemVariants} style={{ fontSize: '1.4rem', color: 'var(--accent-navy)', opacity: 0.7, maxWidth: '580px', marginBottom: '60px', lineHeight: 1.4, fontWeight: 500 }}>
                We engineer high-performance systems for the next era of professional browsing. Tailored solutions, seamlessly delivered.
              </motion.p>

              <motion.div variants={itemVariants} style={{ display: 'flex', gap: '24px' }}>
                <Link href="#collection" className="btn btn-primary">
                  The Collection
                  <ArrowRight size={20} />
                </Link>
                <Link href="/bundles" className="btn btn-outline" style={{ border: 'none', textDecoration: 'underline', padding: '16px 0' }}>
                  Managed Services
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <GeometricIcon />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition section (Strip) */}
      <section style={{ background: 'var(--primary)', padding: '60px 0', color: 'white', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Layers size={24} />
              <span style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem' }}>MODULAR ARCHITECTURE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Plus size={24} />
              <span style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem' }}>SCALABLE SYSTEMS</span>
            </div>
          </div>
          <div style={{ opacity: 0.5, fontWeight: 800 }}>FUTUREFORM // 2026</div>
        </div>
      </section>

      {/* Collection Grid */}
      <section id="collection" style={{ padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Element */}
        <div style={{ position: 'absolute', top: '100px', right: '-100px', width: '600px', height: '600px', opacity: 0.4, pointerEvents: 'none', zIndex: 0 }}>
          <AbstractComposition />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '100px', alignItems: 'flex-end' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="oversized-number">02</div>
              <h2 className="font-serif" style={{ fontSize: '5rem', marginTop: '-40px' }}>Terminal <br />Capabilities.</h2>
            </motion.div>
            <p style={{ color: 'var(--accent-navy)', opacity: 0.6, fontSize: '1.3rem', lineHeight: 1.6, paddingBottom: '20px' }}>
              Independent tools for precision browsing. Each extension is a specialized pillar of our overarching architectural vision.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '40px' }}>
            {extensions.map((ext, index) => (
              <motion.div
                key={ext.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link href={`/extensions/${ext.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}>
                  {/* Color Accent Top Bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '8px',
                    background: index % 3 === 0 ? 'var(--secondary)' : index % 3 === 1 ? 'var(--accent-1)' : 'var(--accent-2)'
                  }} />

                  <div style={{ marginBottom: '40px', marginTop: '10px' }}>
                    <Reveal color={index % 3 === 0 ? 'var(--secondary)' : index % 3 === 1 ? 'var(--accent-1)' : 'var(--accent-2)'}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#F0F0F0',
                        borderRadius: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Chrome size={40} color="var(--primary)" />
                      </div>
                    </Reveal>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--accent-navy)' }}>{ext.name}</h3>
                  <p style={{ color: 'var(--accent-navy)', opacity: 0.6, fontSize: '1.1rem', marginBottom: '40px', flex: 1, lineHeight: 1.5 }}>
                    {ext.shortDescription}
                  </p>

                  <div style={{ display: 'flex', gap: '16px', marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid var(--card-border)' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>${ext.price}</span>
                    <button
                      disabled
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem', marginLeft: 'auto', opacity: 0.5, cursor: 'not-allowed' }}
                    >
                      Coming Soon
                    </button>
                    <ArrowRight size={24} color="var(--primary)" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section style={{ padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Section-Specific Background Video (B&W) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.05, // Extremely subtle for atmospheric texture
          filter: 'brightness(0.95)'
        }}>
          <video
            ref={videoRef2}
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/bnw.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container">
          <div className="grid grid-cols-2" style={{ gap: '100px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', background: 'var(--accent-2)', color: 'white', padding: '4px 12px' }}>
                  03
                </span>
              </div>
              <h2 className="font-serif" style={{ fontSize: '5.5rem', marginBottom: '32px', color: 'var(--accent-navy)' }}>Integrated Systems.</h2>
              <p style={{ fontSize: '1.4rem', color: 'var(--accent-navy)', opacity: 0.7, maxWidth: '500px', marginBottom: '56px', lineHeight: 1.5 }}>
                Combine our specialized pillars into a unified workflow. Strategic acquisitions for comprehensive performance.
              </p>
              <Link href="/bundles" className="btn btn-primary" style={{ padding: '20px 48px' }}>Explore Portfolios</Link>
            </motion.div>

            <div className="grid" style={{ gap: '40px' }}>
              {bundles.map((bundle, index) => (
                <motion.div
                  key={bundle.id}
                  className="card"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  style={{ background: 'white' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Zap size={28} color="var(--primary)" />
                      <h3 className="font-serif" style={{ fontSize: '2.5rem' }}>{bundle.name}</h3>
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>${bundle.price}</span>
                  </div>
                  <p style={{ fontSize: '1.1rem', color: 'var(--accent-navy)', opacity: 0.6, marginBottom: '40px', lineHeight: 1.6 }}>
                    {bundle.description}
                  </p>
                  <button
                    disabled
                    className="btn btn-primary"
                    style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed' }}
                  >
                    Coming Soon
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
