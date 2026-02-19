import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const connectionUrl = `file://${dbPath}`;

const libsql = createClient({
    url: connectionUrl,
});

// @ts-ignore
const adapter = new PrismaLibSql(libsql);

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
