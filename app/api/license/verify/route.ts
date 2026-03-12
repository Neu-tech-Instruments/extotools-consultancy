import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { licenseKey, extensionSlug } = await req.json();

        if (!licenseKey || !extensionSlug) {
            return NextResponse.json({ error: "License key and extension slug are required." }, { status: 400 });
        }

        // Find user by license key
        const user = await prisma.user.findUnique({
            where: { licenseKey },
            include: {
                subscriptions: {
                    where: {
                        status: "active",
                        currentPeriodEnd: { gte: new Date() }
                    },
                    include: {
                        extension: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid license key." }, { status: 404 });
        }

        // Check if user has access to the specific extension
        // Either via direct extension subscription or a bundle
        const hasAccess = user.subscriptions.some(sub =>
            sub.isBundle || (sub.extension?.slug === extensionSlug)
        );

        if (hasAccess) {
            // --- TRACK INSTALLATION ---
            try {
                const currentDetectedStr = (user as any).detectedExtensions || "";
                const currentDetected = currentDetectedStr.split(',').filter(Boolean);
                if (!currentDetected.includes(extensionSlug)) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            detectedExtensions: [...currentDetected, extensionSlug].join(',')
                        } as any
                    });
                }
            } catch (e) {
                console.error("Failed to update detectedExtensions in license-verify:", e);
            }
            // ---------------------------

            return NextResponse.json({
                active: true,
                user: {
                    name: user.name,
                    email: user.email
                }
            });
        }

        return NextResponse.json({
            active: false,
            message: "No active subscription found for this extension."
        }, { status: 403 });

    } catch (error) {
        console.error("License verification error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
