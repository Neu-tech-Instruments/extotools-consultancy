import { Chrome, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--glass-border)',
            padding: '64px 0 32px 0',
            marginTop: '64px',
            background: 'rgba(15, 23, 42, 0.02)'
        }}>
            <div className="container">
                <div className="grid grid-cols-3" style={{ marginBottom: '48px' }}>
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <img src="/tool-icon-20.png" alt="ExToTools Logo" style={{ height: '32px', width: 'auto' }} />
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            Premium Chrome extensions to supercharge your browsing and productivity.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '16px' }}>Products</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>
                            <li><a href="/#collection">All Extensions</a></li>
                            <li><a href="/bundles">Bundle Packs</a></li>
                            <li><a href="/roadmap">Roadmap</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '16px' }}>Support</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'rgba(15, 23, 42, 0.6)' }}>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '32px',
                    borderTop: '1px solid var(--glass-border)',
                    color: 'rgba(15, 23, 42, 0.4)',
                    fontSize: '0.9rem'
                }}>
                    <p>© {new Date().getFullYear()} ExToTools. All rights reserved.</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Built with <Heart size={14} color="var(--accent)" fill="var(--accent)" /> for power users.
                    </p>
                </div>
            </div>
        </footer>
    );
}
