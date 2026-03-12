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
        // 1. Detect user's region/currency
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();
        const userCurrency = geoData.currency || "USD";

        // Filter: only allow USD and EUR for now as per requirement (fixed 9.99)
        // If it's something else, we fallback to USD.
        const supportedCurrency = ["USD", "EUR"].includes(userCurrency) ? userCurrency : "USD";
        setCurrency(supportedCurrency);
        setRate(1); // FIXED RATE: 9.99 is 9.99 regardless of currency

        // Get symbol
        const formatter = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: supportedCurrency,
        });
        const parts = formatter.formatToParts(0);
        const foundSymbol = parts.find((part) => part.type === "currency")?.value || supportedCurrency;
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
