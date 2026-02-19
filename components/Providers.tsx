"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import SlideCart from "./SlideCart";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CartProvider>
                {children}
                <SlideCart />
            </CartProvider>
        </SessionProvider>
    );
}
