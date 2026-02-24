import { NextResponse } from "next/server";
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
        const chromeWebStoreLink = formData.get("chromeWebStoreLink") as string;
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
                return NextResponse.json({ error: "Image upload failed: BLOB_READ_WRITE_TOKEN is missing. Please provide the token or create the extension without an image." }, { status: 500 });
            }
            const blob = await put(file.name, file, {
                access: 'public',
                addRandomSuffix: true,
                allowOverwrite: true
            });
            imageUrl = blob.url;
        }

        const newExtension = await prisma.extension.create({
            data: {
                name,
                slug,
                description,
                shortDescription,
                price,
                priceId,
                features: features || "[]",
                image: imageUrl,
                chromeWebStoreLink: chromeWebStoreLink || null,
                isLive
            }
        });

        return NextResponse.json({ success: true, extension: newExtension });
    } catch (error) {
        console.error("Extension upload error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to create extension";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
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
