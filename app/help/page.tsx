"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  Wrench,
  MessageCircle,
  ChevronRight,
  Zap,
  Lock,
  RefreshCw,
  Download,
} from "lucide-react";
import { useState } from "react";

type Category = {
  id: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  articles: { title: string; desc: string }[];
};

const CATEGORIES: Category[] = [
  {
    id: "getting-started",
    icon: <BookOpen size={24} />,
    title: "Getting Started",
    color: "var(--primary)",
    articles: [
      {
        title: "How to install your first ExToTools extension",
        desc: "A step-by-step walkthrough of downloading from the Chrome Web Store and activating your premium license.",
      },
      {
        title: "Creating your ExToTools account",
        desc: "Sign up, verify your email, and get your account ready to link with your extensions.",
      },
      {
        title: "Activating premium features after purchase",
        desc: "Log into the extension's popup with your ExToTools email to unlock all premium features instantly.",
      },
      {
        title: "Using extensions across multiple devices",
        desc: "Your subscription follows your account — sign in on any device and your premium features sync automatically.",
      },
    ],
  },
  {
    id: "billing",
    icon: <CreditCard size={24} />,
    title: "Billing & Subscription",
    color: "var(--secondary)",
    articles: [
      {
        title: "How do I cancel my subscription?",
        desc: "Cancel anytime from your dashboard under Subscription Settings. No exit fees, no questions asked.",
      },
      {
        title: "What payment methods are accepted?",
        desc: "We accept all major credit cards (Visa, Mastercard, AmEx) and PayPal via Stripe's secure checkout.",
      },
      {
        title: "Can I switch between plans?",
        desc: "Yes. Upgrade or downgrade at any time — changes take effect at the next billing cycle.",
      },
      {
        title: "Requesting a refund",
        desc: "We offer a 14-day money-back guarantee. Visit /refund or email our support team to initiate a request.",
      },
    ],
  },
  {
    id: "troubleshooting",
    icon: <Wrench size={24} />,
    title: "Troubleshooting",
    color: "var(--accent-2)",
    articles: [
      {
        title: "Extension shows 'Not Activated' after purchase",
        desc: "Make sure you're signed in to the extension popup with the same email used for your subscription.",
      },
      {
        title: "Popup not opening or showing a blank screen",
        desc: "Try disabling other extensions temporarily. If the issue persists, reinstall from the Chrome Web Store.",
      },
      {
        title: "Screenshot capture is cutting off content",
        desc: "Ensure the page is fully loaded before capturing. Disable lazy-loading extensions if present.",
      },
      {
        title: "Web scraper not finding elements",
        desc: "Some sites use shadow DOM or heavy JavaScript rendering. Try enabling the 'wait for render' setting.",
      },
    ],
  },
];

const QUICK_LINKS = [
  { icon: <Zap size={18} />, label: "Quick Setup Guide", href: "/help#getting-started" },
  { icon: <Lock size={18} />, label: "Privacy Policy", href: "/privacy" },
  { icon: <RefreshCw size={18} />, label: "Refund Policy", href: "/refund" },
  { icon: <Download size={18} />, label: "Chrome Web Store", href: "https://chromewebstore.google.com" },
];

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
            top: "-20%",
            left: "-10%",
            width: "60%",
            height: "100%",
            background:
              "radial-gradient(circle, rgba(35, 34, 200, 0.2) 0%, transparent 70%)",
            filter: "blur(100px)",
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
                Help Center
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                color: "white",
                lineHeight: 1,
                marginBottom: "24px",
              }}
            >
              How can we{" "}
              <span style={{ color: "var(--secondary)" }}>help?</span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.15rem",
                maxWidth: "540px",
                lineHeight: 1.6,
                marginBottom: "40px",
              }}
            >
              Find answers to common questions about setup, billing, and
              troubleshooting. Still stuck? Reach out and we&apos;ll get back to
              you within 24 hours.
            </p>

            {/* Quick link pills */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {QUICK_LINKS.map((ql, i) => (
                <Link
                  key={i}
                  href={ql.href}
                  id={`help-quicklink-${i}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.75)";
                  }}
                >
                  {ql.icon}
                  {ql.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section
        style={{
          padding: "100px 0",
          background: "white",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-3" style={{ gap: "28px" }}>
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                {/* Category Header Button */}
                <button
                  id={`help-category-${cat.id}`}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.id ? null : cat.id
                    )
                  }
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      background: "var(--background)",
                      border: `1px solid ${activeCategory === cat.id ? cat.color : "rgba(15,23,42,0.06)"}`,
                      padding: "32px",
                      marginBottom: "0",
                      transition: "all 0.4s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = cat.color;
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== cat.id) {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          "rgba(15,23,42,0.06)";
                      }
                    }}
                  >
                    <span style={{ color: cat.color }}>{cat.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h2
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "var(--accent-navy)",
                          letterSpacing: "-0.01em",
                          margin: 0,
                        }}
                      >
                        {cat.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(15,23,42,0.4)",
                          margin: "4px 0 0 0",
                          fontWeight: 500,
                        }}
                      >
                        {cat.articles.length} articles
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      style={{
                        color: cat.color,
                        transform: activeCategory === cat.id ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                        opacity: 0.6,
                      }}
                    />
                  </div>
                </button>

                {/* Articles list */}
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: activeCategory === cat.id ? "600px" : "0",
                    transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      border: `1px solid ${cat.color}`,
                      borderTop: "none",
                      background: "white",
                    }}
                  >
                    {cat.articles.map((article, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "20px 28px",
                          borderBottom:
                            j < cat.articles.length - 1
                              ? "1px solid rgba(15,23,42,0.05)"
                              : "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background =
                            "rgba(15,23,42,0.02)";
                          (e.currentTarget as HTMLDivElement).style.paddingLeft = "36px";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLDivElement).style.paddingLeft = "28px";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: cat.color,
                              marginTop: "8px",
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <p
                              style={{
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                color: "var(--accent-navy)",
                                marginBottom: "4px",
                                lineHeight: 1.4,
                              }}
                            >
                              {article.title}
                            </p>
                            <p
                              style={{
                                fontSize: "0.8rem",
                                color: "rgba(15,23,42,0.5)",
                                lineHeight: 1.5,
                              }}
                            >
                              {article.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        style={{
          padding: "100px 0",
          background: "var(--background)",
          position: "relative",
          overflow: "hidden",
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
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "72px",
                height: "72px",
                background: "var(--primary)",
                color: "white",
                marginBottom: "28px",
              }}
            >
              <MessageCircle size={32} />
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--accent-navy)",
                marginBottom: "16px",
              }}
            >
              Still Need Help?
            </h2>
            <p
              style={{
                color: "var(--accent-navy)",
                opacity: 0.6,
                maxWidth: "440px",
                margin: "0 auto 40px auto",
                lineHeight: 1.6,
                fontSize: "1.05rem",
              }}
            >
              Our support team responds within 24 hours. Send us your question
              and we&apos;ll sort it out.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary"
              id="help-contact-cta"
            >
              Contact Support
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
