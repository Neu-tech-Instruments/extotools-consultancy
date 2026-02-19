import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "ExToTools - Premium Financial Consultancy Tools",
  description: "Sophisticated Chrome extensions for financial professionals and data-driven experts.",
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
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className={inter.className}>
        <Providers>
          <BackgroundGrid />
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
