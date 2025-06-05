// Stats.jsx
import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';

const Stats = () => { 


    const [stats, setStats] = useState({
        availableBalance: 0,
        pendingBalance: 0,
        totalCharges: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/stripe/api/stats`;
                console.log('Attempting to fetch stats from URL:', apiUrl);

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
                }

                const data = await response.json();

                setStats(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatCurrency = (value) => {
        return `$${value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
    };

    return ( 
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-4'>

            {/* Available Balance Card */}
            <StatCard
                title="Available Balance"
                value={stats.availableBalance}
                loading={loading}
                cardBgColor="bg-blue-600"   
                cardTextColor="text-white"  

            />

            {/* Pending Balance Card */}
            <StatCard
                title="Pending Balance"
                value={stats.pendingBalance}
                loading={loading}
                cardBgColor="bg-purple-600"   
                cardTextColor="text-white" 
            />

            {/* Total Purchases Card (with description) */}
            <StatCard
                title="Total Purchases"
                value={stats.totalCharges}
                loading={loading}
                cardBgColor="bg-yellow-600"   
                cardTextColor="text-white" 
                desc={
                    !loading && stats.chargeComparison ? (
                        stats.chargeComparison > 0 ? (
                            <span className="text-green-300">{stats.chargeComparison}% more than last month</span>
                        ) : (
                            <span className="text-red-300">{Math.abs(stats.chargeComparison)}% less than last month</span>
                        )
                    ) : null
                }
                descColor="text-white"
            />

        </div>
    ); 
};
export default Stats;