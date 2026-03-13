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
        const isEuroTimezone = timeZone?.startsWith('Europe/');
        
        // Signal 2: Browser Language
        const lang = typeof window !== 'undefined' ? window.navigator.language : '';
        const euroLangs = ['de', 'fr', 'nl', 'it', 'es', 'pt', 'fi', 'at', 'be'];
        const isEuroLang = euroLangs.some(el => lang.toLowerCase().startsWith(el));

        // Signal 3: Geo-IP
        let geoCurrency = "USD";
        try {
          const geoRes = await fetch("https://ipapi.co/json/");
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            geoCurrency = geoData.currency || "USD";
          }
        } catch (e) {
          console.warn("[ExToTools] Geo-IP failed.");
        }

        // Priority Logic: If Timezone or Language or Geo-IP says Europe, it's EUR.
        if (isEuroTimezone || isEuroLang || geoCurrency === "EUR") {
          userCurrency = "EUR";
          console.log("[ExToTools] European Signal Detected:", { isEuroTimezone, isEuroLang, geoCurrency });
        } else {
          userCurrency = geoCurrency;
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
