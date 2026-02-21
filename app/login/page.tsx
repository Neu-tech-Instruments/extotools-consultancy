import { signIn } from "@/auth";
import { Chrome, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="container animate-fade-in" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - var(--nav-height) - 100px)',
            padding: '40px 0'
        }}>
            <div className="card" style={{ maxWidth: '440px', width: '100%', padding: 'clamp(32px, 5vw, 48px)', textAlign: 'center' }}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'rgba(10, 180, 255, 0.05)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Chrome size={32} color="var(--primary)" />
                        </div>
                    </div>
                    <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Welcome <span className="text-gradient">Back</span></h1>
                    <p style={{ color: 'rgba(15, 23, 42, 0.6)', lineHeight: 1.6 }}>Login to access your extensions and manage your subscription.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Google Login */}
                    <form action={async () => {
                        "use server";
                        await signIn("google");
                    }}>
                        <button className="btn btn-outline" style={{
                            width: '100%',
                            gap: '12px',
                            background: 'white',
                            color: 'black',
                            border: '1px solid rgba(15, 23, 42, 0.1)',
                            height: '52px',
                            fontWeight: 600
                        }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '4px 0', color: 'rgba(15, 23, 42, 0.1)' }}>
                        <div style={{ flex: 1, height: '1px', background: 'currentColor' }}></div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'currentColor' }}></div>
                    </div>

                    {/* Email Login */}
                    <form action={async (formData: FormData) => {
                        "use server";
                        await signIn("email", { email: formData.get("email") });
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'rgba(15, 23, 42, 0.3)'
                            }} />
                            <input
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                required
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 48px',
                                    borderRadius: '12px',
                                    background: 'rgba(15, 23, 42, 0.03)',
                                    border: '1px solid var(--card-border)',
                                    color: 'var(--foreground)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    height: '52px'
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '52px', fontWeight: 600 }}>
                            Send Magic Link
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </div>

                <p style={{ marginTop: '32px', fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.4)', lineHeight: 1.6 }}>
                    By continuing, you agree to our <a href="/terms" style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</a> and <a href="/privacy" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
}
