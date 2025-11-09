// src/Components/ExpenseForm.js
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title || !amount) {
      toast.error("Please enter title and amount");
      return;
    }

    const newExpense = {
      title,
      amount: parseFloat(amount),
      date: date || new Date().toISOString().slice(0,10),
      id: Date.now(),
    };

    onAddExpense(newExpense);
    setTitle("");
    setAmount("");
    setDate("");
    toast.success("Expense added ✓");
  };

  return (
    <form onSubmit={submit} className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">➕ Add New Expense</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
      />

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (₹)"
        type="number"
        className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
      />

      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-300 outline-none"
      />

      <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 transform transition">
        Add Expense
      </button>
    </form>
  );
}

