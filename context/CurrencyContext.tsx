"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CurrencyContextType {
  currency: string;
  rate: number;
  symbol: string;
  formatPrice: (usdAmount: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(1);
  const [symbol, setSymbol] = useState("$");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencyAndRates = async () => {
      try {
        let userCurrency = "USD";
        
        // Signal 1: Browser Timezone (Very reliable)
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone?.startsWith('Europe/')) {
          userCurrency = "EUR";
          console.log("[ExToTools] Detected European timezone:", timeZone);
        }

        // Signal 2: Browser Language
        const lang = window.navigator.language;
        const euroLangs = ['de', 'fr', 'nl', 'it', 'es', 'pt', 'fi', 'at', 'be'];
        if (userCurrency === "USD" && euroLangs.some(el => lang.toLowerCase().startsWith(el))) {
          userCurrency = "EUR";
          console.log("[ExToTools] Detected European language:", lang);
        }

        // Signal 3: Geo-IP (Try as ultimate signal)
        try {
          const geoRes = await fetch("https://ipapi.co/json/");
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData.currency) {
              userCurrency = geoData.currency;
              console.log("[ExToTools] Geo-IP Currency:", userCurrency);
            }
          }
        } catch (e) {
          console.warn("[ExToTools] Geo-IP fetch failed, relying on browser signals.");
        }

        // Filter: only allow USD and EUR for now
        const supportedCurrency = ["USD", "EUR"].includes(userCurrency) ? userCurrency : "USD";
        setCurrency(supportedCurrency);
        setRate(1); // FIXED RATE: 1:1 for now as per requirement

        // Get symbol
        const formatter = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: supportedCurrency,
        });
        const parts = formatter.formatToParts(0);
        const foundSymbol = parts.find((part) => part.type === "currency")?.value || (supportedCurrency === "EUR" ? "€" : "$");
        setSymbol(foundSymbol);
      } catch (error) {
        console.error("Failed to fetch adaptive pricing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencyAndRates();
  }, []);

  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * rate;
    
    // Stripe's adaptive pricing usually rounds or uses specific rules.
    // We'll use Intl.NumberFormat for a professional look.
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, rate, symbol, formatPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
