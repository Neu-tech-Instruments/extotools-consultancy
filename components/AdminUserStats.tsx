"use client";

import { useState } from "react";
import { Users, Activity, Package, CreditCard } from "lucide-react";
import UserListModal from "./UserListModal";

interface AdminUserStatsProps {
    totalUsers: number;
    totalActiveSubscriptions: number;
    activeBundles: number;
}

export default function AdminUserStats({ 
    totalUsers, 
    totalActiveSubscriptions, 
    activeBundles 
}: AdminUserStatsProps) {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const activeSingles = totalActiveSubscriptions - activeBundles;

    const stats = [
        {
            label: "Total Users",
            value: totalUsers,
            icon: <Users size={20} color="var(--primary)" />,
            clickable: true,
            onClick: () => setIsUserModalOpen(true)
        },
        {
            label: "Active Subs",
            value: totalActiveSubscriptions,
            icon: <Activity size={20} color="var(--primary)" />,
            clickable: false
        },
        {
            label: "Active Bundles",
            value: activeBundles,
            icon: <Package size={20} color="var(--primary)" />,
            clickable: false
        },
        {
            label: "Single Tools",
            value: activeSingles,
            icon: <CreditCard size={20} color="var(--primary)" />,
            clickable: false
        }
    ];

    return (
        <>
            <div className="grid grid-cols-4" style={{ gap: '24px', marginBottom: '48px' }}>
                {stats.map((stat, i) => (
                    <div 
                        key={i} 
                        className="card" 
                        onClick={stat.onClick}
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '16px',
                            cursor: stat.clickable ? 'pointer' : 'default' ,
                            transition: 'all 0.2s ease',
                            border: stat.clickable ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid var(--architect-line)'
                        }}
                        onMouseEnter={(e) => {
                            if (stat.clickable) {
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (stat.clickable) {
                                e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1rem', color: 'rgba(15, 23, 42, 0.6)' }}>{stat.label}</h3>
                            {stat.icon}
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: 800 }}>{stat.value}</span>
                    </div>
                ))}
            </div>

            <UserListModal 
                isOpen={isUserModalOpen} 
                onClose={() => setIsUserModalOpen(false)} 
            />
        </>
    );
}
