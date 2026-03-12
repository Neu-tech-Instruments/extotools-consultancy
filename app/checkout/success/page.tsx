"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight, Chrome, LogIn, Layout } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SuccessPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            {/* Architectural Background */}
            <div className="bg-architect grid-dots opacity-20" />
            <div className="vertical-line left-[10%] opacity-10" />
            <div className="vertical-line right-[10%] opacity-10" />
            
            <main className="container relative z-10 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-end mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-primary mb-4 block">
                                Transaction Confirmed
                            </span>
                            <h1 className="text-6xl md:text-8xl mb-6 text-foreground font-serif leading-[0.9]">
                                Payment <br />
                                <span className="text-gradient">Successful.</span>
                            </h1>
                            <p className="text-xl text-foreground/40 max-w-md leading-relaxed">
                                Your account is now upgraded. Your professional tools are ready for activation.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="hidden md:block"
                        >
                            <div className="oversized-number">01</div>
                        </motion.div>
                    </div>

                    {/* Action Cards / Next Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="card group hover:!translate-y-0 !cursor-default"
                        >
                            <div className="flex flex-col h-full">
                                <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    <Chrome size={24} />
                                </div>
                                <h3 className="text-2xl font-serif mb-4">Sync Extensions</h3>
                                <p className="text-foreground/50 mb-8 flex-grow">
                                    Open your Chrome extensions and log in with this account email to instantly activate your premium features.
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                                    Step 01 <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="card group hover:!translate-y-0 !cursor-default"
                        >
                            <div className="flex flex-col h-full">
                                <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    <Layout size={24} />
                                </div>
                                <h3 className="text-2xl font-serif mb-4">View Dashboard</h3>
                                <p className="text-foreground/50 mb-8 flex-grow">
                                    Manage your subscriptions, view usage limits, and explore other professional tools in your dashboard.
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                                    Step 02 <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-architect-line gap-8"
                    >
                        <div className="flex gap-4">
                            <Link href="/dashboard" className="btn btn-primary">
                                Dashboard &nbsp; <ChevronRight size={18} />
                            </Link>
                            <Link href="/#collection" className="btn btn-outline">
                                More Tools
                            </Link>
                        </div>
                        
                        <div className="vertical-text opacity-20 hidden md:block">
                            EST. 2024 / EXTOTOOLS
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
}
