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
});
