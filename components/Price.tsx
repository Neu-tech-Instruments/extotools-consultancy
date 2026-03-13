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
    return (
      <span className={`${className} animate-pulse`} style={{ 
        ...style, 
        display: 'inline-block',
        width: '80px', 
        height: '1em', 
        background: 'rgba(59, 130, 246, 0.1)', 
        borderRadius: '2px',
        verticalAlign: 'middle'
      }} />
    );
  }

  return (
    <span className={className} style={style}>
      {formatPrice(amount).replace(/\s/g, '')}
      {showCurrencyCode && currency !== "USD" && (
        <span style={{ fontSize: '0.7em', marginLeft: '4px', opacity: 0.6 }}>
          {currency}
        </span>
      )}
    </span>
  );
}
