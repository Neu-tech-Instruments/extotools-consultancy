import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, extensionSlug } = body;

        if (!email || !extensionSlug) {
            return NextResponse.json(
                { error: "Missing required fields: email and extensionSlug" },
                { status: 400 }
            );
        }

        // 1. Find the user by their Google Email
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                subscriptions: {
                    where: { status: "active" },
                    include: { extension: true }
                }
            }
        });

        if (!user) {
            // User hasn't even logged into the website yet
            return NextResponse.json({
                isPremium: false,
                message: "User account not found. Please log into extotools.com first."
            });
        }

        // 2. Check if they have an active subscription for this specific extension or a global bundle
        const subscriptions = user.subscriptions;
        const hasBundle = subscriptions.some(s => s.isBundle);
        const hasSpecificExt = subscriptions.some(s => s.extension?.slug === extensionSlug);

        if (hasBundle || hasSpecificExt) {
            // Track that this extension is installed/detected for this user
            try {
                const currentDetected = user.detectedExtensions ? user.detectedExtensions.split(',') : [];
                if (!currentDetected.includes(extensionSlug)) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            detectedExtensions: [...currentDetected, extensionSlug].join(',')
                        }
                    });
                }
            } catch (e) {
                console.error("Failed to update detectedExtensions:", e);
                // Non-blocking error
            }

            return NextResponse.json({
                isPremium: true,
                message: "Premium subscription verified."
            });
        }

        // 3. User exists but hasn't paid for this tool
        return NextResponse.json({
            isPremium: false,
            message: "No active subscription found for this extension."
        });

    } catch (error) {
        console.error("Extension verify error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
