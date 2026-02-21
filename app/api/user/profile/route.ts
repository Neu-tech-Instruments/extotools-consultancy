import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { firstName, lastName, country } = await req.json();

        if (!firstName || !lastName || !country) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                firstName,
                lastName,
                country,
                name: `${firstName} ${lastName}` // Sync with standard NextAuth name field
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
