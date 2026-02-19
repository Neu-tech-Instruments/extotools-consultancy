"use client";

import { extensions, ExtensionData } from "@/lib/extensions";
import { Check, Chrome, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";

interface CustomBundleSelectorProps {
    limit: number;
    onSelectionChange: (selectedIds: string[]) => void;
}

export default function CustomBundleSelector({ limit, onSelectionChange }: CustomBundleSelectorProps) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleExtension = (slug: string) => {
        if (selected.includes(slug)) {
            setSelected(selected.filter(id => id !== slug));
        } else {
            if (selected.length < limit) {
                setSelected([...selected, slug]);
            }
        }
    };

    useEffect(() => {
        onSelectionChange(selected);
    }, [selected, onSelectionChange]);

    return (
        <div style={{ marginTop: '24px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                padding: '12px',
                background: selected.length === limit ? 'rgba(34, 197, 94, 0.05)' : 'rgba(15, 23, 42, 0.03)',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selected.length === limit ? '#22c55e' : 'var(--card-border)'
            }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {selected.length === limit ? (
                        <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={16} /> Selection Complete
                        </span>
                    ) : (
                        `Select ${limit} extensions (${selected.length}/${limit})`
                    )}
                </span>
                {selected.length < limit && (
                    <span style={{ fontSize: '0.8rem', color: 'rgba(15, 23, 42, 0.4)' }}>
                        Pick {limit - selected.length} more
                    </span>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '8px',
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '4px'
            }}>
                {extensions.map((ext) => (
                    <button
                        key={ext.slug}
                        onClick={() => toggleExtension(ext.slug)}
                        disabled={!selected.includes(ext.slug) && selected.length >= limit}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: selected.includes(ext.slug) ? 'var(--primary)' : 'var(--card-border)',
                            background: selected.includes(ext.slug) ? 'rgba(37, 99, 235, 0.05)' : 'white',
                            cursor: (!selected.includes(ext.slug) && selected.length >= limit) ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            textAlign: 'left',
                            fontSize: '0.8rem'
                        }}
                    >
                        <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: '1px solid',
                            borderColor: selected.includes(ext.slug) ? 'var(--primary)' : 'var(--card-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: selected.includes(ext.slug) ? 'var(--primary)' : 'transparent'
                        }}>
                            {selected.includes(ext.slug) && <Check size={12} color="white" />}
                        </div>
                        <span style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: selected.includes(ext.slug) ? 'var(--primary)' : 'var(--foreground)',
                            fontWeight: selected.includes(ext.slug) ? 600 : 400
                        }}>
                            {ext.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
