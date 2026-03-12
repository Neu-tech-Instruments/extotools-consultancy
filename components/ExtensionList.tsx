"use client";

import { useState, useEffect } from "react";
import { Chrome, ExternalLink, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { ExtensionData } from "@/lib/extensions";

declare global {
    interface Window {
        chrome?: {
            runtime?: {
                sendMessage: (
                    extensionId: string,
                    message: any,
                    responseCallback?: (response: any) => void
                ) => void;
                lastError?: {
                    message?: string;
                };
            };
        };
    }
}

// Placeholder Chrome Web Store IDs for ExToTools
// The user will need to update these with their actual published IDs
export const CHROME_EXTENSION_IDS: Record<string, string> = {
    "full-view-pro": "koebdhijeokpekjfgigpebkllmjbfknb",
};

interface ExtensionListProps {
    allExtensions: ExtensionData[];
    activeSlugs: string[]; // Slugs the user has a premium subscription/bundle for
    userEmail?: string;
    serverDetectedSlugs?: string[];
}

export default function ExtensionList({ allExtensions, activeSlugs, userEmail, serverDetectedSlugs = [] }: ExtensionListProps) {
    const [installedSlugs, setInstalledSlugs] = useState<Set<string>>(new Set(serverDetectedSlugs));
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        // Initialize with server-detected slugs
        if (serverDetectedSlugs.length > 0) {
            setInstalledSlugs(prev => {
                const next = new Set(prev);
                serverDetectedSlugs.forEach(slug => next.add(slug));
                return next;
            });
        }
    }, [serverDetectedSlugs]);

    useEffect(() => {
        // Only run extension detection in the browser
        if (typeof window === "undefined") return;

        const checkInstallations = async () => {
            console.log("[ExToTools] Starting extension scan...", { CHROME_EXTENSION_IDS, serverDetectedSlugs });

            // Layer 1: Check DOM attributes (Fastest - set by content script)
            const isInstalledViaDOM = document.documentElement.getAttribute('data-extotools-installed') === 'true';
            const userEmailViaDOM = document.documentElement.getAttribute('data-extotools-user');

            if (isInstalledViaDOM) {
                console.log("[ExToTools] Detected extension via DOM signal");
                // For now, we only have one extension slug "full-view-pro"
                setInstalledSlugs(prev => new Set(prev).add('full-view-pro'));
            }

            // Layer 2: Official Handshake (externally_connectable) + Fallbacks
            if (window.chrome && window.chrome.runtime) {
                const checks = Object.entries(CHROME_EXTENSION_IDS).map(([slug, id]) => {
                    return new Promise<void>((resolve) => {
                        let resolved = false;
                        const safeResolve = () => { if (!resolved) { resolved = true; resolve(); } };

                        // Try direct messaging (Requires externally_connectable in manifest)
                        try {
                            window.chrome!.runtime!.sendMessage(id, { action: "ping" }, (response: any) => {
                                if (!window.chrome!.runtime!.lastError && response && response.installed) {
                                    console.log(`[ExToTools] Detected ${slug} via direct message`);
                                    setInstalledSlugs(prev => new Set(prev).add(slug));
                                }
                                safeResolve();
                            });
                        } catch (e) {
                            // Messaging might be blocked
                        }

                        // Try Image-based detection (Requires web_accessible_resources in manifest)
                        const img = new Image();
                        img.onload = () => {
                            console.log(`[ExToTools] Detected ${slug} via image fallback`);
                            setInstalledSlugs(prev => new Set(prev).add(slug));
                            safeResolve();
                        };
                        img.onerror = () => { safeResolve(); };
                        img.src = `chrome-extension://${id}/icons/icon48.png`;

                        setTimeout(safeResolve, 2000);
                    });
                });
                await Promise.all(checks);
            }

            console.log("[ExToTools] Scan complete.");
            setIsScanning(false);
        };

        checkInstallations();

        // Layer 3: Listen for pings/announcements
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin && event.origin !== "") return;

            const { data } = event;
            // Handle both our custom EXTO_PONG and the general announcement
            if ((data && data.type === 'EXTO_PONG') || (data && data.type === 'EXTO_EXTENSION_STATUS' && data.installed)) {
                console.log("[ExToTools] Received extension message signal:", data);
                if (data.email && userEmail && data.email.toLowerCase() === userEmail.toLowerCase()) {
                    setInstalledSlugs(prev => {
                        const next = new Set(prev);
                        if (data.slug) next.add(data.slug);
                        return next;
                    });
                } else if (!data.email) {
                    setInstalledSlugs(prev => {
                        const next = new Set(prev);
                        if (data.slug) next.add(data.slug);
                        return next;
                    });
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [userEmail]);

    const renderStatusBadge = (ext: ExtensionData, isPremium: boolean, isInstalled: boolean) => {
        const isActuallyInstalled = isInstalled || serverDetectedSlugs.includes(ext.slug);

        if (!isActuallyInstalled) {
            return (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(15, 23, 42, 0.1)', padding: '2px 8px', borderRadius: '0' }}>
                    Not Installed
                </span>
            );
        }

        if (isPremium) {
            return (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(22, 163, 74)', padding: '2px 8px', borderRadius: '0' }}>
                    <CheckCircle2 size={12} /> Premium
                </span>
            );
        }

        return (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(22, 163, 74)', padding: '2px 8px', borderRadius: '0' }}>
                <CheckCircle2 size={12} /> Active
            </span>
        );
    };

    return (
        <div className="grid grid-cols-1" style={{ gap: '16px' }}>
            {allExtensions.map(ext => {
                const isPremium = activeSlugs.includes(ext.slug);
                const isInstalled = installedSlugs.has(ext.slug) || serverDetectedSlugs.includes(ext.slug);

                return (
                    <div key={ext.slug} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px',
                        background: 'rgba(15, 23, 42, 0.02)',
                        borderRadius: '0',
                        border: isPremium ? '1px solid var(--primary)' : '1px solid var(--card-border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0',
                                overflow: 'hidden',
                                color: isPremium ? 'var(--primary)' : 'rgba(15, 23, 42, 0.4)',
                                background: isInstalled && ext.image ? 'transparent' : 'rgba(15, 23, 42, 0.05)'
                            }}>
                                {isInstalled && ext.image ? (
                                    <img src={ext.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <Chrome size={32} />
                                )}
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{ext.name}</h3>
                                    {!isScanning && renderStatusBadge(ext, isPremium, isInstalled)}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.5)', margin: 0 }}>{ext.shortDescription}</p>
                            </div>
                        </div>

                        {!isInstalled ? (
                            <Link href={ext.chromeWebStoreLink || "#"} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem', borderRadius: '0' }}>
                                Install Extension
                                <ExternalLink size={14} />
                            </Link>
                        ) : (
                            !isPremium && (
                                <Link
                                    href="/#collection"
                                    style={{
                                        color: 'var(--primary)',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.05em',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'opacity 0.2s ease'
                                    }}
                                    className="hover:opacity-70"
                                >
                                    GO FOR PREMIUM
                                </Link>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
}
