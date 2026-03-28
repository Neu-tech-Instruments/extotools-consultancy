import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/nodemailer";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    debug: true,
    trustHost: true,
    secret: process.env.AUTH_SECRET, // Using environment variable
    session: { strategy: "jwt" },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user && user.email) {
                try {
                    const nameParts = user.name ? user.name.split(" ") : [];
                    const firstName = nameParts[0] || "";
                    const lastName = nameParts.slice(1).join(" ") || "";

                    const dbUser = await prisma.user.upsert({
                        where: { email: user.email },
                        update: {
                            name: user.name,
                            image: user.image,
                            firstName: firstName || undefined,
                            lastName: lastName || undefined
                        },
                        create: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            firstName: firstName,
                            lastName: lastName,
                            createdAt: new Date().toISOString()
                        }
                    });
                    token.id = dbUser.id;
                    token.firstName = dbUser.firstName;
                    token.lastName = dbUser.lastName;
                    token.country = dbUser.country;
                    token.createdAt = dbUser.createdAt;
                } catch (e) {
                    console.error("Error upserting user in JWT callback:", e);
                    token.id = user.id;
                }
            } else if (user) {
                token.id = user.id;
            }

            if (trigger === "update" || (!token.firstName && token.id)) {
                try {
                    const dbUser = await prisma.user.findUnique({
                        where: { id: token.id as string },
                        select: { firstName: true, lastName: true, country: true, createdAt: true }
                    });
                    if (dbUser) {
                        token.firstName = dbUser.firstName;
                        token.lastName = dbUser.lastName;
                        token.country = dbUser.country;
                        token.createdAt = dbUser.createdAt;
                    }
                } catch (e) {
                    console.error("Prisma DB lookup bypassed in JWT callback to preserve session flow.");
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).firstName = token.firstName;
                (session.user as any).lastName = token.lastName;
                (session.user as any).country = token.country;
                (session.user as any).createdAt = token.createdAt;
            }
            return session;
        }
    }
});
