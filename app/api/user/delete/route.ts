import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Delete user (Prisma cascade delete should handle subscriptions if configured, 
        // but we'll be safe)
        await prisma.$transaction([
            prisma.subscription.deleteMany({
                where: { user: { email: session.user.email } }
            }),
            prisma.user.delete({
                where: { email: session.user.email }
            })
        ]);

        return new NextResponse("Account deleted", { status: 200 });
    } catch (error) {
        console.error("[USER_DELETE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
