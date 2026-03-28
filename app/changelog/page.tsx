"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Star, Wrench, Plus } from "lucide-react";

type ChangeType = "feature" | "improvement" | "fix" | "security";

interface ChangeEntry {
  version: string;
  date: string;
  title: string;
  summary: string;
  type: ChangeType;
  changes: string[];
  highlight?: boolean;
}

const TYPE_META: Record<
  ChangeType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  feature: {
    label: "New Feature",
    color: "var(--primary)",
    icon: <Plus size={14} />,
  },
  improvement: {
    label: "Improvement",
    color: "var(--secondary)",
    icon: <Zap size={14} />,
  },
  fix: {
    label: "Bug Fix",
    color: "var(--accent-2)",
    icon: <Wrench size={14} />,
  },
  security: {
    label: "Security",
    color: "#10B981",
    icon: <Shield size={14} />,
  },
};

const CHANGELOG: ChangeEntry[] = [
  {
    version: "v2.4.0",
    date: "March 2026",
    title: "Major Performance Overhaul",
    summary:
      "Rewrote the extension engine core for a 60% reduction in memory footprint and near-instant activation.",
    type: "improvement",
    highlight: true,
    changes: [
      "Rewrote background service worker for Manifest V3 compliance",
      "Reduced cold-start time from ~420ms to under 80ms",
      "Eliminated all deprecated Chrome API calls",
      "New subscription sync system — status now updates in real time",
      "Dashboard UI redesign with new Analytics panel",
    ],
  },
  {
    version: "v2.3.1",
    date: "February 2026",
    title: "Security Patch & Auth Hardening",
    summary:
      "Critical security update hardening the authentication flow and eliminating a potential session token exposure edge case.",
    type: "security",
    changes: [
      "Patched session token expiry edge case on inactive tabs",
      "Added CSRF protection to all server actions",
      "Upgraded NextAuth.js to latest stable release",
      "Extension now validates user subscription server-side on every launch",
    ],
  },
  {
    version: "v2.3.0",
    date: "January 2026",
    title: "CSS Inspector Pro: Side Panel Mode",
    summary:
      "The CSS Inspector extension now supports Chrome's new Side Panel API, letting you inspect and copy styles without covering the page.",
    type: "feature",
    changes: [
      "New Side Panel mode — inspect without blocking your viewport",
      "Live edit mode: change styles and see them update in real time",
      "Added copy-to-clipboard for full computed style objects",
      "Improved element targeting with visual highlight overlay",
    ],
  },
  {
    version: "v2.2.0",
    date: "December 2025",
    title: "Screenshot & Capture Engine v2",
    summary:
      "Fully rebuilt the screen capture pipeline for higher fidelity output and new export formats.",
    type: "feature",
    changes: [
      "Full-page scrolling capture now works on dynamically loaded content",
      "Added PDF export with configurable page sizing",
      "New annotation layer with arrows, text, and blur tools",
      "JPEG/WebP/PNG export with quality slider",
    ],
  },
  {
    version: "v2.1.3",
    date: "November 2025",
    title: "Stability & Bug Fixes",
    summary:
      "Resolved a set of user-reported issues across the tab manager and scraper extensions.",
    type: "fix",
    changes: [
      "Fixed tab group sync failing when Chrome was in energy-saver mode",
      "Resolved scraper pagination breaking on single-page applications",
      "Fixed tooltip rendering glitch in popup on Windows Chrome 120+",
      "Corrected subscription badge not showing after payment on Firefox",
    ],
  },
  {
    version: "v2.0.0",
    date: "September 2025",
    title: "ExToTools Suite — Full Release",
    summary:
      "The complete ExToTools suite launched publicly with four flagship extensions and a unified subscription platform.",
    type: "feature",
    changes: [
      "Launched four extensions: Tab Manager, Web Scraper, CSS Inspector, Screenshot Tool",
      "Unified ExToTools account system — one login for all extensions",
      "Subscription tiers: Individual and All-Access Bundle",
      "Chrome Web Store free tier for all extensions",
      "Real-time license validation across all tools",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div style={{ position: "relative" }}>
      {/* Hero */}
      <section
        style={{
          padding: "clamp(100px, 14vh, 160px) 0 80px 0",
          background: "var(--accent-navy)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-5%",
            width: "50%",
            height: "90%",
            background:
              "radial-gradient(circle, rgba(35, 34, 200, 0.2) 0%, transparent 70%)",
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  background: "var(--secondary)",
                  color: "var(--accent-navy)",
                  padding: "5px 14px",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                Product Changelog
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                color: "white",
                lineHeight: 1,
                marginBottom: "28px",
              }}
            >
              What&apos;s{" "}
              <span style={{ color: "var(--secondary)" }}>New.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "560px",
                lineHeight: 1.6,
              }}
            >
              Every update, improvement, and fix — documented. We ship
              continuously and are committed to making ExToTools better with
              every release.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section
        style={{
          padding: "100px 0 160px 0",
          background: "var(--background)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              position: "relative",
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            {CHANGELOG.map((entry, i) => {
              const meta = TYPE_META[entry.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: "48px",
                    paddingBottom: "72px",
                    position: "relative",
                  }}
                >
                  {/* Timeline column */}
                  <div style={{ paddingTop: "6px" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontWeight: 800,
                        fontSize: "1rem",
                        color: entry.highlight
                          ? "var(--primary)"
                          : "rgba(15,23,42,0.35)",
                        display: "block",
                        marginBottom: "6px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {entry.version}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(15,23,42,0.35)",
                        fontWeight: 500,
                      }}
                    >
                      {entry.date}
                    </span>
                    {/* Vertical connector line */}
                    {i < CHANGELOG.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: "68px",
                          top: "56px",
                          bottom: "-8px",
                          width: "1px",
                          background: "rgba(15,23,42,0.07)",
                        }}
                      />
                    )}
                  </div>

                  {/* Content card */}
                  <div
                    style={{
                      background: "white",
                      border: `1px solid ${entry.highlight ? "rgba(35,34,200,0.2)" : "rgba(15,23,42,0.06)"}`,
                      padding: "40px",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: entry.highlight
                        ? "0 20px 60px -20px rgba(35,34,200,0.12)"
                        : "0 4px 20px -10px rgba(0,0,0,0.04)",
                      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(-6px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 30px 60px -20px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        entry.highlight
                          ? "0 20px 60px -20px rgba(35,34,200,0.12)"
                          : "0 4px 20px -10px rgba(0,0,0,0.04)";
                    }}
                  >
                    {/* Accent stripe */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: meta.color,
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          background: meta.color,
                          color: "white",
                          padding: "4px 12px",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontFamily: "monospace",
                        }}
                      >
                        {meta.icon}
                        {meta.label}
                      </span>
                      {entry.highlight && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            background: "rgba(35,34,200,0.08)",
                            color: "var(--primary)",
                            padding: "4px 12px",
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            letterSpacing: "0.1em",
                          }}
                        >
                          <Star size={12} fill="currentColor" />
                          Latest Release
                        </span>
                      )}
                    </div>

                    <h2
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        color: "var(--accent-navy)",
                        marginBottom: "12px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {entry.title}
                    </h2>
                    <p
                      style={{
                        color: "var(--accent-navy)",
                        opacity: 0.65,
                        lineHeight: 1.7,
                        marginBottom: "28px",
                        fontSize: "1rem",
                      }}
                    >
                      {entry.summary}
                    </p>

                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {entry.changes.map((c, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            color: "var(--accent-navy)",
                            opacity: 0.8,
                            fontSize: "0.95rem",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: meta.color,
                              flexShrink: 0,
                              marginTop: "8px",
                            }}
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: "center",
              marginTop: "40px",
              padding: "60px",
              background: "var(--accent-navy)",
              color: "white",
            }}
          >
            <h3
              className="font-serif"
              style={{ fontSize: "2.5rem", marginBottom: "16px" }}
            >
              Ready to Try the Latest Version?
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                marginBottom: "32px",
                fontSize: "1.05rem",
              }}
            >
              All updates are live. Subscribers get new features automatically.
            </p>
            <Link
              href="/#collection"
              className="btn btn-primary"
              id="changelog-cta"
            >
              Explore Extensions
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
