"use client";

import Link from "next/link";
import { bundles } from "@/lib/extensions";
import { ArrowRight, Chrome, Zap, Plus, Layers, Quote, Star, Loader2, Image as ImageIcon } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import GeometricIcon from "@/components/GeometricIcon";
import Reveal from "@/components/Reveal";
import AbstractComposition from "@/components/AbstractComposition";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import Price from "@/components/Price";

type Extension = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image?: string | null;
  features: string;
  isLive: boolean;
};

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

const FAQS = [
  {
    question: "How do I activate the extensions after purchase?",
    answer: "Simple. Once you subscribe, just log into the ExToTools extensions using your account email. Your premium status is synced instantly across all your devices."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, absolutely. You can manage and cancel your subscription directly from your dashboard with one click. No hidden contracts or complex exit flows."
  },
  {
    question: "Do you offer custom bundles for teams?",
    answer: "We do. For teams of 5 or more, contact our support for a personalized enterprise license and shared project workspaces."
  },
  {
    question: "Are the extensions secure and privacy-focused?",
    answer: "Security is our priority. We follow the latest Manifest V3 standards and never store your sensitive browsing data on our servers. Period."
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [dbExtensions, setDbExtensions] = useState<Extension[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fetch extensions from Database
    const fetchExtensions = async () => {
      try {
        const res = await fetch("/api/extensions");
        if (res.ok) {
          const data = await res.json();
          setDbExtensions(data);
        }
      } catch (error) {
        console.error("Landing page fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExtensions();

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
                <Link href="/bundles" className="animated-underline" style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 600, color: 'var(--foreground)' }}>
                  VIEW BUNDLE PRICING
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
              <h2 className="font-serif" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginTop: '-40px', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--accent-navy)' }}>Premium <br /><span style={{ color: 'var(--primary)' }}>Extensions.</span></h2>
            </motion.div>
            <p style={{ color: 'var(--accent-navy)', opacity: 0.8, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.6, paddingBottom: '20px', maxWidth: '400px', fontFamily: 'monospace' }}>
              // THE_COLLECTION: <br />
              Carefully crafted browser tools designed to boost your daily productivity. No bloat, just performance.
            </p>
          </div>

          {isLoading ? (
            <div style={{ gridColumn: 'span 3', padding: '100px', textAlign: 'center', width: '100%', opacity: 0.5 }}>
              <Loader2 size={48} className="animate-spin" style={{ margin: '0 auto' }} />
            </div>
          ) : (
            <div className="grid grid-cols-3" style={{ gap: 'clamp(20px, 3vw, 32px)', width: '100%' }}>
              {dbExtensions.map((ext, index) => {
                // Standardized brand secondary/blue for a more senior feel
                const solidAccent = 'var(--primary)';
                const accentAlpha = 'rgba(59, 130, 246, 0.1)'; // Subtle blue glow
                const accentStrong = 'rgba(59, 130, 246, 0.3)';

                return (
                  <motion.div
                    key={ext.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    style={{ position: 'relative' }}
                  >
                    {/* Localized Aura Glow - Brand Blue */}
                    <div style={{
                      position: 'absolute',
                      top: '20%',
                      left: '20%',
                      width: '80%',
                      height: '80%',
                      background: accentAlpha,
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
                        e.currentTarget.style.boxShadow = `0 25px 50px -15px rgba(59, 130, 246, 0.2)`;
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
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}>
                          {ext.image ? (
                            <img src={ext.image} alt={ext.name} style={{ maxWidth: '100%', maxHeight: '64px', objectFit: 'contain' }} />
                          ) : (
                            <div style={{
                              width: '64px',
                              height: '64px',
                              background: 'rgba(15, 23, 42, 0.05)',
                              borderRadius: '0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <Chrome size={32} color={solidAccent} />
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 style={{ fontSize: '2.2rem', marginBottom: '16px', color: 'var(--accent-navy)', fontWeight: 700, letterSpacing: '-0.02em' }}>{ext.name}</h3>
                      <p style={{ color: 'var(--accent-navy)', opacity: 0.9, fontSize: '1.1rem', marginBottom: '40px', flex: 1, lineHeight: 1.6 }}>
                        {ext.shortDescription}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            fontWeight: 900, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.15em', 
                            fontFamily: 'monospace', 
                            color: 'white', 
                            background: solidAccent, 
                            padding: '6px 12px', 
                            borderRadius: '2px', 
                            marginBottom: '12px',
                            boxShadow: `0 4px 12px rgba(59, 130, 246, 0.15)`
                          }}>
                            PREMIUM / MONTH
                          </span>
                          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                            <Price amount={ext.price} />
                          </span>
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
          )}
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
              <h2 className="font-serif" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginBottom: '32px', color: 'var(--accent-navy)' }}>Extension Bundles.</h2>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--accent-navy)', opacity: 0.7, maxWidth: '500px', marginBottom: '40px', lineHeight: 1.5 }}>
                Get all of our premium extensions for one low monthly price. Unlock your browser's full potential and supercharge your workflow.
              </p>
              <Link href="/bundles" className="btn btn-primary" style={{ padding: '20px 48px' }}>View Bundle Pricing</Link>
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
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>
                      <Price amount={bundle.price} />
                    </span>
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
                        borderRadius: '0',
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
                      borderRadius: '0',
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
      {/* FAQ Section */}
      <section style={{ padding: '160px 0', background: '#f8faff', position: 'relative', overflow: 'hidden' }}>
        {/* Vibrant Mesh Background Accents */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(35, 34, 200, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 900, 
              background: 'linear-gradient(135deg, #2322C8 0%, #8B5CF6 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase', 
              letterSpacing: '0.25em',
              display: 'block',
              marginBottom: '16px'
            }}>
              Support Centers
            </span>
            <h2 className="font-serif" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', marginBottom: '16px', color: 'var(--accent-navy)', letterSpacing: '-0.03em' }}>Common Questions.</h2>
            <p style={{ color: 'var(--accent-navy)', opacity: 0.7, fontSize: '1.25rem', maxWidth: '550px', margin: '0 auto', lineHeight: 1.5 }}>
              Everything you need to know about navigating the professional workspace.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQS.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{ 
                  padding: '48px 0',
                  borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
                  gap: '48px',
                  position: 'relative',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="faq-item"
              >
                <style dangerouslySetInnerHTML={{ __html: `
                  .faq-item::before {
                    content: "";
                    position: absolute;
                    left: -40px;
                    top: 50%;
                    transform: translateY(-50%) scaleY(0);
                    width: 4px;
                    height: 40px;
                    background: linear-gradient(to bottom, #2322C8, #8B5CF6);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                  }
                  .faq-item:hover::before {
                    transform: translateY(-50%) scaleY(1);
                    opacity: 1;
                  }
                  .faq-item:hover h3 { color: #2322C8 !important; transform: translateX(12px); }
                  .faq-item h3 { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                  @media (max-width: 768px) {
                    .faq-item { grid-template-columns: 1fr; gap: 20px; padding: 40px 0; }
                    .faq-item::before { display: none; }
                    .faq-item:hover h3 { transform: none; }
                  }
                `}} />
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 700, 
                  color: 'var(--accent-navy)', 
                  letterSpacing: '-0.01em',
                  margin: 0,
                  transition: 'color 0.3s ease'
                }}>
                  {faq.question}
                </h3>
                <p style={{ 
                  color: 'var(--accent-navy)', 
                  opacity: 0.7, 
                  lineHeight: 1.8, 
                  fontSize: '1.1rem',
                  margin: 0 
                }}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid rgba(15, 23, 42, 0.08)' }} />
          </div>

          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '0',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
            }}>
              <p style={{ color: 'var(--accent-navy)', opacity: 0.5, fontSize: '0.95rem', margin: 0 }}>
                Still have questions?
              </p>
              <Link href="/contact" style={{ 
                color: 'var(--primary)', 
                fontWeight: 700, 
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing adjustments */}
      <div style={{ height: '0px' }} />
    </div>
  );
}
