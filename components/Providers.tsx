"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import SlideCart from "./SlideCart";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CurrencyProvider>
                <CartProvider>
                    {children}
                    <SlideCart />
                </CartProvider>
            </CurrencyProvider>
        </SessionProvider>
    );
}
