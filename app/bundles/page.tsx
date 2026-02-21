"use client";

import { bundles, extensions } from "@/lib/extensions";
import { Check, Chrome, Zap, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import SubscribeButton from "@/components/SubscribeButton";
import CustomBundleSelector from "@/components/CustomBundleSelector";
import { useState } from "react";

export default function BundlesPage() {
    const [selections, setSelections] = useState<Record<string, string[]>>({});

    const handleSelectionChange = (bundleId: string, selectedIds: string[]) => {
        setSelections(prev => ({
            ...prev,
            [bundleId]: selectedIds
        }));
    };

    return (
        <div className="container animate-fade-in" style={{ padding: 'clamp(40px, 8vw, 80px) 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: '16px' }}>Universal <span className="text-gradient">Access Bundles</span></h1>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(15, 23, 42, 0.6)', maxWidth: '700px', margin: '0 auto' }}>
                    Stop paying for each tool individually. Select your favorites and save up to 50% with our multi-extension packs.
                </p>
            </div>

            <div className="grid grid-cols-2" style={{ maxWidth: '1100px', margin: '0 auto', gap: '40px' }}>
                {bundles.map((bundle) => (
                    <div key={bundle.id} className="card" style={{
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        border: bundle.extensionCount > 5 ? '2px solid var(--primary)' : '1px solid var(--card-border)',
                        position: 'relative'
                    }}>
                        {bundle.extensionCount > 5 && (
                            <div style={{
                                position: 'absolute',
                                top: '-16px',
                                right: '32px',
                                background: 'var(--primary)',
                                padding: '4px 16px',
                                borderRadius: '100px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: 'white'
                            }}>
                                BEST VALUE
                            </div>
                        )}

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <Zap size={24} color="var(--primary)" />
                                <h2 style={{ fontSize: '1.75rem' }}>{bundle.name}</h2>
                            </div>
                            <p style={{ color: 'rgba(15, 23, 42, 0.6)', fontSize: '0.95rem' }}>{bundle.description}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                            <span style={{ fontSize: '3rem', fontWeight: 800 }}>${bundle.price}</span>
                            <span style={{ color: 'rgba(15, 23, 42, 0.4)', fontSize: '1.1rem' }}>/mo</span>
                        </div>

                        <div style={{ flex: 1, marginBottom: '32px' }}>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '24px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Check size={16} color="#16a34a" />
                                    <span>Pick any {bundle.extensionCount} Premium Extensions</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Check size={16} color="#16a34a" />
                                    <span>Priority Customer Support</span>
                                </li>
                            </ul>

                            <CustomBundleSelector
                                limit={bundle.extensionCount}
                                onSelectionChange={(selected) => handleSelectionChange(bundle.id, selected)}
                            />
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            {(!selections[bundle.id] || selections[bundle.id].length < bundle.extensionCount) ? (
                                <button className="btn btn-primary" style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed' }} disabled>
                                    Select {bundle.extensionCount} Extensions to Continue
                                </button>
                            ) : (
                                <SubscribeButton
                                    bundleId={bundle.id}
                                    price={bundle.price}
                                    selectedExtensions={selections[bundle.id]}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Included Extensions List */}
            <section style={{ marginTop: 'clamp(60px, 10vw, 100px)' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>What's Included?</h3>
                <div className="grid grid-cols-3" style={{ gap: '16px' }}>
                    {extensions.map((ext) => (
                        <div key={ext.slug} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '20px',
                            background: 'rgba(15, 23, 42, 0.02)',
                            borderRadius: '12px'
                        }}>
                            <div style={{ color: ext.isBuilt ? 'var(--primary)' : 'rgba(15, 23, 42, 0.2)' }}>
                                <Chrome size={20} />
                            </div>
                            <span style={{ fontWeight: 600, color: ext.isBuilt ? 'var(--foreground)' : 'rgba(15, 23, 42, 0.4)' }}>
                                {ext.name}
                            </span>
                            {!ext.isBuilt && (
                                <span style={{ fontSize: '0.7rem', color: 'rgba(15, 23, 42, 0.3)', marginLeft: 'auto' }}>COMING SOON</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
