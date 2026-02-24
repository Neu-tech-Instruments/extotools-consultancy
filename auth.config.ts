import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            const isOnSettings = nextUrl.pathname.startsWith("/settings");
            const isOnOnboarding = nextUrl.pathname === "/onboarding";

            if (isLoggedIn) {
                if (nextUrl.pathname === "/login" || isOnOnboarding) {
                    return Response.redirect(new URL("/dashboard", nextUrl.origin));
                }
            }

            if (isOnDashboard || isOnSettings) {
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
    providers: [], // Add providers with window config in auth.ts
} satisfies NextAuthConfig;
