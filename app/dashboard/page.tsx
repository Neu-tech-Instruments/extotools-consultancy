import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { extensions, ExtensionData } from "@/lib/extensions";
import { Chrome, Package, Settings, CreditCard, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import LicenseKey from "@/components/LicenseKey";
import { randomBytes } from "crypto";

interface DbSubscription {
    isBundle: boolean;
    extension: { slug: string } | null;
}

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const subscriptions = await prisma.subscription.findMany({
        where: {
            userId: session.user.id,
            status: "active",
        },
        select: {
            isBundle: true,
            extension: {
                select: {
                    slug: true
                }
            }
        }
    }) as DbSubscription[];

    const hasBundle = subscriptions.some((s: DbSubscription) => s.isBundle);

    // Extensions the user has access to
    const activeExtensions = extensions.filter((ext: ExtensionData) =>
        hasBundle || subscriptions.some((s: DbSubscription) => s.extension?.slug === ext.slug)
    );

    // Ensure user has a license key
    let userLicenseKey = "";
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { licenseKey: true }
    });

    if (user?.licenseKey) {
        userLicenseKey = user.licenseKey;
    } else {
        // Generate and save new license key
        userLicenseKey = `EXTO-${randomBytes(8).toString('hex').toUpperCase()}`;
        await prisma.user.update({
            where: { id: session.user.id },
            data: { licenseKey: userLicenseKey }
        });
    }

    return (
        <div className="container animate-fade-in" style={{ padding: '60px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>User Dashboard</h1>
                    <p style={{ color: 'rgba(15, 23, 42, 0.6)' }}>Welcome back, {session.user.name || session.user.email}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-outline" style={{ gap: '8px' }}>
                        <Settings size={18} />
                        Settings
                    </button>
                    <button className="btn btn-outline" style={{ gap: '8px' }}>
                        <CreditCard size={18} />
                        Billing
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3" style={{ gap: '32px' }}>
                {/* Subscriptions Overview */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Package size={24} color="var(--primary)" />
                        <h2 style={{ margin: 0 }}>Active Extensions</h2>
                    </div>

                    {activeExtensions.length > 0 ? (
                        <div className="grid grid-cols-1" style={{ gap: '16px' }}>
                            {activeExtensions.map(ext => (
                                <div key={ext.slug} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '20px',
                                    background: 'rgba(15, 23, 42, 0.02)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--card-border)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ color: 'var(--primary)' }}>
                                            <Chrome size={24} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{ext.name}</h3>
                                            <p style={{ fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.5)', margin: 0 }}>{ext.shortDescription}</p>
                                        </div>
                                    </div>
                                    <Link href={ext.chromeWebStoreLink || "#"} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                        Open Tool
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <p style={{ color: 'rgba(15, 23, 42, 0.4)', marginBottom: '24px' }}>You don't have any active subscriptions yet.</p>
                            <Link href="/#collection" className="btn btn-primary">Browse Extensions</Link>
                        </div>
                    )}
                </div>

                {/* Sidebar / Stats */}
                <div className="grid grid-cols-1" style={{ alignContent: 'start', gap: '32px' }}>

                    <LicenseKey licenseKey={userLicenseKey} />

                    <div className="card" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={18} />
                            Pro Member
                        </h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '24px', opacity: 1, color: 'rgba(255, 255, 255, 0.95)' }}>
                            {hasBundle ? 'You have full access to all extensions included in your bundle.' : 'Unlock even more tools with a bundle pack and save 50%.'}
                        </p>
                        {!hasBundle && (
                            <Link href="/bundles" className="btn" style={{ width: '100%', background: 'white', color: 'var(--primary)' }}>
                                Upgrade to Bundle
                            </Link>
                        )}
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Account Info</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'rgba(15, 23, 42, 0.4)' }}>Full Name</span>
                                <span>{session.user?.name || "Premium User"}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'rgba(15, 23, 42, 0.4)' }}>Email</span>
                                <span>{session.user?.email}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'rgba(15, 23, 42, 0.4)' }}>Country</span>
                                <span>{(session.user as any)?.country || "Not specified"}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'rgba(15, 23, 42, 0.4)' }}>Active Tools</span>
                                <span>{activeExtensions.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ background: 'rgba(15, 23, 42, 0.02)', borderStyle: 'dashed' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700 }}>How to Activate</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>1</div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: 'rgba(15, 23, 42, 0.7)' }}>Copy your unique license key from above.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>2</div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: 'rgba(15, 23, 42, 0.7)' }}>Open the ExToTools extension in your browser.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>3</div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: 'rgba(15, 23, 42, 0.7)' }}>Paste the key into the activation field to unlock Pro features.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
