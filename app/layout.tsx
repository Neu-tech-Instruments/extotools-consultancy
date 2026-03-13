import type { Metadata } from "next";
import { Inter, Instrument_Serif, Syncopate } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";

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
        url: "/og-preview.png", // We will need to create this image
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
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${syncopate.variable}`}>
      <body className={inter.className}>
        <Providers>
          <BackgroundGrid />
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)', position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
