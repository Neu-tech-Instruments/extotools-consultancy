import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["extotools@gmail.com", "ricardoneuman@gmail.com"];

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const filter = searchParams.get("filter"); // "bundles" | "singles" | null

        const whereClause: any = { status: "active" };
        if (filter === "bundles") whereClause.isBundle = true;
        if (filter === "singles") whereClause.isBundle = false;

        const subscribers = await prisma.subscription.findMany({
            where: whereClause,
            include: {
                user: {
                    select: { id: true, name: true, email: true, image: true }
                },
                extension: {
                    select: { name: true, slug: true }
                }
            },
            orderBy: { currentPeriodEnd: "desc" }
        });

        return NextResponse.json(subscribers);
    } catch (error) {
        console.error("Admin subscribers fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }
}

// Manual grant/revoke access
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { userId, action } = await req.json(); // action: "grant" | "revoke"
        if (!userId || !action) {
            return NextResponse.json({ error: "userId and action required" }, { status: 400 });
        }

        if (action === "grant") {
            // Check if a manual override already exists
            const existing = await prisma.subscription.findFirst({
                where: { userId, stripeSubscriptionId: "manual-admin-grant" }
            });
            if (!existing) {
                await prisma.subscription.create({
                    data: {
                        userId,
                        isBundle: true,
                        stripeSubscriptionId: `manual-admin-grant-${userId}`,
                        status: "active",
                        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
                    }
                });
            }
        } else if (action === "revoke") {
            await prisma.subscription.updateMany({
                where: { userId, stripeSubscriptionId: { startsWith: "manual-admin-grant" } },
                data: { status: "canceled" }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin grant/revoke error:", error);
        return NextResponse.json({ error: "Failed to update access" }, { status: 500 });
    }
}
