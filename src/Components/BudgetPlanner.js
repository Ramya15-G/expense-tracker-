import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Progress } from "@material-tailwind/react";

export default function BudgetPlanner({ expenses }) {
    const [budget, setBudget] = useState("");
    const [savedBudget, setSavedBudget] = useState(
        localStorage.getItem("monthlyBudget") || ""
    );


    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);


    const handleSave = () => {
        if (!budget || budget <= 0) {
            toast.error("Please enter a valid budget amount.");
            return;
        }
        setSavedBudget(budget);
        localStorage.setItem("monthlyBudget", budget);
        toast.success("Monthly budget set successfully!");
    };

    useEffect(() => {
        if (!savedBudget) return;

        const percent = (totalSpent / savedBudget) * 100;
        if (percent >= 100) {
            toast.error("🚨 You have exceeded your monthly budget!");
        } else if (percent >= 80) {
            toast.warn("⚠️ You are nearing your budget limit!");
        }
    }, [totalSpent, savedBudget]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-8">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold text-center text-teal-700 mb-8"
            >
                💰 Smart Budget Planner
            </motion.h1>

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 max-w-xl mx-auto border border-gray-100"
            >
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Set Your Monthly Budget
                </h2>

                <div className="flex gap-3 mb-4">
                    <input
                        type="number"
                        placeholder="Enter budget amount (₹)"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                    />
                    <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-5 py-2 rounded-lg hover:scale-105 transition"
                    >
                        Save
                    </button>
                </div>

                {savedBudget && (
                    <div className="mt-8">
                        <h3 className="text-gray-700 font-semibold mb-3">
                            Current Budget:{" "}
                            <span className="text-teal-700">₹{savedBudget}</span>
                        </h3>

                        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${Math.min((totalSpent / savedBudget) * 100, 100)}%`,
                                }}
                                transition={{ duration: 0.8 }}
                                className={`h-4 ${totalSpent < savedBudget * 0.8
                                        ? "bg-green-500"
                                        : totalSpent < savedBudget
                                            ? "bg-yellow-400"
                                            : "bg-red-500"
                                    }`}
                            />
                        </div>

                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>Spent: ₹{totalSpent.toFixed(2)}</span>
                            <span>
                                Remaining: ₹
                                {Math.max(savedBudget - totalSpent, 0).toFixed(2)}
                            </span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 p-4 rounded-lg border border-gray-200 bg-white/70 shadow-sm"
                        >
                            {totalSpent >= savedBudget ? (
                                <p className="text-red-600 font-semibold">
                                    ❌ Budget exceeded by ₹{(totalSpent - savedBudget).toFixed(2)}
                                </p>
                            ) : (
                                <p className="text-green-700 font-semibold">
                                    ✅ You’re within budget. Keep it up!
                                </p>
                            )}
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
