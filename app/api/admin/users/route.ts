import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@libsql/client";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["extotools@gmail.com", "ricardoneuman@gmail.com"];

function getDbUrl() {
    let rawUrl = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
    if (!rawUrl || rawUrl === "undefined" || rawUrl === "") {
        rawUrl = "file:dev.db";
    }
    if (rawUrl.startsWith('file:./')) {
        rawUrl = 'file:' + rawUrl.slice(7);
    }
    return rawUrl;
}

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUrl = getDbUrl();
        const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;
        const isLocal = dbUrl.startsWith('file:');

        const client = createClient({
            url: dbUrl,
            authToken: isLocal ? undefined : authToken,
        });

        // Check which columns exist
        const pragma = await client.execute('PRAGMA table_info("User")');
        const columns = pragma.rows.map((r: any) => r.name as string);
        const hasCreatedAt = columns.includes('createdAt');
        const hasDetected = columns.includes('detectedExtensions');

        const selectCreatedAt = hasCreatedAt ? 'u.createdAt,' : '"" as createdAt,';
        const selectDetected = hasDetected ? 'u.detectedExtensions,' : '"" as detectedExtensions,';
        
        const result = await client.execute(`
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.image,
                ${selectCreatedAt}
                ${selectDetected}
                (SELECT count(*) FROM "Subscription" s WHERE s.userId = u.id AND s.status = 'active') as subCount,
                (
                    SELECT GROUP_CONCAT(e.name, ', ')
                    FROM "Subscription" s2
                    JOIN "Extension" e ON e.id = s2.extensionId
                    WHERE s2.userId = u.id AND s2.status = 'active' AND s2.isBundle = 0
                ) as activeExtensionNames,
                (SELECT count(*) FROM "Subscription" s3 WHERE s3.userId = u.id AND s3.status = 'active' AND s3.isBundle = 1) as hasBundle
            FROM "User" u
            ORDER BY u.id DESC
        `);

        const users = result.rows.map((row: any) => ({
            id: String(row.id),
            name: row.name,
            email: row.email,
            image: row.image,
            createdAt: row.createdAt || null,
            // detectedExtensions: comma-separated slugs the user has opened via the Chrome extension
            detectedExtensions: row.detectedExtensions 
                ? (row.detectedExtensions as string).split(',').map((s: string) => s.trim()).filter(Boolean) 
                : [],
            // Paid subscriptions
            subscriptions: row.subCount ? Array(Number(row.subCount)).fill({}) : [],
            activeExtensionNames: row.activeExtensionNames || null,
            hasBundle: Number(row.hasBundle) > 0,
        }));

        return NextResponse.json(users);
    } catch (error) {
        console.error("Admin users fetch error:", error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : "Failed to fetch users"
        }, { status: 500 });
    }
}
