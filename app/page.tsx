"use client";

import Link from "next/link";
import { extensions, bundles } from "@/lib/extensions";
import { ArrowRight, Chrome, Zap, Plus, Layers, Quote, Star } from "lucide-react";
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
    // Start playing background videos on mount and keep them playing
    [videoRef, videoRef2].forEach(ref => {
      if (ref.current) {
        ref.current.play().catch(e => console.error("Video play failed:", e));
      }
    });
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(100px, 15vh, 160px) 0 80px 0', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.6,
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 85%)',
        }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/banner_pingpong.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Decorative Vertical Text */}
        <div style={{ position: 'absolute', left: '40px', top: '200px' }} className="vertical-text">
          Extensions // Productivity // 2026
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: 'clamp(40px, 8vw, 80px)' }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', background: 'var(--primary)', color: 'white', padding: '4px 12px' }}>
                    01
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    ExToTools Suite
                  </span>
                </div>
              </motion.div>

              <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', marginBottom: '32px', color: 'var(--accent-navy)', lineHeight: 1.1 }}>
                Supercharge <br />
                <span style={{ color: 'var(--primary)' }}>Your Browser.</span>
              </motion.h1>

              <motion.p variants={itemVariants} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--accent-navy)', opacity: 0.7, maxWidth: '580px', marginBottom: '48px', lineHeight: 1.4, fontWeight: 500 }}>
                Browse smarter and faster with our premium collection of Chrome extensions. Get exactly the tools you need individually, or unlock our all-access monthly bundle to get the entire suite.
              </motion.p>

              <motion.div variants={itemVariants} style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <Link href="#collection" className="btn btn-primary">
                  The Collection
                  <ArrowRight size={20} />
                </Link>
                <Link href="/bundles" className="btn btn-outline" style={{ border: 'none', textDecoration: 'underline', padding: '16px 0' }}>
                  View Bundle Pricing
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', justifyContent: 'center' }}
              className="hero-graphic-container"
            >
              <GeometricIcon />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition section (Strip) */}
      <section style={{ background: 'var(--primary)', padding: '40px 0', color: 'white', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 80px)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Layers size={20} />
              <span style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem' }}>INDIVIDUAL EXTENSIONS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Plus size={20} />
              <span style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem' }}>ALL-ACCESS BUNDLE</span>
            </div>
          </div>
          <div style={{ opacity: 0.5, fontWeight: 800, fontSize: '0.8rem' }}>EXTOTOOLS // 2026</div>
        </div>
      </section>

      {/* Collection Grid */}
      <section id="collection" style={{ padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Video Background with Spotlight Mask and Color Wash */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.25,
          maskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 70%)',
          background: 'radial-gradient(circle at center, rgba(63, 94, 251, 0.05) 0%, transparent 70%)' // Subtle blue wash
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              maxHeight: '120vh',
              objectFit: 'contain',
              filter: 'contrast(1.1) brightness(0.9)'
            }}
          >
            <source src="/eyes.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header-grid" style={{ marginBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="oversized-number" style={{ opacity: 0.15 }}>02</div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginTop: '-40px', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--accent-navy)' }}>Terminal <br /><span style={{ color: 'var(--primary)' }}>Capabilities.</span></h2>
            </motion.div>
            <p style={{ color: 'var(--accent-navy)', opacity: 0.8, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.6, paddingBottom: '20px', maxWidth: '400px', fontFamily: 'monospace' }}>
              // TECHNICAL_SPECS: <br />
              Precision tools for high-performance browsing stacks. Engineered for modularity.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: 'clamp(20px, 3vw, 32px)' }}>
            {extensions.map((ext, index) => {
              const accentColors = [
                'rgba(110, 231, 183, 0.3)', // Mint
                'rgba(167, 139, 250, 0.3)', // Lavender
                'rgba(251, 146, 60, 0.3)',  // Tangerine
                'rgba(56, 189, 248, 0.3)',  // Sky
                'rgba(244, 114, 182, 0.3)', // Pink
              ];
              const accent = accentColors[index % accentColors.length];
              const solidAccent = accent.replace('0.3', '1');

              return (
                <motion.div
                  key={ext.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ position: 'relative' }}
                >
                  {/* Localized Aura Glow */}
                  <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    width: '80%',
                    height: '80%',
                    background: accent.replace('0.3', '0.2'),
                    filter: 'blur(80px)',
                    borderRadius: '50%',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }} />

                  <Link href={`/extensions/${ext.slug}`} className="card" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    padding: '40px',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.borderColor = solidAccent;
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = `0 25px 50px -15px ${accent.replace('0.3', '0.2')}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.05)';
                    }}
                  >
                    <div style={{ marginBottom: '40px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        background: accent,
                        border: `1px solid ${accent.replace('0.3', '0.2')}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 20px -5px ${accent.replace('0.3', '0.3')}`
                      }}>
                        <Chrome size={32} color="var(--primary)" />
                      </div>
                    </div>

                    <h3 style={{ fontSize: '2.2rem', marginBottom: '16px', color: 'var(--accent-navy)', fontWeight: 700, letterSpacing: '-0.02em' }}>{ext.name}</h3>
                    <p style={{ color: 'var(--accent-navy)', opacity: 0.9, fontSize: '1.1rem', marginBottom: '40px', flex: 1, lineHeight: 1.6 }}>
                      {ext.shortDescription}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace', color: 'var(--accent-navy)' }}>MSRP_UNIT</span>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>${ext.price}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 1, color: solidAccent }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em' }}>DETAIL</span>
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section style={{ padding: '160px 0 0 0', position: 'relative', overflow: 'hidden' }}>
        {/* Section-Specific Background Video (B&W) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.7, // Heavily increased for highly visible sides
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,1) 100%)',
        }}>
          <video
            ref={videoRef2}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/bnw_pingpong.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container">
          <div className="grid grid-cols-2" style={{ gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', background: 'var(--accent-2)', color: 'white', padding: '4px 12px' }}>
                  03
                </span>
              </div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginBottom: '32px', color: 'var(--accent-navy)' }}>Integrated Systems.</h2>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--accent-navy)', opacity: 0.7, maxWidth: '500px', marginBottom: '40px', lineHeight: 1.5 }}>
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

          {/* Spacing placeholder for banner alignment */}
          <div style={{ marginTop: '100px' }} />
        </div>
      </section>

      {/* Works With Platforms Banner */}
      <section style={{ padding: '60px 0', overflow: 'hidden', background: 'var(--bg)', position: 'relative' }}>
        {/* Cheetah Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/banner-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '100%', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '100%', background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <motion.div
            style={{ display: 'flex', gap: '80px', alignItems: 'center', width: 'max-content' }}
            animate={{ x: [0, -1000] }}
            transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 60, ease: 'linear' } }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="brand-marquee-container" style={{ display: 'flex', gap: '80px', alignItems: 'center', padding: '20px 0' }}>
                {[
                  { name: 'Google', src: '/Logos/Google_2015_logo.svg.webp', class: 'logo-google' },
                  { name: 'Amazon', src: '/Logos/amazon.png', class: 'logo-amazon' },
                  { name: 'Etsy', src: '/Logos/Etsy_logo.svg.png', class: 'logo-etsy' },
                  { name: 'eBay', src: '/Logos/EBay_logo.svg.png', class: 'logo-ebay' },
                  { name: 'Facebook', src: '/Logos/facebook-app-logo.svg', class: 'logo-facebook' },
                  { name: 'LinkedIn', src: '/Logos/linkedin_black-logo_brandlogos.net_qahzv-512x132.png', class: 'logo-linkedin' },
                  { name: 'Pinterest', src: '/Logos/Pinterest_Logo_3.svg.png', class: 'logo-pinterest' },
                ].map((logo) => (
                  <div
                    key={logo.name}
                    style={{
                      opacity: 0.9,
                      flexShrink: 0,
                      transition: 'all 0.4s ease',
                      filter: 'brightness(0)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={logo.class}
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section style={{ padding: '10px 0 160px 0', background: 'var(--accent-navy)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background accents */}
        <div style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(35,34,200,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(108,208,161,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px', opacity: 0.4 }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: 'white' }}>
              ExToTools is not affiliated with the brands mentioned above. * See <Link href="/terms" style={{ textDecoration: 'underline' }}>Terms and Conditions</Link> for more details.
            </span>
          </div>
          <div className="section-header-grid" style={{ marginBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', background: 'var(--secondary)', color: 'var(--accent-navy)', padding: '4px 12px' }}>
                  04
                </span>
              </div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'white' }}>What People <br />Are Saying.</h2>
            </motion.div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', lineHeight: 1.6, paddingBottom: '20px' }}>
              Trusted by students, entrepreneurs, and professionals who rely on ExToTools to streamline their digital workflow.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '32px' }}>
            {[
              {
                name: 'Maria S.',
                role: 'Small Business Owner',
                text: 'I found the automation extension on the Chrome Web Store and instantly fell in love with the free version. Upgrading to premium was a no-brainer — the scheduled runs and API integration save me hours every week tracking competitor prices for my small shop.',
                stars: 5,
                accent: 'var(--secondary)',
                avatar: '/reviews/maria.png',
              },
              {
                name: 'James K.',
                role: 'High School Student',
                text: 'The tab management extension is a lifesaver for school. I used to have 40+ tabs open doing research for essays and lose track of everything. Now I can organize, sync, and find my sources instantly. My teachers have noticed the difference in my work.',
                stars: 5,
                accent: 'var(--accent-1)',
                avatar: '/reviews/James.png',
              },
              {
                name: 'Priya D.',
                role: 'Freelance Designer',
                text: 'I downloaded a couple of the free extensions from the Chrome Web Store and they worked great. But when I grabbed the Starter Pack bundle on ExToTools, the premium features completely leveled up my workflow. Way better value than paying for each one separately.',
                stars: 5,
                accent: 'var(--accent-2)',
                avatar: '/reviews/Priya.png',
              },
              {
                name: 'Carlos R.',
                role: 'E-commerce Entrepreneur',
                text: 'Running a small online store means I\'m always in Chrome. The web scraping extension helps me monitor trends, and the premium tab management keeps my supplier tabs organized. Getting both in a bundle saved me real money.',
                stars: 5,
                accent: 'var(--accent-2)',
                avatar: '/reviews/carlos.png',
              },
              {
                name: 'Aisha T.',
                role: 'University Student',
                text: 'Between four classes and a part-time job, I need every shortcut I can get. I started with the free Chrome extension for tabs, then upgraded to premium for cloud sync across my laptop and library computers. It keeps all my research perfectly organized.',
                stars: 5,
                accent: 'var(--secondary)',
                avatar: '/reviews/aisha.png',
              },
              {
                name: 'Liam W.',
                role: 'Marketing Consultant',
                text: 'I\'ve tried dozens of Chrome extensions — most are bloated and slow. ExToTools extensions are lightweight, fast, and do exactly what they promise. Love that I can try them free on the Web Store first and only pay for premium features I actually need.',
                stars: 4,
                accent: 'var(--accent-1)',
                avatar: '/reviews/Liam.png',
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '40px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                {/* Accent top line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: review.accent,
                }} />

                {/* Quote icon */}
                <div style={{ marginBottom: '24px' }}>
                  <Quote size={32} color={review.accent} style={{ opacity: 0.6 }} />
                </div>

                {/* Review text */}
                <p style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                  flex: 1,
                }}>
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.stars ? '#F5C542' : 'transparent'}
                      color={i < review.stars ? '#F5C542' : 'rgba(255,255,255,0.2)'}
                    />
                  ))}
                </div>

                {/* Author */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `2px solid ${review.accent}`,
                        flexShrink: 0,
                        userSelect: 'none',
                        WebkitUserDrag: 'none',
                      } as React.CSSProperties}
                    />
                  ) : (
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: review.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: 'var(--accent-navy)',
                      flexShrink: 0,
                    }}>
                      {review.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>{review.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div >
      </section >
    </div >
  );
}
