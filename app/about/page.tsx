"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Zap, Lock, Users, ArrowRight, Chrome } from "lucide-react";

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const ethos = [
  {
    icon: <Lock size={28} />,
    title: "Zero Data Harvesting",
    body: "We do not collect, sell, or broker your personal browsing data. Ever. What happens in your browser stays in your browser.",
    accent: "var(--primary)",
  },
  {
    icon: <Shield size={28} />,
    title: "Manifest V3 Compliant",
    body: "All our extensions are built to the latest Chrome Extension security standard — reviewed, audited, and transparent.",
    accent: "var(--secondary)",
  },
  {
    icon: <Zap size={28} />,
    title: "Bloat-Free by Design",
    body: "Every feature earns its place. We ruthlessly cut anything that slows down your browser or clutters your workspace.",
    accent: "var(--accent-1)",
  },
  {
    icon: <Chrome size={28} />,
    title: "Built for Power Users",
    body: "From freelancers to enterprise professionals, our tools are engineered for people who live in their browser.",
    accent: "var(--accent-2)",
  },
];

const milestones = [
  { year: "2022", label: "Founded", desc: "ExToTools was born from a single frustration: why are the best Chrome extensions always either bloated or abandoned?" },
  { year: "2023", label: "First Extension", desc: "Our first tool — a precision tab manager — hit the Chrome Web Store and quickly became the team's daily driver." },
  { year: "2024", label: "Subscription Platform", desc: "We launched the ExToTools subscription, making premium unlocks accessible, flexible, and cancellable at any time." },
  { year: "2025", label: "The Suite", desc: "Expanded to a full suite of productivity extensions covering web scraping, CSS inspection, and screenshot capture." },
  { year: "2026", label: "What's Next", desc: "Smarter automation, team licensing, and deeper integrations — all without compromising our privacy-first promise.", highlight: true },
];

export default function AboutPage() {
  return (
    <div style={{ position: "relative" }}>
      {/* Hero */}
      <section
        style={{
          padding: "clamp(100px, 14vh, 160px) 0 100px 0",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "var(--accent-navy)",
        }}
      >
        {/* Decorative gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "55%",
            height: "80%",
            background:
              "radial-gradient(circle, rgba(35, 34, 200, 0.25) 0%, transparent 70%)",
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "45%",
            height: "70%",
            background:
              "radial-gradient(circle, rgba(108, 208, 161, 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} style={{ marginBottom: "24px" }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  background: "var(--primary)",
                  color: "white",
                  padding: "5px 14px",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                Our Story
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                color: "white",
                lineHeight: 1,
                marginBottom: "40px",
                maxWidth: "900px",
              }}
            >
              Built for People Who{" "}
              <span style={{ color: "var(--secondary)" }}>Live in Chrome.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "rgba(255,255,255,0.65)",
                maxWidth: "640px",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              ExToTools was founded on one thesis: the best browser tools
              should be lean, private, and never hold your data hostage. We are
              a small team of builders obsessed with making your digital
              workflow faster — without the bloat.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Strip */}
      <section
        style={{
          background: "var(--primary)",
          padding: "48px 0",
          color: "white",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(24px, 5vw, 80px)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                fontFamily: "Instrument Serif, serif",
                fontWeight: 400,
                maxWidth: "700px",
                lineHeight: 1.4,
              }}
            >
              &ldquo;We believe premium software should earn your trust every
              day — not lock you in.&rdquo;
            </div>
            <div
              style={{
                marginLeft: "auto",
                opacity: 0.5,
                fontWeight: 800,
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                flexShrink: 0,
              }}
            >
              EXTOTOOLS // MISSION
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section style={{ padding: "120px 0", background: "white" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ marginBottom: "80px" }}
          >
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  background: "var(--accent-navy)",
                  color: "white",
                  padding: "4px 12px",
                }}
              >
                01
              </span>
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--accent-navy)",
              }}
            >
              Our Journey.
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gap: "0",
              position: "relative",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "120px",
                top: "0",
                bottom: "0",
                width: "1px",
                background: "rgba(15, 23, 42, 0.08)",
              }}
            />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: "48px",
                  padding: "40px 0",
                  borderBottom: i < milestones.length - 1 ? "1px solid rgba(15,23,42,0.06)" : "none",
                  alignItems: "start",
                }}
              >
                <div style={{ paddingTop: "4px" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: m.highlight ? "var(--primary)" : "rgba(15,23,42,0.3)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {m.year}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: m.highlight ? "var(--primary)" : "var(--accent-navy)",
                      marginBottom: "10px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {m.label}
                    {m.highlight && (
                      <span
                        style={{
                          marginLeft: "12px",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          background: "var(--primary)",
                          color: "white",
                          padding: "3px 8px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          verticalAlign: "middle",
                        }}
                      >
                        Live
                      </span>
                    )}
                  </h3>
                  <p
                    style={{
                      color: "var(--accent-navy)",
                      opacity: 0.65,
                      lineHeight: 1.7,
                      fontSize: "1.05rem",
                      maxWidth: "560px",
                    }}
                  >
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethos Grid */}
      <section
        style={{
          padding: "120px 0",
          background: "var(--background)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ marginBottom: "80px" }}
          >
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  background: "var(--accent-navy)",
                  color: "white",
                  padding: "4px 12px",
                }}
              >
                02
              </span>
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--accent-navy)",
              }}
            >
              Our Commitments.
            </h2>
            <p
              style={{
                color: "var(--accent-navy)",
                opacity: 0.6,
                maxWidth: "520px",
                lineHeight: 1.6,
                marginTop: "16px",
                fontSize: "1.1rem",
              }}
            >
              These aren't marketing promises. They're the engineering
              principles we use to make every decision.
            </p>
          </motion.div>

          <div className="grid grid-cols-2" style={{ gap: "clamp(20px, 3vw, 32px)" }}>
            {ethos.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{
                  background: "white",
                  border: "1px solid rgba(15, 23, 42, 0.06)",
                  padding: "48px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 30px 60px -20px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Accent top bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: item.accent,
                  }}
                />
                <div
                  style={{
                    color: item.accent,
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--accent-navy)",
                    marginBottom: "14px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--accent-navy)",
                    opacity: 0.65,
                    lineHeight: 1.7,
                    fontSize: "1rem",
                  }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "120px 0",
          background: "var(--accent-navy)",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "120%",
            background:
              "radial-gradient(circle, rgba(35,34,200,0.2) 0%, transparent 65%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2
              className="font-serif"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginBottom: "24px" }}
            >
              Ready to Supercharge Your Browser?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.15rem",
                maxWidth: "500px",
                margin: "0 auto 48px auto",
                lineHeight: 1.6,
              }}
            >
              Browse the full collection, or start with a bundle to unlock
              everything at once.
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/#collection" className="btn btn-primary" id="about-cta-collection">
                View Extensions
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/changelog"
                className="animated-underline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
                id="about-changelog-link"
              >
                See What's New
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
