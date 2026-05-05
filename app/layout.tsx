import type { Metadata } from "next";
import { Inter, Instrument_Serif, Syncopate } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-statement",
});

export const metadata: Metadata = {
  title: "ExToTools | Premium Chrome Extensions",
  description: "Sophisticated Chrome extensions for financial professionals and data-driven experts.",
  keywords: ["Chrome Extensions", "Productivity", "Workspace", "Professional Tools"],
  authors: [{ name: "ExToTools Team" }],
  openGraph: {
    title: "ExToTools | Premium Chrome Extensions",
    description: "Sophisticated Chrome extensions for power users and professionals.",
    url: "https://extotools.com",
    siteName: "ExToTools",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "ExToTools Premium Extensions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExToTools | Premium Chrome Extensions",
    description: "Sophisticated Chrome extensions for power users and professionals.",
    images: ["/og-preview.png"],
  },
  icons: {
    icon: "/tool-icon-20.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ExToTools",
    "applicationCategory": "BrowserApplication",
    "operatingSystem": "Chrome",
    "url": "https://extotools.com",
    "description": "Premium Chrome extensions for financial professionals and data-driven experts.",
    "offers": {
      "@type": "Offer",
      "price": "4.99",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${syncopate.variable}`}>
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <BackgroundGrid />
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)', position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          <Footer />
          {/* Floating Support Button */}
          <a
            href="/contact"
            id="floating-support-btn"
            aria-label="Contact Support"
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '28px',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'var(--primary)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(35, 34, 200, 0.35)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: '0',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Support</span>
          </a>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
