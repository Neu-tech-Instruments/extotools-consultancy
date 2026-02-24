import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const extensions = await prisma.extension.findMany({
            where: { isLive: true },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(extensions);
    } catch (error) {
        console.error("Public extension fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch extensions" }, { status: 500 });
    }
}
