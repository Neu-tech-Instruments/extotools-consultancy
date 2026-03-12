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
    "full-view-pro": "fdpohaocaechififmbbbbbknoalclacl",
};

interface ExtensionListProps {
    allExtensions: ExtensionData[];
    activeSlugs: string[]; // Slugs the user has a premium subscription/bundle for
}

export default function ExtensionList({ allExtensions, activeSlugs }: ExtensionListProps) {
    const [installedSlugs, setInstalledSlugs] = useState<Set<string>>(new Set());
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        // Only run extension detection in the browser
        if (typeof window === "undefined" || !window.chrome || !window.chrome.runtime) {
            setIsScanning(false);
            return;
        }

        const checkInstallations = async () => {
            const newInstalledSlugs = new Set<string>();

            // Ping all known ExToTools Extension IDs
            const checks = Object.entries(CHROME_EXTENSION_IDS).map(([slug, id]) => {
                return new Promise<void>((resolve) => {
                    try {
                        window.chrome!.runtime!.sendMessage(id, { action: "ping" }, (response: any) => {
                            if (window.chrome!.runtime!.lastError) {
                                // Extension is not installed or not listening
                                resolve();
                            } else if (response && response.installed) {
                                newInstalledSlugs.add(slug);
                                resolve();
                            } else {
                                resolve();
                            }
                        });
                    } catch (e) {
                        resolve();
                    }
                });
            });

            await Promise.all(checks);
            setInstalledSlugs(newInstalledSlugs);
            setIsScanning(false);
        };

        checkInstallations();
    }, []);

    const renderStatusBadge = (ext: ExtensionData, isPremium: boolean, isInstalled: boolean) => {
        if (!isInstalled) {
            return (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(15, 23, 42, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                    Not Installed
                </span>
            );
        }

        if (isPremium) {
            return (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(22, 163, 74)', padding: '2px 8px', borderRadius: '12px' }}>
                    <CheckCircle2 size={12} /> Premium
                </span>
            );
        }

        return (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(234, 179, 8, 0.1)', color: 'rgb(202, 138, 4)', padding: '2px 8px', borderRadius: '12px' }}>
                <CheckCircle2 size={12} /> Active
            </span>
        );
    };

    return (
        <div className="grid grid-cols-1" style={{ gap: '16px' }}>
            {allExtensions.map(ext => {
                const isPremium = activeSlugs.includes(ext.slug);
                const isInstalled = installedSlugs.has(ext.slug);

                return (
                    <div key={ext.slug} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px',
                        background: 'rgba(15, 23, 42, 0.02)',
                        borderRadius: '12px',
                        border: isPremium ? '1px solid var(--primary)' : '1px solid var(--card-border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ color: isPremium ? 'var(--primary)' : 'rgba(15, 23, 42, 0.4)' }}>
                                <Chrome size={24} />
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
                            <Link href={ext.chromeWebStoreLink || "#"} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                Install Extension
                                <ExternalLink size={14} />
                            </Link>
                        ) : (
                            !isPremium && (
                                <Link href="/#collection" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                    Upgrade to Premium
                                </Link>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
}
