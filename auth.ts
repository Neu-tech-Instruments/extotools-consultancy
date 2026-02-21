import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                token.id = user.id;
                token.firstName = (user as any).firstName;
                token.lastName = (user as any).lastName;
                token.country = (user as any).country;
            }
            // If profile was updated, we might need to refresh from DB
            if (trigger === "update" || !token.firstName) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id as string },
                    select: { firstName: true, lastName: true, country: true }
                });
                if (dbUser) {
                    token.firstName = dbUser.firstName;
                    token.lastName = dbUser.lastName;
                    token.country = dbUser.country;
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
            }
            return session;
        }
    }
});
