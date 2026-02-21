import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            const isOnOnboarding = nextUrl.pathname === "/onboarding";

            if (isLoggedIn) {
                const isProfileComplete = !!(auth.user as any).firstName; // Simplified check for now

                if (!isProfileComplete && !isOnOnboarding && !nextUrl.pathname.startsWith("/api")) {
                    return Response.redirect(new URL("/onboarding", nextUrl));
                }

                if (isProfileComplete && isOnOnboarding) {
                    return Response.redirect(new URL("/dashboard", nextUrl));
                }

                if (nextUrl.pathname === "/login") {
                    return Response.redirect(new URL("/dashboard", nextUrl));
                }
            }

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
    providers: [], // Add providers with window config in auth.ts
} satisfies NextAuthConfig;
