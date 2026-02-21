"use client";

import { useState } from "react";
import { Copy, Check, Key } from "lucide-react";

export default function LicenseKey({ licenseKey }: { licenseKey: string }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(licenseKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.02)', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={18} color="var(--primary)" />
                Your License Key
            </h3>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
                fontFamily: 'monospace',
                fontSize: '1rem',
                color: 'var(--accent-navy)',
                justifyContent: 'space-between'
            }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {licenseKey}
                </span>
                <button
                    onClick={copyToClipboard}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: copied ? '#16a34a' : 'rgba(15, 23, 42, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s ease'
                    }}
                    title="Copy to clipboard"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(15, 23, 42, 0.4)', marginTop: '12px', margin: 0 }}>
                Use this key to activate premium features in any ExToTools extension.
            </p>
        </div>
    );
}
