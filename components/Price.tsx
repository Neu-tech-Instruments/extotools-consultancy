"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";

interface PriceProps {
  amount: number;
  className?: string;
  style?: React.CSSProperties;
  showCurrencyCode?: boolean;
}

export default function Price({ amount, className, style, showCurrencyCode = false }: PriceProps) {
  const { formatPrice, currency, isLoading } = useCurrency();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    // Return original USD price as fallback to prevent layout shift and show something immediately
    return (
      <span className={className} style={style}>
        ${amount.toFixed(2)}
      </span>
    );
  }

  return (
    <span className={className} style={style}>
      {formatPrice(amount)}
      {showCurrencyCode && currency !== "USD" && (
        <span style={{ fontSize: '0.7em', marginLeft: '4px', opacity: 0.6 }}>
          {currency}
        </span>
      )}
    </span>
  );
}
