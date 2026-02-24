import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users, Package, CreditCard, Activity } from "lucide-react";
import AdminExtensionManager from "@/components/AdminExtensionManager";

const ADMIN_EMAILS = ["extotools@gmail.com", "ricardoneuman@gmail.com"];

export default async function AdminDashboard() {
    const session = await auth();

    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
        redirect("/dashboard");
    }

    let totalUsers = 0;
    let totalActiveSubscriptions = 0;
    let activeBundles = 0;
    let recentUsers: any[] = [];

    try {
        // Fetch platform statistics
        totalUsers = await prisma.user.count();

        // Total active subscriptions
        totalActiveSubscriptions = await prisma.subscription.count({
            where: { status: "active" }
        });

        // Breakdown of bundles vs single extensions
        activeBundles = await prisma.subscription.count({
            where: { status: "active", isBundle: true }
        });

        // Recent Users
        recentUsers = await prisma.user.findMany({
            take: 10,
            orderBy: { id: 'desc' }, // Assuming ordered by creation loosely via CUID
            include: {
                subscriptions: {
                    where: { status: "active" },
                    include: { extension: true }
                }
            }
        });
    } catch (error) {
        console.error("Admin Dashboard DB error:", error);
    }

    const activeSingles = totalActiveSubscriptions - activeBundles;

    return (
        <div className="container animate-fade-in" style={{ padding: '60px 0' }}>
            <div style={{ marginBottom: '48px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Admin Console</h1>
                <p style={{ color: 'rgba(15, 23, 42, 0.6)' }}>Platform overview & user management</p>
            </div>

            <div className="grid grid-cols-4" style={{ gap: '24px', marginBottom: '48px' }}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem', color: 'rgba(15, 23, 42, 0.6)' }}>Total Users</h3>
                        <Users size={20} color="var(--primary)" />
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>{totalUsers}</span>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem', color: 'rgba(15, 23, 42, 0.6)' }}>Active Subs</h3>
                        <Activity size={20} color="var(--primary)" />
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>{totalActiveSubscriptions}</span>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem', color: 'rgba(15, 23, 42, 0.6)' }}>Active Bundles</h3>
                        <Package size={20} color="var(--primary)" />
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>{activeBundles}</span>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem', color: 'rgba(15, 23, 42, 0.6)' }}>Single Tools</h3>
                        <CreditCard size={20} color="var(--primary)" />
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>{activeSingles}</span>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Recent Signups</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--architect-line)', color: 'rgba(15, 23, 42, 0.5)' }}>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Name</th>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Email</th>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Active Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
                                    <td style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {user.image && <img src={user.image} alt={user.name || "User"} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />}
                                        <span style={{ fontWeight: 600 }}>{user.name || "Unknown"}</span>
                                    </td>
                                    <td style={{ padding: '16px 12px', color: 'rgba(15, 23, 42, 0.7)' }}>{user.email}</td>
                                    <td style={{ padding: '16px 12px' }}>
                                        {user.subscriptions.length > 0 ? (
                                            <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(22, 163, 74)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                                                Premium
                                            </span>
                                        ) : (
                                            <span style={{ background: 'rgba(15, 23, 42, 0.05)', color: 'rgba(15, 23, 42, 0.5)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                                                Free
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px 12px', color: 'rgba(15, 23, 42, 0.7)' }}>
                                        {user.subscriptions.map((s: any, i: number) => (
                                            <span key={i} style={{ display: 'inline-block', background: 'rgba(15, 23, 42, 0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', marginRight: '4px' }}>
                                                {s.isBundle ? "Bundle" : s.extension?.name}
                                            </span>
                                        ))}
                                        {user.subscriptions.length === 0 && "-"}
                                    </td>
                                </tr>
                            ))}
                            {recentUsers.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'rgba(15, 23, 42, 0.5)' }}>
                                        No users found in database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AdminExtensionManager />
        </div>
    );
}
