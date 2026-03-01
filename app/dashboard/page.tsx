import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Chrome, Package, Settings, CreditCard, ExternalLink, Zap, Shield } from "lucide-react";
import Link from "next/link";
import ExtensionList from "@/components/ExtensionList";
import BillingButton from "@/components/BillingButton";
import { randomBytes } from "crypto";
import { bundles } from "@/lib/extensions";

interface DbSubscription {
    isBundle: boolean;
    extension: { slug: string } | null;
}

type Extension = {
    id: string;
    slug: string;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    image?: string | null;
    chromeWebStoreLink?: string | null;
    isLive: boolean;
};

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    // Fetch live extensions from DB
    let allDbExtensions: any[] = [];
    try {
        allDbExtensions = await prisma.extension.findMany({
            where: { isLive: true },
            orderBy: { name: 'asc' }
        });
    } catch (e) {
        console.error("Dashboard all extensions fetch error:", e);
    }

    // Ensure user exists and has a license key
    let userLicenseKey = "";
    let dbUserId = session.user.id;

    try {
        const user = await prisma.user.upsert({
            where: { email: session.user.email! },
            update: {},
            create: {
                email: session.user.email!,
                name: session.user.name,
                image: session.user.image,
                licenseKey: `EXTO-${randomBytes(8).toString('hex').toUpperCase()}`
            }
        });

        dbUserId = user.id;

        if (user?.licenseKey) {
            userLicenseKey = user.licenseKey;
        } else {
            // Generate and save new license key for existing users missing it
            userLicenseKey = `EXTO-${randomBytes(8).toString('hex').toUpperCase()}`;
            await prisma.user.update({
                where: { email: session.user.email! },
                data: { licenseKey: userLicenseKey }
            });
        }
    } catch (e) {
        console.error("Dashboard DB fetch error:", e);
        // Provide a temporary visual key so the page still renders even if DB fails
        userLicenseKey = "EXTO-ERROR-DASHBOARD";
    }

    let subscriptions: DbSubscription[] = [];
    try {
        if (dbUserId) {
            subscriptions = await prisma.subscription.findMany({
                where: {
                    userId: dbUserId,
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
        }
    } catch (e) {
        console.error("Dashboard subscriptions fetch error:", e);
    }

    const hasBundle = subscriptions.some((s: DbSubscription) => s.isBundle);

    // Extensions the user has access to
    const activeExtensions = allDbExtensions.filter((ext: any) =>
        hasBundle || subscriptions.some((s: DbSubscription) => s.extension?.slug === ext.slug)
    );

    return (
        <div className="container animate-fade-in" style={{ padding: '60px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>User Dashboard</h1>
                    <p style={{ color: 'rgba(15, 23, 42, 0.6)' }}>Welcome back, {session.user.name || session.user.email}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {session.user.email === 'extotools@gmail.com' && (
                        <a href="/admin" className="btn btn-outline" style={{ gap: '8px', textDecoration: 'none', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                            <Shield size={18} />
                            Admin
                        </a>
                    )}
                    <a href="/settings" className="btn btn-outline" style={{ gap: '8px', textDecoration: 'none' }}>
                        <Settings size={18} />
                        Settings
                    </a>
                    <BillingButton />
                </div>
            </div>

            <div className="grid grid-cols-3" style={{ gap: '32px' }}>
                {/* Subscriptions Overview */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Package size={24} color="var(--primary)" />
                        <h2 style={{ margin: 0 }}>Active Extensions</h2>
                    </div>

                    <ExtensionList
                        allExtensions={allDbExtensions as any}
                        activeSlugs={activeExtensions.map(ext => ext.slug)}
                    />
                </div>

                {/* Sidebar / Stats */}
                <div className="grid grid-cols-1" style={{ alignContent: 'start', gap: '32px' }}>

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
                                <span style={{ color: 'rgba(15, 23, 42, 0.4)' }}>Active Tools</span>
                                <span>{activeExtensions.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ background: 'rgba(15, 23, 42, 0.02)', borderStyle: 'dashed' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700 }}>How to Activate Tools</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>1</div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: 'rgba(15, 23, 42, 0.7)' }}>Install the ExToTools extension in your browser from the Chrome Web Store.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>2</div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: 'rgba(15, 23, 42, 0.7)' }}>Open the extension popup.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>3</div>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: 'rgba(15, 23, 42, 0.7)' }}>Click <b>"Sign In with Google"</b> to instantly sync your premium features.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
