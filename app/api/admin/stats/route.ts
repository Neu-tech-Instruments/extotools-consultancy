import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { bundles } from "@/lib/extensions";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["extotools@gmail.com", "ricardoneuman@gmail.com"];

const BUNDLE_PRICE: Record<string, number> = Object.fromEntries(
    bundles.map(b => [b.id, b.price])
);

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [
            totalUsers,
            totalActiveSubscriptions,
            activeBundles,
            churnCount,
            activeSubs,
            recentUsers,
            extensionCounts,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.subscription.count({ where: { status: "active" } }),
            prisma.subscription.count({ where: { status: "active", isBundle: true } }),
            prisma.subscription.count({ where: { status: "canceled" } }),
            // All active subscriptions with extension price for MRR calc
            prisma.subscription.findMany({
                where: { status: "active" },
                include: { extension: { select: { price: true } } }
            }),
            // All users for the table
            prisma.user.findMany({
                orderBy: { id: "desc" },
                include: {
                    subscriptions: {
                        where: { status: "active" },
                        include: { extension: { select: { name: true, slug: true } } }
                    }
                }
            }),
            // Extension popularity
            prisma.subscription.groupBy({
                by: ["extensionId"],
                where: { status: "active", isBundle: false, extensionId: { not: null } },
                _count: { extensionId: true },
                orderBy: { _count: { extensionId: "desc" } }
            }),
        ]);

        // Calculate MRR
        let singlesMrr = 0;
        let bundleMrr = 0;
        for (const sub of activeSubs) {
            if (sub.isBundle) {
                const price = BUNDLE_PRICE[sub.bundleType || ""] || 0;
                bundleMrr += price;
            } else {
                singlesMrr += sub.extension?.price || 0;
            }
        }
        const mrr = singlesMrr + bundleMrr;

        // Resolve extension names for popularity
        const extIds = extensionCounts.map(e => e.extensionId).filter(Boolean) as string[];
        const extensions = extIds.length > 0 ? await prisma.extension.findMany({
            where: { id: { in: extIds } },
            select: { id: true, name: true, slug: true }
        }) : [];
        const extMap = Object.fromEntries(extensions.map(e => [e.id, e]));

        const extensionPopularity = extensionCounts
            .filter(e => e.extensionId && extMap[e.extensionId])
            .map(e => ({
                name: extMap[e.extensionId!].name,
                slug: extMap[e.extensionId!].slug,
                count: e._count.extensionId
            }));

        return NextResponse.json({
            totalUsers,
            totalActiveSubscriptions,
            activeBundles,
            activeSingles: totalActiveSubscriptions - activeBundles,
            churnCount,
            mrr,
            bundleMrr,
            singlesMrr,
            extensionPopularity,
            recentUsers
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
