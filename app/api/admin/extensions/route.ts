import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { auth } from "@/auth";

const ADMIN_EMAILS = ["extotools@gmail.com", "ricardoneuman@gmail.com"];

export async function GET(req: Request) {
    try {
        const extensions = await prisma.extension.findMany({
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(extensions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch extensions" }, { status: 500 });
    }
}

import { createClient } from "@libsql/client";

// Helper to get a strict SQL connection string
function getDbUrl() {
    let rawUrl = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
    if (!rawUrl || rawUrl === "undefined" || rawUrl === "") {
        console.warn("[LibSQL] CRITICAL: DATABASE_URL is missing. Falling back to local.");
        rawUrl = "file:dev.db";
    }
    let sqlUrl = rawUrl;
    if (sqlUrl.startsWith('file:./')) {
        sqlUrl = 'file:' + sqlUrl.slice(7);
    }
    return sqlUrl;
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("image") as File;
        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const description = formData.get("description") as string;
        const shortDescription = formData.get("shortDescription") as string;
        const price = parseFloat(formData.get("price") as string) || 0;
        const priceId = formData.get("priceId") as string;
        let chromeWebStoreLink = formData.get("chromeWebStoreLink") as string;
        if (chromeWebStoreLink === "undefined" || chromeWebStoreLink === "") {
            chromeWebStoreLink = null as unknown as string;
        }
        const features = formData.get("features") as string; // Expecting JSON string
        const isLive = formData.get("isLive") === "true";

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and Slug are required." }, { status: 400 });
        }

        let imageUrl = null;

        // Securely upload to Vercel Blob if a file was provided
        if (file && file.size > 0) {
            if (!process.env.BLOB_READ_WRITE_TOKEN) {
                console.error("BLOB_READ_WRITE_TOKEN is missing. Cannot upload image.");
                return NextResponse.json({ error: "Image upload failed: BLOB_READ_WRITE_TOKEN is missing." }, { status: 500 });
            }
            const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            console.log(`[Blob] Uploading as: ${uniqueFilename}`);
            const blob = await put(uniqueFilename, file, {
                access: 'public',
                addRandomSuffix: true,
                allowOverwrite: true
            });
            imageUrl = blob.url;
        }

        // NATIVE LIBSQL INSERT (Bypass Prisma completely for this action to prevent adapter bugs)
        const dbUrl = getDbUrl();
        const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;
        const isLocal = dbUrl.startsWith('file:');

        console.log(`[Native DB] Connecting to ${isLocal ? 'local' : 'remote'} Turso DB for insertion...`);
        const client = createClient({
            url: dbUrl,
            authToken: isLocal ? undefined : authToken,
        });

        // Generate a random ID (Prisma uses CUIDs, but UUIDs are perfectly valid string IDs in SQLite)
        const newId = crypto.randomUUID();

        await client.execute({
            sql: `
                INSERT INTO "Extension" 
                (id, name, slug, description, shortDescription, price, priceId, chromeWebStoreLink, features, isLive, image)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            args: [
                newId,
                name,
                slug,
                description || null,
                shortDescription || "",
                price,
                priceId || null,
                chromeWebStoreLink || null,
                features || "[]",
                isLive ? 1 : 0,
                imageUrl || null
            ]
        });

        console.log("[Native DB] Native insert successful.");

        return NextResponse.json({ success: true, extension: { id: newId, name, slug } });
    } catch (error) {
        console.error("Extension native insert error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to create extension natively";

        // Handle unique constraint violations gracefully
        if (errorMessage.includes("SQLITE_CONSTRAINT") && errorMessage.includes("Extension.slug")) {
            return NextResponse.json({
                error: "An extension with this URL slug already exists. Please use a unique name or delete the existing one first."
            }, { status: 400 });
        }

        const debugInfo = {
            DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Missing",
            DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN ? "Set" : "Missing",
            TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL ? "Set" : "Missing",
            TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN ? "Set" : "Missing",
            NODE_ENV: process.env.NODE_ENV,
            errorString: String(error)
        };

        return NextResponse.json({
            error: errorMessage + "\n\nDEBUG INFO:\n" + JSON.stringify(debugInfo, null, 2)
        }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const id = formData.get("id") as string;
        if (!id) return NextResponse.json({ error: "ID is required for updating." }, { status: 400 });

        const file = formData.get("image") as File;
        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const description = formData.get("description") as string;
        const shortDescription = formData.get("shortDescription") as string;
        const price = parseFloat(formData.get("price") as string) || 0;
        const priceId = formData.get("priceId") as string;
        let chromeWebStoreLink = formData.get("chromeWebStoreLink") as string;
        if (chromeWebStoreLink === "undefined" || chromeWebStoreLink === "") {
            chromeWebStoreLink = null as unknown as string;
        }
        const features = formData.get("features") as string;
        const isLive = formData.get("isLive") === "true";

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and Slug are required." }, { status: 400 });
        }

        let imageUrl = undefined;
        if (file && file.size > 0) {
            // Upload new image
            if (!process.env.BLOB_READ_WRITE_TOKEN) {
                return NextResponse.json({ error: "Image upload failed: BLOB_READ_WRITE_TOKEN is missing." }, { status: 500 });
            }
            const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const blob = await put(uniqueFilename, file, {
                access: 'public',
                addRandomSuffix: true,
                allowOverwrite: true
            });
            imageUrl = blob.url;
        }

        const dataToUpdate: any = {
            name,
            slug,
            description: description || null,
            shortDescription: shortDescription || "",
            price,
            priceId: priceId || null,
            chromeWebStoreLink: chromeWebStoreLink || null,
            features: features || "[]",
            isLive,
        };

        if (imageUrl !== undefined) {
            dataToUpdate.image = imageUrl;
        }

        const updated = await prisma.extension.update({
            where: { id },
            data: dataToUpdate
        });

        return NextResponse.json({ success: true, extension: updated });

    } catch (error: any) {
        console.error("Extension update error:", error);
        return NextResponse.json({ error: error.message || "Failed to update extension" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await prisma.extension.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete extension" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, isLive } = body;

        if (!id || typeof isLive !== 'boolean') {
            return NextResponse.json({ error: "Missing ID or isLive status" }, { status: 400 });
        }

        await prisma.extension.update({
            where: { id },
            data: { isLive }
        });

        return NextResponse.json({ success: true, isLive });
    } catch (error) {
        console.error("Extension update error:", error);
        return NextResponse.json({ error: "Failed to update extension" }, { status: 500 });
    }
}
