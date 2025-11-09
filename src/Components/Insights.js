
import React, { useState, useEffect } from "react";
import { Lightbulb, Wallet, TrendingUp } from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#A78BFA"];

export default function Insights({ expenses = [] }) {
    const [period, setPeriod] = useState("monthly");
    const [categoryData, setCategoryData] = useState([]);
    const [tips, setTips] = useState([]);

    useEffect(() => {
        if (!Array.isArray(expenses) || expenses.length === 0) {
            setCategoryData([]);
            setTips([]);
            return;
        }

        const now = new Date();
        const filtered =
            period === "weekly"
                ? expenses.filter((t) => {
                    const d = new Date(t.date);
                    const daysDiff = (now - d) / (1000 * 60 * 60 * 24);
                    return daysDiff <= 7;
                })
                : expenses.filter((t) => {
                    const d = new Date(t.date);
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                });


        const totals = {};
        let totalAmount = 0;
        filtered.forEach((t) => {
            const cat = t.category || t.title || "Other";
            const amt = Number(t.amount) || 0;
            totals[cat] = (totals[cat] || 0) + amt;
            totalAmount += amt;
        });


        const categoriesArr = Object.entries(totals)
            .map(([category, amount]) => ({
                category,
                amount,
                percent: totalAmount ? Number(((amount / totalAmount) * 100).toFixed(1)) : 0,
            }))
            .sort((a, b) => b.amount - a.amount);

        setCategoryData(categoriesArr);


        const newTips = categoriesArr.map((c) => {
            if (c.percent >= 50) {
                return {
                    title: `Overspending on ${c.category}`,
                    message: `⚠️ You spent ${c.percent}% on "${c.category}" — try cutting down to save around ₹${Math.round(
                        c.amount * 0.3
                    )} next month.`,
                    level: "warning",
                };
            } else if (c.percent >= 30) {
                return {
                    title: `${c.category} is significant`,
                    message: `📊 "${c.category}" makes up ${c.percent}% of your spending — consider trimming small recurring buys.`,
                    level: "notice",
                };
            } else {
                return {
                    title: `Healthy ${c.category}`,
                    message: `💡 Good! Only ${c.percent}% spent on "${c.category}" — keep it up.`,
                    level: "good",
                };
            }
        });

        setTips(newTips);
    }, [expenses, period]);


    const barData = categoryData.map((c) => ({ name: c.category, amount: c.amount }));


    const pieData = categoryData.map((c) => ({ name: c.category, value: c.amount }));

    return (
        <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
            <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-indigo-600" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Insights & Analytics</h1>
            </div>


            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setPeriod("monthly")}
                    className={`px-4 py-2 rounded-full font-medium ${period === "monthly" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 shadow-sm"
                        }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setPeriod("weekly")}
                    className={`px-4 py-2 rounded-full font-medium ${period === "weekly" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 shadow-sm"
                        }`}
                >
                    Weekly
                </button>
            </div>


            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl p-5 shadow">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        {period === "monthly" ? "Monthly Spending by Category" : "Weekly Spending by Category"}
                    </h3>

                    {barData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={barData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#6366F1" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500">No data available for this period.</p>
                    )}
                </div>


                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-5 shadow">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Category Distribution</h3>
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500">No distribution data yet.</p>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
                            <Lightbulb className="text-yellow-500" /> Smart Insights
                        </h3>

                        <div className="grid gap-3">
                            {tips.length > 0 ? (
                                tips.map((t, i) => (
                                    <div
                                        key={i}
                                        className={`p-4 rounded-lg border ${t.level === "warning"
                                                ? "border-red-200 bg-red-50"
                                                : t.level === "notice"
                                                    ? "border-yellow-200 bg-yellow-50"
                                                    : "border-green-100 bg-green-50"
                                            }`}
                                    >
                                        <div className="text-sm font-semibold text-gray-700 mb-1">{t.title}</div>
                                        <div className="text-gray-700 text-sm">{t.message}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Not enough data to generate tips.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
