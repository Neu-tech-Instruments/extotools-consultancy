"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Home, LayoutDashboard, HelpCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const quickLinks = [
  {
    href: "/",
    label: "Home",
    desc: "Back to the ExToTools home page",
    icon: <Home size={20} />,
  },
  {
    href: "/dashboard",
    label: "My Dashboard",
    desc: "Manage your extensions and subscription",
    icon: <LayoutDashboard size={20} />,
  },
  {
    href: "/help",
    label: "Help Center",
    desc: "Find answers and documentation",
    icon: <HelpCircle size={20} />,
  },
];

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--accent-navy)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "60%",
          height: "80%",
          background:
            "radial-gradient(circle, rgba(35, 34, 200, 0.25) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-5%",
          width: "50%",
          height: "80%",
          background:
            "radial-gradient(circle, rgba(108, 208, 161, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "60px 40px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Giant 404 */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                fontFamily: "Instrument Serif, serif",
                fontSize: "clamp(8rem, 20vw, 18rem)",
                lineHeight: 0.85,
                color: "rgba(255,255,255,0.04)",
                fontWeight: 400,
                userSelect: "none",
                pointerEvents: "none",
                marginBottom: "-40px",
              }}
            >
              404
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                background: "var(--accent-2)",
                color: "white",
                padding: "5px 14px",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              Page Not Found
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "white",
              lineHeight: 1.05,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            Looks like this page{" "}
            <span style={{ color: "var(--secondary)" }}>got lost.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "1.1rem",
              maxWidth: "480px",
              lineHeight: 1.6,
              marginBottom: "60px",
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Here are some places to go instead:
          </motion.p>

          {/* Quick links */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "grid",
              gap: "16px",
              maxWidth: "600px",
              marginBottom: "60px",
            }}
          >
            {quickLinks.map((link, i) => (
              <Link
                href={link.href}
                key={i}
                id={`not-found-link-${link.label.toLowerCase().replace(/ /g, "-")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "20px 28px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "white",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateX(6px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateX(0)";
                }}
              >
                <span style={{ color: "var(--secondary)", flexShrink: 0 }}>
                  {link.icon}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "2px" }}
                  >
                    {link.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {link.desc}
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  style={{ opacity: 0.4, flexShrink: 0 }}
                />
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/" className="btn btn-primary" id="not-found-home-btn">
              <Home size={16} />
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
