"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, Download, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="container min-h-[80vh] flex items-center justify-center py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-xl w-full text-center"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8"
                >
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
                    Payment Successful.
                </h1>
                <p className="text-lg text-foreground/60 mb-12 text-balance leading-relaxed">
                    Thank you for your purchase. Your account has been upgraded, and your new tools are ready to use. 
                </p>

                <div className="grid gap-4 text-left mb-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-6 rounded-2xl border border-border/50 bg-secondary/30 backdrop-blur-sm"
                    >
                        <h3 className="font-medium mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-foreground/40">
                            Next Steps
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                                <div>
                                    <p className="font-medium text-sm mb-1 text-foreground">Activate Extensions</p>
                                    <p className="text-sm text-foreground/50 leading-snug">Open your Chrome extensions and log in with your account email to sync your premium status.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                                <div>
                                    <p className="font-medium text-sm mb-1 text-foreground">Explore Dashboard</p>
                                    <p className="text-sm text-foreground/50 leading-snug">Manage your tools and see your active extensions in your personal dashboard.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard" className="btn btn-primary h-12 px-8 flex items-center justify-center gap-2 group">
                        Go to Dashboard
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link href="/#collection" className="btn h-12 px-8 border border-border/50 hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2">
                        Browse More Tools
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
