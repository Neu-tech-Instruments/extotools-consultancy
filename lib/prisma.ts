import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const prismaClientSingleton = () => {
    const rawUrl = process.env.DATABASE_URL || "file:dev.db";
    const authToken = process.env.DATABASE_AUTH_TOKEN;

    // Normalize URL for @libsql/client
    let libsqlUrl = rawUrl;
    if (libsqlUrl.startsWith('file:./')) {
        libsqlUrl = 'file:' + libsqlUrl.slice(7);
    }

    const isLocal = libsqlUrl.startsWith('file:');

    const client = createClient({
        url: libsqlUrl,
        authToken: isLocal ? undefined : authToken,
    });

    const adapter = new PrismaLibSql(client as any);

    // In Prisma 7 with driver adapters, we only need the adapter.
    // The engine manages the connection through this adapter.
    return new PrismaClient({ adapter: adapter as any });
};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
