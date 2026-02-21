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
                const isProfileComplete = !!(auth.user as any).firstName;

                if (!isProfileComplete && !isOnOnboarding && !nextUrl.pathname.startsWith("/api")) {
                    return Response.redirect(new URL("/onboarding", nextUrl.origin));
                }

                if (isProfileComplete && isOnOnboarding) {
                    return Response.redirect(new URL("/dashboard", nextUrl.origin));
                }

                if (nextUrl.pathname === "/login") {
                    return Response.redirect(new URL("/dashboard", nextUrl.origin));
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
