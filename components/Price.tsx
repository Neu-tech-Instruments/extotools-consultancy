"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";

interface PriceProps {
  amount: number;
  className?: string;
  style?: React.CSSProperties;
  showCurrencyCode?: boolean;
  variant?: 'default' | 'editorial';
}

export default function Price({ amount, className, style, showCurrencyCode = false, variant = 'default' }: PriceProps) {
  const { formatPrice, currency, isLoading, symbol } = useCurrency();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    // Return original USD price as fallback
    const priceStr = `$${amount.toFixed(2)}`;
    if (variant === 'editorial') {
      return (
        <span className={className} style={{ ...style, display: 'inline-flex', alignItems: 'baseline' }}>
          <span style={{ fontSize: '0.6em', fontWeight: 500, marginRight: '2px' }}>$</span>
          <span>{Math.floor(amount)}</span>
          <span style={{ fontSize: '0.6em', fontWeight: 500, marginLeft: '1px' }}>.{(amount % 1).toFixed(2).slice(2)}</span>
        </span>
      );
    }
    return (
      <span className={className} style={style}>
        {priceStr}
      </span>
    );
  }

  if (variant === 'editorial') {
    const converted = amount; // Fixed 1:1 for now
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
    });
    const parts = formatter.formatToParts(converted);
    
    return (
      <span className={className} style={{ ...style, display: 'inline-flex', alignItems: 'baseline', fontFamily: 'var(--font-mono)' }}>
        {parts.map((part, i) => {
          if (part.type === 'currency') {
            return <span key={i} style={{ fontSize: '0.5em', fontWeight: 600, marginRight: '4px', opacity: 0.6 }}>{part.value}</span>;
          }
          if (part.type === 'decimal' || part.type === 'fraction') {
            return <span key={i} style={{ fontSize: '0.5em', fontWeight: 600, opacity: 0.6 }}>{part.value}</span>;
          }
          return <span key={i}>{part.value}</span>;
        })}
        {showCurrencyCode && currency !== "USD" && (
          <span style={{ fontSize: '0.4rem', marginLeft: '6px', opacity: 0.4, fontWeight: 800 }}>
            {currency}
          </span>
        )}
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
