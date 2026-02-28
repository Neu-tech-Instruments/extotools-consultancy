import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prismaClientSingleton = () => {
    let rawUrl = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
    const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

    // Failsafe: Handle the case where Vercel sets it to the string "undefined"
    if (!rawUrl || rawUrl === "undefined" || rawUrl === "") {
        console.warn("[Prisma] CRITICAL: DATABASE_URL/TURSO_DATABASE_URL is missing or set to 'undefined'. Falling back to local file.");
        rawUrl = "file:dev.db";
    }

    // Normalize URL
    let libsqlUrl = rawUrl;
    if (libsqlUrl.startsWith('file:./')) {
        libsqlUrl = 'file:' + libsqlUrl.slice(7);
    }

    const isLocal = libsqlUrl.startsWith('file:');

    // Safe logging for production debugging
    if (process.env.NODE_ENV === "production" || !isLocal) {
        try {
            const host = libsqlUrl.split('@')[1]?.split('/')[0] || libsqlUrl.split('://')[1]?.split('/')[0] || "unknown";
            console.log(`[Prisma] Connecting to ${isLocal ? 'local' : 'remote'} database at host: ${host}`);
        } catch (e) {
            console.log(`[Prisma] Connecting to ${isLocal ? 'local' : 'remote'} database...`);
        }
    }

    if (libsqlUrl === "undefined" || typeof libsqlUrl === "undefined") {
        throw new Error("SANITY CHECK FAILED: libsqlUrl is literally undefined before createClient! rawUrl was: " + String(rawUrl));
    }

    if (!libsqlUrl) {
        throw new Error("SANITY CHECK FAILED: libsqlUrl is falsy before createClient! rawUrl was: " + String(rawUrl));
    }

    const adapter = new PrismaLibSql({
        url: libsqlUrl,
        authToken: isLocal ? undefined : authToken,
    });

    return new PrismaClient({
        adapter: adapter as any
    });
};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
