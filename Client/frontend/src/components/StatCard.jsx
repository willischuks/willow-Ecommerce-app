
//StatCard.jsx
"use client";
import React from 'react';
import { Card } from 'flowbite-react'; 

const formatCurrency = (amount, currency = 'USD') => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return 'N/A'; 
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export function StatCard({
    title,
    value,
    loading,
    cardBgColor = 'bg-green-600', 
    cardTextColor = 'text-white', 
    desc,
    descColor = 'text-gray-200' 
}) {
    return (
        <Card className={`w-full max-w-xs rounded-xl shadow-lg p-4 ${cardBgColor} ${cardTextColor}`}>
            <div className="flex flex-col items-start">
                <h5 className={`text-sm font-semibold uppercase tracking-wide opacity-80`}>
                    {title}
                </h5>
                <p className="text-3xl font-bold leading-tight mt-1">
                    {loading ? 'Loading...' : formatCurrency(value)}
                </p>
                {desc && (
                    <p className={`text-xs mt-2 opacity-90 ${descColor}`}>
                        {desc}
                    </p>
                )}
            </div>
        </Card>
    );
}

export default StatCard;