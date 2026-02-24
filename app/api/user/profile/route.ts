import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized: No email attached to session" }, { status: 401 });
        }

        const { firstName, lastName, country } = await req.json();

        if (!firstName || !lastName || !country) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.upsert({
            where: { email: session.user.email },
            update: {
                firstName,
                lastName,
                country,
                name: `${firstName} ${lastName}` // Sync with standard NextAuth name field
            },
            create: {
                email: session.user.email,
                name: `${firstName} ${lastName}`,
                firstName,
                lastName,
                country,
                image: session.user.image
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
