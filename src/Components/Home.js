import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-indigo-700 mb-3">
        Welcome to Smart Family Expense Tracker 💰
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your spending, visualize your expenses, and plan smarter.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/add-expense"
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
        >
          ➕ Add Expense
        </Link>
        <Link
          to="/charts"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          📊 View Charts
        </Link>
      </div>
    </motion.div>
  );
}
