
import React from "react";
import { motion } from "framer-motion";

export default function ProgressRing({ spent, budget }) {
    const radius = 60;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const percentage = Math.min((spent / budget) * 100, 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center mt-6">
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#E5E7EB"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <motion.circle
                    stroke="url(#grad)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-xl font-semibold fill-gray-700"
                >
                    {Math.round(percentage)}%
                </text>
            </svg>

            <p className="text-sm text-gray-500 mt-2">
                ₹{spent} / ₹{budget} spent
            </p>
        </div>
    );
}
